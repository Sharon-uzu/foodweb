import { useEffect, useState } from 'react';  
import { Route, Routes, useNavigate } from 'react-router-dom';  
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

function App() {  
    const navigate = useNavigate();  
    const [loggedIn, setLoggedIn] = useState(false);  
    const [userDetails, setUserDetails] = useState(null);  
    const [profileImage, setProfileImage] = useState(null);  

    useEffect(() => {  
        const storedUserDetails = localStorage.getItem('userDetails');  
        if (storedUserDetails) {  
            const parsedUserDetails = JSON.parse(storedUserDetails);  
            setLoggedIn(true);  
            setUserDetails(parsedUserDetails);  

            // Fetch profile image  
            fetchProfileImage(parsedUserDetails.image);  
        } else {  
            const checkSession = async () => {  
                const { data: { session } } = await Supabase.auth.getSession();  
                if (session) {  
                    const { data, error } = await Supabase  
                        .from("food-web-admin")  
                        .select("id, email, business, image")  
                        .eq("email", session.user.email)  
                        .single();  
            
                    if (error) {  
                        console.error("Error fetching user data:", error.message);  
                        return;  
                    }  
            
                    if (data) {  
                        setLoggedIn(true);  
                        setUserDetails(data);  
                        localStorage.setItem("userDetails", JSON.stringify(data));  

                        // Fetch profile image  
                        fetchProfileImage(data.image);  
                    }  
                } else {  
                    setLoggedIn(false);  
                    setUserDetails(null);  
                }  
            };  
            checkSession();  
        }  
    }, []);  

    const fetchProfileImage = async (imageFileName) => {  
        if (imageFileName) {  
            const { data } = Supabase  
                .storage  
                .from("food-logo")  
                .getPublicUrl(imageFileName);  
            if (data?.publicUrl) {  
                setProfileImage(data.publicUrl);  
            }  
        }  
    };  

    // Sign out function  
    const signOut = async () => {  
        await Supabase.auth.signOut();  
        setLoggedIn(false);  
        setUserDetails(null);  
        localStorage.removeItem("userDetails"); // Clear user details from local storage  
        navigate('/signin'); // Redirect to sign-in page  
    };  

    return (  
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
                    <Route path='/signin' element={<SignIn setLoggedIn={setLoggedIn} setUserDetails={setUserDetails} />} />  
                    <Route path='/passwordreset' element={<PasswordReset />} />  

                    {/* Vendor dashboard */}
                    <Route path='/vendor' element={<Homepage />} />
                    <Route path='/addproducts' element={<AddProducts />} />
                    <Route path='/vendors-orders' element={<VendorsOrders />} />
                    <Route path='/vlogout' element={<VendorLogout />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/vendor-service' element={<VendorService />} />
                    <Route path='/scanpoint' element={<ScanPoint />} />
                    <Route path='/vendor-finance' element={<VendorFinance />} />


                    {/* Admin dashboard */}  
                    {loggedIn && (  
                        <>  
                            <Route path='/admin' element={<DashHome userDetails={userDetails} profileImage={profileImage} />} />  
                            <Route path='/meals' element={<Meals userId={userDetails?.id} userDetails={userDetails} profileImage={profileImage}/>} />  
                            <Route path='/orders' element={<Orders userDetails={userDetails} profileImage={profileImage}/>} />  
                            <Route path='/sales' element={<Sales userId={userDetails?.id} userDetails={userDetails} profileImage={profileImage}/>} />  
                            <Route path='/table' element={<Tables userId={userDetails?.id} userDetails={userDetails} profileImage={profileImage}/>} />  
                            <Route path='/users' element={<Users userId={userDetails?.id} userDetails={userDetails} profileImage={profileImage}/>} />  
                        </>  
                    )}  
                </Routes>       
            </CartProvider>  
        </div>  
    );  
}  

export default App;  