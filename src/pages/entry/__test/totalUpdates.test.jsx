import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
test('Update toppings subtotal when checkbox marked', async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const cherriesCheckBox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  const mAndMCheckBox = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  });

  userEvent.click(cherriesCheckBox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  userEvent.click(mAndMCheckBox);

  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(mAndMCheckBox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});
