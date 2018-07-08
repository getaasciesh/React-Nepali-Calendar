"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const calF = require("../functions/calendarFunctions");
const MonthView_1 = require("./MonthView");
const YearMonthSwitch_1 = require("./YearMonthSwitch");
class Calendar extends React.Component {
    constructor(props, state) {
        super(props, state);
        const date = props.defaultDate || new Date();
        this.state = {
            activeDate: date,
            activeBsDate: calF.convertADtoBS(date.getFullYear(), date.getMonth(), date.getDay())
        };
    }
    switchViewsYearMonth(year, month) {
        this.setState({
            activeBsDate: { bsYear: year, bsMonth: month, bsDate: this.state.activeBsDate.bsDate }
        });
    }
    render() {
        const { bsYear, bsMonth } = this.state.activeBsDate;
        return (React.createElement("div", null,
            React.createElement(YearMonthSwitch_1.default, { defaultMonth: bsMonth, defaultYear: bsYear, onSwitch: (year, month) => this.switchViewsYearMonth(year, month) }),
            React.createElement(MonthView_1.default, { viewBsYear: bsYear, viewBsMonth: bsMonth, defaultActiveDate: this.state.activeDate, onDayClicked: (date) => { this.props.onChange && this.props.onChange(date); } })));
    }
}
exports.default = Calendar;
//# sourceMappingURL=Calendar.js.map