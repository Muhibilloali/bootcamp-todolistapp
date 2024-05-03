import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/MainPages/Main";
import Signin from "./components/SigninPages/Signin";
import Signup from "./components/SignupPages/Signup";
//import Youtube from "./components/Modal";
import Verification from "./components/EmailVerPages/Verifi";
import "./App.css";
import UserMessage from "./components/UserMessagePages/UserMessage";
import Daily from "./components/DailyPages/Daily";
import Monthly from "./components/MonthlyPages/Monthly";
import Weekly from "./components/WeeklyPages/Weekly";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/modal" element={<Youtube />} /> */}
          <Route path="/verification" element={<Verification />} />
          <Route path="/userMessage" element={<UserMessage />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/weekly" element={<Weekly />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
