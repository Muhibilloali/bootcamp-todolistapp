import React, { useState, useEffect } from "react";
import Photo from "../Images/user-icon.jpg";
import Profile from "../Images/user-icon.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./Daily.css";

function Daily() {
  // bu kod bugungi sanani chiqarish uchun
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

  // bu kod bu haftani chiqarish uchun

  const [week, setWeek] = useState(getCurrentDay());

  function getCurrentDay() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    return days[today];
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const day = getCurrentDay();
      setWeek(day);
    }, 1000 * 60 * 60 * 24); // Gün başına bir kez güncelle

    return () => clearInterval(intervalId); // setInterval'i temizle
  }, []); // useEffect sadece bir kez çalışsın ve bileşen oluşturulduğunda

  // bu kod dropdownni chiqarish uchun

  const [isToDoOpen, setIsToDoOpen] = useState(false);

  const toggleMenuToDo = () => {
    setIsToDoOpen(!isToDoOpen);
  };

  const [isProgressOpen, setIsProgressOpen] = useState(false);

  const toggleMenuProgress = () => {
    setIsProgressOpen(!isProgressOpen);
  };

  const [isDoneOpen, setIsDoneOpen] = useState(false);

  const toggleMenuDone = () => {
    setIsDoneOpen(!isDoneOpen);
  };

  //const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  // const [isToDoOpen, setIsToDoOpen] = useState(false);

  // const toggleMenuToDo = () => {
  //   setIsToDoOpen(!isToDoOpen);
  // };

  // Add new plan uchun api uchun kod
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
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

  const [isNewOpen, setIsNewOpen] = useState(false);

  // const toggleMenuNew = () => {
  //   setIsNewOpen(!isNewOpen);
  // };

  // const toggleMenuNew1 = (newValue) => {
  //   setIsNewOpen(newValue !== undefined ? newValue : !isNewOpen);
  // };  

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleMenuNew = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
  
  const renderTitles = () => {
    return data.map((item) => (
      <div key={item.id} className="plan">
        <div className="item-text">
        <p>{item.name}</p>
        </div>
        <div className="task-pointer">
        <MoreVertIcon onClick={() => toggleMenuNew(item.id)} className="pointer"   />
        <span className="tree-pointer" id={item.id}>
          
          {openDropdownId === item.id && (
            <div className="dropdown-menu">
              <ul>
                <li>Move to “In process”</li>
                <li>Move to “Done”</li>
                <li>Delete</li>
              </ul>
            </div>
          )}
        </span>
        </div>
      </div>
    ));
  };

  // bu yerdan return boshlanadi
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
                <p className="option-activ">
                  {" "}
                  <Link to="/daily"> Today's challenges </Link>{" "}
                </p>
              </div>
              <div>
                <p className="option">
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
                  <AddAlertIcon /> add special day
                </p>
              </div>
              <button className="logout">
                Log out <LogoutIcon className="logout-icon" />
              </button>
            </div>
          </div>
        </div>
        {/* Control Pages section end */}

        <div className="taskSection">
          <div className="timeу">
            <p className="timeIndicator">
              {presentDate} {week}
            </p>
          </div>
          <div className="contain">
            <div className="box1">
              <div className="list">
                <p className="groupName">To do</p>
                {/* <span className="tree-pointer">
                  <MoreVertIcon onClick={toggleMenuToDo} className="pointer" />
                  {isToDoOpen && (
                    <div className="dropdown-menu">
                      <ul>
                        <li>Move to “In process”</li>
                        <li>Move to “Done”</li>
                        <li>Delete</li>
                      </ul>
                    </div>
                  )}
                </span> */}
              </div>
              <div className="tasks">{renderTitles()}</div>

              <p className="testAddTask">+ add task</p>
            </div>
            <div className="box2">
              <div className="list">
                <p className="groupName">In process</p>
                {/* <span className="tree-pointer">
                  <MoreVertIcon onClick={toggleMenuProgress} />
                  {isProgressOpen && (
                    <div className="dropdown-menu">
                      <ul>
                        <li>Move to "To Do"</li>
                        <li>Move to “Done”</li>
                        <li>Delete</li>
                      </ul>
                    </div>
                  )}
                </span> */}
              </div>
            </div>
            <div className="box3">
              <div className="list">
                <p className="groupName">Done</p>
                {/* <span className="tree-pointer">
                  <MoreVertIcon onClick={toggleMenuDone} />
                  {isDoneOpen && (
                    <div className="dropdown-menu">
                      <ul>
                        <li>Move to “To Do”</li>
                        <li>Move to “In process”</li>
                        <li>Delete</li>
                      </ul>
                    </div>
                  )}
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-addf-plan">
        <Modal
          className="modal-add-plan"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          {/* <div className="close-emoji" onClick={() => setModalIsOpen(false)}>
          ❎
        </div> */}
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

export default Daily;
