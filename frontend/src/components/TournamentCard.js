import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Import Link
import axios from 'axios';
import './components.css';

const TournamentCard = ({ tournament, isCommunity }) => {
    const navigate = useNavigate();

    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationError, setRegistrationError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        try {
            return new Date(dateString).toLocaleString();
        } catch (error) {
            return 'Invalid date';
        }
    };

    // 2. Stop the card's link from firing when the button is clicked
    const handleRegister = async (e) => {
        e.stopPropagation(); // This is important!
        setIsRegistering(true);
        setRegistrationError('');
        try {
            await axios.post(`/api/tournaments/${tournament._id}/register`);
            setRegistrationSuccess(true);
        } catch (err) {
            setRegistrationError(err.response?.data?.msg || 'Registration failed.');
        } finally {
            setIsRegistering(false);
        }
    };

    const handleWatch = (e) => {
        e.stopPropagation(); // This is important!
        navigate('/watch/live');
    };

    const renderButton = () => {
        if (isCommunity) {
            if (registrationSuccess) {
                return <button className="view-button-success" disabled>✓ Registered</button>;
            }
            return (
                <button onClick={handleRegister} className="view-button" disabled={isRegistering}>
                    {isRegistering ? 'Registering...' : 'Register'}
                </button>
            );
        }
        return (
            <button onClick={handleWatch} className="view-button">
                Watch Now
            </button>
        );
    };

    const imageUrl = `https://placehold.co/600x400/1a1a2e/ffffff?text=${encodeURIComponent(tournament.title)}`;

    return (
        // 3. Wrap the entire card in a Link component
        <Link to={`/tournament/${tournament._id}`} className="tournament-card-link">
            <div className="tournament-card glass">
                <img src={imageUrl} alt={tournament.title} />
                <div className="card-info">
                    <h3>{tournament.title}</h3>
                    <p>Date: {formatDate(tournament.date)}</p>
                    <span className="prize-pool">
                        ₹{tournament.prizePool ? tournament.prizePool.toLocaleString() : '0'} Prize Pool
                    </span>
                    
                    {renderButton()}

                    {registrationError && <p className="error-message" style={{marginTop: '10px'}}>{registrationError}</p>}
                </div>
            </div>
        </Link>
    );
};

export default TournamentCard;