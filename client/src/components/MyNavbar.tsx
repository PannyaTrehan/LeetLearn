import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBell, FaUserCircle, FaFire, FaUserAlt, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from "../styles/MyNavbar.module.scss";
import { getUserStreak } from '../api/UserRequests';
import { useState, useEffect } from 'react';

function MyNavbar() {
  const [streak, setStreak] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Track user authentication status
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

      {/* Updated Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} placement='end' className="bg-dark text-light">
        <Offcanvas.Body>
          <div className="d-flex flex-column align-items-start">
            {/* Profile Header */}
            <div className="d-flex align-items-center mb-4">
              <FaUserCircle size={50} className="me-2" />
              <div>
                <h5 className="mb-0">Pannya Trehan</h5>
                <small>@pannyatrehan</small>
              </div>
            </div>

            {/* Navigation Links */}
            <Nav className="flex-column w-100">
              <Nav.Link as={Link} to="/profile" className="text-light">
                <FaUserAlt className="me-2" /> Your Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/repositories" className="text-light">
                <FaCogs className="me-2" /> Your Repositories
              </Nav.Link>
              <Nav.Link as={Link} to="/settings" className="text-light">
                <FaCogs className="me-2" /> Settings
              </Nav.Link>
              {/* Add more Nav.Links similar to the GitHub sidebar */}
            </Nav>

            {/* Divider */}
            <hr className="w-100 text-secondary my-2" />

            {/* Logout */}
            <Nav.Link as={Link} to="/logout" className="text-light">
              <FaSignOutAlt className="me-2" /> Sign Out
            </Nav.Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default MyNavbar