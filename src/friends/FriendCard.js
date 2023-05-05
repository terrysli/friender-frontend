import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";

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
  console.debug("FriendCard");

  console.debug("FriendCard, username=", username);

  return (
    <div className="FriendCard card">
      {" "}
      <div className="card-body">
        <h2 className="card-title">{username}</h2>
        <img src={photo} width="300px" alt={username} />
        <p>Email: {email}</p>
        <p>Bio: {bio}</p>
        <p>Location: {location}</p>
      </div>
    </div>
  );
}


export default FriendCard;
