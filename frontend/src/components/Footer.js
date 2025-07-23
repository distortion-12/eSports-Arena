import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

const Footer = () => (
    <footer>
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>eSports Arena</h3>
                    <p>Your premier destination for BGMI tournaments, matches, and news.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/game">Game</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/watch/live">Watch Live</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Connect</h3>
                    <div className="social-icons">
                        <a href="#!"><i className="fab fa-facebook-f"></i></a>
                        <a href="#!"><i className="fab fa-twitter"></i></a>
                        <a href="#!"><i className="fab fa-instagram"></i></a>
                        <a href="#!"><i className="fab fa-discord"></i></a>
                    </div>
                </div>
            </div>
            <div className="copyright"><p>&copy; 2025 eSports Arena. All rights reserved.</p></div>
        </div>
    </footer>
);
export default Footer;