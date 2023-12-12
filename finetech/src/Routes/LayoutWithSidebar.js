import React from "react";

import Sidebar from "../Layouts/Sidebar/Sidebar.js";
import Navbar from "../Layouts/Navbar/Navbar.js";
function LayoutWithSidebar({ children }) {
  return (
    <>
      <div>
        <Sidebar />
        <Navbar/>
        {children}
      </div>
    </>
  );
}

export default LayoutWithSidebar;
