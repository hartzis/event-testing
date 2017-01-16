import React from 'react';
import EventComponent from './EventComponent';
import { mount } from 'enzyme';

describe('EventComponent', () => {

  it('should render the component', ()=>{
    const component = mount((<EventComponent />));
  });

  it('should calculate when swiped', ()=>{
    const component = mount((<EventComponent />));
    expect(component.text()).toEqual('Component-');
    component.simulate('touchStart', createStartTouchEventObject({ x: 100, y: 0 }));
    component.simulate('touchMove', createMoveTouchEventObject({ x: 150, y: 0 }));
    component.simulate('touchEnd', createMoveTouchEventObject({ x: 200, y: 0 }));
    expect(component.text()).toEqual('Component-swiped');
  });

  it('should call onSwiped when swiped', ()=>{
    const onSwiped = jest.fn();
    const component = mount((<EventComponent onSwiped={onSwiped} />));
    component.simulate('touchStart', createStartTouchEventObject({ x: 100, y: 0 }));
    component.simulate('touchMove', createMoveTouchEventObject({ x: 150, y: 0 }));
    component.simulate('touchEnd', createMoveTouchEventObject({ x: 200, y: 0 }));
    expect(onSwiped).toHaveBeenCalled();
  });

});

function createClientXY(x, y) {
  return { clientX: x, clientY: y };
}

function createStartTouchEventObject({ x = 0, y = 0 }) {
  return { touches: [createClientXY(x, y)] };
}

function createMoveTouchEventObject({ x = 0, y = 0}) {
  return { changedTouches: [createClientXY(x, y)] };
}
