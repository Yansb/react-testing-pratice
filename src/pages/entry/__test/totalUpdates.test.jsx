import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

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

describe('Grand total', () => {
  it('Should update total if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const cherriesCheckBox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');

    userEvent.click(cherriesCheckBox);

    expect(grandTotal).toHaveTextContent('3.50');
  });
  it('Should update total if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const cherriesCheckBox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent('1.50');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('3.50');
  });
  it('Should update total if item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const cherriesCheckBox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesCheckBox);
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');

    userEvent.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
