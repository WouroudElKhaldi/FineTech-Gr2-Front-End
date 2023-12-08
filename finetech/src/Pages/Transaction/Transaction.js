import { useState, useEffect } from "react";
import TransactionChart from "../../Components/TransactionChart/TransactionChart";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import InfoCard from "../../Components/InfoCard/InfoCard";
import TableComponent from "../../Components/Table/Table.js";
import TransModal from "../../Components/AddTransForm/AddTransModal";

// import styled from "@emotion/styled/types/base";
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
  const [outcPerc, setoutcPerc] = useState(null);
  const [transactions , setTransactions]=useState([])

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
    const fetchIncome = async () => {
      try {
        const total = await apiCall({
          url: "/api/calculations/sum-income",
          method: "get",
        });
        setIncome(total.data.totalIncome);
        setIncPerc(total.data.incomePercentage);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    // console.log(object)
    const fetchOutcome = async () => {
      try {
        const total = await apiCall({
          url: "/api/calculations/sum-outcome",
          method: "get",
        });
        console.log("After API Call:", total);
        setOutcome(total.data.totalOutcome);
        setoutcPerc(total.data.outcomePercentage);
        setLoading(false);
        console.log("Outcome:", total.data.totalOutcome);
        console.log("%", total.data.outcomePercentage);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchAllTrans = async () => {
      try {
        const total = await apiCall({
          url: "/api/transactionss/view-trans",
          method: "get",
        });
        console.log("After API Call:", total);
         const updatedData = total.map((transaction) => ({
           ...transaction,
           userName:
             transaction.User.firstName + " " + transaction.User.lastName,
           categoryName: transaction.Category.name,
         }));
        setTransactions(updatedData);

        setLoading(false);
        console.log("Transactions:", total);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchIncome();
    fetchOutcome();
    fetchAllTrans();
  },[]);


  useEffect(() => {
    if (income !== null && outcome !== null) {
      const profitt = income - outcome;
      setProfit(profitt);
    }
  }, [income, outcome, transactions]);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "left", mt: 3, mb: 3, ml: 2, fontWeight: "bold" }}
      >
        Manage Transactions
      </Typography>
      <Grid
        container
        md={12}
        mb={"20px"}
        sx={{
          "& .MuiGrid2-root": {
            display: "flex",
            alignContent: "space-between",
            justifyContent: "space-between",
          },
        }}
      >
        <Grid md={screenWidth > 1200 ? 6 : 12} container spacing={1}>
          <Grid
            xs={12}
            md={12}
            sx={{
              padding: 0,
            }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              income !== null && (
                <InfoCard title={"Total income"} number={income} />
              )
            )}
          </Grid>
          <Grid
            xs={12}
            md={12}
            sx={{
              padding: 0,
            }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              outcome !== null && (
                <InfoCard title={"Total Outcome"} number={outcome} />
              )
            )}{" "}
          </Grid>
          <Grid
            xs={12}
            md={12}
            sx={{
              padding: 0,
            }}
          >
            <InfoCard title={"Total profit"} number={profit} />
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          md={screenWidth > 1220 ? 6 : 12}
          mt={screenWidth < 1220 ? "30px" : "0px"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            income !== null &&
            outcome !== null && (
              <TransactionChart incPerc={incPerc} outcPerc={outcPerc} />
            )
          )}{" "}
        </Grid>
      </Grid>
      <span
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "95%",
        }}
      >
        <TransModal type="add" />
      </span>
      <TableComponent
        // data={data}
        data={transactions !== null && transactions}
        wid={wid}
        isEdit={true}
        ForWhat={"transaction"}
        
      />
    </Box>
  );
}
