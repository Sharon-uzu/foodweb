import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/ScanOrder logo pdf.png';
import img from '../Assets/Frame 19.png';
import { useSignupMutation } from '../redux-state/api/apiSlice';
import AuthService from '../services/AuthService'; // NEW

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    business: '',
    email: '',
    phone: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fullname) errors.fullname = "Full name is required";
    if (!values.business) errors.business = "Business name is required";
    if (!values.email) errors.email = "Email is required";
    else if (!emailRegex.test(values.email)) errors.email = "Invalid email format";
    if (!values.phone) errors.phone = "Phone number is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try {
        const payload = {
          name: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.business,
          password: formData.password
        };
  
        const response = await signup(payload).unwrap();
  
        // Debug log to check actual response
        console.log("Signup response:", response);
  
        // If response contains a token and user, process it
        if (response.token && (response.user || response.data)) {
          AuthService.formatLoginResponse(response);
          alert("Account created successfully!");
          navigate("/vendor");
        } else {
          alert(response.message || "Account created, please login.");
          navigate("/signin"); // fallback
        }
  
      } catch (error) {
        console.error("Signup error:", error);
        alert(error?.data?.message || "Signup failed");
      }
    }
  };
  

  return (
    <div className='sign'>
      <div className="membership">
        <div className="s-header">
          <Link to='/'><img src={logo} alt="Logo" /></Link>
        </div>
        <div className="member-form">
          <div className="l-form">
            <h2>Create Account</h2>

            <input type="text" name="fullname" placeholder='Full name' className='inp' onChange={handleChange} />
            {formErrors.fullname && <p style={{color:'red'}}>{formErrors.fullname}</p>}

            <input type="text" name="business" placeholder='Business name' className='inp' onChange={handleChange} />
            {formErrors.business && <p style={{color:'red'}}>{formErrors.business}</p>}

            <input type="email" name="email" placeholder='Email' className='inp' onChange={handleChange} />
            {formErrors.email && <p style={{color:'red'}}>{formErrors.email}</p>}

            <input type="tel" name="phone" placeholder='Phone number' className='inp' onChange={handleChange} />
            {formErrors.phone && <p style={{color:'red'}}>{formErrors.phone}</p>}

            <input type="password" name="password" placeholder='Password' className='inp' onChange={handleChange} />
            {formErrors.password && <p style={{color:'red'}}>{formErrors.password}</p>}

            <button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Loading..." : "Create Account"}
            </button>

            <p className='else'>Have an account already? <Link to='/signin'>Login</Link></p>
          </div>
          <img src={img} alt="Signup" className='f-img'/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
