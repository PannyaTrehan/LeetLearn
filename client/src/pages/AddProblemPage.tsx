// The main page where Leetcode problems are added by the user

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Question } from "../graphql/types/QuestionTypes";
import { useQuestionList } from "../graphql/getLeetcodeProblems";
import AddQuestionTable from '../components/AddQuestionTable';

function AddProblemPage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [queryResult, setQueryResult] = useState<Question[] | null>(null);
    const { loading, data, fetchQuestions } = useQuestionList();

    useEffect(() => {
        if (data) {
            setQueryResult(data.problemsetQuestionList.questions);
            console.log(data);
        }
    }, [data]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchQuestions(searchQuery);
    }

    return (
        <Container>
            <Col>
                <Row className='mt-4'>
                    <h1>Add a problem</h1>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2">
                                <FaSearch />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search for a problem"
                                aria-label="Search for a problem"
                                aria-describedby="basic-addon2"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </InputGroup>
                    </Form>
                    {loading ? (
                        <Row className='justify-content-center mt-4'>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Row>
                    ) : (
                        <>
                            <AddQuestionTable data={queryResult}/>
                        </>
                    )}
                </Row>
            </Col>
        </Container>
    );
}

export default AddProblemPage;
