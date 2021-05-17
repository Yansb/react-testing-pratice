import React, { useState } from 'react';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';

export function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setOrderPhase('completed');
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="top"
        overlay={popover}
      >
        <a href="www.google.com">Terms and Conditions</a>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={() => setTcChecked(!tcChecked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
