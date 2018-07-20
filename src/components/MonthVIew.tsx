
import { styles } from './styles';
import * as React from 'react';
import calendarData from '../functions/calendarData';
import * as calFns from '../functions/calendarFunctions';
import injectSheet from 'react-jss';

interface MonthViewProps {
  onDayClicked: (date: Date) => void
  viewBsYear: number
  viewBsMonth: number
  defaultActiveDate: Date
  classes: any
}

interface MonthViewState {
  selectedDate: Date;
}

class MonthView extends React.Component<MonthViewProps, MonthViewState> {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.defaultActiveDate || new Date()
    }
  }

  private getDayInfo(date: Date) {
    const bsDate = calFns.convertADtoBS(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return { adDate: new Date(date), ...(bsDate) }
  }

  private getDays() {
    let startDay, lastDay;
    const { viewBsMonth, viewBsYear } = this.props;
    startDay = calFns.convertBStoAD(viewBsYear, viewBsMonth, 1);
    startDay.setDate(startDay.getDate() - startDay.getDay()); // Sunday, the first day in the view
    lastDay = calFns.convertBStoAD(viewBsYear, viewBsMonth, calFns.getBsMonthDays(viewBsYear, viewBsMonth));
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
    const { classes } = this.props;
    return (
      <div className={`r-n-cal-month-view ${classes.calendar}`}>
        <div className={`r-n-cal-weekdays ${classes.weekdays}`}>
          {
            calendarData.bsDays.map((day) => (
              <div key={day} className={classes.weekday}>{day}</div>
            ))
          }
        </div>
        <div className={`r-n-cal-days ${classes.days}`}>
          {
            this.getDays().map(({ adDate, bsDate, bsMonth }, i) => (
              <div
                className={
                  `r-n-cal-day 
                  ${i % 7 == 6 ? classes.weekend : ''}
                  ${classes.day} ${bsMonth !== this.props.viewBsMonth ? classes.dayMuted : ''} 
                  ${this.isSameDate(adDate) ? classes.today : ''} 
                  ${this.isSameDate(adDate, this.state.selectedDate) ? classes.selectedDay : ''} 
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

export default injectSheet(styles)(MonthView);