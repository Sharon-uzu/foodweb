import React, {useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";import Header from '../Components/Header';
import { IoIosArrowForward } from "react-icons/io";
import f1 from "../Assets/Food Photo (1).png";
import f2 from "../Assets/Food Photo (2).png";
import f3 from "../Assets/Food Photo (3).png";
import f4 from "../Assets/Food Photo (4).png";
import f5 from "../Assets/Food Photo (5).png";
import f6 from "../Assets/Food Photo (6).png";
import f7 from "../Assets/Food Photo.png";
import f8 from "../Assets/Food Photo (1).png";
import f9 from "../Assets/Food Photo (2).png";
import f10 from "../Assets/Food Photo (3).png";
import f11 from "../Assets/Food Photo (4).png";
import f12 from "../Assets/Food Photo (5).png";
import { IoMdStar } from "react-icons/io";
import Footer from '../Components/Footer';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosSquareOutline } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";
import { useCart } from "../CartContext";

const foodsList = [
    { id: 1, name: "Pizza", image: f1, price: 3500, category:'Savory Snacks' },
    { id: 2, name: "Cake", image: f2, price: 2500, category:'Dessert Food' },
    { id: 3, name: "Orange Drinks", image: f3, price: 4000, category:'Drinks' },
    { id: 4, name: "Rice", image: f4, price: 5000, category:'Food' },
    { id: 5, name: "Burger", image: f5, price: 7500, category:'Savory Snacks' },
    { id: 6, name: "Ice cream", image: f6, price: 2000, category:'Dessert Food' },
    { id: 7, name: "Pizza", image: f7, price: 3000, category:'Savory Snacks' },
    { id: 8, name: "Sharwama", image: f8, price: 1500, category:'Savory Snacks' },
    { id: 9, name: "Cake", image: f9, price: 2800, category:'Dessert Food' },
    { id: 10, name: "Orange Drink", image: f10, price: 3200, category:'Drinks' },
    { id: 11, name: "Rice", image: f11, price: 3600, category:'Food' },
    { id: 12, name: "Burger", image: f12, price: 1800, category:'Savory Snacks' },
];

const categoryList = ["All", "Swallow", "Dessert Food", "Food", "Savory Snacks", "Drinks"];
const sortOptions = ["Popularity", "Newest Arrivals", "Product Ratings"];

const Categories = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = "auto";
    }, [pathname]);



    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Popularity");
    const [showSortOptions, setShowSortOptions] = useState(false);

    const filteredFoods = activeCategory === "All" 
        ? foodsList 
        : foodsList.filter(food => food.category === activeCategory);



        const [isDropdownOpen, setDropdownOpen] = useState(false);

        const [click, setClick] = useState(false);
        const handleClick = () => {
          setClick(!click);
          setDropdownOpen(!isDropdownOpen);
          document.body.style.overflow = click ? 'auto' : 'hidden'; // Disable or enable scrolling
      
        }
        const closeMenuBar = () => {
            setClick(false);
        
          };
        
          const [isOpen, setIsOpen] = useState(false);
          const toggleModal = () => {
              setIsOpen(!isOpen);
          };


          const { addToCart } = useCart();
            const [buttonState, setButtonState] = useState({}); // Track button state per item

            const handleAddToCart = (food) => {
                setButtonState((prev) => ({ ...prev, [food.id]: "adding" }));

                setTimeout(() => {
                    addToCart(food); // ✅ Ensure the correct function is called
                    setButtonState((prev) => ({ ...prev, [food.id]: "done" }));

                    setTimeout(() => {
                        setButtonState((prev) => ({ ...prev, [food.id]: "" }));
                    }, 1000);
                }, 2000);
            };


    return (
        <div>
            <Header />

            <div className="menu">
                <div className="menu-c">
                    <h4>Menu</h4>
                    <h3>Blake App [{filteredFoods.length} Products]</h3>
                    <p onClick={() => setShowSortOptions(!showSortOptions)} style={{ cursor: 'pointer' }}>
                        Sorted by: <span>{sortBy} <IoIosArrowForward className='p-i' /></span>
                    </p>
                    {showSortOptions && (
                        <div className="sort-options" style={{ position: 'absolute', background: '#fff', borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
                            <div className="by"><h3>Sort by: {sortBy} <MdOutlineKeyboardArrowDown className='sort-i'/></h3></div>
                            {sortOptions.map((option, index) => (
                                <p key={index} onClick={() => { setSortBy(option); setShowSortOptions(false); }} style={{ padding: '5px', cursor: 'pointer' }}><IoIosSquareOutline className='sp-i'/>{option}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className='cat-menu' onClick={handleClick}>
                    {click ? (<RiCloseFill id='close' />) : (<BiMenuAltLeft id='bar' />)}
            </div>

            <div className="main-category">
                <div className={click ? 'cat-sidebar active' : 'cat-sidebar'}>
                    <div className="category-sidebar">
                        <h4>Categories</h4>
                        {categoryList.map((category, index) => (
                            <div 
                                key={index} 
                                className={`list ${activeCategory === category ? "active-category" : ""}`} 
                                onClick={() => setActiveCategory(category)}
                                style={{
                                    cursor: "pointer",
                                    background: activeCategory === category ? "#ff8c00" : "#D2D1D1",
                                    color: activeCategory === category ? "#fff" : "#000",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    marginBottom: "5px"
                                }}
                            >
                                <div className="list-c" onClick={closeMenuBar}>
                                    <h5>{category}</h5>
                                    <IoIosArrowForward className='l-i' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="foods">
                    <div className="foods-c">
                        <h2>Our Menu</h2>
                        {filteredFoods.length === 0 ? (
                            <p>No items available for this category.</p>
                        ) : (
                            filteredFoods.map((food) => (
                                <div className="food" key={food.id}>
                                    <div className="food-c">
                                        <img src={food.image} alt={food.name} />
                                        <p>{food.category}</p>
                                        <h6>{food.name}</h6>
                                        <h5>{food.price}</h5>
                                        <div className="stars">
                                            <IoMdStar className="s-i" />
                                            <IoMdStar className="s-i" />
                                            <IoMdStar className="s-i" />
                                            <IoMdStar className="s-i" />
                                        </div>
                                        <button 
                                            onClick={() => handleAddToCart(food)} 
                                            disabled={buttonState[food.id] === "adding"}
                                        >
                                            {buttonState[food.id] === "adding"
                                            ? "Adding..."
                                            : buttonState[food.id] === "done"
                                            ? "Done!"
                                            : "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Categories;
