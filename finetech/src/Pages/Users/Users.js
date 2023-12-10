import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import InfoCard from "../../Components/InfoCard/InfoCard";
import TableComponent from "../../Components/Table/Table";
import UserChart from "../../Components/UserChart/UserChart";
import { Typography } from "@mui/material";
import UserModal from '../../Components/AddUserForm/AddUserModal';
import useApi from '../../Hooks/UseApi';
import Sidebar from '../../Layouts/Sidebar/Sidebar';
import Navbar from '../../Layouts/Navbar/Navbar';

const UserPage = () => {
  const { apiCall } = useApi();
  const [userData, setUserData] = useState(null);
  const [userNumber, setUserNumber] = useState({
    Admin: null,
    Manager: null,
    Accountant: null,
    totalUser: null
  });
  const [userPercentage, setUserPercentage] = useState({
    Admin: null,
    Manager: null,
    Accountant: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [wid, setWid] = useState(screenWidth < 500 ? "100%" : "90%");

  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
      setWid(newWid < 500 ? "100%" : "80%");
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, );

  useEffect(() => {
    const fetchUserNumber = async () => {
      setLoading(true);
      setNetworkError(false);
      setError(false);

      try {
        const response = await apiCall({
          url: '/api/calculations/users-by-role',
          method: 'get',
        });
        setUserNumber({
          Admin: response.data[0].count,
          Manager: response.data[1].count,
          Accountant: response.data[2].count,
          totalUser: response.totalUsers
        });
        setUserPercentage({
          Admin: response.data[0].percentage,
          Manager: response.data[1].percentage,
          Accountant: response.data[2].percentage,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.message === "Network Error") {
          setNetworkError(true);
        } else {
          setError(true);
          console.error("API Error: ", error);
        }
      }
    };

    const fetchUserData = async () => {
      setLoading(true);
      setNetworkError(false);
      setError(false);

      try {
        const response = await apiCall({
          url: 'api/auth//view-all',
          method: 'get'
        });
        setUserData(response.Users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.message === "Network Error") {
          setNetworkError(true);
        } else {
          setError(true);
          console.error("API Error: ", error);
        }
      }
    };

    fetchUserData();
    fetchUserNumber();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml: '5rem' }}>
      <Navbar/>
      <Sidebar />
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "left", mb: 5 , mt: '5rem', fontWeight: 'bold', fontFamily: 'outfit' }}
      >
        Manage Users
      </Typography>
      {networkError ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h5" color="error">Network Issue</Typography>
        </div>
      ) : loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h5">Loading...</Typography>
        </div>
      ) : error ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h5" color="error">Error loading data</Typography>
        </div>
      ) : (
        <>
        <Grid container md={12} sx={{
          '& .MuiGrid2-root': {
            display: 'flex',
            alignContent: 'space-between',
            justifyContent: screenWidth > 1200 ? "" : "flex-start"
          },
          '& .MuiGrid2-container': {
            mb: '2rem',
            flexWrap: 'wrap'
          }
        }}>
          <Grid md={screenWidth > 1200 ? 6 : 12} container spacing={screenWidth > 1200 ? 1 : 0} sx={{
            display: 'flex',
            rowGap: '2rem'
          }}>
            <Grid xs={12} md={12} sx={{
              padding: 0
            }}>
              <InfoCard title={'Total'} number={userNumber && userNumber.totalUser} />
            </Grid>
            <Grid xs={12} md={12} sx={{
              padding: 0
            }}>
              <InfoCard title={'Admins'} number={userNumber && userNumber.Admin} />
            </Grid>
            <Grid xs={12} md={12} sx={{
              padding: 0
            }}>
              <InfoCard title={'Managers'} number={userNumber && userNumber.Manager} />
            </Grid>
            <Grid xs={12} md={12} sx={{
              padding: 0
            }}>
              <InfoCard title={'Accountants'} number={userNumber && userNumber.Accountant} />
            </Grid>
          </Grid>
          <Grid container md={screenWidth > 1200 ? 6 : 12} xs={20} sx={{
            display: 'flex',
            justifyContent: "center"
          }}>
            <UserChart userPercentage={userPercentage} />
          </Grid>
        </Grid>
      <span style={{
        display: 'flex',
        justifyContent: 'end',
        width: '95%'
      }}>
        <UserModal type='add' />
      </span>
      <TableComponent data={userData !== null && userData} wid={wid} isEdit={true} ForWhat={'users'} />
      </>
    )}
    </Box>
  );
};

export default UserPage;
