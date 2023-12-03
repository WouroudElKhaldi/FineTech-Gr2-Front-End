import React from "react";
import SideLayout from '../Layouts/Sidebar/Sidebar.js'

function LayoutWithSidebar({ children }) {
  return (
    <>
      <div
        style={{
        }}
      >
        <SideLayout/>
        {children  }
      </div>
    </>
  );
}

export default LayoutWithSidebar;
