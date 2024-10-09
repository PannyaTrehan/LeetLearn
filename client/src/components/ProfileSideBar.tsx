import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaUserAlt, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUserProfile } from "../graphql/getProfile";
import { UserProfileDetails } from "../graphql/types/UserTypes";
import { useState, useEffect } from 'react';

interface ProfileSideBarProps {
    show: boolean;
    handleClose: () => void;
}

function ProfileSideBar({ show, handleClose }: ProfileSideBarProps) {
    const [profileResult, setProfileResult] = useState<UserProfileDetails | null>(null);
    const { loading, data, fetchProfile } = useUserProfile();

    useEffect(() => {
        if (data && data.matchedUser) {
            setProfileResult(data.matchedUser.profile);
        } else {
            console.log("No data found");
        }
    }, [data]);

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
    <Offcanvas show={show} onHide={handleClose} placement='end' className="bg-dark text-light">
        <Offcanvas.Body>
            <div className="d-flex flex-column align-items-start">
                {/* Profile Header */}
                <div className="d-flex align-items-center mb-2">
                    <img
                        src={profileResult?.userAvatar}
                        alt="User Avatar" 
                        className="me-2 rounded-circle" 
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div>
                        <h5 className="mb-0">{profileResult?.realName}</h5>
                    </div>
                </div>

                <Nav className="flex-column w-100">
                    <Nav.Link as={Link} to="/profile" className="text-light">
                        <FaUserAlt className="me-2" /> Your Profile
                    </Nav.Link>
                    <Nav.Link as={Link} to="/leetcode" className="text-light">
                        <FaCogs className="me-2" /> Your LeetCode
                    </Nav.Link>
                    <Nav.Link as={Link} to="/settings" className="text-light">
                        <FaCogs className="me-2" /> Settings
                    </Nav.Link>
                </Nav>

                <hr className="w-100 text-secondary my-2" />

                <Nav.Link as={Link} to="/logout" className="text-light">
                    <FaSignOutAlt className="me-2" /> Sign Out
                </Nav.Link>
            </div>
        </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ProfileSideBar