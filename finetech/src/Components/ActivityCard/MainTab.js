
import React, { useState, useEffect ,useMemo} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Style from "./ActivityCard.module.css";
import ActivityCard from "./ActivityCard";
import Pagination from "@mui/material/Pagination";
import useApi from "../../Hooks/UseApi";


const itemsPerPage = 5;

export default function MainTab({ userData}) {
  const [value, setValue] = React.useState("Transaction");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(true);
  const { apiCall } = useApi(); // Make sure you have this in your custom hook

  const [Transactions, setTransactions] = useState([]);
   const {
     id,
     firstName,
     lastName,
     email,
     dob /* other user data properties */,
   } = userData || {};

  useEffect(() => {
    const fetchHistoryTrans = async () => {
      try {
        const total = await apiCall({
          url: "/api/transactionss/view-trans",
          method: "get",
        });
        setTransactions(total);
        console.log(total);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchHistoryTrans();
  }, [apiCall]); // Add apiCall to the dependency array


  const filteredData = useMemo(() => {
    return Transactions.filter(
      (item) => item.User?.id === userData?.id && item.type === value
    );
  }, [Transactions, userData, value]);

useEffect(() => {
  console.log("Transactions:", Transactions);
  console.log("userData:", userData);
  console.log("value:", value);
  console.log("filteredData:", filteredData);
}, [Transactions, userData, value, filteredData]);

  if (loading) {
    return <div>Loading...</div>; // or any loading state you prefer
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        typography: "body1",
        "& .MuiBox-root ": {
          width: "100%",
          height: "fit-content",
        },
        "& .MuiTabPanel-root": {
          width: "100%",
          backgroundColor: "var(--color-back-card)",
        },
        "& .MuiButtonBase-root": {
          color: "white",
        },
        "& .MuiTabPanel-root ": {
          borderRadius: "20px",
        },
        "& .  MuiTabs-indicator ": {
          marginLeft: "40px",
        },
        marginTop: "2rem",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(e, newValue) => setValue(newValue)}
            aria-label="lab API tabs example"
          >
            <Tab label="Transaction" value="Transaction" />
            <Tab label="Goal" value="Goal" />
          </TabList>
        </Box>

        <TabPanel key={value} value={value}>
          <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
            {value === "Transaction" ? "History Transaction" : "History Goal"}
          </h1>
          {filteredData
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((item) => (
              <div key={item?.id}>
                <p>Type:ssssss {item?.type}</p>
                <p>Amount: {item?.amount}</p>
                <ActivityCard cont={item?.content} />
              </div>
            ))}
          <div className={Style.paginationn}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              variant="outlined"
              color="primary"
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
            />
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
