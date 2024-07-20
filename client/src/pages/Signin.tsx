import React, { useState } from "react";
import { Container, Row, Button, Form, Card, Col } from 'react-bootstrap';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { loginUser, isValidEmail, isValidPassword } from "../api/UserRequests";

function Signin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ email?: string; password?: string } | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: { [key: string]: string | null } = {};
        setGeneralError(null);
        setSuccess(null);

        if (!isValidEmail(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!isValidPassword(password)) {
            newErrors.password = "Password is not valid";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const loginResponse = await loginUser({
                email,
                password
            });

            setSuccess("User logged in successfully!");
            console.log('User logged in, jwtToken:', loginResponse.token);
        } catch (error) {
            console.error('Error logging in user:', error);
            setGeneralError("Error logging in user. Please try again.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            {generalError && <div className="alert alert-danger">{generalError}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!errors?.email}
                                    />

                                    {errors?.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                                </Form.Group>
                
                                <Form.Group controlId="formPassword" className='mt-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!errors?.password}
                                    />
                                </Form.Group>
                
                                <Button variant="primary" type="submit" className="w-100 mt-4">
                                    Sign In
                                </Button>
                            </Form>

                            <div className="d-flex justify-content-between mt-3">
                                <span><Link to="/signin">Forgot password?</Link></span>
                                <span><Link to="/signup">Sign Up</Link></span>
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

export default Signin