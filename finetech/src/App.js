import React from "react";
import { Route, Routes } from "react-router-dom";
import Goal from "./Pages/Goal";
import Login from "./Pages/Login";
import Notification from "./Pages/Notification";
import Profile from "./Pages/Profile";
import Report from "./Pages/Report";
import Transaction from "./Pages/Transaction";
import Users from "./Pages/Users";
import SidebarComp from "./Components/SidebarComp";

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
