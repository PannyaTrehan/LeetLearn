import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaBell, FaUserCircle, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from "../styles/MyNavbar.module.scss";
import { getUserStreak } from '../api/UserRequests';
import { useState, useEffect } from 'react';

function MyNavbar() {
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    const fetchUserStreak = async () => {
        try {
            const data = await getUserStreak();
            setStreak(data.streak);
        } catch (error) {
            console.error('Error fetching user questions:', error);
        }
    };

    fetchUserStreak();
}, []);

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className={styles.myNavbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.myNavbarBrand}>Leetcode</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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
              <span className={styles.streakCount}>{streak}</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" className={styles.navLink}>
              <FaUserCircle className={styles.profileIcon} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar