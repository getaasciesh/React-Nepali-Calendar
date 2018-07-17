
import * as React from 'react';
import { mount } from 'enzyme';
import Calendar from '../Calendar';

describe('Index', () => {
  it('should display correct set of dates', () => {
    const date = new Date(2018, 6, 8);
    const wrapper = mount(<Calendar defaultDate={date} />);
    expect(wrapper.text()).toContain('२०७५आषाढ');
    expect(wrapper.text()).toContain('२७२८२९३०३११२३४५६७८९१०१११२१३१४१५१६१७१८१९२०२१२२२३२४२५२६२७२८२९३०३१३२१२३४५');
  });

  it('should display correct set of dates for the next month when forwardBtn is clicked', () => {
    const date = new Date(2018, 6, 8);
    const wrapper = mount(<Calendar defaultDate={date} />);
    wrapper.find('.r-n-cal-forwardBtn').simulate('click');
    expect(wrapper.text()).toContain('२०७५श्रावण');
    expect(wrapper.text()).toContain('३१३२१२३४५६७८९१०१११२१३१४१५१६१७१८१९२०२१२२२३२४२५२६२७२८२९३०३११२');
  });

  it('should display correct set of dates for the previous month when backBtn is clicked', () => {
    const date = new Date(2018, 6, 8);
    const wrapper = mount(<Calendar defaultDate={date} />);
    wrapper.find('.r-n-cal-backBtn').simulate('click');
    expect(wrapper.text()).toContain('२०७५जेठ');
    expect(wrapper.text()).toContain('३०३११२३४५६७८९१०१११२१३१४१५१६१७१८१९२०२१२२२३२४२५२६२७२८२९३०३११२');
  });

  it('should allow switching a year a back and show correct set of dates for the year and the month', () => {
    const date = new Date(2018, 6, 8);
    const wrapper = mount(<Calendar defaultDate={date} />);
    wrapper.find('.r-n-cal-yearBtn').simulate('click');
    wrapper.find('.r-n-cal-backBtn').simulate('click');
    expect(wrapper.text()).toContain('२०७४आषाढ');
    expect(wrapper.text()).toContain('२८२९३०३११२३४५६७८९१०१११२१३१४१५१६१७१८१९२०२१२२२३२४२५२६२७२८२९३०३१');
  });

  it('should allow switching 2 years and 3 months forward and show correct set of dates for the year and the month', () => {
    const date = new Date(2018, 6, 8);
    const wrapper = mount(<Calendar defaultDate={date} />);
    wrapper.find('.r-n-cal-yearBtn').simulate('click');
    wrapper.find('.r-n-cal-forwardBtn').simulate('click').simulate('click');
    wrapper.find('.r-n-cal-monthBtn').simulate('click');
    wrapper.find('.r-n-cal-forwardBtn').simulate('click').simulate('click').simulate('click');
    expect(wrapper.text()).toContain('२०७७असोज');
    expect(wrapper.text()).toContain('२८२९३०३११२३४५६७८९१०१११२१३१४१५१६१७१८१९२०२१२२२३२४२५२६२७२८२९३०१');
  });
});