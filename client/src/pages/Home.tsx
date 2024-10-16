import { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';
import styles from "../styles/Home.module.scss";
import { getAllUserQuestions } from '../api/UserQuestionRequests';
import DailyQuestionsTable from '../components/DailyQuestionsTable';
import { createReview } from '../api/ReviewRequests';

interface Tag {
    tag_name: string;
}

interface DailyQuestion {
    title: string;
    difficulty: string;
    question_tag: Tag[];
}

interface DailyQuestionsResponse {
    next_review: string;
    question: DailyQuestion;
}

function Home() {
    const [queryResult, setQueryResult] = useState<DailyQuestionsResponse[] | null>(null);
    const [problemCount, setProblemCount] = useState<number>(0);
    const [showReviewPopUp, setReviewPopUp] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [optimal, setOptimal] = useState<number>(3);
    const [time, setTime] = useState<number>(1);
    const [assistance, setAssistance] = useState<number>(1);
    const [radioValue, setRadioValue] = useState('1');

    useEffect(() => {
        const fetchUserQuestions = async () => {
            try {
                const data = await getAllUserQuestions();
                setQueryResult(data);
                setProblemCount(data.length);
                console.log('Fetched user questions:', data);

                // Loop through the questions and print the tags
                data.forEach((questionResponse: DailyQuestionsResponse) => {
                    console.log('Question:', questionResponse.question.title);
                    questionResponse.question.question_tag.forEach((tag: Tag) => {
                        console.log('Tag:', tag.tag_name);
                    });
                });
            } catch (error) {
                console.error('Error fetching user questions:', error);
            }
        };

        fetchUserQuestions();
    }, []);

    //handle click function
    const handleRowClick = (entry: string) => {
        setTitle(entry)
        setReviewPopUp(true);

        const cleanedTitle = entry.replace(/^\d+\.\s*/, '').toLowerCase().replace(/\s+/g, '-');
    
        // Create the LeetCode URL
        const leetcodeUrl = `https://leetcode.com/problems/${cleanedTitle}/`;
    
        // Open the URL in a new tab and focus on it
        window.open(leetcodeUrl, '_blank', 'noopener,noreferrer');
    }

    const handleClose = () => setReviewPopUp(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            var successful = true;

            if (radioValue == '0') {
                successful = false;
            }

            const reviewResponse = await createReview({
                successful,
                optimal,
                time,
                assistance,
                title
            });
        } catch (error) {
            console.log(error);
        }
    }

    const radios = [
        { name: 'Unsuccessful', value: '0' },
        { name: 'Successful', value: '1' },
      ];


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
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3' controlId='formGroupOne'>
                            <Form.Label>Was your solution successful?</Form.Label>
                            <div className="d-flex justify-content-center">
                                <ButtonGroup>
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant={radioValue === radio.value ? 'primary' : 'outline-primary'}
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </div>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formGroupOne'>
                            <Form.Label>Was the solution optimal?</Form.Label>
                            <Form.Range
                                min="1"
                                max="5"
                                step="1"
                                value={optimal}
                                onChange={(e) => setOptimal(Number(e.target.value))}
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
                                value={time}
                                onChange={(e) => setTime(Number(e.target.value))}
                            />
                            <div className="d-flex justify-content-between">
                                {["<5m", "5-15m", "15-30m", "30m+"].map(value => (
                                    <span key={value}>{value}</span>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formGroupOne'>
                            <Form.Label>Did you any need help/assistance?</Form.Label>
                            <Form.Range
                                min="1"
                                max="4"
                                step="1"
                                value={assistance}
                                onChange={(e) => setAssistance(Number(e.target.value))}
                            />
                            <div className="d-flex justify-content-between">
                                {["None", "Little", "Much", "Full"].map(value => (
                                    <span key={value}>{value}</span>
                                ))}
                            </div>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" type="submit" onClick={handleClose}>Save changes</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Home