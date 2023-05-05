import './App.css';
import { useState } from "react";
import NavBar from './routes-nav/NavBar';
import SignupForm from "./auth/SignupForm";
import FriendsList from "./friends/FriendList";
import FrienderApi from "./api";

/**
 * Site application
 *
 * Props: none
 *
 * State:
 *  - currentUser
 *  - token
 *
 * App -> []
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

  /** Handles side-wide signup. */
  async function signup(signupData) {
    // let token = await FrienderApi.signup(signupData);
    // setToken(token);
    let user = await FrienderApi.createUser(signupData);
    setCurrentUser(user);
  }

  /** Handles side-wide login. */
  async function login(loginData) {
    let token = await FrienderApi.login(loginData);
    setToken(token);
  }

    /** Handles site-wide logout */
    function logout() {
      setCurrentUser({
        infoLoaded: true,
        data: null
      });
      setToken(null);
    }

  return (
    <div className="App">
      {/* <NavBar logout={logout}/> */}
      {/* <SignupForm signup={signup}/> */}
      <SignupForm signup={signup} />
    </div>
  );
}

export default App;
