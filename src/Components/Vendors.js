import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Supabase } from "../config/supabase-config";
import { IoIosArrowRoundForward } from "react-icons/io";
import defaultpix from '../Assets/default.jpg'
const Vendors = () => {
  const [vendorsList, setVendorsList] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const { data, error } = await Supabase.from("food-web-admin").select("*");

      if (error) {
        console.error("Error fetching vendors:", error);
      } else {
        setVendorsList(data);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="foods" id="recommend">
      <div className="foods-c">
        {vendorsList.length > 0 ? (
          vendorsList.map((vendor) => (
            <Link
              style={{ textDecoration: "none", color: "#000", cursor: "pointer" }}
              to={`/categories?vendorId=${vendor.id}&business=${encodeURIComponent(vendor.business)}`}
              className="food"
              key={vendor.id}
            >
              <div className="food-c">
                <img src={vendor.image || defaultpix} alt={vendor.business} />
                <h5>{vendor.business}</h5>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading vendors...</p>
        )}
      </div>
    </div>
  );
};

export default Vendors;
