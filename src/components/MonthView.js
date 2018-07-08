"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Calendar_css_1 = require("./Calendar.css");
const React = require("react");
const calendarData_1 = require("../functions/calendarData");
const calFns = require("../functions/calendarFunctions");
class MonthView extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { selectedDate: new Date() };
    }
    getDayInfo(date) {
        const bsDate = calFns.getBsDateByAdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return Object.assign({ adDate: new Date(date) }, (bsDate));
    }
    getDays() {
        let startDay, lastDay;
        const { viewBsMonth, viewBsYear } = this.props;
        startDay = calFns.getAdDateByBsDate(viewBsYear, viewBsMonth, 1);
        startDay.setDate(startDay.getDate() - startDay.getDay()); // Sunday, the first day in the view
        lastDay = calFns.getAdDateByBsDate(viewBsYear, viewBsMonth, calFns.getBsMonthDays(viewBsYear, viewBsMonth));
        lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // Saturday, the last day in the view
        const days = [];
        while (startDay <= lastDay) {
            days.push(this.getDayInfo(startDay));
            startDay.setDate(startDay.getDate() + 1);
        }
        return days;
    }
    isSameDate(adDate, toMatch = new Date()) {
        return adDate.getDate() == toMatch.getDate() &&
            adDate.getMonth() == toMatch.getMonth() &&
            adDate.getFullYear() == toMatch.getFullYear();
    }
    onDaySelect(date) {
        this.setState({ selectedDate: date });
        this.props.onDayClicked(date);
    }
    render() {
        return (React.createElement("div", { className: `r-n-cal-month-view ${Calendar_css_1.default.calendar}` },
            React.createElement("div", { className: `r-n-cal-weekdays ${Calendar_css_1.default.weekdays}` }, calendarData_1.default.bsDays.map((day) => (React.createElement("div", { key: day, className: Calendar_css_1.default.weekday }, day)))),
            React.createElement("div", { className: Calendar_css_1.default.days }, this.getDays().map(({ adDate, bsDate, bsMonth }) => (React.createElement("div", { className: `${Calendar_css_1.default.day} ${bsMonth !== this.props.viewBsMonth ? Calendar_css_1.default.dayMuted : ''} 
                  ${this.isSameDate(adDate) ? Calendar_css_1.default.today : ''} 
                  ${this.isSameDate(adDate, this.state.selectedDate) ? Calendar_css_1.default.selectedDay : ''} 
                  `, key: `${bsDate} ${bsMonth}`, onClick: () => this.onDaySelect(adDate) }, calFns.toDevanagariDigits(bsDate)))))));
    }
}
exports.default = MonthView;
//# sourceMappingURL=MonthView.js.map