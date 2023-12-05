import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

const datas = {
  id: 15,
  firstName: "Emma",
  lastName: "Ward",
  role: "Accountant",
  dob: "1984-09-15",
  email: "emma@example.com",
};
export default function ProfileDetails() {
  return (
    <div>
      <Box sx={{ backgroundColor: "var(--color-back-card)" }}>
        <Stack>
          <Typography variant="h6">Additional Details</Typography>
          <div>
            <Typography variant="subtitle1">ID:</Typography>
            <Typography variant="body1">{datas.id}</Typography>
            <Typography variant="subtitle1"> Name:</Typography>
            <Typography variant="body1">
              {datas.firstName} {datas.lastName}
            </Typography>
            <Typography variant="subtitle1">Email;</Typography>
            <Typography variant="body1">{datas.email}</Typography>
            <Typography variant="subtitle1">Date of Birth:</Typography>
            <Typography variant="body1">{datas.dob}</Typography>
          </div>
        </Stack>
      </Box>
    </div>
  );
}
