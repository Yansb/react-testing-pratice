import { rest } from 'msw';
import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  screen,
  waitFor,
  render,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';

describe('Order Entry tests', () => {
  it('should handle error for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
        res(ctx.status(500)),
      ),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
        res(ctx.status(500)),
      ),
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });

  it('should disable button when no scoops are selected', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    const orderButton = screen.getByRole('button', { name: /order sundae!/i });
    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(orderButton).toBeEnabled();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');
    expect(orderButton).toBeDisabled();
  });
});
