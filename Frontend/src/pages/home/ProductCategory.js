import React from "react";
import "./ProductCategory.scss";
import { useNavigate } from "react-router-dom";

// https://i.ibb.co/fNkBYgr/c3.jpg
// https://i.ibb.co/5GVkd3m/c1.jpg
// https://i.ibb.co/nQKLjrW/c2.jpg

const categories = [
  {
    id: 1,
    title: "Succulents and Cacti",
    image: "https://budsnblush.com/cdn/shop/products/Barrelcactus-echinocactus.jpg?v=1660561246",
  },
  {
    id: 2,
    title: "Rare and Exotic Plants",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwH1TairAFzWqZWELtmF3UQU1RpioHD6zJ1A&usqp=CAU",
  },
  {
    id: 3,
    title: "Seasonal Plants",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw-cUD6Ej2B-1csLjiBHy9Rr-INxTvzyLBCw&usqp=CAU",
  },
];

const Category = ({ title, image }) => {
  const navigate = useNavigate();
  return (
    <div className="category">
      <h3>{title}</h3>
      <img src={image} alt="img" />
      <button className="--btn" onClick={() => navigate("/shop")}>
        {"Shop Now >>>"}
      </button>
    </div>
  );
};

const ProductCategory = () => {
  return (
    <div className="categories">
      {categories.map((cat) => {
        return (
          <div key={cat.id}>
            <Category title={cat.title} image={cat.image} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;