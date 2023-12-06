import React, { useState } from "react";
import MainTab from "../../Components/ActivityCard/MainTab";
import EditProfile from "../../Components/EditProfile/EditProfile";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Navbar from "../../Layouts/Navbar/Navbar";
import ProfileDetails from "../../Components/ProfileDetails/ProfileDetails";
import style from "./Profile.module.css";
const Profile = () => {
  const [overview, setOverview] = useState(true);
  const [edit , setEdit] = useState(false)

  const handleOverview = () => {
    setOverview(true);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    setOverview(false);
  };
  return (
    <div>
      <Navbar />
      <ProfileCard
        handleOverview={handleOverview}
        overview={overview}
        handleEdit={handleEdit}
        edit={edit}
      />
      <div className={style.container}>
        {overview && <MainTab />}

        { overview && <ProfileDetails />}
      </div>
      {edit && <EditProfile />}
    </div>
  );
};

export default Profile;
