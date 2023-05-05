import React, { useState, useEffect } from "react";
import FrienderApi from "../api";
import FriendCard from "../friends/FriendCard";

/** Show list of FriendCards.
 *
 * Props:
 *  - friends: [{username, email, bio, photo, location, friendRadius}, ...]
 *
 * State: none
 *
 * [RoutesList, NavBar] -> FriendList -> FriendCard
 */

function FriendList() {
  const [friends, setFriends] = useState([]);
  console.debug("FriendList", friends);

  useEffect(function getFriendsOnMount() {
    async function getFriends() {
      const friendsResults = await FrienderApi.getFriendsOfUser("jdawg");
      console.log("friendsResults:", friendsResults);
      setFriends(friendsResults);
    }
    getFriends();
  }, [])

  return (
    <div className="FriendList col-md-8 offset-md-2">
      {friends.length
        ? (
          <div className="FriendList-list">
            {friends.map(f => (
              <FriendCard
                key={f.username}
                username={f.username}
                bio={f.bio}
                location={f.location}
                photo={f.photo}
              />
            ))}
          </div>
        ) : (
          <p className="lead">Sorry, no friends to list!</p>
        )}
    </div>
  );
}

export default FriendList;
