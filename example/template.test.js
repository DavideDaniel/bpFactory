import { shallow } from 'enzyme';
import { expect } from 'chai';
import component from './component';

describe('component', function () {
  it('should render just fine', function () {
    const wrapper = shallow(<component />);
    wrapper.is(component);
    expect(wrapper.find('div')).to.have.length(1);
  });
});
