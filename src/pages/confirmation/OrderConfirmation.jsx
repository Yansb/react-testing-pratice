import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AlertBanner from '../common/AlertBanner';

import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch(() => {
        setError(true);
      });
  }, []);

  function handleClick() {
    resetOrder();

    setOrderPhase('inProgress');
  }

  if (error) {
    return <AlertBanner message={null} variant={null} />;
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  }
  return <div>Loading</div>;
}
