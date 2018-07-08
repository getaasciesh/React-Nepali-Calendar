"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Calendar_css_1 = require("./Calendar.css");
const calendarData_1 = require("../functions/calendarData");
const calFns = require("../functions/calendarFunctions");
const react_jss_1 = require("react-jss");
var Switch;
(function (Switch) {
    Switch[Switch["month"] = 0] = "month";
    Switch[Switch["year"] = 1] = "year";
})(Switch || (Switch = {}));
class YearMonthSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentYear: props.defaultYear,
            currentMonth: props.defaultMonth,
            activeSwitch: Switch.month
        };
    }
    setCurrent(currentYear = this.state.currentYear, currentMonth = this.state.currentMonth) {
        this.setState({ currentMonth, currentYear });
        this.props.onSwitch(currentYear, currentMonth);
    }
    goBack() {
        if (this.state.activeSwitch === Switch.year && calendarData_1.default.minBsYear < this.state.currentYear) {
            this.setCurrent(this.state.currentYear - 1);
        }
        if (this.state.activeSwitch === Switch.month) {
            let currentMonth = this.state.currentMonth - 1;
            let currentYear = this.state.currentYear;
            if (currentMonth == 0) {
                currentMonth = 12;
                currentYear = this.state.currentYear - 1;
            }
            if (calendarData_1.default.minBsYear <= currentYear) {
                this.setCurrent(currentYear, currentMonth);
            }
        }
    }
    goForward() {
        if (this.state.activeSwitch === Switch.year && calendarData_1.default.maxBsYear > this.state.currentYear) {
            this.setCurrent(this.state.currentYear + 1);
        }
        if (this.state.activeSwitch === Switch.month) {
            let currentMonth = this.state.currentMonth + 1;
            let currentYear = this.state.currentYear;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear = this.state.currentYear + 1;
            }
            if (calendarData_1.default.maxBsYear >= currentYear) {
                this.setCurrent(currentYear, currentMonth);
            }
        }
    }
    render() {
        const { classes } = this.props;
        return (React.createElement("div", { className: `r-n-cal-switch ${classes.switch}` },
            React.createElement("div", { className: `r-n-cal-backBtn ${classes.btns} ${classes.backBtn}`, onClick: () => this.goBack() }, '<'),
            React.createElement("div", { className: `r-n-cal-yearBtn ${classes.btns} ${classes.btns} ${this.state.activeSwitch == Switch.year ? classes.activeSwitch : ''}`, onClick: () => this.setState({ activeSwitch: Switch.year }) }, calFns.toDevanagariDigits(this.state.currentYear)),
            React.createElement("div", { className: `r-n-cal-monthBtn ${classes.btns} ${classes.btns}  ${this.state.activeSwitch == Switch.month ? classes.activeSwitch : ''}`, onClick: () => this.setState({ activeSwitch: Switch.month }) }, calendarData_1.default.bsMonths[this.state.currentMonth - 1]),
            React.createElement("div", { className: `r-n-cal-forwardBtn ${classes.btns} ${classes.forwardBtn}`, onClick: () => this.goForward() }, '>')));
    }
}
exports.default = react_jss_1.default(Calendar_css_1.styles)(YearMonthSwitch);
//# sourceMappingURL=YearMonthSwitch.js.map