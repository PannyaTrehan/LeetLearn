import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaBell, FaUserCircle, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from "../styles/MyNavbar.module.scss";

function MyNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className={styles.myNavbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.myNavbarBrand}>Leetcode</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/stats">Stats</Nav.Link>
            <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
            <Nav.Link as={Link} to="/add">Add</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link>
              <FaBell className={styles.bellIcon} />
            </Nav.Link>
            <Nav.Link className={styles.streakLink}>
              <FaFire className={styles.streakIcon} />
              <span className={styles.streakCount}>12</span>
            </Nav.Link>
            <Nav.Link className={styles.navLink}>
              <FaUserCircle className={styles.profileIcon} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar