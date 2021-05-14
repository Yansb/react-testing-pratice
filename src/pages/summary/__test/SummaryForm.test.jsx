import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { SummaryForm } from '../SummaryForm';

describe('Summary Form tests', () => {
  it('should render an unchecked checkbox', () => {
    render(<SummaryForm />);
    const button = screen.getByRole('button');

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    expect(checkbox).not.toBeChecked();

    expect(button).toBeDisabled();
  });

  it('should disable button on click to checkbox', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button');

    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  it('should responds to hover', async () => {
    render(<SummaryForm />);
    const nullPopOver = screen.queryByText(
      /no ice cream will actually be delivered/i,
    );

    expect(nullPopOver).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i,
    );
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    const nullPopOverAgain = screen.queryByText(
      /no icecream will actually be delivered/i,
    );

    expect(nullPopOverAgain).not.toBeInTheDocument();
  });
});
