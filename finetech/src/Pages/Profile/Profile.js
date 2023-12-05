import React from "react";

import MainTab from "../../Components/ActivityCard/MainTab";
import EditProfile from "../../Components/EditProfile/EditProfile";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
export default function Profile() {
  return (
    <div>
      {/* <MainTab /> */}
      <ProfileCard/>
      <EditProfile/>
    </div>
  );
}
