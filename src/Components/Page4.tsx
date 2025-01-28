import React from "react";
import "../App.css";
import { useState } from "react";
// const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//   const services = document.getElementById("services-2")!;
//   services.style.display = "none";
// };
const Page4 = () => {
  const [activeTab, setActiveTab] = useState("Buyers"); // Default to "buyers"
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
              <div className="card page4">
                <div className="card-body text-center page4">
                  <h5 className="card-title" id="card-title">
                    1
                  </h5>
                  <h6 id="intro">
                    Browse with <br /> Confidence
                  </h6>
                  <p id="des">
                    Explore verified listings from trusted <br /> members
                  </p>
                </div>
              </div>
              <div className="card page4 ">
                <div className="card-body text-center page4">
                  <h5 className="card-title page4" id="card-title">
                    2
                  </h5>
                  <h6 id="intro">Seemless Booking</h6>
                  <p id="des">
                    Easily message owners and secure the perfect rental.
                  </p>
                </div>
              </div>
              <div className="card page4">
                <div className="card-body text-center page4">
                  <h5 className="card-title page4" id="card-title">
                    3
                  </h5>
                  <h6 id="intro">Enjoy & Return</h6>
                  <p id="des">
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
              <div className="card page4">
                <div className="card-body page4 text-center">
                  <h5 className="card-title page4" id="card-title">
                    1
                  </h5>
                  <h6 id="intro">List it Fast</h6>
                  <p id="des">
                    Upload your items, and let people find <br />
                    what they need.
                  </p>
                </div>
              </div>
              <div className="card page4">
                <div className="card-body text-center page4">
                  <h5 className="card-title page4" id="card-title">
                    2
                  </h5>
                  <h6 id="intro">Manage Effortlessly</h6>
                  <p id="des">
                    Approve rentals and coordinate directly <br /> in-app.
                  </p>
                </div>
              </div>
              <div className="card page4">
                <div className="card-body page4 text-center">
                  <h5 className="card-title page4" id="card-title">
                    3
                  </h5>
                  <h6 id="intro">Earn Smart</h6>
                  <p id="des">
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
