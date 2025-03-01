import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Screens/Home';
import Cart from './Screens/Cart';
import Categories from './Screens/Categories';
import Contact from './Screens/Contact';
import { CartProvider } from "./CartContext";

function App() {
  return (
    <div className="App">
      <CartProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/contact' element={<Contact/>}/>
          </Routes>
      </CartProvider>
      
    </div>
  );
}

export default App;
