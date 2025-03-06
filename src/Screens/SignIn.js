import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import img from '../Assets/sign.png'
import gg from '../Assets/google.png'
import fb from '../Assets/faceb.png'
import img1 from '../Assets/sec.png'

const SignIn = () => {
    const [first, setFirst]= useState(true)
    const [second, setSecond]= useState(false)

    function next() {
        setFirst(false)
        setSecond(true)
    }

    function prev() {
        setFirst(true)
        setSecond(false)
    }

  return (
    <div className='sign sign-c'>
        <div className="membership">
            
            <div className="member-form">
            { first ? (<>
                <div className="l-form">
                <Link to='/'><img src={logo} alt="" className='f-logo'/></Link>

                    <p>Sign in to continue with...</p>

                    
                    <div className="sel">
                        <img src={gg} alt="" />
                        <span>Continue with Google</span>
                    </div>
                    <div className="sel">
                        <img src={fb} alt="" />
                        <span>Continue with Facebook</span>
                    </div>
                    <div className="or">
                        <h6></h6>
                        <span>or login</span>
                        <h6></h6>
                    </div>
                    <input type="email" placeholder='Email' className='inp'/>
                    <button onClick={next}>Continue</button>

                    <div className="check">
                        <input type="checkbox" name="" id="" />
                        <span>By clicking continue,you agree to the privacy terms of service</span>
                    </div>
                </div>

                <img src={img} className='form-img' />
                </>) : null
            }

            { second ? (<>
                <div className="l-form">
                    <Link to='/'><img src={logo} alt="" className='f-logo'/></Link>

                    <p>Sign in to continue with...</p>
                    <input type="password" placeholder='Enter password' className='inp'/>
                    <Link to='/passwordreset'><h5>Forgot password?</h5></Link>

                    <div className="btns">
                        <button onClick={prev} className='canc'>Cancel</button>
                        <button>Sign in</button>
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

export default SignIn