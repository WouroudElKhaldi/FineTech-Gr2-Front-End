import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import DnsIcon from "@mui/icons-material/Dns";
import style from "./ProfileDetails.module.css";
export default function ProfileDetails({ userData }) {
  if(!userData){
    return <p>Loading ...</p>
  }
  const { id, firstName,lastName, email, dob} =
    userData 
|| {};
      const datePart = userData.dob.slice(0, 10);
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "var(--color-back-card)",
          marginTop: "5.25rem",
          padding: "2rem",
          borderRadius: "20px",
          // "& .MuiTypography-root ":{hei},
        }}
      >
        <Typography variant="h4" fontSize={"1.5Rem"} fontWeight={"bold"}>
          Additional Details
        </Typography>
        <div>
          <span className={style.span}>
            <BadgeIcon />
            <Typography variant="subtitle1" marginRight={"20px"}>
              {" "}
              ID:
            </Typography>{" "}
            <Typography variant="subtitle1">{userData.id}</Typography>
          </span>

          <span className={style.span}>
            <DnsIcon />
            <Typography variant="subtitle1" marginRight={"20px"}>
              Name:
            </Typography>
            <Typography variant="subtitle1">
              {userData.firstName} {userData.lastName}
            </Typography>
          </span>

          <span className={style.span}>
            <EmailIcon />
            <Typography variant="subtitle1" marginRight={"20px"}>
              {" "}
              Email:
            </Typography>
            <Typography variant="subtitle1">{userData.email}</Typography>
          </span>

          <span className={style.span}>
            <EventIcon />
            <Typography variant="subtitle1" marginRight={"20px"}>
              Date of Birth:
            </Typography>
            <Typography variant="subtitle1">{datePart}</Typography>
          </span>
        </div>
      </Box>
    </div>
  );
}
