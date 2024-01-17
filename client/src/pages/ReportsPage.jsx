import { useLocation } from "react-router-dom";

export default function ReportsPage() {

  const { state } = useLocation();

  const { market_id, user_id } = state.userData;

  return (
    <div>
        <button>Ventas por categoria</button>
    </div>
  )
}
