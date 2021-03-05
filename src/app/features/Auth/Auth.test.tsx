import { Input } from '@material-ui/core';
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Auth } from './Auth';


describe('<Auth />', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn((msg) => {
      if (msg.includes('Warning: useLayoutEffect does nothing on the server')) {
        return null;
      } else {
        originalConsoleError(msg);
      }
    });
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  const container = shallow(<BrowserRouter><Auth /></BrowserRouter>);
  test('it should mount', () => {
    expect(container.html()).toMatchSnapshot();
  });

  test('it should mount input', () => {
    const auth = container.find(Auth).dive();
    console.log(auth.find(Input)?.length)
    console.log(container.html(), auth)
    expect(auth?.length).toEqual(1);
  });
});