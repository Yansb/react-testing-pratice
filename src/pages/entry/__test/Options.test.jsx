import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

describe('Options test', () => {
  it('should displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  it('should display image for each tooping option from the server', async () => {
    render(<Options optionType="toppings" />, {
      wrapper: OrderDetailsProvider,
    });

    const toopingsImages = await screen.findAllByRole('img', {
      name: /toopings$/i,
    });
    expect(toopingsImages).toHaveLength(3);

    const altText = toopingsImages.map((element) => element.alt);
    expect(altText).toEqual([
      'Cherries toopings',
      'M&Ms toopings',
      'Hot fudge toopings',
    ]);
  });

  it('should not update total if scoops input is invalid', async () => {
    render(<Options optionType="scoops" />);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '-1');

    const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsSubtotal).toBeInTheDocument();
  });
});
