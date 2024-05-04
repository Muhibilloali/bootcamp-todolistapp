import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Slider from "react-slick";
import AddIcon from "@mui/icons-material/Add";
//import MoreVertIcon from "@mui/icons-material/MoreVert";
import Photo from "../Images/user-icon.jpg";
import Profile from "../Images/user-icon.jpg";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "./Weekly.css";
import { DragonDropComponent } from "../DragAndDropPages/dragonDropComponent";

function Weekly() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let date = new Date().toLocaleDateString();
  const [presentDate, setPresentDate] = useState(date);

  const updateDate = () => {
    let date = new Date().toLocaleDateString();
    setPresentDate(date);
  };
  setInterval(updateDate, 1000);

  // bu kod soatni chiqarish uchun
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(intervalId); // setInterval'i temizle
  }, []); // useEffect sadece bir kez çalışsın ve bileşen oluşturulduğunda

  //Bu yerdagi kod +ADD modal uchun
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Modal ochilganda asosiy ilova elementini aniqlash
    Modal.setAppElement("#root"); // #root ni ilova asosiy DOM elementining ID si bilan almashtiring
  }, []);
  const [startDate, setStartDate] = useState(new Date());

  // Add new plan uchun api uchun kod
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users?_limit=5"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="dailyPages">
      <div className="main-navbar">
        <div className="navbar-title">🎯 Daily Tasks</div>
        <img className="navbar-photo" src={Photo} alt="" />
        <div className="clock">
          <h1>{currentTime}</h1>
        </div>
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
                <p className="option">
                  {" "}
                  <Link to="/daily"> Today's challenges </Link>{" "}
                </p>
              </div>
              <div>
                <p className="option-activ">
                  {" "}
                  <Link to="/weekly">Weekly Tasks</Link>{" "}
                </p>
              </div>
              <div>
                <p className="option">
                  <Link to="/monthly">Monthly Tasks</Link>
                </p>
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
          <div className="week-days">
            {/* <p className="timeIndicator">Week Plan</p> */}
            {presentDate}
          </div>
          {/* <div className="contain">
            <div className="contain-todo">
              <div className="box1">
                <div className="list">
                  <p className="groupName">To do</p>
                  <div
                    className="addmodal"
                    onClick={() => setModalIsOpen(true)}
                  >
                    <AddIcon />
                  </div>
                  <div>
          
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="contain-progress">
              <div className="box2">
                <div className="list">
                  <p className="groupName">In process</p>
                </div>
              </div>
            </div>
            <div className="contain-done">
              <div className="box3">
                <div className="list">
                  <p className="groupName">Done</p>
                </div>
              </div>
            </div>
          </div> */}
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
  );
}

export default Weekly;
