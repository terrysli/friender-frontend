import React, { useContext } from "react";
import "./NavBar.css"
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

/**
 * Navigation bar for site. Shows on every page.
 *
 * When user is logged in, shows links to profile, friends, and messages.
 * When not logged in, shows link to Login and Signup forms.
 *
 * App -> NavBar
 */

function NavBar({ currentUser, logout }) {
  //const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/">
            Friender
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/friends">
            Friends
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/messages">
            Messages
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/profile">
            Edit Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <div className="container-fluid">
          <h1>Friender</h1>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </div>
    </nav>
  );
}

export default NavBar;;