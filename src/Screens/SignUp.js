import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import img from '../Assets/Frame 19.png'

const SignUp = () => {
  return (
    <div className='sign'>
        <div className="membership">
            <div className="s-header">
                <Link to='/'><img src={logo} alt="" /></Link>
            </div>

            <div className="member-form">
                <div className="l-form">
                    <h2>Create Account</h2>
                    <input type="text" placeholder='Full name' className='inp'/>
                    <input type="email" placeholder='Email' className='inp'/>
                    <input type="tel" placeholder='Phone number' className='inp'/>
                    <input type="password" placeholder='Password' className='inp'/>
                    <button>Create Account</button>

                    <div className="check">
                        <input type="checkbox" name="" id="" />
                        <span>By clicking continue,you agree to the privacy terms of service</span>
                    </div>
                </div>

                <img src={img} alt="" />
            </div>
        </div>
    </div>
  )
}

export default SignUp