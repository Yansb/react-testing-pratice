/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { SummaryForm } from './pages/summary/SummaryForm';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const [disabled, setDisabled] = useState(false);

  // eslint-disable-next-line prettier/prettier
  const newButtonColor = buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  return (
    <div>
      <SummaryForm />
      <button
        style={{ backgroundColor: disabled ? 'gray' : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
        type="button"
      >
        Change to
        {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
