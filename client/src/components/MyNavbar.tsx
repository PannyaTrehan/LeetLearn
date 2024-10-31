// TODO List
// 1. Retrieve user sign in or sign out
// 2. Fix styling of the profile icon.
// 3. Add links to appropriate offcanvas pages
// 4. Implement sign out functionality
// 5. Move offcanvas into its own seperate component.

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaBell, FaUserCircle, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from "../styles/MyNavbar.module.scss";
import { getUserStreak } from '../api/UserRequests';
import { useState, useEffect } from 'react';
import ProfileSideBar from './ProfileSideBar';

function MyNavbar() {
  const [streak, setStreak] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track user authentication status
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUserStreak = async () => {
        try {
            const data = await getUserStreak();
            setStreak(data.streak);
        } catch (error) {
            console.error('Error fetching user questions:', error);
        }
    };

    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('accessToken');
      console
      if (token) {
        setIsLoggedIn(true);
      }
    }

    fetchUserStreak();
    checkUserLoggedIn();
}, []);

  return (
    <>
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
              {isLoggedIn ? (
                // Render profile link or other authenticated-user options
                <button className={styles.navLink}>
                  <FaUserCircle className={styles.profileIcon} onClick={handleShow}/>
                </button>
              ) : (
                // Render signup/login link for unauthenticated users
                <Nav.Link as={Link} to="/signup" className={styles.navLink}>
                  <FaUserCircle className={styles.profileIcon} />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ProfileSideBar show={show} handleClose={handleClose} />
    </>
  );
}

export default MyNavbar