import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import ProblemsTable from '../components/ProblemsTable';

function Add() {
    return(
        <Container>
            <Col>
                <Row className='mt-4'>
                    <h1>Add a problem</h1>
                </Row>
                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search for a problem"
                            aria-label="Search for a problem"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    <ProblemsTable />
                </Row>
                <Row className='mt-4'>
                    <h1>Recently completed</h1>
                    <ProblemsTable />
                </Row>
            </Col>
        </Container>
    );
}

export default Add