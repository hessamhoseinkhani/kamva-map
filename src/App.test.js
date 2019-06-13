import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { handleLocation } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('handleLocation ', () => {
  const testInput = {
    lat: 48.8583701,
    lng: 2.2922926
  }
  expect(handleLocation(testInput)).toBe();
});
