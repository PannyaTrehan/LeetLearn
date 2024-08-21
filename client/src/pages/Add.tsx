import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import ProblemsTable from '../components/ProblemsTable';
import { useQuestionList } from "../graphql/getProblems";

interface TopicTag {
    name: string;
    id: string;
    slug: string;
}
  
interface Question {
    acRate: number;
    difficulty: string;
    freqBar: any; // Adjust type if known
    frontendQuestionId: string;
    isFavor: boolean;
    paidOnly: boolean;
    status: any; // Adjust type if known
    title: string;
    titleSlug: string;
    topicTags: TopicTag[];
    hasSolution: boolean;
    hasVideoSolution: boolean;
}

interface DataResponse {
    total: number;
    questions: Question[];
}

function Add() {
    const [queryText, setQueryText] = useState<string>("");
    const [queryResult, setQueryResult] = useState<Question[] | null>(null);
    const { loading, error, data, fetchQuestions } = useQuestionList();

    useEffect(() => {
        if (data) {
            setQueryResult(data.problemsetQuestionList.questions);
        }
    }, [data]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchQuestions(queryText);
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
                                value={queryText}
                                onChange={(e) => setQueryText(e.target.value)}
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
                            <ProblemsTable data={queryResult}/>
                            <Row className='mt-4'>
                                <h1>Recently completed</h1>
                                <ProblemsTable data={queryResult}/>
                            </Row>
                        </>
                    )}
                </Row>
            </Col>
        </Container>
    );
}

export default Add;
