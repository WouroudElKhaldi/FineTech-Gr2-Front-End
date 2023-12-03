import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";
import Style from "./ActivityCard.module.css"

const mockData = [
  { id: "1", type: "Transaction", content: "Transaction 1 Details" },
  { id: "2", type: "Transaction", content: "Transaction 2 Details" },
  { id: "3", type: "Goal", content: "Goal 1 Details" },
  { id: "4", type: "Goal", content: "Goal 2 Details" },
];

export default function MainTab() {
  const [value, setValue] = React.useState("Transaction");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        "& .MuiBox-root": { width: "40ch", backgroundColor: "green" },
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Transaction" value="Transaction" />
            <Tab label="Goal" value="Goal" />
          </TabList>
        </Box>
        {mockData.map((item) => (
          <div className={Style.cardComp}>
            <TabPanel key={item.id} value={item.type}>
              <Typography>{item.content}</Typography>
            </TabPanel>
          </div>
        ))}
      </TabContext>
    </Box>
  );
}