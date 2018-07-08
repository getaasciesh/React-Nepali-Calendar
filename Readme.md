## Intro
Simple React Nepali Calendar component.

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

## Testing
To test clone the repo and run:
```
npm test
```

## License
React Nepali Calendar is released under the MIT license.

