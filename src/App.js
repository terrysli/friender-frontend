import './App.css';
import { useState, useEffect } from "react";
import NavBar from './routes-nav/NavBar';
import SignupForm from "./auth/SignupForm";
import FriendsList from "./friends/FriendList";
import MessageList from "./messages/MessageList";
import RoutesList from './routes-nav/RoutesList';
import FrienderApi from "./api";
import decode from "jwt-decode";

/**
 * Site application
 *
 * Props: none
 *
 * State:
 *  - currentUser
 *  - token
 *
 * App -> [NavBar, Homepage, LoginForm, SignupForm]
 */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [token, setToken] = useState("");

  console.debug(
    "App",
    "currentUser=",
    currentUser,
    "token=",
    token
  );

  /** Load current user data from API */
  useEffect(function getCurrentUserOnTokenChange() {
    async function getCurrentUser() {
      if (token) {
        let { sub } = decode(token);
        console.log("getCurrentUser, identity", sub);
        const userResult = await FrienderApi.getUserData(sub);
        console.log("userResults:", userResult);
        setCurrentUser(userResult);
      }
    }
    getCurrentUser();
  }, [token]);

  /** Load friends list when user data is loaded */
  useEffect(function getFriendsOnCurrentUserChange() {
    async function getFriends() {
      const friendsResults = await FrienderApi.getFriendsOfUser(currentUser.username);
      console.log("friendsResults:", friendsResults);
      setFriends(friendsResults);
    }
    getFriends();
  }, [currentUser]);

  /** Handles side-wide signup. */
  async function signup(signupData) {
    // let token = await FrienderApi.signup(signupData);
    // setToken(token);
    // let user = await FrienderApi.createUser(signupData);
    // setCurrentUser(user);
  }

  /** Handles side-wide login. */
  async function login(loginData) {
    let token = await FrienderApi.login(loginData);
    setToken(token);
  }

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  return (
    <div className="App">
      <NavBar currentUser={currentUser} logout={logout} />
      <RoutesList signup={signup} login={login} currentUser={currentUser} friends={friends} />
    </div>
  );
}

export default App;
