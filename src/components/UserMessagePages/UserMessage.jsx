import React from "react";
import "../UserMessagePages/UserMessage.css";
import Photo from "../Images/person.jpg";
import { Link } from "react-router-dom";

function UserMessage() {
  return (
    <div>
      <div className="main-navbar">
        <div className="navbar-title">🎯 Daily Tasks</div>
        <button className="btn-navbar">
          {" "}
          <Link to="/signin"> Sign-in </Link>
        </button>
      </div>
      <hr />
      <div className="centered">
        <div>
          <img src={Photo} alt="Email Sent Photo" className="photo" />
        </div>

        <div className="h1">
          <h1>We send link to your email.</h1>
        </div>

        <div className="p">
          <p>
            You can log into your profile using the link we sent. Please check
            your email.
          </p>
          <button className="btn-navbar">
            <Link to="/verification"> Modal </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMessage;
