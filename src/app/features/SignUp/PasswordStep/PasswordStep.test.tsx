import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PasswordStep from './PasswordStep';

describe('<PasswordStep />', () => {
  test('it should mount', () => {
    render(<PasswordStep />);
    
    const passwordStep = screen.getByTestId('PasswordStep');

    expect(passwordStep).toBeInTheDocument();
  });
});