import React, { useState, useRef, useEffect } from 'react';
import defaultDp from '../../Assets/Admin photo.png';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import Footer from '../../Components/Footer';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import BarChart from '../VendorsComponents/BarChart';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RiStarSFill } from "react-icons/ri";
import food from '../../Assets/Mask Group.png'
import { MdOutlineCancel } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import img1 from '../../Assets/image 135.png'
import DashGraphs from '../VendorsComponents/DashGraphs';

const reviewsData = [  
  {  
    name: "Jons Sena",  
    date: "2 days ago",  
    content: "I’ve been using this food web service for a few weeks now, and I’m genuinely impressed! The interface is super easy to navigate, and I love how I can filter by cuisine, dietary needs, and even delivery time.",  
    stars: 4.0,  
    image: food,  
    profile:defaultDp,
  },  
  {  
    name: "Jane Hally",  
    date: "3 days ago",  
    content: "The customer service has been fantastic, and my orders are always delivered on time.",  
    stars: 3.0,  
    image: food, 
    profile:defaultDp, 
  }, 
  {  
    name: "Jane Hally",  
    date: "3 days ago",  
    content: "The customer service has been fantastic, and my orders are always delivered on time.",  
    stars: 3.0,  
    image: food, 
    profile:defaultDp, 
  },  
  // Add more reviews as necessary  
];

// Recent History

const transactions = [
  {
    id: 1,
    image: img1,
    number: 'TXN123456',
    food:'Ice cream',
    name: 'John Doe',
    amount: '$120.00',
    date: '2025-04-10',
    paymentType: 'Card',
    status: 'Delivered',
  },
  {
    id: 2,
    image: img1,
    number: 'TXN123457',
    food:'Rice',
    name: 'Jane Smith',
    amount: '$85.50',
    date: '2025-04-11',
    paymentType: 'PayPal',
    status: 'Shipping',
  },
  {
    id: 3,
    image: img1,
    number: 'TXN123458',
    food:'Burger',
    name: 'Alice Johnson',
    amount: '$49.99',
    date: '2025-04-12',
    paymentType: 'Transfer',
    status: 'Cancelled',
  },
  {
    id: 3,
    image: img1,
    number: 'TXN123458',
    food:'Burger',
    name: 'Alice Johnson',
    amount: '$49.99',
    date: '2025-04-12',
    paymentType: 'Transfer',
    status: 'Pending',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return { color: '#0FBF38' };
    case 'Shipping':
      return { color: '#FDB210' };
    case 'Cancelled':
      return { color: '#FF3B30' };
    default:
      return { color: '#ADADAD'};
  }
};

const Homepage = () => {

  const profileRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const toggleAccountDropdown = () => {
        setIsAccountOpen(!isAccountOpen);
        setIsOpen(true);
      };


      const [currentIndex, setCurrentIndex] = useState(0);  
  const [reviewsPerPage, setReviewsPerPage] = useState(2);  

  // Function to update reviews per page based on window size  
  const updateReviewsPerPage = () => {  
    if (window.innerWidth <= 768) {  // Mobile breakpoint  
      setReviewsPerPage(1);  
    } else {  
      setReviewsPerPage(2); // Default to 2 for desktop  
    }  
  };  

  useEffect(() => {  
    updateReviewsPerPage(); // Initial check of screen size  
    window.addEventListener('resize', updateReviewsPerPage); // Add resize event listener  

    return () => {  
      window.removeEventListener('resize', updateReviewsPerPage); // Clean up on component unmount  
    };  
  }, []);  

  const nextReview = () => {  
    if (currentIndex < Math.ceil(reviewsData.length / reviewsPerPage) - 1) {  
      setCurrentIndex(currentIndex + 1);  
    }  
  };  

  const prevReview = () => {  
    if (currentIndex > 0) {  
      setCurrentIndex(currentIndex - 1);  
    }  
  };   


  const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userDetails");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
      
  return (
    <div style={{background:"#fcf9f8"}}>
      <header className='adminheader vendorheader'>
        <nav>

          <ul>          

              <Link to='/' className='h-group'>
                  <FaRegBell className='h-i' style={{color: '#FF7700'}}/>
              </Link>

            {/* Profile Section */}
            <div className='h-group profile' ref={profileRef} onClick={toggleDropdown}>
              
              <img src={defaultDp} alt="Admin Profile" className="profile-image" />


            <div>
              <h5>User</h5> 
                <p>Admin</p>
              </div>
              {isOpen ? <IoIosArrowUp className='h-i'/> : <IoIosArrowDown className='h-i'/>}

                        {/* Dropdown Modal */}
            {isOpen && (
              <div className="profile-dropdown">
              
                  <Link onClick={toggleAccountDropdown}>
                      <div className="prof">
                          <div>
                              <CiUser className='d-i'/>
                              <h5>Account</h5>
                          </div>
                          {isOpen ? <MdKeyboardArrowRight className='d-i'/> : <IoIosArrowDown className='d-i'/>}
                      </div>
                      
                  </Link>

                  <Link to="/profile">
                      <div className="prof">
                          <div>
                              <FaRegBell className='d-i'/>
                              <h5>Notification</h5>
                          </div>
                      </div>
                      
                  </Link>

                  <Link to="/profile">
                      <div className="prof">
                          <div>
                              <CiGlobe className='d-i'/>
                              <h5>App Language</h5>
                          </div>
                      </div>
                      
                  </Link>

                  <Link to="/profile">
                      <div className="prof">
                          <div>
                              <IoIosHelpCircleOutline className='d-i'/>
                              <h5>Help</h5>
                          </div>
                      </div>
                      
                  </Link>

                  <br /><br />

                  <Link to="/profile">

                      <div className="prof">
                          <div>
                              <IoIosLogOut className='d-i'/>
                              <h5>Log Out</h5>
                          </div>
                      </div>
                      
                  </Link>
                  
              </div>
            )}


            {isAccountOpen && (
              <div className="profile-dropdown acct-dropdown">
              
                <h3>User</h3>
                <h3>user@gmail.com</h3>
                <Link to='/signin'><button>Login another account</button></Link>
                <div><button className='btn2' onClick={toggleAccountDropdown}>Close</button></div>
                <Link style={{color:'#FF7700'}} to='/signin'>LogOut</Link>

                  
              </div>
            )}
            </div>


          </ul>
        </nav>
      </header>

      <div className="main vendormain">  
          <VendorsSidebar />  
          <div className="main-right">  
              <div className="home-contents">
                <div className="home-l">

                  <div className="plan-btn">
                    <button>Buy Plan</button>
                  </div>
                  
                  <div style={{background:'#fff', paddingBottom:'15px', borderRadius:'6px'}}>

                    <div className="vendor-cards">

                      <div className="vc">
                        <div className="vcc">
                          <div className="vc-l">
                            <h4>Total Revenue</h4>
                            <h2>25.1k</h2>
                            <div className="num">
                              <BsArrowUpRightCircleFill className='v-arr'/>
                              <span>+15%</span>
                            </div>
                          </div>

                          <div className="vc-r">
                          <svg width="22" height="29" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.01058 11.5355L1.47519 9.00093C1.0844 8.61027 1.08435 7.97676 1.47508 7.58604C1.8658 7.19532 2.49931 7.19537 2.88997 7.58615L5.42458 10.1215H20.6666C20.8224 10.1215 20.9762 10.158 21.1154 10.2279C21.2547 10.2979 21.3757 10.3994 21.4688 10.5244C21.5619 10.6495 21.6244 10.7945 21.6515 10.948C21.6785 11.1015 21.6693 11.2592 21.6246 11.4085L19.2246 19.4085C19.1628 19.6146 19.0363 19.7953 18.8637 19.9237C18.6911 20.0522 18.4817 20.1216 18.2666 20.1215H6.01058V22.1215H16.0106C16.5629 22.1215 17.0106 22.5693 17.0106 23.1215C17.0106 23.6738 16.5629 24.1215 16.0106 24.1215H5.01058C4.74536 24.1215 4.49101 24.0162 4.30347 23.8286C4.11594 23.6411 4.01058 23.3868 4.01058 23.1215V11.5355ZM6.01058 12.1215V18.1215H17.5226L19.3226 12.1215H6.01058ZM5.51058 28.1215C5.11275 28.1215 4.73122 27.9635 4.44992 27.6822C4.16861 27.4009 4.01058 27.0194 4.01058 26.6215C4.01058 26.2237 4.16861 25.8422 4.44992 25.5609C4.73122 25.2796 5.11275 25.1215 5.51058 25.1215C5.9084 25.1215 6.28993 25.2796 6.57124 25.5609C6.85254 25.8422 7.01058 26.2237 7.01058 26.6215C7.01058 27.0194 6.85254 27.4009 6.57124 27.6822C6.28993 27.9635 5.9084 28.1215 5.51058 28.1215ZM17.5106 28.1215C17.1128 28.1215 16.7312 27.9635 16.4499 27.6822C16.1686 27.4009 16.0106 27.0194 16.0106 26.6215C16.0106 26.2237 16.1686 25.8422 16.4499 25.5609C16.7312 25.2796 17.1128 25.1215 17.5106 25.1215C17.9084 25.1215 18.2899 25.2796 18.5712 25.5609C18.8525 25.8422 19.0106 26.2237 19.0106 26.6215C19.0106 27.0194 18.8525 27.4009 18.5712 27.6822C18.2899 27.9635 17.9084 28.1215 17.5106 28.1215Z" fill="#04103B"/>
                            <path d="M10.6465 4.35559L13.1236 1.87848L15.6007 4.35559" stroke="#04103B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.1156 1.88603V8.58199" stroke="#04103B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <a href="">View Report</a>
                          </div>
                        </div>
                      </div>

                      <div className="vc" style={{background:'#FEE795'}}>
                        <div className="vcc">
                          <div className="vc-l">
                            <h4>Total Products</h4>
                            <h2>25.1k</h2>
                            <div className="num">
                              <BsArrowUpRightCircleFill className='v-arr' style={{color:'#D1B242'}}/>
                              <span>+15%</span>
                            </div>
                          </div>

                          <div className="vc-r">
                          <svg width="22" height="29" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.01058 11.5355L1.47519 9.00093C1.0844 8.61027 1.08435 7.97676 1.47508 7.58604C1.8658 7.19532 2.49931 7.19537 2.88997 7.58615L5.42458 10.1215H20.6666C20.8224 10.1215 20.9762 10.158 21.1154 10.2279C21.2547 10.2979 21.3757 10.3994 21.4688 10.5244C21.5619 10.6495 21.6244 10.7945 21.6515 10.948C21.6785 11.1015 21.6693 11.2592 21.6246 11.4085L19.2246 19.4085C19.1628 19.6146 19.0363 19.7953 18.8637 19.9237C18.6911 20.0522 18.4817 20.1216 18.2666 20.1215H6.01058V22.1215H16.0106C16.5629 22.1215 17.0106 22.5693 17.0106 23.1215C17.0106 23.6738 16.5629 24.1215 16.0106 24.1215H5.01058C4.74536 24.1215 4.49101 24.0162 4.30347 23.8286C4.11594 23.6411 4.01058 23.3868 4.01058 23.1215V11.5355ZM6.01058 12.1215V18.1215H17.5226L19.3226 12.1215H6.01058ZM5.51058 28.1215C5.11275 28.1215 4.73122 27.9635 4.44992 27.6822C4.16861 27.4009 4.01058 27.0194 4.01058 26.6215C4.01058 26.2237 4.16861 25.8422 4.44992 25.5609C4.73122 25.2796 5.11275 25.1215 5.51058 25.1215C5.9084 25.1215 6.28993 25.2796 6.57124 25.5609C6.85254 25.8422 7.01058 26.2237 7.01058 26.6215C7.01058 27.0194 6.85254 27.4009 6.57124 27.6822C6.28993 27.9635 5.9084 28.1215 5.51058 28.1215ZM17.5106 28.1215C17.1128 28.1215 16.7312 27.9635 16.4499 27.6822C16.1686 27.4009 16.0106 27.0194 16.0106 26.6215C16.0106 26.2237 16.1686 25.8422 16.4499 25.5609C16.7312 25.2796 17.1128 25.1215 17.5106 25.1215C17.9084 25.1215 18.2899 25.2796 18.5712 25.5609C18.8525 25.8422 19.0106 26.2237 19.0106 26.6215C19.0106 27.0194 18.8525 27.4009 18.5712 27.6822C18.2899 27.9635 17.9084 28.1215 17.5106 28.1215Z" fill="#04103B"/>
                            <path d="M10.6465 4.35559L13.1236 1.87848L15.6007 4.35559" stroke="#04103B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.1156 1.88603V8.58199" stroke="#04103B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <a href="">View Report</a>
                          </div>
                        </div>
                      </div>

                      <div className="vc" style={{background: '#FFD8E4'}}>
                        <div className="vcc">
                          <div className="vc-l">
                            <h4>Total Order</h4>
                            <h2>106</h2>
                            <div className="num">
                              <BsArrowUpRightCircleFill className='v-arr' style={{color: '#FF004E'}}/>
                              <span>+15%</span>
                            </div>
                          </div>

                          <div className="vc-r">
                          <svg width="22" height="29" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.01058 11.5355L1.47519 9.00093C1.0844 8.61027 1.08435 7.97676 1.47508 7.58604C1.8658 7.19532 2.49931 7.19537 2.88997 7.58615L5.42458 10.1215H20.6666C20.8224 10.1215 20.9762 10.158 21.1154 10.2279C21.2547 10.2979 21.3757 10.3994 21.4688 10.5244C21.5619 10.6495 21.6244 10.7945 21.6515 10.948C21.6785 11.1015 21.6693 11.2592 21.6246 11.4085L19.2246 19.4085C19.1628 19.6146 19.0363 19.7953 18.8637 19.9237C18.6911 20.0522 18.4817 20.1216 18.2666 20.1215H6.01058V22.1215H16.0106C16.5629 22.1215 17.0106 22.5693 17.0106 23.1215C17.0106 23.6738 16.5629 24.1215 16.0106 24.1215H5.01058C4.74536 24.1215 4.49101 24.0162 4.30347 23.8286C4.11594 23.6411 4.01058 23.3868 4.01058 23.1215V11.5355ZM6.01058 12.1215V18.1215H17.5226L19.3226 12.1215H6.01058ZM5.51058 28.1215C5.11275 28.1215 4.73122 27.9635 4.44992 27.6822C4.16861 27.4009 4.01058 27.0194 4.01058 26.6215C4.01058 26.2237 4.16861 25.8422 4.44992 25.5609C4.73122 25.2796 5.11275 25.1215 5.51058 25.1215C5.9084 25.1215 6.28993 25.2796 6.57124 25.5609C6.85254 25.8422 7.01058 26.2237 7.01058 26.6215C7.01058 27.0194 6.85254 27.4009 6.57124 27.6822C6.28993 27.9635 5.9084 28.1215 5.51058 28.1215ZM17.5106 28.1215C17.1128 28.1215 16.7312 27.9635 16.4499 27.6822C16.1686 27.4009 16.0106 27.0194 16.0106 26.6215C16.0106 26.2237 16.1686 25.8422 16.4499 25.5609C16.7312 25.2796 17.1128 25.1215 17.5106 25.1215C17.9084 25.1215 18.2899 25.2796 18.5712 25.5609C18.8525 25.8422 19.0106 26.2237 19.0106 26.6215C19.0106 27.0194 18.8525 27.4009 18.5712 27.6822C18.2899 27.9635 17.9084 28.1215 17.5106 28.1215Z" fill="#04103B"/>
                            <path d="M10.6465 4.35559L13.1236 1.87848L15.6007 4.35559" stroke="#04103B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.1156 1.88603V8.58199" stroke="#04103B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <a href="">View Report</a>
                          </div>
                        </div>
                      </div>


                    </div>

                    <div className="vendorchart1">
                      <div className="vendorchart-c">
                        <BarChart/>
                      </div>
                      
                    </div>

                    <div className="customer-review">
                      <div className="cr-c">
                        <div className="cr-top">
                          <div>
                            <h1>Customer Review</h1>
                            
                          </div>

                          <div className="pagination">  
                            <div className="arr" onClick={prevReview} disabled={currentIndex === 0}>  
                              <IoIosArrowBack className='arrr-i' />  
                            </div>  
                            <div className="arr" onClick={nextReview} disabled={currentIndex >= Math.ceil(reviewsData.length / reviewsPerPage) - 1}>  
                              <IoIosArrowForward className='arrr-i' />  
                            </div>  
                          </div>    

                        </div>

                        <div className="main-review">  
                            {reviewsData.slice(currentIndex * reviewsPerPage, currentIndex * reviewsPerPage + reviewsPerPage).map((review, index) => (  
                              <div className="review1" key={index}>  
                                <div className="review">  
                                  <div className="rev-l">  
                                    <div className='profile'>  
                                      <img src={review.profile} alt="" />  
                                      <div>  
                                        <h5>{review.name}</h5>  
                                        <p>{review.date}</p>  
                                      </div>  
                                    </div>  

                                    <div className="r-content">  
                                      <p>"{review.content}"</p>  
                                      <div className="r-stars">  
                                        {[...Array(5)].map((_, starIndex) =>   
                                          <RiStarSFill key={starIndex} className={`rss  ${starIndex < review.stars ? 'rs' : 'inactive'}`} />  
                                        )}  
                                        <span>{review.stars}</span>  
                                      </div>  
                                    </div>  
                                  </div>  
                                  
                                  <div className="rev-r">  
                                    <img src={review.image} alt="" />  
                                  </div>  
                                </div>  
                              </div>  
                            ))}  
                        </div>  

                      </div>  
                    </div> 

                    <div className="recent-act">
                      <div className="recent-c">
                        <h1>Recent</h1>
                        {transactions.map((tx) => (
                        <div key={tx.id} className="r-row">
                          <div className="r-rc">
                            <div className="rd">
                              <img src={tx.image} alt="" />
                              <div>
                                <h4>{tx.number}</h4>
                                <p>{tx.food}</p>
                              </div>
                            </div>
                            <p className='pp'>{tx.name}</p>
                            <p className='pp'>{tx.amount}</p>
                            <p className='pp'>{tx.date}</p>
                            <p className='pp' style={{color:'#FF7700'}}>{tx.paymentType}</p>
                            <p className={`pp status ${tx.status.toLowerCase()}`} style={{ ...getStatusColor(tx.status) }}>{tx.status}</p>
                            <p className='pp pp1'><FaRegEye/></p>
                            <p className='pp pp1'><MdOutlineCancel/></p>
                          </div>
                        </div>
                        ))}
                      </div>
                    </div>

                  </div>  
                </div>

                <div className="home-r">    
                  <DashGraphs/>
                </div>

              </div>
 
            {/* <Footer />   */}
          </div>  
      </div>  
    </div>
  )
}

export default Homepage