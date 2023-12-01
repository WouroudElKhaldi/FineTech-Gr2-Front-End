import React from "react";

import SidebarComp from "../Components/SidebarComp/SidebarComp";
function LayoutWithSidebar({ children }) {
  return (
    <>
      <div
        style={{minHeight: "8vh",
  margin: "4%",
  display: "grid",
  gridTemplateColumns: "15% 85%",
  columngap: "1%"
        }}
      >
        <SidebarComp />
        {children  }
      </div>
    </>
  );
}

export default LayoutWithSidebar;
