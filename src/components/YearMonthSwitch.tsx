import * as React from 'react';
import { styles } from './styles';
import calendarData from '../functions/calendarData';
import * as calFns from '../functions/calendarFunctions';
import injectSheet from 'react-jss';

enum Switch { month, year }

export interface YearMonthSwitchProps {
  onSwitch: (year: number, month: number) => void
  defaultYear: number;
  defaultMonth: number;
  classes: any;
}

export interface YearMonthSwitchState {
  currentYear: number;
  currentMonth: number;
  activeSwitch: Switch;
}

class YearMonthSwitch extends React.Component<YearMonthSwitchProps, YearMonthSwitchState> {

  constructor(props) {
    super(props);
    this.state = {
      currentYear: props.defaultYear,
      currentMonth: props.defaultMonth,
      activeSwitch: Switch.month
    }
  }

  private setCurrent(currentYear = this.state.currentYear, currentMonth = this.state.currentMonth) {
    this.setState({ currentMonth, currentYear });
    this.props.onSwitch(currentYear, currentMonth);
  }

  private goBack() {
    if (this.state.activeSwitch === Switch.year && calendarData.minBsYear < this.state.currentYear) {
      this.setCurrent(this.state.currentYear - 1);
    }
    if (this.state.activeSwitch === Switch.month) {
      let currentMonth = this.state.currentMonth - 1;
      let currentYear = this.state.currentYear;
      if (currentMonth == 0) {
        currentMonth = 12;
        currentYear = this.state.currentYear - 1;
      }
      if (calendarData.minBsYear <= currentYear) {
        this.setCurrent(currentYear, currentMonth);
      }
    }
  }

  private goForward() {
    if (this.state.activeSwitch === Switch.year && calendarData.maxBsYear > this.state.currentYear) {
      this.setCurrent(this.state.currentYear + 1);
    }
    if (this.state.activeSwitch === Switch.month) {
      let currentMonth = this.state.currentMonth + 1;
      let currentYear = this.state.currentYear;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear = this.state.currentYear + 1;
      }
      if (calendarData.maxBsYear >= currentYear) {
        this.setCurrent(currentYear, currentMonth);
      }
    }
  }

  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={`r-n-cal-switch ${classes.switch}`}>
        <div className={`r-n-cal-backBtn ${classes.btns} ${classes.backBtn}`} onClick={() => this.goBack()}>{'<'}</div>
        <div className={`r-n-cal-yearBtn ${classes.btns} ${classes.btns} ${this.state.activeSwitch == Switch.year ? classes.activeSwitch : ''}`}
          onClick={() => this.setState({ activeSwitch: Switch.year })}>
          {calFns.toDevanagariDigits(this.state.currentYear)}
        </div>
        <div className={`r-n-cal-monthBtn ${classes.btns} ${classes.btns}  ${this.state.activeSwitch == Switch.month ? classes.activeSwitch : ''}`}
          onClick={() => this.setState({ activeSwitch: Switch.month })}>
          {calendarData.bsMonths[this.state.currentMonth - 1]}
        </div>
        <div className={`r-n-cal-forwardBtn ${classes.btns} ${classes.forwardBtn}`} onClick={() => this.goForward()}>{'>'}</div>
      </div>
    );
  }
}

export default injectSheet(styles)(YearMonthSwitch);