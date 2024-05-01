import React from "react";
import "./Main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="mainPages">
      <div className="main-navbar">
        <div className="navbar-title">🎯 Daily Tasks</div>
        <button className="btn-navbar">
          {" "}
          <Link to="/signin">Sign-in</Link> 
        </button>
        
      </div>
      <hr />
      <div className="main-center">
        <div className="center-title1">Daily Tasks</div>
        <div className="center-title2">
          After a stroke, it can take time to figure out how to do the tasks
          that make up daily life. <br />
          Here are some tips. Find useful services and connect with others
          living with heart disease or stroke.
        </div>
        {/* <button className="btn-get"> <Link to="/signup">Get-started</Link></button> */}
        <button className="rounded-2xl border-2 border-solid border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
          <Link to="/signup"> Get-started </Link>
        </button>
      </div>
    </div>
  );
}

export default Main;
