import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import MapContainer from './MapContainer';




Enzyme.configure({
    adapter: new EnzymeAdapter()
});

describe('<MapContainer />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<MapContainer />);
    });

    it('renders a div', () => {
        const wrapper = mount(<MapContainer />);
        expect(wrapper.text()).toEqual('Loading...');
    });

    //     it('contains h4', () => {
    //         const value = wrapper.find('h4')
    //         expect(value).toEqual('Your current location is')
    //     })

});
