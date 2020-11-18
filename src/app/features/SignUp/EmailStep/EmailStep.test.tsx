import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmailStep from './EmailStep';

describe('<EmailStep />', () => {
  test('it should mount', () => {
    render(<EmailStep />);
    
    const emailStep = screen.getByTestId('EmailStep');

    expect(emailStep).toBeInTheDocument();
  });
});