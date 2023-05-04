import React, { useState, useEffect } from "react";
import './App.css';
import NavBar from './NavBar';
import RoutesList from './routes-nav/RoutesList';
import FrienderApi from "./api";
import UserContext from "./auth/UserContext";

/**
 * Friender application.
 *
 * Props: none
 *
 * State:
 *  - currentUser
 *  - token
 *
 * App -> [NavBar, RoutesList]
 */

function App() {
  const [currentUser, setCurrentUser] = useState({
    data: null,
    dataLoaded: false
  });
  const [token, setToken] = useState("");

  console.debug(
    "App",
    "currentUser=",
    currentUser,
    "token=",
    token
  );


  useEffect(
    function loadUserData() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decode(token);
            // put the token on the Api class so it can use it to call the API.
            FrienderApi.token = token;
            let currentUser = await FrienderApi.getUserData(username);

            setCurrentUser({
              dataLoaded: true,
              data: currentUser
            });
          } catch (err) {
            console.error("App loadUserData: problem loading", err);
            setCurrentUser({
              dataLoaded: true,
              data: null
            });
          }
        } else {
          setCurrentUser({
            dataLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser({
      dataLoaded: true,
      data: null
    });
    setToken(null);
  }

  /** Handles site-wide signup.
   * Automatically logs (set token) upon signup.
   */
  async function signup(signupData) {
    let token = await FrienderApi.signup(signupData);
    setToken(token);
  }

  async function login(loginData) {
    let token = await FrienderApi.login(loginData);
    setToken(token);
  }

  return (
    <div className="App">
      <NavBar logout={logout} />
      <RoutesList currentUser={currentUser.data} login={login} signup={signup} />
    </div>
  );
}

export default App;
