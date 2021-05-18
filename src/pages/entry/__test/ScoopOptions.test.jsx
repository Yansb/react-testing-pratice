import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '../../../test-utils/testing-library-utils';
import ScoopOptions from '../ScoopOptions';

describe('Scoop options test', () => {
  it('Should indicate if scoop count is non-int or out of range ', () => {
    render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />);

    const vanillaInput = screen.getByRole('spinbutton');
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '-1');
    expect(vanillaInput).toHaveClass('is-invalid');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2.5');
    expect(vanillaInput).toHaveClass('is-invalid');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '11');
    expect(vanillaInput).toHaveClass('is-invalid');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '3');
    expect(vanillaInput).not.toHaveClass('is-invalid');
  });
});
