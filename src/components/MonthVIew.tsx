
import styles from './Calendar.css';

import * as React from 'react';
import calendarData from '../functions/calendarData';
import * as calFns from '../functions/calendarFunctions';

interface MonthViewProps {
  onDayClicked: (date: Date) => void
  viewBsYear: number
  viewBsMonth: number
  defaultActiveDate: Date
}

interface MonthViewState {
  selectedDate: Date;
}

class MonthView extends React.Component<MonthViewProps, MonthViewState> {

  public state = { selectedDate: new Date() };

  private getDayInfo(date: Date) {
    const bsDate = calFns.getBsDateByAdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return { adDate: new Date(date), ...(bsDate) }
  }

  private getDays() {
    let startDay, lastDay;
    const { viewBsMonth, viewBsYear } = this.props;
    startDay = calFns.getAdDateByBsDate(viewBsYear, viewBsMonth, 1);
    startDay.setDate(startDay.getDate() - startDay.getDay()); // Sunday, the first day in the view
    lastDay = calFns.getAdDateByBsDate(viewBsYear, viewBsMonth, calFns.getBsMonthDays(viewBsYear, viewBsMonth));
    lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // Saturday, the last day in the view
    const days = [];
    while (startDay <= lastDay) {
      days.push(this.getDayInfo(startDay));
      startDay.setDate(startDay.getDate() + 1)
    }
    return days;
  }

  private isSameDate(adDate: Date, toMatch: Date = new Date()) {
    return adDate.getDate() == toMatch.getDate() &&
      adDate.getMonth() == toMatch.getMonth() &&
      adDate.getFullYear() == toMatch.getFullYear();
  }

  private onDaySelect(date: Date) {
    this.setState({ selectedDate: date });
    this.props.onDayClicked(date);
  }

  public render(): JSX.Element {
    return (
      <div className={`r-n-cal-month-view ${styles.calendar}`}>
        <div className={`r-n-cal-weekdays ${styles.weekdays}`}>
          {
            calendarData.bsDays.map((day) => (
              <div key={day} className={styles.weekday}>{day}</div>
            ))
          }
        </div>
        <div className={styles.days}>
          {
            this.getDays().map(({ adDate, bsDate, bsMonth }) => (
              <div
                className={
                  `${styles.day} ${bsMonth !== this.props.viewBsMonth ? styles.dayMuted : ''} 
                  ${this.isSameDate(adDate) ? styles.today : ''} 
                  ${this.isSameDate(adDate, this.state.selectedDate) ? styles.selectedDay : ''} 
                  `
                }
                key={`${bsDate} ${bsMonth}`}
                onClick={() => this.onDaySelect(adDate)}>
                {calFns.toDevanagariDigits(bsDate)}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default MonthView;