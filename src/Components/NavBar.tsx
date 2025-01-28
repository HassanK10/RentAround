import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import bag from "../assets/bag.svg";
import navbar from "../assets/navbar.svg";
import profile from "../assets/profile.svg";
import lang from "../assets/lang.svg";
import locationBlue from "../assets/locationBlue.svg";
import globalSearch from "../assets/globalSearch.svg";
import "../App.css";
import { useSearch } from "./SearchContext";
import Cart from "./Cart";


const handleClick = () => {
  <Cart></Cart>
};
const NavBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [tempQuery, setTempQuery] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    if (tempQuery.trim()) {
      setSearchQuery(tempQuery);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };
  return (
    <>
      <div className="conatiner-fluid">
        <div className="row">
          <div className="col-lg-12 col-sm-12 d-flex">
            <div className="NavBar col-lg-12 col-sm-12 d-flex">
              <div className="header-logo">
                <img src={logo} alt="" />
              </div>
              <div className="NavP-2 d-flex">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/Categories">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/Wishlist">Wishlist</NavLink>
                </li>
                <li>
                  <NavLink to="/MyListing">My Listing</NavLink>
                </li>
                <li>
                  <NavLink to="/Promotion">Promotion</NavLink>
                </li>
              </div>
              <button className="">Add Listing</button>
              <NavLink className="bag" to="/Cart">
                <img src={bag} alt=""  onClick={handleClick}/>
              </NavLink>
              <img src={lang} alt="" className="lang" />
              <div className="profile border border-2 rounded-pill ">
                <img src={navbar} alt="" className="nav-img" />
                <img src={profile} className="profile-img" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="search-container rounded-pill">
              <div className="search-box" id="search-box">
                <img src={locationBlue} alt="" className="location" />
                <input
                  type="text"
                  placeholder="Search Product By Location"
                  className="S-Location"
                />
                <span>|</span>
                <input
                  type="text"
                  placeholder="Search Product or Service"
                  className="S-Product"
                  value={tempQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <img
                  src={globalSearch}
                  alt=""
                  className="search-icon"
                  onClick={handleSearchClick}
                  style={{
                    cursor: "pointer",
                    opacity: tempQuery.trim() ? 1 : 0.4,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
