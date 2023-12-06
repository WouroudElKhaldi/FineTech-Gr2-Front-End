import React from "react";

import MainTab from "../../Components/ActivityCard/MainTab";
import EditProfile from "../../Components/EditProfile/EditProfile";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import ProfileDetails from "../../Components/ProfileDetails/ProfileDetails";
import style from "./Profile.module.css"
export default function Profile() {
  return (
    <div>
      <ProfileCard />
      <div className={style.container}>
        <MainTab />
        <ProfileDetails />
      </div>

      <EditProfile />
    </div>
  );
}
