import { Box, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Form({title, inpustData, btn_title}) {
    const [formData, setformData] = useState()
    const [user, setUser] = useState({
        email: "",
    password: "",
    })

    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault()
        setformData(user)
      }

      console.log(formData)

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
              />
            })
        }

      <Button
        className="btn-form"
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
