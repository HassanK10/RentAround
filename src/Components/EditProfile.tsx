import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Page6 from "./Page6";
import { TbCameraPlus } from "react-icons/tb";
import { SearchProvider } from "./SearchContext";
import "../App.css";

export interface Data {
  firstname: string;
  lastname: string;
  image: string;
}

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: localStorage.getItem("first name") || "",
    lastName: localStorage.getItem("last name") || "",
    dob: "",
    gender: "Male",
    phoneNumber: "",
    bio: "",
  });

  const [image, setImage] = useState<string | null>(
    localStorage.getItem("profileImage")
  );

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    const storedFirstName = localStorage.getItem("first name");
    const storedLastName = localStorage.getItem("last name");

    if (storedImage) setImage(storedImage);
    if (storedFirstName || storedLastName) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: storedFirstName || "",
        lastName: storedLastName || "",
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formData.phoneNumber.length > 0) {
      const err = document.getElementById("err");
      if (err) {
        err.innerHTML = "";
      }
    } else {
      const err = document.getElementById("err");
      if (err) {
        err.innerHTML = "Phone Number is Required";
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImage(imageData);
        localStorage.setItem("profileImage", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem("first name", formData.firstName);
    localStorage.setItem("last name", formData.lastName);
    if (image) localStorage.setItem("profileImage", image);
    if (formData.phoneNumber.length === 0) {
      const err = document.getElementById("err");
      if (err) {
        err.innerHTML = "Phone Number is Required";
      }
    } else {
      const err = document.getElementById("err");
      if (err) {
        err.innerHTML = "";
      }
    }
  };
  return (
    <>
      <SearchProvider>
        <NavBar />
        <div className="container d-flex Edit-Profile">
          <div className="text-center p-4 upload">
            <label htmlFor="imageInput" className="image-container">
              {image ? (
                <img
                  src={localStorage.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <TbCameraPlus className="camera-icon" />
              )}
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="d-none"
            />
            <p className="name">
              {formData.firstName} {formData.lastName}
            </p>
            <button className="" onClick={saveData}>
              Save Profile
            </button>
          </div>
          <div className="row information">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control info-input"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control info-input"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control info-input"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-control info-input"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone Number</label>
              <div className="d-flex">
                <span className="me-2 fw-bold">+92</span>
                <input
                  type="number"
                  className="form-control info-input"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  style={{ marginBottom: "1vw", position:"static" }}
                />
              </div>
              <p id="err" style={{ color: "red" }}></p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Bio</label>
              <input
                type="text"
                className="form-control info-input"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>
          ;
        </div>
        <Page6 />
      </SearchProvider>
    </>
  );
};

export default EditProfile;
