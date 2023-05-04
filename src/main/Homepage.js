import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

/**
 * Homepage for Friender site
 *
 * Props:
 *
 * State:
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);


  return (
    <main className="Homepage">
      {currentUser
        ? <div className="row">
          <div className="col-md-6">
            <h3 className="mb-3">My Profile</h3>
            <br />
            <ul>
              <li><b>Username: </b>{currentUser.username}</li>
              <li><b>Email: </b>{currentUser.email}</li>
              <li><b>Bio: </b>{currentUser.bio}</li>
              <li><b>Location: </b>{currentUser.location}</li>
              <li><b>Friend Radius: </b>{currentUser.friendRadius}</li>
            </ul>
          </div>

          <div className="col-md-6">
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