import React, { useState, useContext, useEffect } from "react";
import MainTab from "../../Components/ActivityCard/MainTab";
import EditProfile from "../../Components/EditProfile/EditProfile";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Navbar from "../../Layouts/Navbar/Navbar";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import ProfileDetails from "../../Components/ProfileDetails/ProfileDetails";
import style from "./Profile.module.css";
import { AuthContext } from "../../Context/AuthContext";
import useApi from "../../Hooks/UseApi";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [overview, setOverview] = useState(true);
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const { user } = useContext(AuthContext);

  const { apiCall } = useApi();

  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      if (user.id !== null) {
        console.log("start fetching");
        const getUser = async () => {
          setLoading(true);
          setNetworkError(false);
          setError(false);
          try {
            const userFetched = await apiCall({
              url: "api/auth/user",
              method: "post",
              data: { id: user.id },
            });
            if (userFetched) {
              setUserData(userFetched.User);
            }
            setLoading(false);
          } catch (error) {
            setLoading(false);
            if (error.message === "Network Error") {
              setNetworkError(true);
            } else {
              setError(true);
            }
          }
        };
        getUser();
      }
    }
  }, [successEdit]);
  
  useEffect(()=>{
    if (successEdit){
      toast.success(`User: ${user.firstName} has been edited successfuly`)
    }
  },[successEdit])

  const handleOverview = () => {
    setOverview(true);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    setOverview(false);
  };

  return (
    <div
      style={{
        marginLeft: "5rem",
      }}
    >
      <Navbar />
      <Sidebar />
      <Toaster/>
      <>
        <span
          style={{
            marginTop: "6rem",
            display: "flex",
            zIndex: -2,
          }}
        >
          <ProfileCard
            handleOverview={handleOverview}
            overview={overview}
            handleEdit={handleEdit}
            edit={edit}
            userData={userData && userData}
          />
        </span>
        <div className={style.container}>
          {overview && <MainTab userData={userData && userData} />}

          {overview && <ProfileDetails userData={userData && userData} />}
        </div>
        {edit && (
          <EditProfile
            userData={userData && userData}
            setSuccessEdit={setSuccessEdit}
          />
        )}
      </>
    </div>
  );
};

export default Profile;
