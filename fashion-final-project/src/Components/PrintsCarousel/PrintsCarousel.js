import React, { useEffect, useState, useRef, useContext } from "react";
// import CarouselComponent from "../CarouselComponent/CarouselComponent";
import { Button } from "react-bootstrap";
import "./PrintsCarousel.css";
import { Icon } from "@iconify/react";
import { OrderContext } from "../../orderContext";



export default function PrintsCarousel() {
  const [data, setData] = useState([]);
  const carousel = useRef(null);
  const { order, setFabric } = useContext(OrderContext);


  useEffect(() => {
    fetch("https://bespoke-fashion.herokuapp.com/patterns")
      .then((response) => response.json())
      .then(setData);
  }, []);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  if (!data || !data.length) return null;

  console.log('fabric Prints Carousel',order)
  
  return (
    <div className="prints_container">
       <div className="carousel" ref={carousel}>
        {data.map((item) => {
          const { id, name, url, price } = item;
          return (
            <div className="item" key={id}>
              <div className="prints_image">
                <img src={url} alt={name}  />
              </div>
              
              <div className="info">
                <span className="prints_price">€{price}</span>
                <Button className="select_button" style={{ outline: 'none' }} onClick={() => setFabric({ id: id, price, url})}>Select</Button>
              </div> 
            </div>
          );
        })}
      </div>
      <div className="buttons" style={{ outline: 'none' }}>
        <Button className="buttons_icon" onClick={handleLeftClick}>
          <Icon
            icon="carbon:previous-outline"
            color="#003d3a"
            width="45"
            height="45"
          />
        </Button>
        <Button className="buttons_icon" onClick={handleRightClick}>
          <Icon
            icon="carbon:next-outline"
            color="#003d3a"
            width="45"
            height="45"
          />
        </Button>
      </div> 
     
    </div>
  );
}