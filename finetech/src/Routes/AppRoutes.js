import React, { useContext } from "react";
import { Route, Routes, Navigate , useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Goal from "../Pages/Goal/Goal";
import Login from "../Pages/Login/Login";
import Notification from "../Pages/Notification/Notification";
import Profile from "../Pages/Profile/Profile";
import Report from "../Pages/Report/Report";
import Transaction from "../Pages/Transaction/Transaction";
import Users from "../Pages/Users/Users";
import NotFound from "../Pages/NotFound/NotFound";
import Company from "../Pages/Company/Company";
import { Button, Typography } from "@mui/material";

const PrivateRoute = ({ element, roles }) => {
  const { user, checkUser } = useContext(AuthContext);

  if (checkUser) {
    return <div>Loading...</div>;
  }

  if (roles && roles.includes(user.role)) {
    return element;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/transaction"
          element={
            // <PrivateRoute
            //   element={<Transaction />}
            //   roles={["Admin", "Manager", "Accountant"]}
            // />
            <Transaction />
          }
        />
        <Route
          path="/goal"
          element={
            <PrivateRoute element={<Goal />} roles={["Admin", "Manager"]} />
          }
        />
        <Route
          path="/notification"
          element={
            <PrivateRoute element={<Notification />} roles={["Manager"]} />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              element={<Profile />}
              roles={["Admin", "Manager", "Accountant"]}
            />
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute element={<Report />} roles={["Admin", "Manager"]} />
          }
        />
        <Route
          path="/users"
          element={<PrivateRoute element={<Users />} roles={["Admin"]} />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute element={<Company />} roles={["Admin"]} />}
        />

        <Route
          exact
          path="/"
          element={<Login />}
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: 'column',
        rowGap: '2rem',
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">
        You are not authorized to access this page.
      </Typography>
      <Button variant="outlined" size="large" onClick={()=> navigate('/')}>Return To login Page</Button>
    </div>
  );
};

export default AppRoutes;