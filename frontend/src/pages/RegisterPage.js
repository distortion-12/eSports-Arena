import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Import axios
import './pages.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    
    // 2. Update state to match backend model (prize -> prizePool)
    const [formData, setFormData] = useState({ 
        title: '', 
        game: 'BGMI', 
        slots: '', 
        entryFee: '', 
        prizePool: '', // Changed from 'prize'
        date: '' 
    });

    // 3. Add state for loading and error messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // 4. Update handleSubmit to be async and call the API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // The auth token is automatically sent in the headers by our setup in App.js
            await axios.post('/api/tournaments', formData);
            
            // On success, navigate to the homepage
            // You could show a more elegant success message here if you like
            alert('Tournament hosted successfully!');
            navigate('/');

        } catch (err) {
            // If the backend sends an error (e.g., not logged in, validation error)
            setError(err.response?.data?.msg || 'Failed to create tournament. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="form-page-container">
            <div className="form-wrapper glass">
                <h2>📢 Host a Scrim</h2>
                <form id="tournamentForm" className="styled-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Tournament Title</label>
                        <input type="text" id="title" placeholder="Enter tournament name" required value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="game">Game</label>
                            <select id="game" required value={formData.game} onChange={handleChange}>
                                <option value="BGMI">BGMI</option>
                                <option value="Valorant">Valorant</option>
                                <option value="CS2">CS2</option>
                                <option value="LoL">LoL</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="slots">Slots</label>
                            <input type="number" id="slots" placeholder="Max teams" required value={formData.slots} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="entryFee">Entry Fee (₹)</label>
                            <input type="number" id="entryFee" placeholder="0 = Free" min="0" required value={formData.entryFee} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            {/* 5. Update input to match state (id="prizePool") */}
                            <label htmlFor="prizePool">Prize Pool (₹)</label>
                            <input type="number" id="prizePool" placeholder="e.g., 10000" required value={formData.prizePool} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date & Time</label>
                        <input type="datetime-local" id="date" required value={formData.date} onChange={handleChange} />
                    </div>

                    {/* 6. Display error messages */}
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="neon-button" disabled={loading}>
                        {loading ? 'Posting...' : '🚀 Post Tournament'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
