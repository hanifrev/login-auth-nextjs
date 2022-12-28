import React from "react";

const CardProduct = ({ title, category, image, price, description }) => {
  return (
    <div id="card">
      <div>{title}</div>
      <div>
        <img className="imgCard" src={image} />
      </div>
      <div>{category}</div>
      <div>{price}</div>
    </div>
  );
};

export default CardProduct;
