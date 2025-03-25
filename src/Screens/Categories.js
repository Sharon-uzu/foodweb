import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSquareOutline,
} from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { useCart } from "../CartContext";
import { FiSearch } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Supabase } from "../config/supabase-config";


// const categoryList = ["All", "Swallow", "Dessert Food", "Food", "Savory Snacks", "Drinks"];
const sortOptions = ["Popularity", "Newest Arrivals", "Product Ratings"];

const Categories = () => {
  const location = useLocation();
  const { cart, addToCart, clearCart } = useCart();
  const { pathname } = useLocation();
  const params = new URLSearchParams(location.search);
  const vendorId = params.get("vendorId");
  const TableNumber = params.get("tableNumber");
  const businessName = params.get("business") || "Vendor"; // Fallback name
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [buttonState, setButtonState] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [categoryList, setCategoryList] = useState(["All"]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    document.body.style.overflow = click ? "auto" : "hidden"; // Disable or enable scrolling
  };
  const closeMenuBar = () => {
    setClick(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!vendorId) return;

      const { data, error } = await Supabase.from("food-web-meals")
        .select("category")
        .eq("adminid", vendorId); // ✅ Correct column name

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        const categories = [
          "All",
          ...new Set(data.map((meal) => meal.category).filter(Boolean)),
        ];
        setCategoryList(categories);
      }
    };

    fetchCategories();
  }, [vendorId]);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!vendorId) return;

      const { data, error } = await Supabase.from("food-web-meals")
        .select("*")
        .eq("adminid", vendorId);

      if (error) {
        console.error("Error fetching meals:", error);
      } else {
        // Ensure mealprice is stored as a number
        const formattedMeals = data.map((meal) => ({
          ...meal,
          mealprice: Number(meal.mealprice) || 0,
        }));

        setMeals(formattedMeals);
      }
      setTimeout(() => setIsLoading(false), 1500); 

    };

    fetchMeals();
  }, [vendorId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, [pathname]);

  const filteredMeals =
    activeCategory === "All"
      ? meals
      : meals.filter((meal) => meal.category === activeCategory);

      const handleAddToCart = (meal) => {  
        if (cart.length > 0) {  
            const existingVendorId = cart[0].adminid; // Get the vendor ID from the first item in the cart  
            if (existingVendorId !== meal.adminid) {  
                setSelectedMeal(meal); // Store the selected meal for showing in the modal  
                setShowModal(true); // Show modal  
                return;  
            }  
        }  
    
        addMealToCart(meal);  
    };  
    
    const addMealToCart = (meal) => {  
        setButtonState((prev) => ({ ...prev, [meal.id]: "adding" }));  
        setTimeout(() => {  
            // Add the vendorId to the meal object when adding to the cart  
            addToCart({   
                ...meal,   
                price: Number(meal.mealprice) || 0,   
                quantity: 1,  
                adminid: meal.adminid // Include vendor ID when adding to cart  
            });  
            setButtonState((prev) => ({ ...prev, [meal.id]: "done" }));  
            setTimeout(() => setButtonState((prev) => ({ ...prev, [meal.id]: "" })), 1000);  
        }, 1000);  
    };  

      const handleProceedToCart = () => {
        navigate('/cart?table=false'); // Redirect to cart page
      };
    
      const handleClearCart = () => {
        clearCart(); // Clear the cart
        setShowModal(false); // Close modal
        if (selectedMeal) {
          addMealToCart(selectedMeal); // Add the selected meal after clearing cart
        }
      };

  return (
    <div>
      {console.log(TableNumber)}
      <div className="search-header header2">
        <div className="shc">
          <h4>
            <Link to="/">
              <IoIosArrowBack className="s-ii" />
            </Link>
            {businessName}
          </h4>
          <div className="s-cart">
            <FiSearch className="sc-i" />
            {/* <Link
              to={`/cart?table=${TableNumber ? TableNumber : false}`}
              className={`h-group ${
                location.pathname ===
                `/cart`
                  ? "active"
                  : ""
              }`}
              style={{ color: "#fff" }}
            > */}

            <Link  
                to={`/cart?table=${TableNumber ? TableNumber : 'false'}`}  // Ensure 'false' is passed as a string  
                className={`h-group ${location.pathname === `/cart` ? "active" : ""}`}  
                style={{ color: "#fff" }}  
            >
              <IoCartOutline className="sc-i" />
              <span className="cart-count">{cart.length}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="menu">
        <div className="menu-c">
          <h4>Menu</h4>
          <h3>{businessName} [{filteredMeals.length} Products]</h3>
          <p
            onClick={() => setShowSortOptions(!showSortOptions)}
            style={{ cursor: "pointer" }}
          >
            Sorted by:{" "}
            <span>
              {sortBy} <IoIosArrowForward className="p-i" />
            </span>
          </p>
          {showSortOptions && (
            <div
              className="sort-options"
              style={{
                position: "absolute",
                background: "#fff",
                borderRadius: "5px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <div className="by">
                <h3>
                  Sort by: {sortBy}{" "}
                  <MdOutlineKeyboardArrowDown className="sort-i" />
                </h3>
              </div>
              {sortOptions.map((option, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSortBy(option);
                    setShowSortOptions(false);
                  }}
                  style={{ padding: "5px", cursor: "pointer" }}
                >
                  <IoIosSquareOutline className="sp-i" />
                  {option}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="main-category">
        <div className={click ? "cat-sidebar active" : "cat-sidebar"}>
          <div className="category-sidebar">
            <h4>Categories</h4>
            {categoryList.map((category, index) => (
              <div
                key={index}
                className={`list ${
                  activeCategory === category ? "active-category" : ""
                }`}
                onClick={() => setActiveCategory(category)}
                style={{
                  cursor: "pointer",
                  background:
                    activeCategory === category ? "#ff8c00" : "#D2D1D1",
                  color: activeCategory === category ? "#fff" : "#000",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <div className="list-c">
                  <h5>{category}</h5>
                  <IoIosArrowForward className="l-i" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {isLoading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    {/* <p>Loading delicious meals...</p> */}
                </div>
            ) : (
                <div className="foods">
                <div className="foods-c">
                    <h2>
                    Our Menu -{" "}
                    {activeCategory === "All" ? "All Items" : activeCategory}
                    </h2>

                    {filteredMeals.length > 0 ? (  
                        filteredMeals.map((meal) => {  
                            const isInCart = cart.some((item) => item.id === meal.id);  
                            const isTableNumberValid = TableNumber && TableNumber !== "false"; // Check if TableNumber is valid  

                            return (  
                                <div  
                                    style={{ cursor: "pointer" }}  
                                    className="food"  
                                    key={meal.id}  
                                    onClick={() => handleAddToCart(meal)}  
                                >  
                                    <div className="food-c">  
                                        <img src={meal.image} alt={meal.mealname} />  
                                        <h6>{meal.mealname}</h6>  
                                        <h5>₦{Number(meal.mealprice).toFixed(2)}</h5>  

                                        {isTableNumberValid && (  
                                            <button  
                                                disabled={isInCart || buttonState[meal.id] === "adding"}  
                                                style={{  
                                                    opacity: isInCart ? 0.3 : 1,  
                                                    transition: "opacity 0.3s",  
                                                }}  
                                            >  
                                                {buttonState[meal.id] === "adding"  
                                                    ? "Adding..."  
                                                    : isInCart  
                                                    ? "In Cart"  
                                                    : "Add to Cart"}  
                                            </button>  
                                        )}  
                                    </div>  
                                </div>  
                            );  
                        })  
                    ) : (  
                        <p>No meals found for this category.</p>  
                    )}  
                </div>
              </div>
            )}
      </div>

      {showModal && (
        <div className="cart-modal">
          <div className="cart-modal-content">
          <p className="cart-close-btn" onClick={() => setShowModal(false)}>X</p>
            <p>You can only order from one vendor at a time.</p>
            <button className="cart-btn" onClick={handleProceedToCart}>Proceed to Checkout</button>
            <button className="cart-clear-btn" onClick={handleClearCart}>Clear Cart</button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
