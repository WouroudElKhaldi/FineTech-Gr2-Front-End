import React, { useContext } from "react";
import style from "./Navbar.module.css";
import NotificationModal from "../../Components/Notification/NotificationModal";
import { AuthContext } from "../../Context/AuthContext";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <nav className={style.Nav}>
      <div className={style.navContent}>
        <h2 style={{
          fontFamily: 'outfit',
          fontWeight: 500,
          color : '#1976d2'
        }}>
          Money Minder
        </h2>
        <div className={style.icons}>
          {user && user.role === "Manager" ? <NotificationModal /> : ""}
        </div>
        <div className={style.userCard}>
          <p>
            Hi,{" "}
            <span style={{ color: "#2D99EF" }}>{user && user.firstName}</span>
          </p>
          <Avatar alt={`${user && user.firstName}`}>{user && user.firstName.charAt(0)}</Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
