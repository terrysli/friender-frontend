import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import FriendList from "../friends/FriendList";
import FrienderApi from "../api";

/**
 * Homepage for Friender site
 *
 * Props:
 *
 * State:
 *  - currentUser
 */

const BUCKET_URL = "https://friender-rithm-terrysli.s3.us-east-2.amazonaws.com"
//const BUCKET_URL = "https://friender-may-2023.s3.us-east-2.amazonaws.com"

function Homepage({ currentUser, friends }) {
  //const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser, friends);

  return (
    <main className="Homepage">
      {currentUser
        ? <div className="row">
          <div className="col-md-6">
            <h3 className="mb-3">My Profile</h3>
            <br />
            <ul>
              <li><img width="300px" src={`${BUCKET_URL}/profile_photos/${currentUser.username}_photo.jpeg`} alt="profile pic" /></li>
              <li><b>Username: </b>{currentUser.username}</li>
              <li><b>Email: </b>{currentUser.email}</li>
              <li><b>Bio: </b>{currentUser.bio}</li>
              <li><b>Location: </b>{currentUser.location}</li>
              <li><b>Friend Radius: </b>{currentUser.friendRadius}</li>
            </ul>
          </div>

          <div className="col-md-6">
            <hr></hr>
            <h3 className="mb-3">Friends</h3>
            {friends.length > 0
              ? <FriendList friends={friends} />
              : <span className="text-muted">You have no friends (yet!).</span>}
          </div>
        </div>
        : (
          <p>
            <Link className="btn btn-primary fw-bold me-3"
              to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary fw-bold"
              to="/signup">
              Sign up
            </Link>
          </p>
        )}
    </main>
  );
}

export default Homepage;