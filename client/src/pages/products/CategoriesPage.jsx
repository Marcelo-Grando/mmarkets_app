import { Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { createCategory } from "../../api/Categories";
import { getCategories } from "../../api/Categories";
import DeleteIcon from '@mui/icons-material/Delete';
import {useQueryData} from "../../hooks/useQueryData"
import { useEffect, useState } from "react";
import ResponsiveTable from "../../components/ResponsiveTable";

export default function CategoriesPage() {
  const {market_id} = useQueryData()

  const [name, setName] = useState('') 
  const [categories, setCategories] = useState(null)
  const [categoriesView, setCategoriesView] = useState([])

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const categoriesFormat = (arr) => {
    const format = arr.map((elem) => (
      {name: elem.name, created: `${elem.created.slice(0, 10).replaceAll("-", "/")} -  ${elem.created.slice(11,19)}`}
    ))
    return format
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await createCategory(market_id, name)
    console.log("response handleSubmit", response)
    setName('')
    loadCategories()
  }

  const loadCategories = async () => {
    if(market_id) {
      const response = await getCategories(market_id)
    setCategories(response)
    const format = categoriesFormat(response)
    setCategoriesView(format)
    }
  }

  useEffect(() => {
    market_id && loadCategories()
  },[market_id])

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{p:1, display:"flex"}}
      >
        <TextField
          onChange={handleChange}
          value={name}
          size="small"
          id="outlined-basic"
          label="Category Name"
          variant="outlined"
        />
        <Button type="submit" variant="filledTonal" startIcon={<AddIcon />}/>
      </Box>
      {
        categories && <ResponsiveTable rows={categories} rowsToSkip={['category_id', "market_id"]}/>
      }
    </Box>
  );
}
