import React, { useState } from "react";
import { Container, Row, Button, Form, Card, Col } from 'react-bootstrap';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import axios from 'axios';

type TokenResponse = {
    access_token: string;
    // Add any other properties you expect in the token response
  };

function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    const onSuccess = async (response: TokenResponse) => {
        try {
          const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
    
      const onFailure = (error: any) => {
        console.log(error);
      };
    
      const login = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: '269807828068-ansiu2a3cvtaka42oroe80v4mnenv5fs.apps.googleusercontent.com', // replace with your client ID
      });

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <div>

                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                
                                <Form.Group controlId="formPassword" className='mt-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                
                                <Form.Group controlId="formConfirmPassword" className='mt-2'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
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
                                    <Button variant="light" className="mx-1" onClick={signIn}><FaGoogle /></Button>
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