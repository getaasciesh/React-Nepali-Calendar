## Intro
Simple React Nepali Calendar component with couple of handy BS-AD coverter functions.


![alt text](https://raw.githubusercontent.com/getaasciesh/ReactNepaliCalendar/master/screenshot.png)

## Installation

```
yarn add react-nepali-calendar
```
or
```
npm install --save react-nepali-calendar
```

## Usage

```
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Calendar from 'react-nepali-calendar';

export default class Main extends React.Component {
  render() {
    return (
      <Calendar onChange={(date) => console.log('New date selected: ', date)}/>
    );
  }
}
```

### Calendar Methods
#### convert AD To BS: CalendarFunctions.convertADtoBS(adYear, adMonth: 1..12, adDate) 
```
import { CalendarFunctions } from 'react-nepali-calendar';

const bsDate = CalendarFunctions.convertADtoBS(2018, 9, 10);
// bsDate == { "bsDate": 25, "bsMonth": 5, "bsYear": 2075 }
```

#### convert BS to AD
```
import { CalendarFunctions } from 'react-nepali-calendar';

const adDate = CalendarFunctions.convertBStoAD(2076, 2, 29);
// adDate == new Date(2019, 5, 12)
```

## Testing
To test clone the repo and run:
```
npm test
```

## License
React Nepali Calendar is released under the MIT license.

