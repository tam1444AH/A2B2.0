import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const HotelsForm = () => {
  return (
    <Container>
        <Col xs={12} sm={10} md={8} lg={6} className="p-4 bg-dark rounded mb-4 mx-auto">
            <Form>
                <Form.Group>
                    <h3 className="text-center mb-4 text-white">Enter the following:</h3>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupArrival">
                    <Form.Control
                    type="text"
                    placeholder="IATA code of airport of arrival"
                    className="p-2 text-truncate"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formMaxDist">
                    <Form.Control
                    type="text"
                    placeholder="Maximum distance from airport (in miles)"
                    className="p-2 text-truncate"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formRating">
                    <Form.Select>
                        <option>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="danger" type="submit" className='fw-medium'>
                    Submit
                    </Button>
                </div>
            </Form>
        </Col>
    </Container>
  )
}

export default HotelsForm;