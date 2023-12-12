import Modal from "@mui/material/Modal";
import { Button } from "../Button/Button";
import Box from "@mui/material/Box";
import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useApi from "../../Hooks/UseApi";
import { AuthContext } from "../../Context/AuthContext";
import styles from "./AddTrans.module.css";
// import io from "socket.io-client";

// export const socket = io.connect("http://localhost:4000");

const TransModal = ({
  type,
  selectedRowData,
  open,
  handleClose,
  handleEditClose,
}) => {
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

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
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

  // const sendMessage = () => {
  //   socket.emit("send_message", "Transaction added");
  // };
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log("notification added");
  //   });
  // }, []);

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
      // sendMessage()
    } catch (error) {
      console.log("Error adding transaction:", error);
    }

    handleClose();
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const total = await apiCall({
        url: `http://localhost:4000/api/transactionss/edit`,
        method: "patch",
        data: {
          id: selectedRowData.id,
          type: selectedType,
          amount: amount,
          userId: userId,
          categoryId: categoryId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      handleClose();
      console.log("Transaction edited successfully:", total.data);
    } catch (error) {
      console.log("Error editing transaction:", error);
      handleClose();
    }
  };

  useEffect(() => {
    if (type === "edit" && selectedRowData) {
      setSelectedType(selectedRowData.type);
      setCategoryId(selectedRowData.categoryId);
      setAmount(selectedRowData.amount);
    }
  }, [type, selectedRowData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const total = await apiCall({
          url: "/api/categories/view-all-categories",
          method: "get",
        });
        setCategories(total.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "#212936",
    border: "2px solid #171B24",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
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

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose ? handleClose : handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  value={amount}
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
        </Box>
      </Modal>
    </>
  );
};

export default TransModal;
