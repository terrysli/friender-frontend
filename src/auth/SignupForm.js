import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 *
 * Props:
 *  - signup(): calls function in parent
 *
 * State:
 *  - formData: {username, password, email, bio, location, friendRadius, photo}
 *
 * RoutesList -> SignupForm -> Alert
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "testuser1",
    password: "password",
    email: "test@mail.com",
    bio: "I am a test user.",
    location: "94114",
    friendRadius: "10",
    photo: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=", typeof signup,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      const photoInput = document.getElementById("photo-input");

      console.debug("photoInput:", photoInput);
      const file = photoInput.files[0];
      await uploadFile(file);
      navigate("/");
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fd => ({
      ...fd,
      [name]: value
    }));
  }

  function handlePhotoChange(evt) {

  }

  // function handleFiles(evt) {
  //   const fileList = this.files;
  //   const photoFile = fileList[0];
  // }

  // function uploadFile(img, file) {

  // }

  const uploadFile = async (file) => {
    console.log("uploadFile file:", file);
    if (file != null) {
      const data = new FormData();
      data.append('file_from_react', file);

      let response = await fetch('http://127.0.0.1:5000/url_route',
        {
          method: 'post',
          body: data,
          mode:'no-cors'
        }
      );
      let res = await response.json();
      console.debug("res", res);
      if (res.status !== 1) {
        alert('Error uploading file');
      }
    }
  };

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username-input" className="form-label">Username</label>
                <input
                  id="username-input"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password-input" className="form-label">Password</label>
                <input
                  id="password-input"
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Pick a unique username"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email-input" className="form-label">Email</label>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bio-input" className="form-label">Bio</label>
                <input
                  id="bio-input"
                  name="lastName"
                  className="form-control"
                  placeholder="Describe yourself"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location-input" className="form-label">Location</label>
                <input
                  id="location-input"
                  name="location"
                  className="form-control"
                  placeholder="Enter ZIP code"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="friend-radius-input" className="form-label">Friend Radius</label>
                <input
                  input="friend-radius-input"
                  name="friend-radius"
                  className="form-control"
                  placeholder="Enter number of miles"
                  value={formData.friendRadius}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo-input" className="form-label">Choose a profile picture:</label>
                <input
                  id="photo-input"
                  type="file"
                  name="photo"
                  accept="image/png, image/jpeg"
                  className="form-control"
                />
              </div>

              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;