/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Container from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';

import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <div>
        <Component setOrderPhase={setOrderPhase} />
      </div>
    </OrderDetailsProvider>
  );
}

export default App;
