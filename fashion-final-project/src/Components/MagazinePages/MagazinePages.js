import React, { useEffect, useState, useContext, useRef } from "react"
import "./Magazine.css"
import breadcrumps from "../Images/breadcrumps.png"
import models from "../Images/models.png"
import ReturnButton from "../ReturnButton/ReturnButton"
import HTMLFlipBook from "react-pageflip"
import animation from "../Images/loading.gif"
import Paper from "@mui/material/Paper"
import { OrderContext } from "../../orderContext"
import { Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import NextButton from "../NextButton/NextButton"
import { Icon } from '@iconify/react';

//import Toast from "react-bootstrap/Toast"
//import ToastHeader from "react-bootstrap/ToastHeader"
//import ToastContainer from "react-bootstrap/ToastContainer"
//import Overlay from "react-bootstrap/Overlay"

export default function MagazinePages({ cat }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { order, setSimpleVals, setOutfit } = useContext(OrderContext)

  //const [show, setShow] = useState(false)
  //const target = useRef(null)
  // const cat = "skirts"

  useEffect(() => {
    setSimpleVals("cat", cat)

    fetch("https://bespoke-fashion.herokuapp.com/designs")
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [])

  console.log(order)
  console.log(order.outfit)

  return (
    <section className="MP-section">
      <div className="MP-header">
        <ReturnButton className="MP-btn" />
        <h1 className="MP-title">Our Design Catalogue</h1>
        <h4 className="MP-info1">click the page to flip</h4>
        <h4 className="MP-info2">click the page to flip</h4>
      </div>
      <div className="MP-main">
        <div className=" MP-category">
          <img src={breadcrumps} alt="lines" className=" MP-lines" />
          <h3>{cat}</h3>
        </div>
        <h4 className="MP-info3">click the page to flip</h4>
        <div className="MP-magazine">
          <div className="MP-box">
            {isLoading ? (
              <img
                src={animation}
                width="498"
                height="373"
                alt="loading animation"
              />
            ) : (
              <HTMLFlipBook
                showCover={false}
                autoSize={false}
                width={380}
                height={480}
                style={{ margin: "0 auto" }}
                className="MP-flipBook"
              >
                {data
                  .filter((datai) => datai.cName.includes(cat))
                  .map(({ _id, name, url, price, cName }) => (
                    <Paper elevation={5} className="demoPage1">
                      {/*<h3 className="pageHeader">{name}</h3> */}
                      <img
                        src={url}
                        alt="our design cloths"
                        className="pageImage"
                      />
                      <div className="pagePrice">price: {price} €</div>
                      <>
                        <Button
                          onClick={(e) => {
                            setOutfit({ id: _id, price, url })

                            e.target.style.backgroundColor = "#5d86bc"
                            e.target.innerText = "Selected!"
                          }}
                          id="#selectPrize"
                          className="selectPrize-btn"
                        >
                          select
                        </Button>
                        {/* <Overlay
                          className="MP-OverlayMain"
                          target={target.current}
                          show={show}
                          placement="right"
                        >
                          {({
                            placement,
                            arrowProps,
                            show: _show,
                            ...props
                          }) => (
                            <Toast
                              onClose={() => setShow(false)}
                              show={show}
                              delay={33331000}
                              autohide
                              className="MP-Toast"
                              {...props}
                            >
                              <Toast.Header className="MP-toastHeader">
                                <strong>Item added.</strong>
                              </Toast.Header>
                            </Toast>
                          )}
                        </Overlay> */}
                      </>
                    </Paper>
                  ))}
              </HTMLFlipBook>
            )}
            <NextButton />
            
          </div>
        </div>
        <div className="MP-img">
          <img src={models} alt="models" className="MP-models" />
        </div>
        
      </div>
      <div  className="exclusive_contact">
            <NavLink className="exclusive_contact_link" to="/app/contact">
                <p>Have not find what you were looking for?</p>
                <p>Please, contact directly our Fashion Designers!</p>
                <Icon icon="wpf:message-outline" color="#003d3a" width="30" height="25" />
                
            </NavLink>
        </div>
    </section>
  )
}
