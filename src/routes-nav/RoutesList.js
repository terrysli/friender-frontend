import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../main/Homepage";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";

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

function RoutesList({ login, signup, currentUser }) {

  console.debug(
    "Routes",
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

        <Route path="/" element={<Homepage />} />

        {currentUser &&
          <>
            <Route path="/friends" element={<FriendList />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/profile" element={<ProfileForm />} />
          </>
        }

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RoutesList;