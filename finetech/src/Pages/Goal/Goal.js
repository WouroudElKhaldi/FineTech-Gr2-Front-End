import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import Styles from './Goal.module.css';

import TableComponent from '../../Components/Table/Table.js'
import AddGalModal from "../../Components/GoalForm/AddGoalModal";
import GoalChart from "../../Components/GoalChart/GoalChart";
export default function Goal() {


  const data = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      role: "Admin",
      dob: "1990-01-01",
      email: "john@example.com",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      role: "Manager",
      dob: "1995-02-15",
      email: "jane@example.com",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Smith",
      role: "Accountant",
      dob: "1988-07-20",
      email: "alice@example.com",
    },
    {
      id: 4,
      firstName: "Bob",
      lastName: "Johnson",
      role: "Admin",
      dob: "1992-04-10",
      email: "bob@example.com",
    },
    {
      id: 5,
      firstName: "Eva",
      lastName: "Williams",
      role: "Manager",
      dob: "1997-09-05",
      email: "eva@example.com",
    },
    {
      id: 6,
      firstName: "Charlie",
      lastName: "Brown",
      role: "Accountant",
      dob: "1985-12-12",
      email: "charlie@example.com",
    },
    {
      id: 7,
      firstName: "Grace",
      lastName: "Miller",
      role: "Admin",
      dob: "1993-06-30",
      email: "grace@example.com",
    },
    {
      id: 8,
      firstName: "Daniel",
      lastName: "Davis",
      role: "Manager",
      dob: "1989-03-18",
      email: "daniel@example.com",
    },
    {
      id: 9,
      firstName: "Olivia",
      lastName: "Wilson",
      role: "Accountant",
      dob: "1994-11-25",
      email: "olivia@example.com",
    },
    {
      id: 10,
      firstName: "Frank",
      lastName: "Anderson",
      role: "Admin",
      dob: "1987-08-08",
      email: "frank@example.com",
    },
    {
      id: 11,
      firstName: "Sophia",
      lastName: "Moore",
      role: "Manager",
      dob: "1991-05-22",
      email: "sophia@example.com",
    },
    {
      id: 12,
      firstName: "William",
      lastName: "Martin",
      role: "Accountant",
      dob: "1996-10-12",
      email: "william@example.com",
    },
    {
      id: 13,
      firstName: "Ava",
      lastName: "Thompson",
      role: "Admin",
      dob: "1986-02-28",
      email: "ava@example.com",
    },
    {
      id: 14,
      firstName: "James",
      lastName: "Clark",
      role: "Manager",
      dob: "1998-04-08",
      email: "james@example.com",
    },
    {
      id: 15,
      firstName: "Emma",
      lastName: "Ward",
      role: "Accountant",
      dob: "1984-09-15",
      email: "emma@example.com",
    },
    {
      id: 16,
      firstName: "Liam",
      lastName: "Evans",
      role: "Admin",
      dob: "1999-12-03",
      email: "liam@example.com",
    },
    {
      id: 17,
      firstName: "Isabella",
      lastName: "Cooper",
      role: "Manager",
      dob: "1983-07-07",
      email: "isabella@example.com",
    },
    {
      id: 18,
      firstName: "Wouroud",
      lastName: "Fisher",
      role: "Accountant",
      dob: "1990-11-20",
      email: "jackson@example.com",
    },
    {
      id: 19,
      firstName: "Marwa",
      lastName: "Bennett",
      role: "Admin",
      dob: "1988-03-25",
      email: "olivia@example.com",
    },
    {
      id: 20,
      firstName: "Ethan",
      lastName: "Coleman",
      role: "Manager",
      dob: "1995-06-18",
      email: "ethan@example.com",
    },
  ];

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [wid, setWid] = useState(screenWidth < 500 ? "100%" : "80%");

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


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "left", mt: 3, mb: 3, ml: 2, fontWeight: "bold" }}
      >
        Manage Goals
      </Typography>
        <Grid container md={12} sx={
            {'& .MuiGrid2-root':{
              display: 'flex' ,
              alignContent: 'space-between',
            }, 
          '& .MuiGrid2-container':{
            mb: '2rem', 
            flexWrap: 'wrap'
          }}
          }></Grid>
      <Grid container md={15} className={Styles.bgerContainerig}>
        <Grid container md={6} xs={6} mb={"40px"}>
          <GoalChart />
        </Grid>
      </Grid>

      <span
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "95%",
      }}>
        <AddGalModal type='add' />
      </span>
      <TableComponent data={data} wid={wid} isEdit={true} ForWhat={'goal'} />
    </Box>
  );
}
