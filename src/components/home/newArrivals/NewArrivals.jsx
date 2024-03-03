// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../products/Heading";
import Product from "../products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import axios from "axios";

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const[products,setProducts] = useState([]);
  useEffect(()=>{
    loadProducts();
  },[])

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/auth/getAllProduct");
    console.log(result.data.payload);
    setProducts(result.data.payload);
  }

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        
          {
            products.map((product,index) => (
              <div className="px-2">
            <Product
            _id={product.productId}
            img={product.thumbnail}
            productName={product.productName}
            price={product.price}
            color={product.color}
            badge={true}
            des={product.description}
          />

                </div>
            ))
          }
          
      </Slider>
    </div>
  );
};

export default NewArrivals;



