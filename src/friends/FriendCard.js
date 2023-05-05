import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import "./FriendCard.css"

/** Show limited information about a friend.
 *
 * Props:
 *  - {username, email, bio, photo, location}
 *
 * State:
 *
 * FriendList -> FriendCard
 */

function FriendCard({ username, email, bio, photo, location }) {
  console.debug("FriendCard", username, email, bio, location);

  return (
    <div className="FriendCard card">
      {" "}
      <div className="card-body">
        <h4 className="card-title">{username}</h4>
        <img src={`https://friender-rithm-terrysli.s3.us-east-2.amazonaws.com/profile_photos/${username}_photo.jpeg`} alt="profile pic" width="300px" />
        <p>Email: {email}</p>
        <p>Bio: {bio}</p>
        <p>Location: {location}</p>
      </div>
    </div>
  );
}


export default FriendCard;
