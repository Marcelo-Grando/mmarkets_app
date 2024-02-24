import Form from "../../components/Form";

import { useQueryData } from "../../hooks/useQueryData";

import { createEmployeeAccount } from "../../api/Accounts";
import { Box } from "@mui/material";

const inpustData = [
  {
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    name: "lastname",
    type: "text",
    label: "Lastname",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    name: "dni",
    type: "text",
    label: "Dni",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
  },
];

const initialState = {
  name: "",
  lastname: "",
  email: "",
  dni: "",
  password: "",
  position: `["seller"]`,
};

const initialState2 = {
  name: "",
  lastname: "",
  email: "",
  dni: "",
  password: "",
  position: `["admin"]`,
};

export default function CreateAccounts() {
  const { market_id } = useQueryData();

  return (
    <Box sx={{ display: "flex"}}>
      <Box sx={{ p: 1 }}>
        <Form
          title={"Create seller Account"}
          inpustData={inpustData}
          btn_title={"create"}
          functionSubmit={createEmployeeAccount}
          initialState={initialState}
          market_id={market_id}
        />
      </Box>

      <Box sx={{ p: 1 }}>
        <Form
          title={"Create admin Account"}
          inpustData={inpustData}
          btn_title={"create"}
          functionSubmit={createEmployeeAccount}
          initialState={initialState2}
          market_id={market_id}
        />
      </Box>
    </Box>
  );
}
