import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaHome, FaLinkedin, FaSearch, FaSignOutAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useAuth } from '../context/authContext'

const Header = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem('auth');
        toast.success("Logout Successfully")
    }

    const capitalizeWords = (text) => {
        if (!text) return '';
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const name = capitalizeWords(auth?.user?.name);

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
            <div className="container">
                <Link className="navbar-brand text-primary fw-bold fs-3" to="/">
                    <FaLinkedin /> LinkedIn
                </Link>

                <div className="d-flex align-items-center ms-auto">
                    {/* Search */}
                    <div className="position-relative me-4 d-none d-md-block">
                        <FaSearch className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666', fontSize: '14px' }} />
                        <input
                            className="form-control bg-light border-0"
                            style={{ paddingLeft: '35px', width: '280px', borderRadius: '4px' }}
                            type="search"
                            placeholder="Search"
                        />
                    </div>

                    {/* Navigation */}
                    <ul className="navbar-nav d-flex flex-row align-items-center">
                        <li className="nav-item me-3">
                            <NavLink className="nav-link text-center p-2" to="/" style={{fontSize: '12px'}}>
                                <FaHome className="d-block mb-1" style={{fontSize: '20px'}} />
                                Home
                            </NavLink>
                        </li>

                        {!auth.user ? (
                            <>
                                <li className="nav-item me-2">
                                    <NavLink className="btn btn-outline-primary btn-sm" to="/login">Sign in</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-primary btn-sm" to="/register">Join now</NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle text-center p-2"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    style={{fontSize: '12px'}}
                                >
                                    <div className="bg-primary text-white rounded-circle mx-auto mb-1 d-flex align-items-center justify-content-center" style={{width: '24px', height: '24px', fontSize: '12px'}}>
                                        {auth?.user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    Me
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to={`/profile/${auth?.user?._id}`}>
                                            View Profile
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" onClick={handleLogout} to="/login">
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header