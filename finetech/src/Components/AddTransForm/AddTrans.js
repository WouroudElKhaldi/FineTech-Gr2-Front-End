import React  from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Button } from "../Button/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { IoClose } from "react-icons/io5";
import style from "./AddTrans.module.css";
////////////////////////////////////////
//create calender picker using mui
const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>

///////////////////////////////////////
const data = [
  {
    value: "Water",
    label: "Water",
  },
  {
    value: "Electricity",
    label: "Electricity",
  },
  {
    value: "Salaries",
    label: "Salaries",
  },
  {
    value: "maintainance",
    label: "maintainance",
  },
  {
    value: "debts",
    label: "debts",
  },
    
  {
    value: "None",
    label: "None",
  },
];

/////////////////////////////////////////////

const AddTrans = ({ handleClose }) => {
  const formRef = React.createRef(null); // it referance the DOM
  const [category, setCategory] = React.useState("None");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // handleClose();
  };

  const handleFromClear = () => {
    const form = formRef.current;
    const inputFields = form.querySelectorAll(".MuiTextField-root input");
    inputFields.forEach((input) => {
      input.value = "";
    });
    setCategory("None");
  };

  return (
    <>
      <Box
        ref={formRef}
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "28ch",
            margin: "1rem auto",
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
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={handleFormSubmit}>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              textAlign: "left",
              mt: 3,
              mb: 3,
              ml: 2,
              fontWeight: "bold",
            }}
          >
            Add Transactions
          </Typography>
          <span
            onClick={() => {
              handleClose();
              handleFromClear();
            }}
          >
            <IoClose className={style.iconee} />
          </span>

          <Stack spacing={2}>
            <TextField
              required
              id="outlined-required"
              label="Type"
              placeholder="Type"
            />

            <TextField
              id="outlined-select-currency"
              select
              label="Categories *"
              defaultValue="None"
              value={category}
              onChange={(e) => handleChange(e)}
              sx={{
                "& .MuiSvgIcon-root": {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            >
              {data.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              id="outlined-required"
              label="Company"
              placeholder="Company"
            />
            <TextField
              required
              id="outlined-required"
              label="User"
              placeholder="User"
            />
            <TextField
              required
              id="outlined-required"
              label="Date"
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              defaultValue={materialDateInput}
              sx={{
                // Your other MUI styles...
                "& input::-webkit-calendar-picker-indicator": {
                  filter: "brightness(0) invert(1)",
                },
              }}
            />

            <TextField
              required
              id="outlined-required"
              label="Amount"
              placeholder="Amount"
            />
            <TextField
              required
              id="outlined-required"
              label="Description"
              placeholder="Description"
            />
            <Stack direction="row" spacing={2}>
              <span style={{ marginTop: "1rem" }}>
                <Button text={"Submit"} color={"blue"} size={"small"} />
              </span>
              <span style={{ marginTop: "1rem" }} onClick={handleFromClear}>
                <Button text={"Cancel"} color={"Gray"} size={"small"} />
              </span>
            </Stack>
          </Stack>
        </form>
      </Box>
    </>
  );
};
export default AddTrans;
