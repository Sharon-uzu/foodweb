import React from "react";
import { IoMdStar } from "react-icons/io";
import p1 from "../Assets/Testimonial Photo.png";
import p2 from "../Assets/Testimonial Photo (1).png";
import p3 from "../Assets/Ellipse 7.png";
import p4 from "../Assets/Ellipse 8.png";

const testimonials = [
  {
    id: 1,
    name: "Chinedu O.",
    profession: "Restaurant Owner",
    image: p1,
    review:
      "ScanOrder has completely transformed how we serve our customers! Orders come in seamlessly, and our staff can focus on delivering great service rather than handling paper menus. Sales have increased, and customers love the convenience!",
  },
  {
    id: 2,
    name: "Amaka U.",
    profession: "Frequent Diner",
    image: p2,
    review:
      "I no longer have to wait for a menu or a server to take my order. Just scan, select my meal, and it’s on the way. This is the future of dining, and I love it!",
  },
  {
    id: 3,
    name: "Johnson T.",
    profession: "Bar Manager",
    image: p3,
    review:
      "Managing drink orders during peak hours used to be a nightmare, but ScanOrder has made it so much easier! Our bartenders can see orders instantly and serve drinks faster, keeping customers happy and increasing our revenue.",
  },
  {
    id: 4,
    name: "Ngozi E.",
    profession: "Hotel Operations Manager",
    image: p4,
    review:
      "We introduced ScanOrder in our hotel restaurant, and the feedback has been phenomenal. Guests love the contactless ordering system, and our efficiency has improved. Highly recommended for any hospitality business!",
  },
];

const Testimonial = () => {
  return (
    <div className="testimony">
      <h2>What Our Customers Say</h2>
      <div className="tests">
        {testimonials.map((testimonial) => (
          <div className="test" key={testimonial.id}>
            <div className="test-c">
              {/* <img src={testimonial.image} alt={testimonial.name} /> */}
              <p>{testimonial.review}</p>
              <div className="star-txts">
                <div className="text">
                  <h5>{testimonial.name}</h5>
                  <p>{testimonial.profession}</p>
                </div>
                <div className="stars">
                  {[...Array(4)].map((_, i) => (
                    <IoMdStar key={i} className="ss-i" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
