import React, { useState } from 'react';
import {Button, Form} from "react-bootstrap";


export function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <a>Terms and Conditions</a>
    </span>
  )
  return(
    <Form>
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
