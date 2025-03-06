import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import img from '../Assets/sec.png'
import gg from '../Assets/google.png'
import fb from '../Assets/faceb.png'
import img1 from '../Assets/Frame 619.png'

const PasswordReset = () => {
    const [email, setEmail]= useState(true)
    const [otp, setOtp]= useState(false)
    const [password, setPassword]= useState(false)

    function addOtp() {
        setEmail(false)
        setOtp(true)
        setPassword(false)
    }

    function back() {
        setEmail(true)
        setOtp(false)
        setPassword(false)
    }

    function addPassword() {
        setEmail(false)
        setOtp(false)
        setPassword(true)
    }

  return (
    <div className='sign sign-c'>
        <div className="membership">
            
            <div className="member-form">
            { email ? (<>
                <div className="l-form">
                <Link to='/'><img src={logo} alt="" className='f-logo'/></Link>

                    <p>Enter email to continue with...</p>
                    
                    <input type="email" placeholder='Email' className='inp'/>
                    <div className="btns">
                        <button className='canc'><Link to='/signin'>Go back</Link></button>
                        <button onClick={addOtp}>Next</button>
                    </div>

                    
                </div>

                <img src={img} className='form-img form-img1' />
                </>) : null
            }

            { otp ? (<>
                <div className="l-form">
                    <Link to='/'><img src={logo} alt="" className='f-logo'/></Link>

                    <p>Enter the OTP Code sent to your email</p>
                    <input type="text" placeholder='Enter OTP' className='inp'/>

                    <button onClick={addPassword}>Continue</button>
                    <div className="check">
                        <input type="checkbox" name="" id="" />
                        <span>By clicking continue,you agree to the privacy terms of service</span>
                    </div>

                   
                </div>

                <img src={img1} className='form-img form-img1' />
                </>) : null
            }

            { password ? (<>
                <div className="l-form">
                <Link to='/'><img src={logo} alt="" className='f-logo'/></Link>

                    <p>Create new password</p>
                    
                    <input type="password" placeholder='Enter password' className='inp'/>
                    <input type="password" placeholder='Re-enter password' className='inp'/>
                    <div className="check">
                        <input type="checkbox" name="" id="" />
                        <span>Show password</span>
                    </div>

                    <div className="btns">
                        <button className='canc'><Link to='/signin'>Go back</Link></button>
                        <button><Link to='/signin' style={{color:'#fff'}}>Next</Link></button>
                    </div>

                    
                </div>

                <img src={img1} className='form-img form-img1' />
                </>) : null
            }

            </div>
        </div>
    </div>
  )
}

export default PasswordReset