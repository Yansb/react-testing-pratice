import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  const cherriesCheckBox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  userEvent.click(cherriesCheckBox);

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae!/i,
  });
  userEvent.click(orderSummaryButton);
  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', {
    name: 'Order Summary',
  });
  expect(summaryHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const terms = screen.getByRole('checkbox', { name: /terms and conditions/i });
  userEvent.click(terms);

  const confirmationButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmationButton);
  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = screen.getByRole('button', { name: /new order/i });
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrder = screen.getByRole('button', {
    name: /new order/i,
  });
  userEvent.click(newOrder);
  // check that scoops and toppings subtotals have been reset
  expect(screen.getByText('Scoops total: $0.00')).toBeInTheDocument();
  expect(screen.getByText('Toppings total: $0.00')).toBeInTheDocument();

  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});
