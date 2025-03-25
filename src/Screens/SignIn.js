import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/ScanOrder logo pdf.png';
import img from '../Assets/sign.png';
import gg from '../Assets/google.png';
import fb from '../Assets/faceb.png';
import img1 from '../Assets/sec.png';
import { Supabase } from '../config/supabase-config';

const SignIn = ({ setLoggedIn, setUserDetails }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const { data, error } = await Supabase
                .from("food-web-admin")
                .select("id, business, password")
                .eq("email", formData.email)
                .single();

            if (!data || error) {
                setError("Invalid email or password");
                setIsLoading(false);
                return;
            }

            if (data.password !== formData.password) {
                setError("Incorrect password");
                setIsLoading(false);
                return;
            }

            const userDetails = {
                id: data.id,
                business: data.business,
                email: formData.email,
                image: data.image || "", // Assuming the image URL is stored in the database
            };

            localStorage.setItem("userId", data.id);
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            setLoggedIn(true);
            setUserDetails(userDetails);

            navigate("/admin");
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='sign sign-c'>
            <div className="membership">
                <div className="member-form">
                        <div className="l-form">
                            <Link to='/'><img src={logo} alt="Logo" className='f-logo' /></Link>
                            <p>Sign in to continue with...</p>
                            {/* <div className="sel">
                                <img src={gg} alt="Google" />
                                <span>Continue with Google</span>
                            </div>
                            <div className="sel">
                                <img src={fb} alt="Facebook" />
                                <span>Continue with Facebook</span>
                            </div>
                            <div className="or">
                                <h6></h6>
                                <span>or login</span>
                                <h6></h6>
                            </div> */}
                            <input 
                                type="email" 
                                name="email" 
                                placeholder='Email' 
                                className='inp' 
                                onChange={handleChange} 
                            />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder='Enter password' 
                                className='inp' 
                                onChange={handleChange} 
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Link to='/passwordreset'><h5>Forgot password?</h5></Link>
                                <button onClick={handleLogin} disabled={isLoading}>
                                    {isLoading ? "Loading..." : "Sign in"}
                                </button>
                            <p className='else'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                            
                        </div>
                    
                        
                    
                        <img src={img1} className='form-img' alt="Form Visual" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
