import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Button } from "../Button/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AddTrans.module.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useApi from "../../Hooks/UseApi";
import { AuthContext } from "../../Context/AuthContext";
////////////////////////////////////////

const types = [
  {
    value: "Income",
    label: "Income",
  },
  {
    value: "Outcome",
    label: "Outcome",
  },
];
// const data = [
//   {
//     value: "Water",
//     label: "Water",
//   },
//   {
//     value: "Electricity",
//     label: "Electricity",
//   },
//   {
//     value: "Salaries",
//     label: "Salaries",
//   },
//   {
//     value: "maintainance",
//     label: "maintainance",
//   },
//   {
//     value: "debts",
//     label: "debts",
//   },
// ]

// ;

/////////////////////////////////////////////

const AddTrans = ({ handleClose, type, selectedRowData }) => {
  const formRef = React.createRef(null); // it referance the DOM
  const [categoryId, setCategoryId] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [amount, setAmount] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { apiCall } = useApi();

  const userId = user.id;
  const handleChange = (event) => {
    if (event.target.name === "type") {
      setSelectedType(event.target.value);
    } else if (event.target.name === "categoryId") {
      setCategoryId(event.target.value);
    } else {
      setAmount(event.target.value);
    }
  };

  const handleAddTrans = async (e) => {
    e.preventDefault();
    try {
      const total = await apiCall({
        url: "/api/transactionss/add",
        method: "post",
        data: {
          type: selectedType,
          amount: amount,
          userId: userId,
          categoryId: categoryId,
        },
      });
      // Assuming the response contains updated transaction data, handle it appropriately.
      // For example, you might want to update the UI or show a success message.
      console.log("Transaction added successfully:", total.data);
    } catch (error) {
      // Handle errors more gracefully, e.g., show a user-friendly error message.
      console.log("Error adding transaction:", error);
    }

    handleClose();
  };
  ////////////////////
    useEffect(() => {
      if (type === "edit" && selectedRowData) {
        // Populate your form fields with selectedRowData
        setSelectedType(selectedRowData.type);
        setCategoryId(selectedRowData.categoryId);
        setAmount(selectedRowData.amount);
        // ... (other fields)
      }
    }, [type, selectedRowData]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const total = await apiCall({
        url: "/api/transactionss/edit",
        method: "patch",
        data: {
          type: selectedType,
          amount: amount,
          userId: userId,
          categoryId: categoryId,
        },
      });
      // Assuming the response contains updated transaction data, handle it appropriately.
      // For example, you might want to update the UI or show a success message.
      console.log("Transaction edited successfully:", total.data);
    } catch (error) {
      // Handle errors more gracefully, e.g., show a user-friendly error message.
      console.log("Error adding transaction:", error);
    }
    handleClose();
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
    marginTop: "1.5rem",
  };

  const spanStyle = {
    display: "flex",
    alignItems: "center",
  };

  useEffect(() => {
    // console.log(object)
    const fetchCategories = async () => {
      try {
        const total = await apiCall({
          url: "/api/categories/view-all-categories",
          method: "get",
        });
        console.log("After API Call:", total);
        setCategories(total.data);

        setLoading(false);
        console.log("types:", total.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Box
        sx={{
          "& .MuiFormControl-root": {
            mt: 2,
            mb: 2,
            ml: 0,
            mr: 0,
            width: "25rem",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiFormLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            border: "white",
          },
          "& .MuiOutlinedInput-notchedOutline ": {
            border: "1px solid white",
            borderRadius: "4px",
          },
          "& .MuiButtonBase-root": {
            // color: "black",
            // backgroundColor: "aqua",
          },
        }}
        autoComplete="off"
      >
        <div style={divStyle}>
          {type === "add" ? (
            <Typography
              variant="h4"
              component="h4"
              sx={{
                textAlign: "left",
                mt: 3,
                mb: 3,
                ml: "8px",
                width: "fit-content",
                fontWeight: "bold",
              }}
            >
              Add Transactions
            </Typography>
          ) : (
            <Typography
              variant="h4"
              component="h4"
              sx={{
                textAlign: "left",
                mt: 3,
                mb: 3,
                ml: "8px",
                width: "fit-content",
                fontWeight: "bold",
              }}
            >
              Edit Transactions
            </Typography>
          )}

          <span
            style={spanStyle}
            className={styles.Exit}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </span>
        </div>
        <form onSubmit={type === "add" ? handleAddTrans : handleEditUser}>
          <Stack>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type *</InputLabel>
              <Select
                name="type"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedType}
                label="Type *"
                onChange={(e) => handleChange(e)}
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Categories *
              </InputLabel>
              <Select
                name="categoryId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="categories *"
                onChange={(e) => handleChange(e)}
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                {categories &&
                  categories
                    .filter((option) =>
                      selectedType === "Income"
                        ? option.type === "Income"
                        : option.type === "Outcome"
                    )
                    .map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>

            <TextField
              name="amount"
              required
              id="outlined-required"
              label="Amount"
              placeholder="Amount"
              type="number"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 12);
              }}
              onChange={(e) => handleChange(e)}
            />
            <div style={divStyle}>
              <Button
                type={"submit"}
                text={type === "add" ? "Add" : "Edit"}
                color={"blue"}
                size={"small"}
              />
            </div>
          </Stack>
        </form>
      </Box>
    </>
  );
};
export default AddTrans;
