import React from 'react'
import './Monthly.css'
import { Link } from 'react-router-dom'
import Photo from "../Images/user-icon.jpg";
import Profile from "../Images/user-icon.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Monthly() {

  
  return (
    <div className="dailyPages">
    <div className="main-navbar">
      <div className="navbar-title">🎯 Daily Tasks</div>
      <img className="navbar-photo" src={Photo} alt="" />
    </div>
    <hr className="hr" />

    {/* Control Pages section start */}
    <div className="dailyMainPages">
      <div className="controlPages">
        <div className="mainMenu">
          {/* user profile */}
          <div className="userInfo">
            <div>
              <img
                src={Profile}
                alt="User default photo"
                className="userPic"
              />
            </div>
            <div className="userData">
              <div>
                <h2 className="username">Ali Vefa</h2>
              </div>
              <div>
                <p className="email">example@email.com</p>
              </div>
            </div>
          </div>

          {/* menu */}
          <div className="menuItems">
            <div>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="option"> <Link to="/daily"> Today's challenges </Link> </p>
            </div>
            <div>
              <p className="option"> <Link to="/weekly">Weekly Tasks</Link> </p>
            </div>
            <div>
              <p className="option-activ"><Link to="/monthly">Monthly Tasks</Link></p>
            </div>
            <div>
              <p className="option">+ add special day</p>
            </div>
            <button className="logout">Log out</button>
          </div>
        </div>
      </div>
      {/* Control Pages section end */}

      <div className="taskSection">
        <div className="timeу">
          <p className="timeIndicator">Monthly Plan</p>
        </div>
        <div className="contain">
          <div className="box">
            <div className="list">
              <p className="groupName">To do</p>
              <span className="tree-pointer">
                <MoreVertIcon />
              </span>
            </div>
            <div className="tasks">
              <p className="plan">Need to go to market</p>
            </div>
            <p className="testAddTask">+ add task</p>
          </div>
          <div className="box">
            <div className="list">
              <p className="groupName">In process</p>
              <span className="tree-pointer">
                <MoreVertIcon />
              </span>
            </div>
          </div>
          <div className="box">
            <div className="list">
              <p className="groupName">Done</p>
              <span className="tree-pointer">
                <MoreVertIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Monthly