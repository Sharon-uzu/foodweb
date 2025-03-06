import { Route, Router, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <CartProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/passwordreset' element={<PasswordReset/>}/>

            {/* Admin dashboard */}
            <Route path='/admin' element={<DashHome/>}/>

          </Routes>
      </CartProvider>
      
    </div>
  );
}

export default App;
