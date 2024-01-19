import { useQueryData } from "../hooks/useQueryData"
import Button from '@mui/material/Button';

export default function ReportsPage() {

  const {userData} = useQueryData()

  console.log(userData)

  return (
    <div>
        <button>Ventas por categoria</button>
        <Button variant="contained" color="primary">vantas por producto</Button>
    </div>
  )
}
