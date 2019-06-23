import React from 'react';

import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import MapContainer from './MapContainer';
// import NavigationItem from './NavigationItem/NavigationItem';

// configure({ adapter: new Adapter() });

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

// describe('<MapContainer />', () => {
//     let wrapper;

//     beforeEach(() => {
//         wrapper = shallow(<MapContainer />);
//     });

//     // it('should render two <NavigationItem /> elements if not authenticated', () => {
//     //     expect(wrapper.find(div)).toHaveLength(2);
//     // });

//     it('contains h4', () => {
//         // const wrapper = mount(<Profile user={user} />)
//         const value = wrapper.find('h4')
//         expect(value).toEqual('Your current location is')
//     })

//     // it('should render three <NavigationItem /> elements if authenticated', () => {
//     //     // wrapper = shallow(<NavigationItems isAuthenticated />);
//     //     // wrapper.setProps({isAuthenticated: true});
//     //     expect(wrapper.find(div)).toHaveLength(1);
//     // });

//     // it('should an exact logout button', () => {
//     //     wrapper.setProps({isAuthenticated: true});
//     //     expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
//     // });


//     it('renders a div', () => {
//         const wrapper = mount(<MapContainer />);
//         expect(wrapper.text()).toEqual('Loading...');
//     });
//     it('xxxxrenders a div', () => {
//         const wrapper = render(<MapContainer />);
//         expect(wrapper.html()).toContain('Loading...');
//     });
//     it('renders three <Foo /> components', () => {
//         const wrapper = shallow(<MapContainer />);
//         expect(wrapper.find('.container')).toHaveLength(0);
//     });

// });

jest.mock('./MapContainer');

it('renders a div', done => {
    const wrapper = mount(<MapContainer />);
    setTimeout(() => {
        wrapper.update();
        expect(wrapper.text()).toEqual('dd...');
        done();
    }, 12000);
});