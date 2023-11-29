import React from "react";
import { Route, Routes } from "react-router-dom";
import Goal from "./Pages/Goal/Goal";
import Login from "./Pages/Login/Login";
import Notification from "./Pages/Notification/Notification";
import Profile from "./Pages/Profile/Profile";
import Report from "./Pages/Report/Report";
import Transaction from "./Pages/Transaction/Transaction";
import Users from "./Pages/Users/Users";
import SidebarComp from "./Components/SidebarComp/SidebarComp";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <SidebarComp />

      <Routes>
        <Route exact path="/Goal" element={<Goal />}>
          <Route exact path="/Login" element={<Login />}></Route>
          <Route path="/Notification" element={<Notification />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/Report" element={<Report />}></Route>
          <Route path="/Transaction" element={<Transaction />}></Route>
          <Route path="/Users" element={<Users />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
