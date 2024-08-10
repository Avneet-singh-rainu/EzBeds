import React from "react";

export const Info = ({
  _id,
  hospital,
  image,
  no_of_beds,
  price,
  next_available,
}) => {
  return (  
    <div className="container">
      <div className="img">
        <img src={image} alt="hospital" />
      </div>
      <div className="left section">
        <div className="hospitalname">
          <h1>Hospital Name : {hospital}</h1>
        </div>

        <div className="hospitalinfo">
          <div className="avail">
            No of beds available : {no_of_beds} <br /> ( private | semi-privete
            | general | other )
          </div>
          <div className="address">Address :</div>
          <div className="contact">Contact :</div>
          <div className="price">
            Price : ( private : | semi-privete : | general : | other : )
          </div>
          <div className="next">
            Next room will be available in : {next_available}
          </div>
        </div>
        <div>
          <button className="btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};
