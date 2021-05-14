import { render, screen } from '@testing-library/react';
import React from 'react';

import Options from '../Options';

describe('Options test', () => {
  it('should displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });
});
