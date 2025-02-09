import React from "react";
import NavBar from "./NavBar";
import Page6 from "./Page6";
import "../App.css";
import PlaceHolderImg from "../assets/placeholderImage.73afc763.png";
import blackLine from "../assets/blackLine.f3181a2c.svg";
import verified from "../assets/profileVerified.d10f2ebc.svg";
import verticalLine from "../assets/lineIcon.ceddf4f8.svg";
import { SearchProvider } from "./SearchContext";
import { useAuth } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const profileImg = localStorage.getItem("profileImage");
  const firstName = localStorage.getItem("first name");
  const lastName = localStorage.getItem("last name");
  const { currentUser } = useAuth();
  return (
    <>
      <SearchProvider>
        <NavBar />
        <div className="container d-flex justify-content-center">
          <div className="profile-container shadow p-4">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="col-lg-3">
                  {profileImg ? (
                    <img
                      src={profileImg}
                      alt=""
                      className="placeholder-img profileImg"
                    />
                  ) : (
                    <img
                      src={PlaceHolderImg}
                      alt=""
                      className="placeholder-img"
                    />
                  )}
                </div>
                <div className="col-lg-3 profile-info">
                  {firstName && lastName ? (
                    <h2 className="my-name">
                      {firstName} {lastName}
                    </h2>
                  ) : (
                    <h2>{currentUser?.email?.split("@")[0]}</h2>
                  )}
                  <p>
                    Profile Verified <img src={verified} alt="" />
                  </p>
                  <h6 className="referals">
                    0 <img src={blackLine} alt="" /> Referals
                  </h6>
                </div>
              </div>
              <div className="col-lg-6 edit-section">
                <img src={verticalLine} alt="" className="vertical-line" />
                <div className="profile-buttons">
                  <NavLink to="/profile">My ID's</NavLink>
                  <NavLink to="/edit-profile">Edit Profile</NavLink>
                  <NavLink to="/profile">Influencer Dashboard</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page6 />
      </SearchProvider>
    </>
  );
};

export default Profile;
