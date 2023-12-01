import React from "react";
import { Route, Routes } from "react-router-dom";
import Goal from "../Pages/Goal/Goal";
import Login from "../Pages/Login/Login";
import Notification from "../Pages/Notification/Notification";
import Profile from "../Pages/Profile/Profile";
import Report from "../Pages/Report/Report";
import Transaction from "../Pages/Transaction/Transaction";

import Users from "../Pages/Users/Users";
import NotFound from "../Pages/NotFound/NotFound";

import LayoutWithSidebar from "./LayoutWithSidebar"
function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/transaction"
          element={
            <LayoutWithSidebar>
              {" "}
              <Transaction />
            </LayoutWithSidebar>
          }
        ></Route>
        <Route
          exact
          path="/goal"
          element={
            <LayoutWithSidebar>
              <Goal />
            </LayoutWithSidebar>
          }
        ></Route>
        <Route
          path="/notification"
          element={
            <LayoutWithSidebar>
              <Notification />
            </LayoutWithSidebar>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <LayoutWithSidebar>
              <Profile />
            </LayoutWithSidebar>
          }
        ></Route>
        <Route
          path="/report"
          element={
            <LayoutWithSidebar>
              <Report />
            </LayoutWithSidebar>
          }
        ></Route>
        <Route
          path="/users"
          element={
            <LayoutWithSidebar>
              <Users />
            </LayoutWithSidebar>
          }
        ></Route>

        

        <Route exact path="/" element={<Login />}></Route>
        <Route path="/notFound" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
