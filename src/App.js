import { useEffect, useState } from 'react';  
import { Route, Routes, useNavigate } from 'react-router-dom'; 
import { Navigate } from 'react-router-dom';
import './App.css';  
import Home from './Screens/Home';  
import Cart from './Screens/Cart';  
import Categories from './Screens/Categories';  
import Contact from './Screens/Contact';  
import { CartProvider } from "./CartContext";  
import SignUp from './Screens/SignUp';  
import SignIn from './Screens/SignIn';  
import PasswordReset from './Screens/PasswordReset';  
import DashHome from './Dashboard/DashScreens/DashHome';  
import Meals from './Dashboard/DashScreens/Meals';  
import Orders from './Dashboard/DashScreens/Orders';  
import Sales from './Dashboard/DashScreens/Sales';  
import Tables from './Dashboard/DashScreens/Tables';  
import Users from './Dashboard/DashScreens/Users';  
import { Supabase } from './config/supabase-config';  
import OrderSuccess from './Screens/OrderSuccess';
import Pricing from './Screens/Pricing';
import Homepage from './VendorDashboard/VendorsScreen/Homepage';
import AddProducts from './VendorDashboard/VendorsScreen/AddProducts';
import VendorsOrders from './VendorDashboard/VendorsScreen/VendorsOrders';
import VendorLogout from './VendorDashboard/VendorsScreen/VendorLogout';
import Account from './VendorDashboard/VendorsScreen/Account';
import VendorService from './VendorDashboard/VendorsScreen/VendorService';
import ScanPoint from './VendorDashboard/VendorsScreen/ScanPoint';
import VendorFinance from './VendorDashboard/VendorsScreen/VendorFinance';
import Notification from './VendorDashboard/VendorsScreen/Notification';
import {Provider} from "react-redux"
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider, useAuth } from './state/AuthContext'; 
import { store } from './redux-state/store';

function App() {  
  const { user } = useAuth(); // Gets current auth state
  const navigate = useNavigate();

  // Optional: handle side effects, e.g., redirect on auth change
//   useEffect(() => {
//     if (!user && window.location.pathname.startsWith('/vendor')) {
//       // If user is not logged in, redirect to sign-in when accessing protected routes
//       navigate('/signin');
//     }
//   }, [user, navigate]);

    return (  
        <Provider store={store}>
            <AuthProvider>
                <div className="App">  
                    <CartProvider>   
                        <Routes>  
                            <Route path='/' element={<Home />} />  
                            <Route path='/cart' element={<Cart />} />  
                            <Route path='/categories' element={<Categories />} />  
                            <Route path='/contact' element={<Contact />} />  
                            <Route path='/signup' element={<SignUp />} />
                            <Route path='/pricing' element={<Pricing />} />
                            <Route path='/ordersuccess' element={<OrderSuccess />} />  
                            <Route path="/signin" element={<SignIn/>} />
                            <Route path='/passwordreset' element={<PasswordReset />} />  

                            {/* Vendor dashboard */}
                            {/* protecting our route */}

                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                    <Homepage />
                                    </ProtectedRoute>
                                }
                                />  

                                
                            

                                <Route
                                    path="/vendor-service"
                                    element={
                                        <ProtectedRoute>
                                            <VendorService />
                                        </ProtectedRoute>
                                    }
                                />  
                            {/* <Route 
                                path="/vendor" 
                                element={loggedIn ? <Homepage userDetails={userDetails} /> : <Navigate to="/signin" />} 
                            />
                            <Route 
                                path="/vendor-service" 
                                element={loggedIn ? <VendorService userDetails={userDetails} /> : <Navigate to="/signin" />} 
                            /> */}

                            <Route path='/addproducts' element={<AddProducts />} />
                            <Route path='/vendors-orders' element={<VendorsOrders />} />
                            <Route path='/vlogout' element={<VendorLogout />} />
                            <Route path='/account' element={<Account />} />
                            {/* <Route path='/vendor-service' element={<VendorService />} /> */}
                            <Route path='/scanpoint' element={<ScanPoint />} />
                            <Route path='/vendor-finance' element={<VendorFinance />} />
                            <Route path='/vendor-notification' element={<Notification />} />



                            {/* Admin dashboard */}  
                            {/* {loggedIn && (  
                                <>  
                                    <Route path='/admin' element={<DashHome userDetails={userDetails} profileImage={profileImage} />} />  
                                    <Route path='/meals' element={<Meals userId={userDetails?.id} userDetails={userDetails} profileImage={profileImage}/>} />  
                                    <Route path='/orders' element={<Orders userDetails={userDetails} profileImage={profileImage}/>} />  
                                    <Route path='/sales' element={<Sales userId={userDetails?.id} userDetails={userDetails} profileImage={profileImage}/>} />  
                                    <Route path='/table' element={<Tables userId={userDetails?.id} userDetails={userDetails} profileImage={profileImage}/>} />  
                                    <Route path='/users' element={<Users userId={userDetails?.id} userDetails={userDetails} profileImage={profileImage}/>} />  
                                </>  
                            )}   */}
                        </Routes>       
                    </CartProvider>  
                </div> 
            </AuthProvider> 
        </Provider>
    );  
}  

export default App;  