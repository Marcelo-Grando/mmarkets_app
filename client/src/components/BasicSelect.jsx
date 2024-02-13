import { TextField, MenuItem } from "@mui/material";

export default function BasicSelect({currencies, element}) {

  return (
    <TextField
      size="small"
      className="text-field"
      variant="outlined"
      fullWidth
      select
      label={element.name}
      defaultValue={""}
      value={element.category_id}
      helperText="Please select your category"
    >
      {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
