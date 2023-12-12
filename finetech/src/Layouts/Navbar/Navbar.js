import React, { useContext } from "react";
import style from "./Navbar.module.css";
import NotificationModal from "../../Components/Notification/NotificationModal";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className={style.Nav}>
      <div className={style.navContent}>
        <div className={style.icons}>
          {user && user.role === "Manager" ? <NotificationModal /> : ""}
        </div>
        <div className={style.userCard}>
          <p>
            Hi,{" "}
            <span style={{ color: "#2D99EF" }}>{user && user.firstName}</span>
          </p>
          <img
            className={style.userImg}
            src={`${user && user.image}`}
            alt="User img"
            width="40px"
            height="40px"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
