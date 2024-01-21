import { Box, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Form({title, inpustData, btn_title, functionSubmit, initialState}) {
    const [user, setUser] = useState(initialState)

    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
      };


      const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await functionSubmit(user)
        console.log(response.data)
        setUser(initialState)
      }


      console.log(user)

  return (
    <div className="form-container">
    <Typography className="h6" variant="h6">
      {title}
    </Typography>
    <Box component="form" onSubmit={handleSubmit}>
        {
            inpustData.map((element, index) => {
                return <TextField
                key={index}
                size="small"
                className="text-field"
                type={element.type}
                name={element.name}
                label={element.label}
                variant="outlined"
                fullWidth
                onChange={handleInputsChange}
                placeholder={element.name}
                value={user[element.name]}
              />
            })
        }

      <Button
        className="btn-form"
        onClick={handleSubmit}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
      >
        {btn_title}
      </Button>
    </Box>
  </div>
  )
}
