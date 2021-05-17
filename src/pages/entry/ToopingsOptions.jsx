import React from 'react';
import { Col, Form } from 'react-bootstrap';

export function ToopingOptions({ name, imagePath, updateItemCount }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} toopings`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
          label={name}
        />
      </Form.Group>
    </Col>
  );
}
