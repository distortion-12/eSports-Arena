import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LiveScorecardBGMI from '../components/LiveScorecardBGMI';
import TournamentCard from '../components/TournamentCard';
import { generateTeamData } from '../data/dummyData';
import './pages.css';

const HomePage = () => {
    const [teamsData, setTeamsData] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOfficialTournaments = async () => {
            try {
                // --- THIS IS THE CHANGE ---
                // We now fetch from the '/official' endpoint
                const res = await axios.get('/api/tournaments/official');
                setTournaments(res.data);
            } catch (err) {
                setError('Could not fetch official tournaments.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOfficialTournaments();
        setTeamsData(generateTeamData());
    }, []);

    const renderTournaments = () => {
        if (loading) {
            return <p>Loading official events...</p>;
        }

        if (error) {
            return <p className="error-message">{error}</p>;
        }

        if (tournaments.length === 0) {
            // Updated message for when no official events are found
            return <p>No official tournaments are scheduled at this time.</p>;
        }

        return (
            <div className="grid-container">
                {tournaments.map(t => (
                    <TournamentCard key={t._id} tournament={t} />
                ))}
            </div>
        );
    };

    return (
        <div className="container">
            <section className="live-section">
                <LiveScorecardBGMI teamsData={teamsData} />
            </section>
            <section className="featured-tournaments" style={{ marginTop: '40px' }}>
                <h2>Official Pro Tournaments</h2>
                {renderTournaments()}
            </section>
        </div>
    );
};

export default HomePage;
