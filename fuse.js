const path = require("path");
const express = require("express");

const { FuseBox, WebIndexPlugin, CSSModules,
  PostCSSPlugin, CSSResourcePlugin, CSSPlugin } = require("fuse-box");

const { task, context } = require("fuse-box/sparky");
const tsc = require('typescript');

context(class {
  getConfig(distFolder) {
    return FuseBox.init({
      homeDir: "src",
      sourceMaps: true,
      target: 'es6',
      output: `${distFolder}/$name.js`,
      plugins: [
        WebIndexPlugin({ template: "./public/index.html" }),
        [
          PostCSSPlugin([require("postcss-import")]),
          CSSModules(),
          CSSPlugin()
        ]
      ]
    });
  }

  createBundle(fuse) {
    const app = fuse.bundle("app/app");
    app.instructions(" > index.tsx");
    return app;
  }

  createLocalBundle(fuse) {
    const app = fuse.bundle("app/app")
      .completed(proc => proc.start)
      .instructions(" > main.tsx").hmr().watch();
    return app;
  }
});

task("dist", async context => {
  context.isProduction = true;
  const fuse = context.getConfig('dist');
  context.createBundle(fuse).completed(() => {
    require('child_process')
      .execSync("./node_modules/typescript/bin/tsc", function puts(error, stdout, stderr) {

      });
  });
  await fuse.run();
});

task("default", async context => {
  context.isProduction = false;
  const fuse = context.getConfig('local-dist');
  fuse.dev({ port: 3000 }, server => {
    const app = server.httpServer.app;
    app.use("/app/", express.static(path.resolve("./local-dist/app/")));
    app.get("*", function (req, res) {
      res.sendFile(path.join(path.resolve("./local-dist/"), "index.html"));
    });
  }); // launch http server
  context.createLocalBundle(fuse);
  await fuse.run();
});