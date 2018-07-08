"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendarData_1 = require("./calendarData");
exports.toDevanagariDigits = (number) => {
    return String(number).split('').map((ed) => calendarData_1.default.nepaliNumbers[Number(ed)]).join('');
};
exports.getTotalDaysNumFromMinBsYear = (bsYear, bsMonth, bsDate) => {
    if (bsYear < calendarData_1.default.minBsYear || bsYear > calendarData_1.default.maxBsYear) {
        return null;
    }
    let daysNumFromMinBsYear = 0;
    const diffYears = bsYear - calendarData_1.default.minBsYear;
    for (let month = 1; month <= 12; month++) {
        if (month < bsMonth) {
            daysNumFromMinBsYear += exports.getMonthDaysNumFormMinBsYear(month, diffYears + 1);
        }
        else {
            daysNumFromMinBsYear += exports.getMonthDaysNumFormMinBsYear(month, diffYears);
        }
    }
    if (bsYear > 2085 && bsYear < 2088) {
        daysNumFromMinBsYear += bsDate - 2;
    }
    else if (bsYear === 2085 && bsMonth > 5) {
        daysNumFromMinBsYear += bsDate - 2;
    }
    else if (bsYear > 2088) {
        daysNumFromMinBsYear += bsDate - 4;
    }
    else if (bsYear === 2088 && bsMonth > 5) {
        daysNumFromMinBsYear += bsDate - 4;
    }
    else {
        daysNumFromMinBsYear += bsDate;
    }
    return daysNumFromMinBsYear;
};
exports.getMonthDaysNumFormMinBsYear = (bsMonth, yearDiff) => {
    let yearCount = 0;
    let monthDaysFromMinBsYear = 0;
    if (yearDiff === 0)
        return 0;
    const bsMonthData = calendarData_1.default.extractedBsMonthData[bsMonth - 1];
    for (let i = 0; i < bsMonthData.length; i++) {
        if (bsMonthData[i] === 0) {
            continue;
        }
        const bsMonthUpperDaysIndex = i % 2;
        if (yearDiff > yearCount + bsMonthData[i]) {
            yearCount += bsMonthData[i];
            monthDaysFromMinBsYear += calendarData_1.default.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * bsMonthData[i];
        }
        else {
            monthDaysFromMinBsYear += calendarData_1.default.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * (yearDiff - yearCount);
            yearCount = yearDiff - yearCount;
            break;
        }
    }
    return monthDaysFromMinBsYear;
};
exports.getBsMonthDays = (bsYear, bsMonth) => {
    let yearCount = 0;
    const totalYears = (bsYear + 1) - calendarData_1.default.minBsYear;
    const bsMonthData = calendarData_1.default.extractedBsMonthData[bsMonth - 1];
    for (let i = 0; i < bsMonthData.length; i++) {
        if (bsMonthData[i] === 0) {
            continue;
        }
        const bsMonthUpperDaysIndex = i % 2;
        yearCount += bsMonthData[i];
        if (totalYears <= yearCount) {
            if ((bsYear === 2085 && bsMonth === 5) || (bsYear === 2088 && bsMonth === 5)) {
                return calendarData_1.default.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 2;
            }
            else {
                return calendarData_1.default.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex];
            }
        }
    }
    return null;
};
exports.convertADtoBS = (adYear, adMonth, adDate) => {
    let bsYear = adYear + 57;
    let bsMonth = (adMonth + 9) % 12;
    bsMonth = bsMonth === 0 ? 12 : bsMonth;
    let bsDate = 1;
    if (adMonth < 4) {
        bsYear -= 1;
    }
    const bsMonthFirstAdDate = exports.convertBStoAD(bsYear, bsMonth, 1);
    if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
        if (adMonth === 4) {
            const bsYearFirstAdDate = exports.convertBStoAD(bsYear, 1, 1);
            if (adDate < bsYearFirstAdDate.getDate()) {
                bsYear -= 1;
            }
        }
        bsMonth = (bsMonth !== 1) ? bsMonth - 1 : 12;
        const bsMonthDays = exports.getBsMonthDays(bsYear, bsMonth);
        bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
    }
    else {
        bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
    }
    return { bsYear, bsMonth, bsDate };
};
exports.convertBStoAD = (bsYear, bsMonth, bsDate) => {
    const daysNumFromMinBsYear = exports.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
    const adDate = new Date(calendarData_1.default.minAdDateEqBsDate.ad.year, calendarData_1.default.minAdDateEqBsDate.ad.month, calendarData_1.default.minAdDateEqBsDate.ad.date - 1);
    adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
    return adDate;
};
//# sourceMappingURL=calendarFunctions.js.map