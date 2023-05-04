import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";

function RoutesList({ login, signup, currentUser }) {
  <div>
    <Routes>
    {!currentUser &&
        <>
          <Route path="/login"element={<LoginForm login={login} />} />
          <Route path="/signup"element={<SignupForm signup={signup} />} />
        </>
        }

        <Route path="/"element={<Homepage />} />

        {currentUser &&
        <>
          <Route path="/friends" element={<FriendList />} />
          <Route path="/messages" element={<MessageList />} />
          <Route path="/profile" element={<ProfileForm />} />
        </>
      }

        <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  </div>

}

export default RoutesList;