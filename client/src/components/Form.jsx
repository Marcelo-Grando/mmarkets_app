import { Box, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Form({
  title,
  inpustData,
  btn_title,
  functionSubmit,
  initialState,
  market_id,
}) {
  const [user, setUser] = useState(initialState);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (market_id) {
      const response = await functionSubmit(market_id, user);
      setUser(initialState);
      return;
    }
    const response = await functionSubmit(user);
    setUser(initialState);
  };

  return (
    <div className="form-container">
      <Typography className="h6" variant="h6">
        {title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {inpustData.map((element, index) => {
          return (
            <TextField
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
          );
        })}

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
  );
}
