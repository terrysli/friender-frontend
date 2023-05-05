import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/** Profile editing form.
 *
*/

function ProfileForm({ currentUser }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "ProfileForm",
    currentUser,
    formErrors
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const photoInput = document.getElementById("photo-input");
      const file = photoInput.files[0];
      await uploadFile(file, currentUser.username);
      navigate("/");
    } catch (err) {
      setFormErrors(err);
    }
  }

  // /** Handle form data changing */
  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  //   setFormData(f => ({
  //     ...f,
  //     [name]: value,
  //   }));
  //   setFormErrors([]);
  // }

  const uploadFile = async (file, username) => {
    console.log("uploadFile file:", file);
    if (file != null) {
      const data = new FormData();
      data.append('file_from_react', file);

      let response = await fetch(`http://localhost:5000/url_route/${username}`,
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
    <div className="ProfileForm">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="photo-input" className="form-label">Choose a profile picture:</label>
          <input
            id="photo-input"
            type="file"
            name="photo"
            accept="image/png, image/jpeg, image/jpg"
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
  );
}

export default ProfileForm;
