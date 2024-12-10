import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const IATAForm = () => {
  return (
    <Row className="w-100 d-flex justify-content-center">
      <Col xs={11} sm={8} md={6} lg={4} className="p-4 bg-dark rounded">
        <Form>
          <Form.Group>
            <h3 className="text-center mb-4 text-white">Enter the following:</h3>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGroupDeparture">
            <Form.Control
              type="text"
              placeholder="IATA code of airport of departure"
              className="p-2"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGroupArrival">
            <Form.Control
              type="text"
              placeholder="IATA code of airport of arrival"
              className="p-2"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="danger" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default IATAForm;
