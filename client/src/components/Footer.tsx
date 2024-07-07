import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-white mt-5">
          <Container>
            <Row>
              <Col md={3} className="d-flex align-items-center justify-content-center text-center py-3">
                <h2>Leetcode</h2>
              </Col>
              <Col md={3} className="text-center py-3">
                <h5>Help</h5>
                <a href="#" className="text-white d-block">Documentation</a>
                <a href="#" className="text-white d-block">Twitter</a>
                <a href="#" className="text-white d-block">Instagram</a>
              </Col>
              <Col md={3} className="text-center py-3">
                <h5>Contribute</h5>
                <a href="#" className="text-white d-block">Github</a>
                <a href="#" className="text-white d-block">Survey</a>
                <a href="#" className="text-white d-block">Leave a review</a>
              </Col>
              <Col md={3} className="text-center py-3">
                <h5>Contact</h5>
                <p>Email: trehanpannya70@gmail.com</p>
              </Col>
            </Row>
          </Container>
        </footer>
      );
}

export default Footer