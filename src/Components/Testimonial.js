import React from "react";
import { IoMdStar } from "react-icons/io";
import p1 from "../Assets/Testimonial Photo.png";
import p2 from "../Assets/Testimonial Photo (1).png";
import p3 from "../Assets/Ellipse 7.png";
import p4 from "../Assets/Ellipse 8.png";

const testimonials = [
  {
    id: 1,
    name: "George Dammy",
    profession: "Medical Practitioner",
    image: p1,
    review:
      "I absolutely love the recipes on this site! Every dish I’ve tried has been a hit with my family, and the step-by-step guides make ordering so easy.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    profession: "Chef",
    image: p2,
    review:
      "The food quality is top-notch! The ingredients are always fresh, and the recipes are easy to follow. Highly recommended!",
  },
  {
    id: 3,
    name: "David Opeyemi",
    profession: "Software Engineer",
    image: p3,
    review:
      "Amazing service! The meals are delicious and the delivery is always on time. This has become my go-to food service.",
  },
  {
    id: 4,
    name: "Lisa Brown",
    profession: "Nutritionist",
    image: p4,
    review:
      "As a nutritionist, I appreciate the healthy options available. It’s great to see a variety of well-balanced meals!",
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
              <img src={testimonial.image} alt={testimonial.name} />
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
