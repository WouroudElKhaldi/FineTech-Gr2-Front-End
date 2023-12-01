
import React from "react";
import { Route, Routes } from "react-router-dom";
import Goal from "../Pages/Goal/Goal";
import Login from "../Pages/Login/Login";
import Notification from "../Pages/Notification/Notification";
import Profile from "../Pages/Profile/Profile";
import Report from "../Pages/Report/Report";
import Transaction from "../Pages/Transaction/Transaction";
import SidebarComp from "../Components/SidebarComp/SidebarComp";
import Users from "../Pages/Users/Users";
import NotFound from "../Pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <>
      <SidebarComp />
      <Routes>
        <Route path="/" element={<Transaction />}></Route>
        <Route exact path="/Goal" element={<Goal/>}></Route>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route path="/Notification" element={<Notification />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Report" element={<Report />}></Route>
        <Route path="/Users" element={<Users />}></Route>
        <Route path="/NotFound" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
