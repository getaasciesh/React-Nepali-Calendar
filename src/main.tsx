import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Calendar from './components/Calendar';

class Main extends React.Component {
  render() {
    return (
      <Calendar className="myReactCalendar"/>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('gallery-root')
);