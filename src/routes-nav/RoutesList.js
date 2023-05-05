import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../main/Homepage";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import FriendList from "../friends/FriendList";
import ProfileForm from "../profile/ProfileForm";
import MessageList from "../messages/MessageList";

/**
 * Site-wide routes.
 *
 * Props:
 *  - login():
 *  - signup():
 *  - currentUser:
 *
 * State: none
 *
 * App -> RoutesList ->
 *  [LoginForm, SignupForm, Homepage, FriendList, MessageList, ProfileForm]
 */

function RoutesList({ login, signup, currentUser, friends }) {

  console.debug(
    "Routes",
    `currentUser=${currentUser}`,
    `login=${typeof login}`,
    `register=${typeof register}`,
  );
  return (
    <div>
      <Routes>
        {!currentUser &&
          <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
          </>
        }

        <Route path="/" element={<Homepage currentUser={currentUser} friends={friends} />} />

        {currentUser &&
          <>
            <Route path="/friends" element={<FriendList friends={friends} />} />
            <Route path="/messages" element={<MessageList currentUser={currentUser} />} />
            <Route path="/profile" element={<ProfileForm currentUser={currentUser} />} />
          </>
        }

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RoutesList;