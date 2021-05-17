/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Container from 'react-bootstrap';
import OrderEntry, { OrderDetailsProvider } from './contexts/OrderDetails';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
