import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './pages.css';

const TournamentDetailPage = () => {
    // The useParams hook gets the ':id' from the URL
    const { id } = useParams(); 

    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const res = await axios.get(`/api/tournaments/${id}`);
                setTournament(res.data);
            } catch (err) {
                setError('Could not fetch tournament details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTournament();
    }, [id]); // The effect re-runs if the id in the URL changes

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    if (loading) {
        return <div className="container"><p>Loading tournament...</p></div>;
    }

    if (error) {
        return <div className="container"><p className="error-message">{error}</p></div>;
    }

    if (!tournament) {
        return <div className="container"><p>Tournament not found.</p></div>;
    }

    return (
        <div className="container">
            <div className="detail-page-header">
                <h1>{tournament.title}</h1>
                <p>Organized by: {tournament.organizer ? tournament.organizer.name : 'Unknown'}</p>
                <span className="prize-pool-large">₹{tournament.prizePool.toLocaleString()}</span>
            </div>

            <div className="detail-grid">
                <div className="detail-info-card glass">
                    <h2>Details</h2>
                    <p><strong>Game:</strong> {tournament.game}</p>
                    <p><strong>Date & Time:</strong> {formatDate(tournament.date)}</p>
                    <p><strong>Entry Fee:</strong> {tournament.entryFee === 0 ? 'Free' : `₹${tournament.entryFee}`}</p>
                    <p><strong>Slots Filled:</strong> {tournament.registrations.length} / {tournament.slots}</p>
                </div>

                <div className="detail-registrations-card glass">
                    <h2>Registered Players ({tournament.registrations.length})</h2>
                    <ul className="player-list">
                        {tournament.registrations.length > 0 ? (
                            tournament.registrations.map(reg => (
                                <li key={reg._id}>
                                    <span className="player-name">{reg.user ? reg.user.name : 'Player'}</span>
                                    <span className="player-country">{reg.user ? reg.user.country : ''}</span>
                                </li>
                            ))
                        ) : (
                            <p>No players have registered yet.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TournamentDetailPage;