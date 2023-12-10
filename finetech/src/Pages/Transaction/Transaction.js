import React, { useState, useEffect } from "react";
import TransactionChart from "../../Components/TransactionChart/TransactionChart";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import InfoCard from "../../Components/InfoCard/InfoCard";
import TableComponent from "../../Components/Table/Table";
import TransModal from "../../Components/AddTransForm/AddTransModal";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Navbar from "../../Layouts/Navbar/Navbar";
import useApi from "../../Hooks/UseApi";

export default function Transaction() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [wid, setWid] = useState(screenWidth < 500 ? "100%" : "80%");
  const { apiCall } = useApi();
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [profit, setProfit] = useState(null);
  const [incPerc, setIncPerc] = useState(null);
  const [outcPerc, setOutcPerc] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);

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
  }, []);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const total = await apiCall({
          url: "/api/calculations/sum-income",
          method: "get",
        });
        setIncome(total.data.totalIncome);
        setIncPerc(total.data.incomePercentage);
      } catch (error) {
        console.error("Error fetching income:", error);
        setError(true);
      }
    };

    const fetchOutcome = async () => {
      try {
        const total = await apiCall({
          url: "/api/calculations/sum-outcome",
          method: "get",
        });
        setOutcome(total.data.totalOutcome);
        setOutcPerc(total.data.outcomePercentage);
      } catch (error) {
        console.error("Error fetching outcome:", error);
        setError(true);
      }
    };

    const fetchAllTrans = async () => {
      try {
        const total = await apiCall({
          url: "/api/transactionss/view-trans",
          method: "get",
        });
        const updatedData = total.map((transaction) => ({
          ...transaction,
          userName: transaction.User.firstName + " " + transaction.User.lastName,
          categoryName: transaction.Category.name,
        }));
        setTransactions(updatedData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
    fetchOutcome();
    fetchAllTrans();
  }, []);

  useEffect(() => {
    if (income !== null && outcome !== null) {
      const profitt = income - outcome;
      setProfit(profitt);
    }
  }, [income, outcome, transactions]);

  return (
    <Box sx={{ flexGrow: 1, pl: "5rem" }}>
      <Navbar />
      <Sidebar />
      <Typography variant="h3" component="h3" sx={{ textAlign: "left",pt: '5rem' , mb: 5, fontWeight: "bold" , fontFamily:'outfit' }}>
        Manage Transactions
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
        <Grid container md={12} mb={"20px"} sx={{ "& .MuiGrid2-root": { display: "flex", alignContent: "space-between", justifyContent: "space-between" } }}>
          <Grid md={screenWidth > 1200 ? 6 : 12} container spacing={1}>
            <Grid xs={12} md={12} sx={{ padding: 0, marginBottom: "1.5Rem" }}>
              {income !== null && <InfoCard title={"Total income"} number={income} />}
            </Grid>
            <Grid xs={12} md={12} sx={{ padding: 0, marginBottom: "1.5Rem" }}>
              {outcome !== null && <InfoCard title={"Total Outcome"} number={outcome} />}
            </Grid>
            <Grid xs={12} md={12} sx={{ padding: 0, marginBottom: "1.5Rem" }}>
              <InfoCard title={"Total profit"} number={profit} />
            </Grid>
          </Grid>
          <Grid container xs={12} md={screenWidth > 1220 ? 6 : 12} mt={screenWidth < 1220 ? "30px" : "0px"} sx={{ display: "flex", justifyContent: "center" }}>
            {income !== null && outcome !== null && <TransactionChart incPerc={incPerc} outcPerc={outcPerc} />}
          </Grid>
        </Grid>
      <span style={{ display: "flex", justifyContent: "flex-end", width: "95%" }}>
        <TransModal type="add" />
      </span>
      <TableComponent data={transactions !== null && transactions} wid={wid} isEdit={true} ForWhat={"transaction"} />
      </>
        )}
    </Box>
  );
}
