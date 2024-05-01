//! 👇👇👇 BU YERDAGI KODLAR XATOSIZ ISHLAYDI LEKIN API ULASHGA TAYYOR EMAS CHUNKI FUNKSIYALAR YO'Q

// import React from 'react'
// import { Link } from 'react-router-dom';
// import {
//   Card,
//   Input,
//   Checkbox,
//   Button,
//   Typography,
// } from "@material-tailwind/react";


// function Signin() {
//   return (
//     <div className='SigninPages'>
//         <div className="main-navbar">
//             <div className="navbar-title">🎯 Daily Tasks</div>
//             <button className="btn-navbar"><Link to="/signup"> Sign-up </Link></button>
//         </div>
//         <hr />

//         <div className="form-signup">
//         <Card color="transparent" shadow={false}>
          
//           <form className="mb-2 ml-96 mt-60 p-12 w-80  text-justify max-w-screen-lg sm:w-96">
//           <Typography variant="h4" color="blue-gray">
//             Sign In
//           </Typography>
//           <Typography color="gray" className="mt-1 font-normal">
//           Nice to meet you! Enter your email to login.
//           </Typography>
//             <div className="mb-1 mt-8 flex flex-col gap-6">
              
              
//               <Typography variant="h6" color="blue-gray" className="-mb-3">
//                 Your Email
//               </Typography>
//               <Input
//                 size="lg"
//                 placeholder="email@mail.com"
//                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
//                 labelProps={{
//                   className: "before:content-none after:content-none",
//                 }}
//               />
//               <Typography variant="h6" color="blue-gray" className="-mb-3">
//                 Password
//               </Typography>
//               <Input
//                 type="password"
//                 size="lg"
//                 placeholder="********"
//                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
//                 labelProps={{
//                   className: "before:content-none after:content-none",
//                 }}
//               />
//             </div>
//             <Checkbox
//               label={
//                 <Typography
//                   variant="small"
//                   color="gray"
//                   className="flex items-center font-normal"
//                 >
//                   I agree the
//                   <a
//                     href="#"
//                     className="font-medium transition-colors hover:text-gray-900"
//                   >
//                     &nbsp;Terms and Conditions
//                   </a>
//                 </Typography>
//               }
//               containerProps={{ className: "-ml-2.5" }}
//             />
//             <Button className="mt-6" fullWidth>
//               sign In
//             </Button>
//           </form>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default Signin

//! 👆👆☝🏻 BU YERDAGI KODLAR XATOSIZ ISHLAYDI LEKIN API ULASHGA TAYYOR EMAS CHUNKI FUNKSIYAL;AR YO'Q


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'agreedToTerms' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Ma'lumotlar yuborildi
        console.log('Ma\'lumotlar yuborildi');
      } else {
        // Xatolik yuz berdi
        console.error('Ma\'lumotlar yuborilmadi');
      }
    } catch (error) {
      // Ulashish xatosi
      console.error('Ulashingizda xatolik yuz berdi', error);
    }
  };

  return (
    <div className='SigninPages'>
      <div className="main-navbar">
        <div className="navbar-title">🎯 Daily Tasks</div>
        <button className="btn-navbar"><Link to="/signup"> Sign-up </Link></button>
      </div>
      <hr />

      <div className="form-signup">
        <Card color="transparent" shadow={false}>
          <form onSubmit={handleSubmit} className="mb-2 ml-96 mt-60 p-12 w-80  text-justify max-w-screen-lg sm:w-96">
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your email to login.
            </Typography>
            <div className="mb-1 mt-8 flex flex-col gap-6">
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
                placeholder="********"
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
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
