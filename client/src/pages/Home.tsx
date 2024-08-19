import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
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
    const handleRowClick = () => {
        console.log("clicked!");
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
                    <Modal.Title>Row Details</Modal.Title>
                </Modal.Header>
            </Modal>
        </Container>
    );
}

export default Home