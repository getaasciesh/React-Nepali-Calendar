"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendarFunctions = require("../calendarFunctions");
describe('Calendar functions', () => {
    it('should correctly convert roman numbers to devanagari', () => {
        expect(calendarFunctions.toDevanagariDigits(909)).toBe('९०९');
        expect(calendarFunctions.toDevanagariDigits(87641)).toBe('८७६४१');
        expect(calendarFunctions.toDevanagariDigits(53592)).toBe('५३५९२');
    });
    it('should get correct number of days for a given bs month', () => {
        expect(calendarFunctions.getBsMonthDays(2075, 3)).toBe(32);
        expect(calendarFunctions.getBsMonthDays(2078, 6)).toBe(31);
        expect(calendarFunctions.getBsMonthDays(2067, 8)).toBe(29);
        expect(calendarFunctions.getBsMonthDays(2046, 9)).toBe(29);
        expect(calendarFunctions.getBsMonthDays(2074, 2)).toBe(31);
        expect(calendarFunctions.getBsMonthDays(2076, 7)).toBe(30);
        expect(calendarFunctions.getBsMonthDays(2075, 1)).toBe(31);
        expect(calendarFunctions.getBsMonthDays(2077, 5)).toBe(31);
    });
    it('should correctly convert ad date to bs date', () => {
        expect(calendarFunctions.getBsDateByAdDate(2018, 7, 7)).
            toEqual({ "bsDate": 23, "bsMonth": 3, "bsYear": 2075 });
        expect(calendarFunctions.getBsDateByAdDate(2018, 8, 18)).
            toEqual({ "bsDate": 2, "bsMonth": 5, "bsYear": 2075 });
        expect(calendarFunctions.getBsDateByAdDate(2018, 9, 10)).
            toEqual({ "bsDate": 25, "bsMonth": 5, "bsYear": 2075 });
        expect(calendarFunctions.getBsDateByAdDate(2018, 12, 30)).
            toEqual({ "bsDate": 15, "bsMonth": 9, "bsYear": 2075 });
        expect(calendarFunctions.getBsDateByAdDate(2019, 1, 1)).
            toEqual({ "bsDate": 17, "bsMonth": 9, "bsYear": 2075 });
        expect(calendarFunctions.getBsDateByAdDate(2019, 6, 23)).
            toEqual({ "bsDate": 8, "bsMonth": 3, "bsYear": 2076 });
        expect(calendarFunctions.getBsDateByAdDate(2025, 9, 11)).
            toEqual({ "bsDate": 26, "bsMonth": 5, "bsYear": 2082 });
        expect(calendarFunctions.getBsDateByAdDate(2028, 3, 13)).
            toEqual({ "bsDate": 30, "bsMonth": 11, "bsYear": 2084 });
        expect(calendarFunctions.getBsDateByAdDate(2017, 4, 13)).
            toEqual({ "bsDate": 31, "bsMonth": 12, "bsYear": 2073 });
    });
    it('should correctly convert bs date to ad date', () => {
        expect(calendarFunctions.getAdDateByBsDate(2076, 3, 8)).
            toEqual(new Date(2019, 5, 23));
        expect(calendarFunctions.getAdDateByBsDate(2075, 4, 1)).
            toEqual(new Date(2018, 6, 17));
        expect(calendarFunctions.getAdDateByBsDate(2075, 5, 7)).
            toEqual(new Date(2018, 7, 23));
        expect(calendarFunctions.getAdDateByBsDate(2075, 7, 19)).
            toEqual(new Date(2018, 10, 5));
        expect(calendarFunctions.getAdDateByBsDate(2075, 11, 1)).
            toEqual(new Date(2019, 1, 13));
        expect(calendarFunctions.getAdDateByBsDate(2076, 1, 23)).
            toEqual(new Date(2019, 4, 6));
        expect(calendarFunctions.getAdDateByBsDate(2076, 2, 29)).
            toEqual(new Date(2019, 5, 12));
        expect(calendarFunctions.getAdDateByBsDate(2083, 6, 16)).
            toEqual(new Date(2026, 9, 2));
        expect(calendarFunctions.getAdDateByBsDate(2087, 8, 18)).
            toEqual(new Date(2030, 11, 4));
        expect(calendarFunctions.getAdDateByBsDate(2073, 12, 31)).
            toEqual(new Date(2017, 3, 13));
    });
});
//# sourceMappingURL=calendarFunctions.js.map