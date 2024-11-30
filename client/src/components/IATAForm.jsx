import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const IATAForm = () => {
  return (
    <Form className="p-4 bg-dark rounded d-flex flex-column align-items-center" style={{ width: '400px' }}>
      <Form.Group>
        <h3 className="text-center mb-4 text-white">Enter the following:</h3>
      </Form.Group>
      <Form.Group className="mb-4 w-100" controlId="formGroupEmail">
        <Form.Control 
          type="text" 
          placeholder="IATA code of airport of departure" 
          className="p-2" 
        />
      </Form.Group>
      <Form.Group className="mb-4 w-100" controlId="formGroupPassword">
        <Form.Control 
          type="text" 
          placeholder="IATA code of airport of arrival" 
          className="p-2" 
        />
      </Form.Group>
      <Button 
        variant="danger" 
        type="submit" 
        className="w-50"
      >
        Submit
      </Button>
    </Form>
  );
};

export default IATAForm;
