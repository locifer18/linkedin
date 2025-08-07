import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaApple, FaEdit } from 'react-icons/fa';
import "../styles/AuthStyles.css"; 

// This component handles user registration
// It includes a form for users to enter their details
const Register = () => {
    // State variables for registration form
    // These will hold the values entered by the user
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();

    const handlesubmit =  async (e) => {
        e.preventDefault();
        try {
            // Sending a POST request to the backend API to register the user
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, {
                name,
                email,
                password,
                bio
            });
            if(res && res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Registration failed. Please try again.");
        }
    }

    return ( 
            <div className='auth-container'>
                <div className='auth-card'>
                    <div className='auth-header'>
                        <h2 className='auth-title'>Create Account</h2>
                        <p className='auth-subtitle'>Join Linkedin to start Connecting with the world</p>
                    </div>
                    
                    <div className='auth-form'>
                        <form onSubmit={handlesubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaUser /></span>
                                    <input 
                                        type="text" 
                                        id="name"
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        className="form-control" 
                                        placeholder="Enter your full name" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaEnvelope /></span>
                                    <input 
                                        type="email" 
                                        id="email"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="form-control" 
                                        placeholder="Enter your email" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaLock /></span>
                                    <input 
                                        type="password" 
                                        id="password"
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        className="form-control" 
                                        placeholder="Create a password" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="bio" className="form-label">Bio</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaEdit /></span>
                                    <textarea 
                                        id="bio"
                                        value={bio} 
                                        onChange={(e) => setBio(e.target.value)} 
                                        className="form-control" 
                                        placeholder="Tell us about yourself" 
                                        rows="3"
                                        required 
                                    />
                                </div>
                            </div>
                            
                            
                            <button type="submit" className="auth-btn">Create Account</button>
                            
                            <div className="auth-divider">
                                <span className="auth-divider-text">Or register with</span>
                            </div>
                            
                            <div className="social-login">
                                <button type="button" className="social-btn">
                                    <FaGoogle />
                                </button>
                                <button type="button" className="social-btn">
                                    <FaFacebookF />
                                </button>
                                <button type="button" className="social-btn">
                                    <FaApple />
                                </button>
                            </div>
                        </form>
                        
                        <div className="auth-footer">
                            <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Register