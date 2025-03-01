import React,{useState} from "react";
import { IoMdStar } from "react-icons/io";
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
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const foodsList = [
  { id: 1, name: "Pizza", image: f1, price: 3500, category:'Savory Snacks' },
  { id: 2, name: "Cake", image: f2, price: 2500, category:'Dessert Food' },
  { id: 3, name: "Orange Drink", image: f3, price: 4000, category:'Drinks' },
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

const Foods = () => {

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
    <div className="foods" id="recommend">
      <div className="foods-c">
        {foodsList.map((food) => (
          <div className="food" key={food.id}>
            <div className="food-c">
              <img src={food.image} alt={food.name} />
              <p>{food.category}</p>
              <h6>{food.name}</h6>
              <h5>N{food.price}</h5>
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
        ))}

        <Link className='c-more' to='/categories'><button>See All <IoIosArrowRoundForward className='cm-i'/></button></Link>
      </div>
    </div>
  );
};

export default Foods;
