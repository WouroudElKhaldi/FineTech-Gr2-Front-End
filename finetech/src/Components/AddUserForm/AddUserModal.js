import { useEffect, useState } from "react";
import UserForm from "./AddUser";
import Modal from "@mui/material/Modal";
import {
  Box,
  IconButton,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../Button/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const UserModal = ({
  type,
  selectedRowData,
  open,
  handleClose,
  handleEditClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setImage(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "dob") {
      setDob(value);
    } else if (name === "role") {
      setRole(value);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!firstName || !lastName || !role || !dob || !email || !password) {
      setError(true);
      setErrorMessage("All input fields are required");
      return;
    }
    try {
      const sentUser = await axios.post(
        "http://localhost:4000/api/auth/create",
        {
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          image: image,
          role: role,
          password: password,
          email: email,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(sentUser);
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      setErrorMessage("Something goes wrong");
      setLoading(false);
      console.log("Error in API call", errorMessage, error);
    }
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    // handleClose();
  };

  const handleFromClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setImage("");
    setRole("");
    setPassword("");
    setFirstName("");
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
            component="form"
            sx={{
              "& .MuiFormControl-root": {
                mt: 2,
                mb: 2,
                ml: 0,
                mr: 0,
                width: "25rem",
              },
              "& .MuiInputBase-root": {
                color: "white",
              },
              "& .MuiFormLabel-root ": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                border: "white",
              },
              "& .MuiBox-root css-3b5rqz": {
                margin: "2rem !important",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "& .MuiButton-containedPrimary": {
                bgcolor: "#2D99EF",
                mt: "1rem",
                mb: "1rem",
              },
              "& .MuiOutlinedInput-notchedOutline ": {
                border: "1px solid white",
                borderRadius: "4px",
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
                  Add User
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
                  Edit User
                </Typography>
              )}
              <IconButton
                style={spanStyle}
                onClick={() => {
                  handleClose();
                  handleFromClear();
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <form onSubmit={type === "add" ? handleAddUser : handleEditUser}>
              <Stack>
                <TextField
                  required
                  id="outlined-required1"
                  label="FirstName"
                  placeholder="FirstName"
                  name="firstName"
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required2"
                  label="LastName"
                  placeholder="LastName"
                  name="lastName"
                  onChange={handleChange}
                />
                <FormControl
                  required
                  sx={{
                    m: 1,
                    "& .MuiSvgIcon-root": {
                      color: "white",
                      "& .MuiList-root": {
                        bgcolor: "transparent",
                      },
                    },
                  }}
                >
                  <InputLabel id="demo-simple-select-required-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={role}
                    name="role"
                    label="Role *"
                    onChange={handleChange}
                  >
                    <MenuItem disabled>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"Accountent"}>Accountent</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password1"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          style={{ color: "white" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Date" value={dob} onChange={setDob} />
                  </DemoContainer>
                </LocalizationProvider>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleChange}
                />
                <div style={divStyle}>
                  <span
                    onClick={type === "add" ? handleAddUser : handleEditUser}
                  >
                    <Button
                      text={type === "add" ? "Add" : "Edit"}
                      color={"blue"}
                      size={"small"}
                      type={"submit"}
                    />
                  </span>
                  <span onClick={handleFromClear}>
                    <Button text={"Clear"} color={"gray"} size={"small"} />
                  </span>
                </div>
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default UserModal;
