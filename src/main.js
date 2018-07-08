"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const Calendar_1 = require("./components/Calendar");
class Main extends React.Component {
    render() {
        return (React.createElement(Calendar_1.default, null));
    }
}
ReactDOM.render(React.createElement(Main, null), document.getElementById('gallery-root'));
//# sourceMappingURL=main.js.map