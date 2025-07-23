import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TournamentCard from '../components/TournamentCard';
import './pages.css';

const GamePage = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCommunityTournaments = async () => {
            try {
                // Fetch from the '/community' endpoint
                const res = await axios.get('/api/tournaments/community');
                setTournaments(res.data);
            } catch (err) {
                setError('Could not fetch community tournaments.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCommunityTournaments();
    }, []);

    const renderTournaments = () => {
        if (loading) return <p>Loading scrims...</p>;
        if (error) return <p className="error-message">{error}</p>;
        if (tournaments.length === 0) return <p>No community scrims found. Why not host one?</p>;

        return (
            <div className="grid-container">
                {tournaments.map(t => (
                    <TournamentCard 
                        key={t._id} 
                        tournament={t} 
                        isCommunity={true} // This prop shows the "Register" button
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="container">
            <div className="game-page-header">
                <h1>Community Scrims</h1>
                <p>Find and register for user-hosted tournaments and scrims.</p>
            </div>
            <section className="game-content">
                <h2>Upcoming Events</h2>
                {renderTournaments()}
            </section>
        </div>
    );
};

export default GamePage;