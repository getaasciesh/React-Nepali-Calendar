import * as React from 'react';
import * as calF from '../functions/calendarFunctions';
import MonthView from './MonthView';
import YearMonthSwitch from './YearMonthSwitch';

export interface CalendarProps {
  defaultDate?: Date
  onChange?: (date: Date) => void;
}

export interface CalendarStates {
  activeDate: Date
  activeBsDate: { bsYear: number, bsMonth: number, bsDate: number }
}

class Calendar extends React.Component<CalendarProps, CalendarStates> {

  public constructor(props, state) {
    super(props, state);
    const date = props.defaultDate || new Date();
    this.state = {
      activeDate: date,
      activeBsDate: calF.convertADtoBS(date.getFullYear(), date.getMonth(), date.getDay())
    }
  }

  private switchViewsYearMonth(year, month) {
    this.setState({
      activeBsDate: { bsYear: year, bsMonth: month, bsDate: this.state.activeBsDate.bsDate }
    });
  }

  public render(): JSX.Element {
    const { bsYear, bsMonth } = this.state.activeBsDate;
    return (
      <div>
        <YearMonthSwitch
          defaultMonth={bsMonth}
          defaultYear={bsYear} onSwitch={(year, month) => this.switchViewsYearMonth(year, month)} />
        <MonthView
          viewBsYear={bsYear}
          viewBsMonth={bsMonth}
          defaultActiveDate={this.state.activeDate}
          onDayClicked={(date) => { this.props.onChange && this.props.onChange(date) }} />
      </div>
    );
  }
}

export default Calendar;