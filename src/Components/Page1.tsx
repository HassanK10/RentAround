import React from "react";
import "../App.css";
import "../Responsive.css"
import QR from "../assets/QR.png";
import PlayStore from "../assets/playStore.svg";
import AppStore from "../assets/appStore.svg";
import Mobile from "../assets/mobile.png";
const Page1 = () => {
  return (
    <>
      <div className=" container-fluid Page-1" style={{ overflowX: "hidden"}}>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <h1>
              Rent anything <br /> from anyone
            </h1>
            <p>
              Find everything from properties,activities,services <br />
              and much more all one website.
            </p>
            <div className="App">
              <h3>Get the app</h3>
              <img src={QR} alt="" />
            </div>
            <div className="Store">
              <img src={PlayStore} alt="" />
              <img src={AppStore} alt="" />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 mobile">
            <img src={Mobile} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page1;
