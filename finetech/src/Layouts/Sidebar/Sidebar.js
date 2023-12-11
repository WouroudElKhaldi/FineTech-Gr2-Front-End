import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PaidIcon from "@mui/icons-material/Paid";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  const managerItems = [
    { item: "Transactions", link: "/transaction", icon: <PaidIcon /> },
    { item: "Goals", link: "/goal", icon: <DataSaverOnIcon /> },
    { item: "Report", link: "/report", icon: <QueryStatsIcon /> },
    {
      item: "Notifications",
      link: "/notification",
      icon: <NotificationsIcon />,
    },
    { item: "Profile", link: "/profile", icon: <PersonIcon /> },
  ];

  const adminItems = [
    { item: "Users", link: "/users", icon: <GroupIcon /> },
    { item: "Transactions", link: "/transaction", icon: <PaidIcon /> },
    { item: "Goals", link: "/goal", icon: <DataSaverOnIcon /> },
    { item: "Report", link: "/report", icon: <QueryStatsIcon /> },
    { item: "Profile", link: "/profile", icon: <PersonIcon /> },
  ];

  const accountantItems = [
    { item: "Transactions", link: "/transaction", icon: <PaidIcon /> },
    { item: "Profile", link: "/profile", icon: <PersonIcon /> },
  ];

  useEffect(() => {
    if (user) {
      if (user.role !== null) {
        if (user.role === "Admin") {
          setItems(adminItems);
        } else if (user.role === "Manager") {
          setItems(managerItems);
        } else {
          setItems(accountantItems);
        }
      }
    }
  }, [user]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles["sidebar-inner"]}>
        <header className={styles["sidebar-header"]}>
          <button
            type="button"
            className={`${styles["sidebar-burger"]} ${styles.button}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={styles["material-symbols-outlined"]}>
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </span>
          </button>
        </header>
        <nav
          className={styles["sidebar-menu"]}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "90vh",
          }}
        >
          <span>
            {items &&
              items.map((item) => (
                <Link
                  to={item.link}
                  key={item.item}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    type="button"
                    className={`${styles["sidebar-button"]} ${styles.button} ${
                      selectedItem === item ? styles.selected : ""
                    }`}
                    tabIndex="0"
                    onClick={() => handleItemClick(item)}
                  >
                    <span style={{ color: "white" }}>{item.icon}</span>
                    <p
                      style={{
                        fontFamily: "outfit",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.item}
                    </p>
                  </button>
                </Link>
              ))}
          </span>
          <span>
            {user && user.role !== null && user.role === "Admin" && (
            <button
              className={`${styles["sidebar-button"]} ${styles.button}`}
              tabIndex="0"
              onClick={() => navigate("/settings")}
            >
              <span style={{ color: "white" }}>
                <SettingsIcon />
              </span>
              <p
                style={{
                  fontFamily: "outfit",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                Settings
              </p>
            </button>
            )}
            <button
              className={`${styles["sidebar-button"]} ${styles.button}`}
              tabIndex="0"
              onClick={() => handleLogout()}
            >
              <span style={{ color: "white" }}>
                <LogoutIcon />
              </span>
              <p
                style={{
                  fontFamily: "outfit",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                Logout
              </p>
            </button>
          </span>
        </nav>
      </div>
    </nav>
  );
};

export default Sidebar;
