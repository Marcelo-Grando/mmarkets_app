import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";


import { useQueryData } from "../../hooks/useQueryData";

import { createProduct } from "../../api/Products";
import { getCategories } from "../../api/Categories";

import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CreateProducts() {
  const { market_id } = useQueryData();
  const [categories, setCategories] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [open] = useOutletContext();
  const [sectionWidth, setSectionWidth] = useState(180);
  const [margin, setMargin] = useState(4)

  const loadCategories = async () => {
    const response = await getCategories(market_id);
    const curr = response.map((elem) => ({
      value: elem.category_id,
      label: elem.name,
    }));
    setCurrencies(curr);
    setCategories(response);
  };

  useEffect(() => {
    market_id && loadCategories();
  }, [market_id]);

  useEffect(() => {
    setSectionWidth(open ? 180 : 220);
    setMargin(open ? 1.8 : 4)
  }, [open]);

  return (
    currencies && (
      <Box sx={{ pl: 1 }}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            width: "100%",
            p: 1,
            bgcolor: "#EEEFF7",
            border: "3px solid #CFD3D8",
            borderRadius: 5,
            height: 200,
          }}
        >
          <Box sx={{ width: sectionWidth, marginLeft: margin }}>
            <Box sx={{ p: 1 }}>
              <p style={{ fontSize: 12, bgcolor: "red" }}>Select a category:</p>
            </Box>
            <FormControl
              fullWidth
              size="small"
              sx={{ width: "100%", borderRadius: "5px" }}
            >
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                className="input-form"
                sx={{ borderRadius: 3 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {currencies.map((curr, index) => (
                  <MenuItem value={curr.value}>{curr.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ p: 1 }}>
              <p style={{ fontSize: 12 }}>Or enter a new category:</p>
            </Box>
            <TextField
              fullWidth
              InputProps={{
                sx: { borderRadius: 3, bgColor: "rgb(215, 222, 231)" },
                className: "input-form",
              }}
              label="Category Name"
              size="small"
            />
          </Box>
          <Box sx={{ width: sectionWidth }}>
            <Box sx={{ p: 1 }}>
              <p style={{ fontSize: 12 }}>Product Name:</p>
            </Box>
            <TextField
              fullWidth
              InputProps={{
                sx: { borderRadius: 3, bgColor: "rgb(215, 222, 231)" },
                className: "input-form",
              }}
              label="Product Name"
              size="small"
            />
            <Box sx={{ p: 1 }}>
              <p style={{ fontSize: 12 }}>Product Description:</p>
            </Box>
            <TextField
              fullWidth
              InputProps={{
                sx: { borderRadius: 3 },
                className: "input-form",
              }}
              label="Product Description"
              size="small"
            />
          </Box>
          <Box sx={{ width: sectionWidth }}>
            <Box sx={{ p: 1 }}>
              <p style={{ fontSize: 12 }}>Product Price:</p>
            </Box>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Product Price
              </InputLabel>
              <OutlinedInput
                className="input-form"
                sx={{ borderRadius: 3 }}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Product Price"
                size="small"
              />
            </FormControl>
            <Box sx={{ p: 1 }}>
              <p style={{ fontSize: 12 }}>Expiration Date:</p>
            </Box>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                className="input-form"
                slotProps={{ textField: { size: "small" } }}
                label=""
                //value={selectedDate}
                //onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{width: sectionWidth }}>
            <Box sx={{ p: 1 }}>
              <p style={{ fontSize: 12 }}>Barcode:</p>
            </Box>
            <TextField
            fullWidth
              InputProps={{
                sx: { borderRadius: 3 },
                className: "input-form",
              }}
              label="Barcode"
              size="small"
            />
            <Box sx={{ p: 1 }}>
              <p style={{ fontSize: 12 }}>Section:</p>
            </Box>
            <TextField
            fullWidth
              InputProps={{
                sx: { borderRadius: 3 },
                className: "input-form",
              }}
              label="Section"
              size="small"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: sectionWidth - 50,
              pt: 4.3,
            }}
          >
            <Button
              sx={{
                borderRadius: 3,
                border: "1px solid black",
                px: 4,
                mb: 4.4,
                bgcolor: "#F68C25",
                color: "white",
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                borderRadius: 3,
                border: "1px solid black",
                px: 4,
                bgcolor: "#4F647E",
                color: "white",
                fontWeight: 600,
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    )
  );
}
