import { MockedProvider } from '@apollo/client/testing';
import { wait } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FormField } from '../../../shared/components/FormField';
import { SignUp } from './SignUp';

const mocks: any[] = [];
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
}));

describe('<SignUp />', () => {
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

  const container = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </MockedProvider>
  );

  const form = container.find('form');

  test('it should mount', () => {
    expect(container.html()).toMatchSnapshot();
  });

  test('it should show signUp form', () => {
    expect(container.find('h2').first().text()).toEqual('auth.signUp.title');
    expect(container.find('form').length).toEqual(1);
  });

  test('it should check mandatory fields', async () => {
    // Simulate submit
    form.simulate('submit');
    await wait();
    container.update();

    // Check errors
    // All fields mandatory
    container.find(FormField).forEach(wrapper => {
      expect(wrapper.props()).toEqual(
        expect.objectContaining({
          error: true,
          helperText: 'common.errors.requiredField'
        })
      );
    })
  });

  test('it should check email format', async () => {
    container.find('input[name="email"]').first().simulate('change', {
      target: { value: 'wrong@email.' }
    });
    // Simulate submit
    form.simulate('submit');
    await wait();
    container.update();

    // Check errors
    expect(container.find(FormField).first().props()).toEqual(
      expect.objectContaining({
        error: true,
        helperText: 'common.errors.invalidField'
      })
    );
  });

});
