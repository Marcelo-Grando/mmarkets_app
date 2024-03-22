import { useEffect, useState } from "react";
import { getTickets } from "../api/Reports";
import { useQueryData } from "../hooks/useQueryData";
import { Box } from "@mui/material";
import ScrollBox from "../components/ScrollBox";

const alturaViewport = window.innerHeight;

export default function TicketsPage() {
  const { market_id } = useQueryData();
  const [tickets, setTickets] = useState();

  const loadTickets = async () => {
    const response = await getTickets(market_id);
    setTickets(response);
  };

  useEffect(() => {
    market_id && loadTickets();
  }, [market_id]);

  return (
    <ScrollBox>
      {tickets &&
        tickets.map((ticket, index) => (
          <Box minWidth="15%%" key={index} sx={{ border: 1, m: 0.5, p: 0.5 }}>
            <h3>{ticket.market_name}</h3>
            {ticket.products.map((elem, index) => (
              <h6 key={index}>
                {elem.name} ${elem.price} x{elem.quantify}
              </h6>
            ))}
            <h5>payment type: {ticket.payment_type}</h5>
            <h6>
              {ticket.date.slice(0, 10)}/---/{ticket.time}
            </h6>
            <p>Total: ${ticket.amount}</p>
          </Box>
        ))}
    </ScrollBox>
  );
}
