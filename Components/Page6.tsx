import React from "react";
import "../App.css";
import bottomlogo from "../assets/bottomlogo.svg";
import playStore from "../assets/playStore.svg";
import appStore from "../assets/appStore.svg";
import { NavLink } from "react-router-dom";
const Page6 = () => {
  return (
    <>
      <div className="container-fluid Page-6" style={{ overflowX: "hidden" }}>
        <div className="row bottom">
          <div className="col-md-4 mb-4">
            <img src={bottomlogo} alt="" className="bottom-logo" />
            <p>
              From homes to help—everything's here. Discover a <br />
              wide range of rentals—from experiences and <br />
              activities to properties and services—all at your <br />
              fingertips on Rentaround.
            </p>
            <p>
              <span className="copy-right">© Rent Around</span>
              <span className="rights">All Rights Reserved</span>
            </p>
          </div>
          <div className="col-md-2 mb-4 sections">
            <h5>Information</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="">
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="">
                  Anime
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="">
                  Electronics
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="">
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="">
                  Games
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="explore">
                  Explore more
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="socials">
                  <i className="bi bi-facebook social"></i> Facebook
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <i className="bi bi-instagram social"></i> Instagram
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="socials">
                  <i className="bi bi-linkedin social"></i> LinkedIn
                </NavLink>
              </li>
            </ul>
            <div className="mt-3">
              <img src={playStore} alt="Google Play" className="me-2" />
              <img src={appStore} alt="App Store" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page6;
