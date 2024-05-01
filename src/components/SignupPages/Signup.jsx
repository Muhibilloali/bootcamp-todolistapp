import React, { useState } from "react";
import { Link } from "react-router-dom";
//import Modal from "react-modal";
import "./signup.css";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    console.log("ok");

    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://djangoapibekmurod.pythonanywhere.com/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });

      if (response.ok) {
        // Success handling
        console.log("User registered successfully!");
      } else {
        // Error handling
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Failed to connect to the server", error);
    }
  };

  return (
    <div className="SignupPages">
      <div className="main-navbar">
        <div className="navbar-title">🎯 Daily Tasks</div>
        <button className="btn-navbar">
          {" "}
          <Link to="/signin"> Sign-in </Link>
        </button>
        <button className="btn-navbar">
          {" "}
          <Link to="/verification">Verification</Link>
        </button>
      </div>
      <hr />
      <div className="form-signup">
        <Card color="transparent" shadow={false}>
          <form
            onSubmit={handleSubmit}
            className="mb-2 ml-96 mt-60 p-8 w-80  text-justify max-w-screen-lg sm:w-96"
          >
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to register.
            </Typography>

            <div className="mb-1 flex flex-col gap-6 ">
              <Typography variant="h6" color="blue-gray" className="-mb-3 ">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="Your name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="email@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Passwords"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              
            />
            <Button type="submit" className="mt-6" fullWidth>
              
               Sign up 
            </Button>
          </form>
        </Card>
      </div>

      {/* <div className="modal-form">
        <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
        <Modal
          className="modal-form-in"
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
        >
          <h3>👌 Registration Successfully!</h3>
          <p>We send link to your email. Please check your email</p>
          <div>
            <button onClick={handleModalClose}>OK</button>
          </div>
        </Modal>
      </div> */}
    </div>
  );
}

export default Signup;
