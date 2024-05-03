import React, { useState, useEffect } from "react";
import Photo from "../Images/user-icon.jpg";
import Profile from "../Images/user-icon.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./Daily.css";
import { DragonDropComponent } from "../DragAndDropPages/dragonDropComponent";

function Daily() {
  // bu yerdagi kod email va usernameni chiqarish uchun ishlatiladi
  // const { username, email } = user;

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

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogout = () => {
    console.log("Your account has been logged out🤪🤪🤪");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
    setIsLoggedIn(false);
  };

  //bu yerdagi kod Delete buttoni uchun
  


  const renderTitles = () => {
    return data.map((item) => (
      <div key={item.id} className="plan">
        <div className="item-text">
          <p>{item.name}</p>
        </div>
        <div className="task-pointer">
          <MoreVertIcon
            onClick={() => toggleMenuNew(item.id)}
            className="pointer"
          />
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




  //bu kod drog and drop uchun

  // const YourComponent = () => {
  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
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
                  <p className="email">info@email.com</p>
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
                  Add Special Day
                </p>
              </div>
              <button className="logout" onClick={handleLogout}>
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
                </div>

                <div>

                  <div className="tasks">
                    <div id="drag1" draggable="true" onDragStart={drag}>

                      {renderTitles()}
                    </div>
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

export default Daily;
