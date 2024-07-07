import { Container, Row, Button, Form, Card, Col } from 'react-bootstrap';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <div>

                            </div>
                            <Form>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                
                                <Form.Group controlId="formPassword" className='mt-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                
                                <Form.Group controlId="formConfirmPassword" className='mt-2'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </Form.Group>
                
                                <Button variant="primary" type="submit" className="w-100 mt-4">
                                    Sign Up
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                <span>Have an account? <Link to="/signin">Sign In</Link></span>
                            </div>

                            <div className="text-center mt-2">
                                <span>or you can sign in with</span>
                                <div className="d-flex justify-content-center mt-2">
                                    <Button variant="light" className="mx-1"><FaGoogle /></Button>
                                    <Button variant="light" className="mx-1"><FaGithub /></Button>
                                    <Button variant="light" className="mx-1"><FaFacebook /></Button>
                                </div>
                            </div>
                </Card.Body>
              </Card>
            </Col>
            </Row>
        </Container>
      );
}

export default Signup