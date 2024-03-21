import {
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import BasicSelect from "../components/BasicSelect"

export default function Form({
  btn_title,
  inpustData,
  functionSubmit,
  initialState,
  market_id,
  currencies,
}) {
  const [user, setUser] = useState(initialState);
  const [selectValue, setSelectValue] = useState('')

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
      if (response.status != 400) {
        setUser(initialState);
        return
      }
      setSelectValue("")
      console.log(response)
      return;
    }
    const response = await functionSubmit(user);
    setUser(initialState);
    console.log(response)
  };

  return (
    <div className="form-container">
      <Box component="form" onSubmit={handleSubmit}>
        {inpustData.map((element, index) => {
          if (element.type === "select") {
            return <TextField
            key={index}
            size="small"
            className="text-field"
            variant="outlined"
            fullWidth
            select
            label={element.name}
            defaultValue={""}
            onChange={(e) => {
              setUser({...user, category_id: e.target.value})
              setSelectValue(e.target.value)
            }}
            value={selectValue}
            helperText="Please select your category"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          }
          if (index === 0) {
              return (
                <TextField
                autoFocus
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
            )
          }
           if(element.type != "select") {
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
           }
        })}

        <Button
          className="btn-form"
          onClick={handleSubmit}
          fullWidth
          type="submit"
          variant="contained"
        >
          {btn_title}
        </Button>
      </Box>
    </div>
  );
}
