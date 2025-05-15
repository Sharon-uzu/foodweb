import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux-state/api/apiSlice'; 
import { useAuth } from '../state/AuthContext';
import AuthService from '../services/AuthService';
import logo from '../Assets/ScanOrder logo pdf.png';
import img1 from '../Assets/sec.png';
const SignIn = ({ setLoggedIn, setUserDetails }) => {
  const { authLogin } = useAuth(); // Correct usage of useAuth hook
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Destructuring 'isLoading' and 'login' from useLoginMutation hook
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const { user } = useAuth();

useEffect(() => {
  if (user) {
    console.log("User now logged in, redirecting to /vendor");
    navigate('/dashboard');
  }
}, [user]);


const handleLogin = async () => {
  setError('');
  if (!formData.email || !formData.password) {
    setError('Please fill in all fields');
    return;
  }

  try {
    const response = await login(formData).unwrap();
    const userDetails = AuthService.formatLoginResponse(response);

    localStorage.setItem('token', userDetails.token);
    localStorage.setItem('authToken', userDetails.token); // For API calls
    localStorage.setItem('userId', userDetails.user.id);  // ✅ Save user ID here
    localStorage.setItem('userData', JSON.stringify(userDetails));

    if (setLoggedIn) setLoggedIn(true);
    if (setUserDetails) setUserDetails(userDetails);

    authLogin(userDetails);
    console.log("Login successful, userId saved:", userDetails.user.id);

  } catch (err) {
    setError(err?.data?.message || 'Login failed');
    console.error('Login failed:', err);
  }
};

   

  return (
    <div className="sign sign-c">
      <div className="membership">
        <div className="member-form">
          <div className="l-form">
            <Link to="/">
              <img src={logo} alt="Logo" className="f-logo" />
            </Link>
            <p>Sign in to continue</p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="inp"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="inp"
              onChange={handleChange}
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Link to="/passwordreset">
              <h5>Forgot password?</h5>
            </Link>

            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign in'}
            </button>

            <p className="else">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
          <img src={img1} className="form-img" alt="Form Visual" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
