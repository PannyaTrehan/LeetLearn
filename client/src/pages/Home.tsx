import { Container, Row, Col } from 'react-bootstrap';
import ProblemsTable from '../components/ProblemsTable';
import styles from "../styles/Home.module.scss";

function Home() {
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
                            <h2 className={styles.problemCount}>4</h2>
                        </Col>
                    </Row>
                    <ProblemsTable />
                </Col>
            </Row>
        </Container>
    );
}

export default Home