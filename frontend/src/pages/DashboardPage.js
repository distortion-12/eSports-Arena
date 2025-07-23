import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TournamentCard from '../components/TournamentCard';
import './pages.css';

const DashboardPage = () => {
    const [myTournaments, setMyTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyTournaments = async () => {
            try {
                // This is a protected route; the auth token is sent automatically
                const res = await axios.get('/api/users/my-tournaments');
                setMyTournaments(res.data);
            } catch (err) {
                setError('Could not fetch your registered tournaments.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyTournaments();
    }, []);

    const renderMyTournaments = () => {
        if (loading) {
            return <p>Loading your tournaments...</p>;
        }

        if (error) {
            return <p className="error-message">{error}</p>;
        }

        if (myTournaments.length === 0) {
            return (
                <div>
                    <p>You haven't registered for any tournaments yet.</p>
                    <p>Check out the <a href="/#/game">Community Scrims</a> to find one!</p>
                </div>
            );
        }

        return (
            <div className="grid-container">
                {myTournaments.map(t => (
                    // We can reuse the TournamentCard component
                    <TournamentCard key={t._id} tournament={t} />
                ))}
            </div>
        );
    };

    return (
        <div className="container">
            <div className="game-page-header">
                <h1>My Dashboard</h1>
                <p>Here are all the tournaments you've registered for.</p>
            </div>
            <section className="game-content">
                <h2>My Registered Events</h2>
                {renderMyTournaments()}
            </section>
        </div>
    );
};

export default DashboardPage;