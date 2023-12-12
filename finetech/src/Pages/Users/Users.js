import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import InfoCard from "../../Components/InfoCard/InfoCard";
import TableComponent from "../../Components/Table/Table";
import UserChart from "../../Components/UserChart/UserChart";
import { Typography } from "@mui/material";
import UserModal from "../../Components/AddUserForm/AddUserModal";
import useApi from "../../Hooks/UseApi";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Navbar from "../../Layouts/Navbar/Navbar";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteModal from "../../Components/DeleteUserForm/DeleteModal";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import UserLineChart from "../../Components/UserLineChart/UserLineChart";

const UserPage = () => {
  const { apiCall } = useApi();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [userNumber, setUserNumber] = useState({
    Admin: null,
    Manager: null,
    Accountant: null,
    totalUser: null,
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
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setOpenEdit(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
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
  });

  useEffect(() => {
    const fetchUserNumber = async () => {
      setLoading(true);
      setNetworkError(false);
      setError(false);

      try {
        const response = await apiCall({
          url: "/api/calculations/users-by-role",
          method: "get",
        });
        setUserNumber({
          Admin: response.data[0].count,
          Manager: response.data[1].count,
          Accountant: response.data[2].count,
          totalUser: response.totalUsers,
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
          url: "api/auth//view-all",
          method: "get",
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
  }, [successDelete, successAdd, successEdit]);

  useEffect(() => {
    if (successDelete) {
      toast.success(
        `User ${
          selectedRowData.firstName + " " + selectedRowData.lastName
        } has been deleted`
      );
      setSuccessDelete(false);
    }else 
    if (successAdd) {
      toast.success("User Added Successfuly");
      setSuccessAdd(false);
    }else
    if (successEdit) {
      toast.success("User Updated Successfuly");
      setSuccessDelete(false);
    }
  }, [successDelete, selectedRowData, successAdd, successEdit]);

  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: "5rem" }}
    >
      <Navbar />
      <Sidebar />
      <Toaster />
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textAlign: "left",
          mb: 5,
          mt: "5rem",
          fontWeight: "bold",
          fontFamily: "outfit",
        }}
      >
        Manage Users
      </Typography>
      {networkError ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="error">
            Network Issue
          </Typography>
        </div>
      ) : loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Loading...</Typography>
        </div>
      ) : error ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="error">
            Error loading data
          </Typography>
        </div>
      ) : (
        <>
          <Grid
            container
            md={11.8}
            justifyContent="space-between"
            sx={{
              "& .MuiGrid2-root": {
                display: "flex",
                alignContent: "space-between",
                justifyContent:
                  screenWidth > 1200 ? "space-between" : "flex-start",
              },
              "& .MuiGrid2-container": {
                mb: "2rem",
                alignContent: "space-between",
              },
            }}
          >
            <Grid
              md={screenWidth > 1300 ? 2.5 : screenWidth < 600 ? 12 : 6}
              container
              spacing={screenWidth > 1300 ? 1 : 0}
              sx={{
                display: "flex",
                rowGap: "2rem",
              }}
            >
              <Grid
                xs={12}
                md={12}
                sx={{
                  padding: 0,
                }}
              >
                <InfoCard
                  title={"Total Users"}
                  number={`${userNumber && userNumber.totalUser} Users`}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
                sx={{
                  padding: 0,
                }}
              >
                <InfoCard
                  title={"Total Admins"}
                  number={`${userNumber && userNumber.Admin} Admins`}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
                sx={{
                  padding: 0,
                }}
              >
                <InfoCard
                  title={"Total Managers"}
                  number={`${userNumber && userNumber.Manager} Managers`}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
                sx={{
                  padding: 0,
                }}
              >
                <InfoCard
                  title={"Total Accountants"}
                  number={`${userNumber && userNumber.Accountant} Accountants`}
                />
              </Grid>
            </Grid>
            <Grid
              container
              md={screenWidth > 1300 ? 3 : screenWidth < 600 ? 12 : 6}
              xs={20}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <UserChart userPercentage={userPercentage} />
            </Grid>
            <Grid
              container
              md={screenWidth > 1300 ? 5 : 12 }
              xs={20}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <UserLineChart userData={userData} />
            </Grid>
          </Grid>
          <span
            style={{
              display: "flex",
              justifyContent: "end",
              width: "98%",
            }}
          >
            <span
              style={{
                width: "fit-content",
              }}
              onClick={handleOpen}
            >
              <Button variant="contained" color='primary' size='large'startIcon={<AddIcon/>}>Add User</Button>
            </span>
          </span>
          <TableComponent
            data={userData !== null && userData}
            isEdit={user && user.role === "Manager" ? false : true}
            ForWhat={"users"}
            handleEditOpen={handleEditOpen}
            setSelectedRowData={setSelectedRowData}
            handleOpenDelete={handleOpenDelete}
          />
          <UserModal open={open} handleClose={handleClose} type="add" />
          <UserModal
            type="edit"
            open={openEdit}
            handleClose={handleClose}
            selectedRowData={selectedRowData && selectedRowData}
            setSuccessAdd={setSuccessAdd}
            setSuccessEdit={setSuccessEdit}
          />
          <DeleteModal
            selectedRowData={selectedRowData && selectedRowData}
            handleOpenDelete={handleOpenDelete}
            openDelete={openDelete}
            handleClose={handleClose}
            setSuccessDelete={setSuccessDelete}
            setOpenDelete={setOpenDelete}
          />
        </>
      )}
    </Box>
  );
};

export default UserPage;
