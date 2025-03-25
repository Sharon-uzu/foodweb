import React, { useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import logo from '../Assets/ScanOrder logo pdf.png';  
import img from '../Assets/Frame 19.png';  
import { Supabase } from '../config/supabase-config';  

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
    const [isLoading, setIsLoading] = useState(false);  
    const [logoFile, setLogoFile] = useState(null);  

    const handleChange = (e) => {  
        const { name, value, type, files } = e.target;  
        if (type === 'file') {  
            setLogoFile(files[0]); // Capture the uploaded file  
        } else {  
            setFormData({ ...formData, [name]: value });  
        }  
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
            setIsLoading(true);  
            try {  
                // Check if email or business already exists.  
                const { data, error } = await Supabase  
                    .from("food-web-admin")  
                    .select("email, business")  
                    .or(`email.eq.${formData.email},business.eq.${formData.business}`)  
                    .single();  
    
                if (data) {  
                    if (data.email === formData.email) {  
                        alert("Email already registered");  
                    } else if (data.business === formData.business) {  
                        alert("Business name already registered");  
                    }  
                    setIsLoading(false);  
                    return;  
                }  
    
                if (error && error.code !== "PGRST116") {  
                    console.error("Error checking email and business:", error);  
                    setIsLoading(false);  
                    return;  
                }  
    
                // Insert user data without image URL first.  
                const response = await Supabase.from("food-web-admin").insert([  
                    {  
                        fullname: formData.fullname,  
                        business: formData.business,  
                        email: formData.email,  
                        phone: formData.phone,  
                        password: formData.password,  
                        image: null // Placeholder for the image URL  
                    }  
                ]);  
    
                if (response.error) {  
                    throw response.error;  
                }  
    
                // Upload image to Supabase Storage  
                let imageUrl = null;  
                if (logoFile) {  
                    const fileName = `${Date.now()}-${logoFile.name}`;  
                    const { error: uploadError } = await Supabase.storage  
                        .from('food-logo')  
                        .upload(fileName, logoFile);  
    
                    if (uploadError) {  
                        console.error("Error uploading image:", uploadError);  
                        alert("Failed to upload the logo. Please try again.");  
                    } else {  
                        // If upload is successful, generate the public URL  
                        imageUrl = Supabase.storage.from('food-logo').getPublicUrl(fileName).data.publicUrl;  
    
                        // Update user record with the image URL  
                        const { error: updateError } = await Supabase  
                            .from("food-web-admin")  
                            .update({ image: imageUrl }) // Update image column  
                            .eq("email", formData.email); // Filter by email  
    
                        if (updateError) {  
                            console.error("Error updating user image:", updateError);  
                        }  
                    }  
                }  
    
                navigate("/signin");  
            } catch (error) {  
                console.error("Error during signup:", error);  
            } finally {  
                setIsLoading(false);  
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

                        <h6 style={{fontSize:'15px', marginBottom:'5px', fontWeight:400}}>Add your logo</h6>  
                        <input type="file" name="logo" className='inp' onChange={handleChange} />  
                        {formErrors.image && <p style={{color:'red'}}>{formErrors.image}</p>}  
                        
                        <button onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Loading..." : "Create Account"}</button>  

                        <p className='else'>Have an account already? <Link to='/signin'>Login</Link></p>  
                    </div>  
                    <img src={img} alt="Signup" className='f-img'/>  
                </div>  
            </div>  
        </div>  
    );  
};  

export default SignUp;  