import React, { useState } from 'react';
import axios from 'axios';
import './pages.css';

const AuthPage = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [signupStep, setSignupStep] = useState('details');
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignupDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            // Use the full URL
            const res = await axios.post('http://localhost:5000/api/users/register-start', { name, email, password });
            setSuccessMessage(res.data.msg);
            console.log("SIMULATED OTP:", res.data.otp);
            setSignupStep('verify');
        } catch (err) {
            setError(err.response?.data?.msg || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Use the full URL
            const res = await axios.post('http://localhost:5000/api/users/register-verify', { email, otp });
            onLoginSuccess(res.data.token);
        } catch (err) {
            setError(err.response?.data?.msg || 'OTP verification failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Use the full URL
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            onLoginSuccess(res.data.token);
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccessMessage('');
        setSignupStep('details');
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
    };

    // ... the rest of your render logic remains the same ...
    const renderSignupForm = () => {
        if (signupStep === 'details') {
            return (
                <form className="styled-form" onSubmit={handleSignupDetails}>
                    <div className="form-group"><label>Name</label><input type="text" placeholder="Enter your name" required value={name} onChange={e => setName(e.target.value)} /></div>
                    <div className="form-group"><label>Email</label><input type="email" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
                    <div className="form-group"><label>Password</label><input type="password" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} /></div>
                    <div className="auth-buttons"><button type="submit" className="neon-button" disabled={loading}>{loading ? 'Processing...' : 'Get OTP'}</button></div>
                </form>
            );
        }
        return (
            <form className="styled-form" onSubmit={handleVerifyOtp}>
                <div className="form-group"><label>OTP</label><input type="text" placeholder="Enter the 6-digit OTP" required value={otp} onChange={e => setOtp(e.target.value)} /></div>
                <div className="auth-buttons"><button type="submit" className="neon-button" disabled={loading}>{loading ? 'Verifying...' : 'Verify & Signup'}</button></div>
            </form>
        );
    };

    return (
        <div className="form-page-container">
            <div className="form-wrapper glass">
                <h2>{isLogin ? 'Login' : 'Signup'}</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {isLogin ? (
                    <form className="styled-form" onSubmit={handleLogin}>
                        <div className="form-group"><label>Email</label><input type="email" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
                        <div className="form-group"><label>Password</label><input type="password" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} /></div>
                        <div className="auth-buttons"><button type="submit" className="neon-button" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button></div>
                    </form>
                ) : (
                    renderSignupForm()
                )}
                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button type="button" onClick={switchMode} className="link-button">
                        {isLogin ? 'Signup' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;