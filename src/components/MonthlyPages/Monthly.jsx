import React, { useState, useEffect } from 'react'
import './Monthly.css'
import { Link } from 'react-router-dom'
import Photo from "../Images/user-icon.jpg";
import Profile from "../Images/user-icon.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { DragonDropComponent } from "../DragAndDropPages/dragonDropComponent";

function Monthly() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    // Modal ochilganda asosiy ilova elementini aniqlash
    Modal.setAppElement("#root"); // #root ni ilova asosiy DOM elementining ID si bilan almashtiring
  }, []);
  const [startDate, setStartDate] = useState(new Date());
  
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
            <p className="option" onClick={() => setModalIsOpen(true)}>
                  Add Special Day
                </p>
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
            
            <DragonDropComponent />
          </div>
      </div>
    </div>
    <div className="modal-addf-plan">
        <Modal
          className="modal-add-plan"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <h3>All Special Days</h3>
          <div>
            <DatePicker
              className="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="new-plan-input">
            <textarea placeholder="Your plan"></textarea>
          </div>
          <div>
            <button onClick={() => setModalIsOpen(false)}>Add Plan</button>
          </div>
        </Modal>
      </div>
  </div>
  )
}

export default Monthly