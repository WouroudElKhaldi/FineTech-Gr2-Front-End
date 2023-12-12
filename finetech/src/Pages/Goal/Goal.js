import { useState, useEffect, useContext } from "react";
import { Box, Stack } from "@mui/material";
import React from "react";

import { AuthContext } from "../../Context/AuthContext";

import { Typography } from "@mui/material";
import DeleteGoalModal from "../../Components/GoalForm/DeleteGoalModal";
import useApi from "../../Hooks/UseApi";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Navbar from "../../Layouts/Navbar/Navbar";
import { Button } from "@mui/material"
import TableComponent from '../../Components/Table/Table.js'
import AddGalModal from "../../Components/GoalForm/AddGoalModal";
import GoalChart from "../../Components/GoalChart/GoalChart";
export default function Goal() {
  const [isChartOpen, setIsChartOpen] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const { apiCall } = useApi();
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(null);
  const [profit, setProfit] = useState(null);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [goalData, setGoalData] = useState(null);

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setOpenEdit(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };

  // const handleClose = () => {
  //   console.log('handleClose called');
  //   setIsChartOpen(false);
  // };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  // const handleClose = () => {
  //   setIsChartOpen(false);
  //   setSelectedRow(null);
  // };


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

  // const closeChart = () => {
  //   console.log('closeChart called');
  //   setIsChartOpen(prevIsChartOpen => !prevIsChartOpen);
  //   handleClose(); // Call the handleClose prop
  // };


  const data = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      role: "Admin",
      dob: "1990-01-01",
      email: "john@example.com",
    },
  ];
  const { user } = useContext(AuthContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [wid, setWid] = useState(screenWidth < 500 ? "100%" : "80%");

  useEffect(() => {
    const fetchTarget = async () => {
      try {
        const total = await apiCall({
          url: "/api/goals/byDate",
          method: "post",
        });
        setTarget(total.data.Goal);
      } catch (error) {
        console.error("Error fetching target:", error);
        setError(true);
      }
    };
    const fetchGoalData = async () => {
      setLoading(true);
      setNetworkError(false);
      setError(false);

      try {
        const response = await apiCall({
          url: "/api/goals", // Adjust the URL based on your API
          method: "get",
        });

        setGoalData(response.data); // Corrected variable name to setGoalData
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
    fetchGoalData();
    fetchTarget();
  }, []);


  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: "5rem" }}
    >
      <Navbar />
      <Sidebar />
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "left", mt: 3, mb: 3, ml: 2, fontWeight: "bold" }}
      >
        Manage Goals
      </Typography>
      {/* {selectedRow && ( */}
      <span
        style={{
          width: "50%",
          background: "#212936",
          padding: "2rem",
          borderRadius: "15px",
          marginBottom: '2rem'
        }}
      >
        <GoalChart
          handleClose={handleClose}
          isChartOpen={!!selectedRow}
          row={selectedRow}
          profit={profit}
          target={target}
        />
      </span>
      {/*   
      <span
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "95%",
        }}
      > */}
      {/* <Button
     style={{
      display: "flex",
      justifyContent: "flex-end",
      width: "95%",
    }}
  variant="contained"
  size="large"
  onClick={handleOpen}
>
  Add Goal
</Button> */}
      <span
        style={{
          width: "fit-content",
        }}
        onClick={handleOpen}
      >
        <Button variant="contained" size='large' onClick={handleOpen}>Add Goall</Button>            </span>

      <TableComponent
        data={goalData !== null && goalData}
        isEdit={user && user.role === "Accountant" ? false : true}
        ForWhat={"goal"}
        handleEditOpen={handleEditOpen}
        setSelectedRowData={setSelectedRowData}
        handleOpenDelete={handleOpenDelete}
      />
      <AddGalModal open={open} handleClose={handleClose} type="add" />

      <AddGalModal
        type="edit"
        open={openEdit}
        handleClose={handleClose}
        selectedRowData={selectedRowData && selectedRowData}
      />
      <DeleteGoalModal
        selectedRowData={selectedRowData && selectedRowData}
        handleOpenDelete={handleOpenDelete}
        openDelete={openDelete}
        handleClose={handleClose}
        setOpenDelete={setOpenDelete}
      />
    </Box>
  )
}