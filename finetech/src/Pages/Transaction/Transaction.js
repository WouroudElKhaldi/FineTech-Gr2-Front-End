import React, { useState, useEffect, useContext } from "react";
import TransactionChart from "../../Components/TransactionChart/TransactionChart";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import InfoCard from "../../Components/InfoCard/InfoCard";
import TableComponent from "../../Components/Table/Table";
import TransModal from "../../Components/AddTransForm/AddTransModal";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Navbar from "../../Layouts/Navbar/Navbar";
import useApi from "../../Hooks/UseApi";
import DeleteTransModal from "../../Components/DeleteTransForm/DeleteTransModal";
import SaleChart from "../../Components/SaleChart/SaleChart";
import { AuthContext } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

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
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
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
  const { user } = useContext(AuthContext);
  const [successAdd , setSuccessAdd]= useState(false)
  const [successEdit , setSuccessEdit]= useState(false)
  const [successDelete , setSuccessDelete]= useState(false)

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
          userName:
            transaction.User.firstName + " " + transaction.User.lastName,
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

    const fetchChartData = async () => {
      try {
        const response = await apiCall({
          url: "/api/transactionss/by-category",
          method: "post",
          data: { categoryId: 8 },
        });
        setChartData(response);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
    fetchIncome();
    fetchOutcome();
    fetchAllTrans();
  }, [successAdd , successDelete, successEdit]);

  useEffect(() => {
    if (successDelete) {
      toast.success(
        `Transaction id : ${
          selectedRowData && selectedRowData.id
        } has been deleted`
      );
      setSuccessDelete(false);
    }
    if (successAdd) {
      toast.success("Transaction Added Successfuly");
      setSuccessAdd(false);
    }
    if (successEdit) {
      toast.success(`Transaction id: ${selectedRowData && selectedRowData.id} Updated Successfuly`);
      setSuccessDelete(false);
    }
  }, [successDelete, selectedRowData, successAdd ,successEdit]);

  useEffect(() => {
    if (income !== null && outcome !== null) {
      const profitt = income - outcome;
      setProfit(profitt);
    }
  }, [income, outcome, transactions]);

  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: "5rem" }}
    >
      <Navbar />
      <Sidebar />
      <Toaster/>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textAlign: "left",
          pt: "5rem",
          mb: 5,
          fontWeight: "bold",
          fontFamily: "outfit",
        }}
      >
        Manage Transactions
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
            mb={"20px"}
            justifyContent="space-between"
            sx={{
              alignContent: "space-between",
              "& .MuiGrid2-root": {
                alignContent: "space-between",
              },
            }}
          >
            <Grid
              md={screenWidth > 1220 ? 2.5 : screenWidth < 600 ? 12 : 6}
              container
              spacing={1}
              rowGap="1rem"
            >
              <Grid xs={12} md={12} sx={{ padding: 0 }}>
                {income !== null && (
                  <InfoCard title={"Total income"} number={`${income} $`} />
                )}
              </Grid>
              <Grid xs={12} md={12} sx={{ padding: 0 }}>
                {outcome !== null && (
                  <InfoCard title={"Total Outcome"} number={`${outcome} $`} />
                )}
              </Grid>
              <Grid xs={12} md={12} sx={{ padding: 0 }}>
                <InfoCard title={"Total profit"} number={`${profit} $`} />
              </Grid>
            </Grid>
            <Grid
              container
              xs={12}
              md={screenWidth > 1220 ? 3 : screenWidth < 600 ? 12 : 6}
              mt={screenWidth < 1220 ? "2rem" : "0px"}
              sx={{
                display: "flex",
                justifyContent: screenWidth > 1220 ? "center" : "start",
              }}
            >
              {income !== null && outcome !== null && (
                <TransactionChart
                  incPerc={incPerc}
                  outcPerc={outcPerc}
                  screenWidth={screenWidth}
                />
              )}
            </Grid>
            <Grid
              container
              md={screenWidth > 1220 ? 5 : 12}
              xs={11}
              mt={screenWidth < 1220 ? "2rem" : ""}
              mb={screenWidth < 1220 ? "1rem" : ""}
            >
              {chartData && <SaleChart chartData={chartData && chartData} />}
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
              {
                user && (user.role === 'Admin' || user.role === 'Accountant') ? (
                  loading === true ? (
                    <Button variant="contained" color="primary" disabled size='large' startIcon={<AddIcon/>}>Add Transaction</Button>
                  ): (
                    <Button variant="contained" size='large' startIcon={<AddIcon/>}>Add Transaction</Button>
                  )
                ) : ""
            }
              
            </span>
          </span>
          <TableComponent
            data={transactions !== null && transactions}
            isEdit={user && user.role !== null && user.role === "Manager" ? false : true}
            ForWhat={"transaction"}
            handleEditOpen={handleEditOpen}
            setSelectedRowData={setSelectedRowData}
            handleOpenDelete={handleOpenDelete}
          />
          <TransModal 
            open={open} 
            handleClose={handleClose} 
            type="add"
            setSuccessAdd={setSuccessAdd} />

          <TransModal
            type="edit"
            open={openEdit}
            handleClose={handleClose}
            selectedRowData={selectedRowData && selectedRowData}
            setSuccessEdit={setSuccessEdit}
          />
          <DeleteTransModal
            selectedRowData={selectedRowData && selectedRowData}
            handleOpenDelete={handleOpenDelete}
            openDelete={openDelete}
            handleClose={handleClose}
            setOpenDelete={setOpenDelete}
            setSuccessDelete={setSuccessDelete}
          />
        </>
      )}
    </Box>
  );
}
