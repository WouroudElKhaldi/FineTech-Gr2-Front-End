import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PaidIcon from '@mui/icons-material/Paid';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AuthContext } from "../../Context/AuthContext";

const Sidebar = () => {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const managerItems = [
        { item: "Transactions", link: "/transaction", icon: <PaidIcon/> },
        { item: "Goals", link: "/goal", icon: <DataSaverOnIcon/> },
        { item: "Report", link: "/report", icon: <QueryStatsIcon/> },
        { item: "Notifications", link: "/notification", icon: <NotificationsIcon/> },
        { item: "Profile", link: "/profile", icon: <PersonIcon/> },
    ];

    const adminItems = [
        { item: "Users", link: "/users", icon: <GroupIcon/> },
        { item: "Transactions", link: "/transaction", icon: <PaidIcon/>},
        { item: "Goals", link: "/goal", icon: <DataSaverOnIcon/> },
        { item: "Report", link: "/report", icon: <QueryStatsIcon/> },
        { item: "Profile", link: "/profile", icon: <PersonIcon/> },
    ];

    const accountantItems = [
        { item: "Transactions", link: "/transaction", icon: <PaidIcon/> },
        { item: "Profile", link: "/profile", icon: <PersonIcon/> },
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
            <nav className={styles["sidebar-menu"]}>
              {items &&
                items.map((item) => (
                  <Link
                    to={item.link}
                    key={item.item}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      type="button"
                      className={`${styles["sidebar-button"]} ${
                        styles.button
                      } ${selectedItem === item ? styles.selected : ""}`}
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
            </nav>
          </div>
        </nav>
      );
    };
    
export default Sidebar;
