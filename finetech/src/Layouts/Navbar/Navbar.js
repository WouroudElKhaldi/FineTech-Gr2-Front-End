import React, { useContext , useEffect , useState} from "react";
import style from "./Navbar.module.css";
import NotificationModal from "../../Components/Notification/NotificationModal";
import { AuthContext } from "../../Context/AuthContext";
import { Avatar } from "@mui/material";
// import { socket } from "../../Components/AddTransForm/AddTransModal";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setNotifications([...notifications, data]);
  //   });
  // });

  return (
    <nav className={style.Nav}>
      <div className={style.navContent}>
        <div className={style.icons}>
          {user && user.role === "Manager" ? 
          <NotificationModal 
            notifications={notifications}
          /> : ""}
        </div>
        <div className={style.userCard}>
          <p>
            Hi,{" "}
            <span style={{ color: "#2D99EF" }}>{user && user.firstName}</span>
          </p>
          <Avatar/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
