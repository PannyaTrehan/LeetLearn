import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import styles from "../styles/Home.module.scss";
import { getUserQuestions } from '../api/QuestionRequests';
import { useEffect, useState } from 'react';
import DailyQuestionsTable from '../components/DailyQuestionsTable';

interface Tag {
    title: string;
}

interface DailyQuestion {
    title: string;
    difficulty: string;
    tags: Tag[];
}

interface DailyQuestionsResponse {
    next_review: string;
    question: DailyQuestion;
}

function Home() {
    const [queryResult, setQueryResult] = useState<DailyQuestionsResponse[] | null>(null);
    const [problemCount, setProblemCount] = useState<number>(0);
    const [showReviewPopUp, setReviewPopUp] = useState<boolean>(false);
    const [rowClickedTitle, setRowClickedTitle] = useState<string>("");

    useEffect(() => {
        const fetchUserQuestions = async () => {
            try {
                const data = await getUserQuestions();
                setQueryResult(data);
                setProblemCount(data.length);
                console.log('Fetched user questions:', data);
            } catch (error) {
                console.error('Error fetching user questions:', error);
            }
        };

        fetchUserQuestions();
    }, []);

    //handle click function
    const handleRowClick = (entry: string) => {
        setRowClickedTitle(entry)
        setReviewPopUp(true);
    }

    const handleClose = () => setReviewPopUp(false);


    return(
        <Container>
            <Row className='mt-4'>
                <h1>Dashboard</h1>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <Col xs="auto">
                            <h2 className={styles.heading}>To complete</h2>
                        </Col>
                        <Col>
                            <h2 className={styles.problemCount}>{problemCount}</h2>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <DailyQuestionsTable data={queryResult} onRowClick={handleRowClick}/> {/* Pass data to the table */}
            </Row>

            <Modal show={showReviewPopUp} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{rowClickedTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='formGroupOne'>
                            <Form.Label>Was the solution optimal?</Form.Label>
                            <Form.Range
                                min="1"
                                max="5"
                                step="1"
                            />
                            <div className="d-flex justify-content-between">
                                {[1, 2, 3, 4, 5].map(value => (
                                    <span key={value}>{value}</span>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formGroupOne'>
                            <Form.Label>How long did it take to complete?</Form.Label>
                            <Form.Range
                                min="1"
                                max="4"
                                step="1"
                            />
                            <div className="d-flex justify-content-between">
                                {["<5m", "<15m", "<30m", "30m+"].map(value => (
                                    <span key={value}>{value}</span>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formGroupOne'>
                            <Form.Label>Did you any need help/assistance?</Form.Label>
                            <Form.Range
                                min="1"
                                max="5"
                                step="1"
                            />
                            <div className="d-flex justify-content-between">
                                {["none", "a little", "some", "decent amount", "a lot"].map(value => (
                                    <span key={value}>{value}</span>
                                ))}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Home