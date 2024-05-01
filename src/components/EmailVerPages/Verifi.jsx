import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./Verifi.css";

function Verification() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Modal ochilganda asosiy ilova elementini aniqlash
    Modal.setAppElement("#root"); // #root ni ilova asosiy DOM elementining ID si bilan almashtiring
  }, []);

  return (
    <div className="mainPages">
      <div className="main-navbar">
        <div className="navbar-title">🎯 Daily Tasks</div>
      </div>
      <hr />
      <div className="main-center">
        <div className="content">
          <div className="box">
            <div className="texts">
              <div className="mainText">Email Verification</div>
              <p>
                <span>Hi User,</span> <br /> You received this Email Message to
                Activate Your Account on DailyTasks.com.
              </p>
              <br />
              <p>Press the button to verify your Email.</p>
            </div>
          </div>
          <div className="button_btn">
            <button
              className="verify-btn"
              onClick={() => setModalIsOpen(true)}
            >
              Verify Email
            </button>
          </div>
        </div>
      </div>

      {/* Modal bo'limi boshlanishi */}
      <Modal
        className="modal-form-in"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {/* <div className="close-emoji" onClick={() => setModalIsOpen(false)}>
          ❎
        </div> */}
        <h3>✅ Registration Successfully!</h3>
        <p>We send link to your email. Please check your email</p>
        <div>
          {/* Bu yerga DailyPagesning Linki qo'yilishi kerak */}
          <button onClick={() => setModalIsOpen(false)}>
            <Link to="/daily">OK</Link>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Verification;
