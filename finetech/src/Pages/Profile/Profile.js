import React, { useState , useContext, useEffect} from "react";
import MainTab from "../../Components/ActivityCard/MainTab";
import EditProfile from "../../Components/EditProfile/EditProfile";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Navbar from "../../Layouts/Navbar/Navbar";
import ProfileDetails from "../../Components/ProfileDetails/ProfileDetails";
import style from "./Profile.module.css";
import { AuthContext } from "../../Context/AuthContext";
import useApi from "../../Hooks/UseApi";

const Profile = () => {
  const [overview, setOverview] = useState(true);
  const [edit , setEdit] = useState(false)
  const [userData , setUserData] = useState(null)

  const {user} = useContext(AuthContext)

  const { apiCall } = useApi();


  useEffect(()=>{
 if(user){
  if(user.id !== null ){

    console.log("start fetching")
    const getUser = async() =>{
      const userFetched = await apiCall({url:'api/auth/user',method:'post',data:{id:user.id}})
      if(userFetched){
        setUserData(userFetched)
      }
    }
    getUser()
  }
    }
  },[user])

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
        userData={userData}
      />
      <div className={style.container}>
        {overview && 
          <MainTab
            userData={userData}
          />}

        { overview && 
          <ProfileDetails
            userData={userData}
          />}
      </div>
        {edit && 
          <EditProfile
            userData={userData}
          />}
    </div>
  );
};

export default Profile;
