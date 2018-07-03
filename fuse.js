const path = require("path");
const express = require("express");

const { FuseBox, WebIndexPlugin } = require("fuse-box");
const fuse = FuseBox.init({
  homeDir: "src",
  target: 'browser@es6',
  output: "dist/$name.js",
  plugins: [
    WebIndexPlugin({ template: "./public/index.html" })
  ]
})
fuse.dev({ port: 3000 }, server => {
  const dist = path.resolve("./dist");
  const app = server.httpServer.app;
  app.use("/dist/", express.static(dist));
  app.get("*", function (req, res) {
    res.sendFile(path.join(dist, "index.html"));
  });
}); // launch http server
fuse.bundle("app")
  .completed(proc => proc.start)
  .instructions(" > main.tsx").hmr().watch()
fuse.run();