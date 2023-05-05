import './App.css';
import { useState, useEffect } from "react";
import NavBar from './routes-nav/NavBar';
import SignupForm from "./auth/SignupForm";
import FriendsList from "./friends/FriendList";
import MessageList from "./messages/MessageList";
import RoutesList from './routes-nav/RoutesList';
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
 * App -> [NavBar, Homepage, LoginForm, SignupForm]
 */

function App() {
  // const JDAWG = {
  //   bio: "After environmental let stuff floor total member.",
	// 	email: "j@j.com",
	//   friend_radius: 10,
	// 	location: 48197,
	// 	photo: null,
	// 	username: "jdawg"
  // }
  const [currentUser, setCurrentUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [token, setToken] = useState("");

  console.debug(
    "App",
    "currentUser=",
    currentUser,
    "token=",
    token
  );

  useEffect(function getCurrentUserOnMount() {
    async function getCurrentUser() {
      const userResult = await FrienderApi.getUserData("jdawg");
      console.log("userResults:", userResult);
      setCurrentUser(userResult);
    }
    getCurrentUser();
  }, [])

  useEffect(function getFriendsOnCurrentUserChange() {
    async function getFriends() {
      const friendsResults = await FrienderApi.getFriendsOfUser(currentUser.username);
      console.log("friendsResults:", friendsResults);
      setFriends(friendsResults);
    }
    getFriends();
  }, [currentUser])

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
    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
  }

  return (
    <div className="App">
      <NavBar logout={logout} />
      <RoutesList signup={signup} login={login} currentUser={currentUser} friends={friends} />
    </div>
  );
}

export default App;
