import React from "react";

import Sidebar from "../Layouts/Sidebar/Sidebar.js";
function LayoutWithSidebar({ children }) {
  return (
    <>
      <div
        style={{
          minHeight: "8vh",
          margin: "0%",
          display: "grid",
          gridTemplateColumns: "20% 75%",
          columnGap: "4%",
        }}
      >
        <Sidebar />
        {children}
      </div>
    </>
  );
}

export default LayoutWithSidebar;
