import React from "react";
import "../App.css";
import "../Responsive.css";
import { useState } from "react";
const Page4 = () => {
  const [activeTab, setActiveTab] = useState("Buyers");
  const [, setButton] = useState("Buyers");

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    setButton(tab);
  };
  return (
    <>
      <div className="container-fluid Page-4">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="work">How it works</h1>
            <button
              className={`buttons rounded-pill ${
                activeTab === "Buyers" ? "active" : ""
              }`}
              id="Buy"
              onClick={() => handleClick("Buyers")}
              style={{
                backgroundColor:
                  activeTab === "Buyers" ? "white" : "transparent",
                color: activeTab === "Buyers" ? "Black" : "White",
              }}
            >
              For Buyers
            </button>
            <button
              className={`rounded-pill buttons seller ${
                activeTab === "Sellers" ? "active" : ""
              }`}
              id="sell"
              onClick={() => handleClick("Sellers")}
              style={{
                backgroundColor:
                  activeTab === "Sellers" ? "white" : "transparent",
                color: activeTab === "Buyers" ? "White" : "Black",
              }}
            >
              For Sellers
            </button>
            <div
              className={`services ${activeTab === "Buyers" ? "" : "hidden"}`}
              style={{ display: activeTab === "Buyers" ? "block" : "none" }}
            >
              <div className="service-cards">
                <div className="col-lg-4 col-md-12 col-sm-12 service-card">
                  <h1>1</h1>
                  <h4>
                    Browse with <br /> Confidence
                  </h4>
                  <p>
                    Explore verified listings from trusted <br /> members
                  </p>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 service-card">
                  <h1>2</h1>
                  <h4>Seemless Booking</h4>
                  <p>Easily message owners and secure the <br /> perfect rental.</p>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 service-card">
                  <h1>3</h1>
                  <h4>Enjoy & Return</h4>
                  <p>
                    Experience your rental and return it when <br /> you're
                    done, hassle-free.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`services services-2 ${
                activeTab === "Sellers" ? "" : "hidden"
              }`}
              style={{ display: activeTab === "Sellers" ? "block" : "none" }}
            >
              <div className="service-cards">
                <div className="col-lg-4 col-md-12 col-sm-12 service-card">
                  <h1>1</h1>
                  <h4>List it Fast</h4>
                  <p>
                    Upload your items, and let people find <br /> what they
                    need.
                  </p>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 service-card">
                  <h1>2</h1>
                  <h4>
                    Manage <br />
                    Effortlessly
                  </h4>
                  <p>
                    Approve rentals and coordinate directly <br /> in-app.
                  </p>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 service-card">
                  <h1>3</h1>
                  <h4>Earn smart</h4>
                  <p>
                    Turn your idle items into a side hustle, right <br /> from
                    your home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page4;
