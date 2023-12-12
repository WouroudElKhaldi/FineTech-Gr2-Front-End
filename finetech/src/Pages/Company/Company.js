import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import Sidebar from "../../Layouts/Sidebar/Sidebar";

const Company = () => {
  const [companyData, setCompanyData] = useState({
    id: null,
    name: "",
    address: "",
    capital: "",
    editedCapital: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getCompanyData();
  }, []);

  const getCompanyData = async () => {
    setLoading(true);
    try {
      const companyId = 1;
      const response = await axios.post(
        "http://localhost:4000/api/companies/",
        {
          id: companyId,
        }
      );
      const company = response.data.data;

      setCompanyData({
        id: company.id,
        name: company.name,
        address: company.address,
        capital: company.capital,
        editedCapital: company.editedCapital,
      });
    } catch (error) {
      console.error("Error fetching company data:", error);
      setError(true);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:4000/api/companies/",
        {
          id: companyData.id,
          name: companyData.name,
          address: companyData.address,
          capital: companyData.capital,
          editedCapital: companyData.editedCapital,
        }
      );
      // Handle success (if needed)
    } catch (error) {
      console.error("Error updating company data:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: "auto" }}>
      <Navbar />
      <Sidebar />
      <div
        style={{
          marginTop: "5rem",
          marginLeft: "5rem",
        }}
      >
        <Typography
          variant="h3"
          mb={3}
          sx={{
            fontFamily: "outfit",
            fontWeight: 760,
          }}
        >
          Company Info
        </Typography>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="Overview"
            sx={{
              color: "white",
              fontFamily: "outfit",
            }}
          />
          <Tab
            label="Edit"
            sx={{
              color: "white",
              fontFamily: "outfit",
            }}
          />
        </Tabs>
        {value === 0 && (
          <div
            style={{
              marginTop: "1rem",
              width: '40%'
            }}
          >
            <span style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem'
            }}>
              <Typography
                variant="h5"
                sx={{ color: "white", fontFamily: "outfit" }}
              >
                Company Name:{"  "}
              </Typography>
              <Typography
                variant="p"
                sx={{ color: "white", fontFamily: "outfit" }}
              >
                {" "}
                {companyData.name}
              </Typography>
            </span>
            <span style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem'
            }}>
              <Typography
                variant="h5"
                sx={{ color: "white", fontFamily: "outfit" }}
              >
                Address:{" "}
              </Typography>
              <Typography
                variant="p"
                sx={{ color: "white", fontFamily: "outfit" }}
              >
                {" "}
                {companyData.address}
              </Typography>
            </span>
            <span style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem'
            }}>
              <Typography
                variant="h5"
                sx={{ color: "white", fontFamily: "outfit" }}
              >
                Capital:{" "}
              </Typography>
              <Typography
                variant="p"
                sx={{ color: "white", fontFamily: "outfit" }}
              >
                {" "}
                {companyData.capital}
              </Typography>
            </span>
            <span style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem'
            }}>
              <Typography
                variant="h5"
                sx={{ color: "white", fontFamily: "outfit" }}
              >
                Edited Capital:{" "}
              </Typography>
              <Typography
                variant="p"
                sx={{ color: "white", fontFamily: "outfit" }}
              >
                {" "}
                {companyData.editedCapital}
              </Typography>
            </span>
          </div>
        )}
        {value === 1 && (
          <form
            onSubmit={handleEditSubmit}
            style={{
              marginTop: "1rem",
            }}
          >
            <Stack
              spacing={2}
              sx={{
                width: screenWidth > 800 ? "35rem" : "20rem",
                justifyContent: "center",
                rowGap: '2rem',
                '& .MuiOutlinedInput-notchedOutline , & .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
                  borderColor: 'white !important'
                }, 
                '& ..css-1jy569b-MuiFormLabel-root-MuiInputLabel-root':{
                  zIndex: 0
                }
              }}
            >
              <TextField
                label="Name"
                name="name"
                value={companyData.name}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
              />
              <TextField
                label="Address"
                name="address"
                value={companyData.address}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
              />
              <TextField
                label="Capital"
                name="capital"
                value={companyData.capital}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
              />
              <TextField
                label="Edited Capital"
                name="editedCapital"
                value={companyData.editedCapital}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Submit
              </Button>
            </Stack>
          </form>
        )}
      </div>
    </Box>
  );
};

export default Company;
