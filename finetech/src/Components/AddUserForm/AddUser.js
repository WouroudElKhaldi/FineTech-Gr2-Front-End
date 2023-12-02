import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddUser = () => {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
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
        <form>
          <TextField
            required
            id="outlined-required"
            label="FirstName"
            placeholder="FirstName"
          />
          <TextField
            required
            id="outlined-required"
            label="FirstName"
            placeholder="FirstName"
          />
        </form>
      </Box>
    );
}
export default AddUser ;