import * as React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../';

describe('Index', () => {
  it('should have text: Baishakh, Jesth, Asadh', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper.text()).toBe('Baishakh, Jesth, Asadh');
  });
});