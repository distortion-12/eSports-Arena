import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './components.css';

const Header = ({ user, logout }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <header className="main-header">
            <div className="container">
                <Link to="/" className="logo">🎮 eSports Arena</Link>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/game" className={isActive('/game') ? 'active' : ''}>Community</Link></li>
                        
                        {/* --- NEW: Conditional Links for Logged-in Users --- */}
                        {user && (
                            <>
                                <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>My Dashboard</Link></li>
                                <li><Link to="/register" className={isActive('/register') ? 'active' : ''}>Host Scrim</Link></li>
                            </>
                        )}
                        
                        <li><Link to="/watch/live" className={isActive('/watch/live') ? 'active' : ''}>Watch Live</Link></li>
                    </ul>
                </nav>
                <div className="auth-links">
                    {user ? (
                        <>
                            {/* Display user's name instead of email */}
                            <span className="welcome-message">Welcome, {user.name}</span>
                            <button onClick={logout} className="cta-button">Logout</button>
                        </>
                    ) : (
                        <Link to="/auth" className="cta-button glow">Login / Signup</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;