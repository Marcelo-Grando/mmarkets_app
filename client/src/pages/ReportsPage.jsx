import { useQueryData } from "../hooks/useQueryData"
import Button from '@mui/material/Button';

export default function ReportsPage() {

  const {userData} = useQueryData()

  console.log("userData",userData)

  return (
    <div>
        <Button variant="contained" color="success">ventas por producto</Button>
    </div>
  )
}
