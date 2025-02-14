import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import bag from "../assets/bag.svg";
import profile from "../assets/profile.svg";
import lang from "../assets/lang.svg";
import SignInPage from "./SignInPage";
import locationBlue from "../assets/locationBlue.svg";
import globalSearch from "../assets/globalSearch.svg";
import { HiMenuAlt2 } from "react-icons/hi";
import { useSearch } from "./SearchContext";
import { useAuth } from "../Context/AuthContext";
import "../Responsive.css";
import "../index.css";
import "../App.css";

const NavBar: React.FC = () => {
  const profileImg = localStorage.getItem("profileImage");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const { setSearchQuery } = useSearch();
  const [tempQuery, setTempQuery] = useState<string>("");
  const { currentUser } = useAuth();

  const { logOut } = useAuth();

  const handleLogOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await logOut();
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleAuthModal = () => {
    setShowSignIn(!showSignIn);
    setIsOpen(false);
  };

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-sm-12 d-flex">
            <div className="NavBar col-lg-12 col-sm-12 d-flex bg-orange-500">
              <div className="header-logo">
                <img src={logo} alt="Logo" className="header-image" />
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
                {currentUser && (
                  <li>
                    <NavLink to="/my-listing">My Listing</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/Promotion">Promotion</NavLink>
                </li>
              </div>
              <button className="add-listing">
                <span className="list-text">Add Listing</span>
              </button>
              <NavLink className="bag" to="/Cart">
                <img src={bag} alt="Cart" />
              </NavLink>
              <img src={lang} alt="Language" className="lang" />
              <div
                className="profile border border-2 rounded-pill"
                onClick={toggle}
              >
                <div className="nav-img">
                  <HiMenuAlt2 />
                </div>
                {currentUser ? (
                  profileImg ? (
                    <img
                      src={profileImg}
                      alt="User Profile"
                      className="profile-img profileImg menu-img"
                    />
                  ) : (
                    <img
                      src={profile}
                      alt="Default Profile"
                      className="profile-img"
                    />
                  )
                ) : (
                  <img
                    src={profile}
                    alt="Default Profile"
                    className="profile-img"
                  />
                )}
              </div>
              <div className="menu-icon" onClick={toggle}>
                <HiMenuAlt2 />
              </div>
              {isOpen && (
                <>
                  <ul className="dropdown-menuu">
                    {currentUser ? (
                      <>
                        <li>
                          <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                          <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li>
                          <NavLink to="/" onClick={handleLogOut}>
                            LogOut
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
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
                          <NavLink to="/Promotion">Promotion</NavLink>
                        </li>
                        <li>
                          <NavLink to="/" onClick={toggleAuthModal}>
                            Login/Register
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                  <ul className="dropdown-menu2">
                    {currentUser ? (
                      <>
                        <li>
                          <NavLink to="/profile">View Profile</NavLink>
                        </li>
                        <li>
                          <NavLink to="/Promotion">Promotion</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">My Orders</NavLink>
                        </li>
                        <li>
                          <NavLink to="/" onClick={handleLogOut}>
                            LogOut
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink to="/Promotion">Promotion</NavLink>
                        </li>
                        <li>
                          <NavLink to="/" onClick={toggleAuthModal}>
                            Login/Register
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="search-container rounded-pill">
              <div className="search-box" id="search-box">
                <img src={locationBlue} alt="Location" className="location" />
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
                  alt="Search"
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
      {showSignIn && (
        <SignInPage showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      )}
    </>
  );
};

export default NavBar;
