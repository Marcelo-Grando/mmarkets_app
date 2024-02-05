import { useEffect, useState } from "react";
import { createEmployeeAccount } from "../api/Accounts";
import Form from "../components/Form";
import { useQueryData } from "../hooks/useQueryData";
import BasicButtonGroup from "../components/BasicButtonGroup";
import SwipeableTemporaryDrawer from "../components/SwipeableTemporaryDrawer";
import LabelBottomNavigation from "../components/LabelButtonNavigation";
import VerticalTabs from "../components/VerticalTabs";
import TestTabs from "../components/TestTabs";

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
  position: `["seller"]`
};

const initialState2 = {
  name: "",
  lastname: "",
  email: "",
  dni: "",
  password: "",
  position: `["admin"]`
};

export default function AccountsPage() {
  const {market_id} = useQueryData()


  return (
    <div>
      {
       // components.map((component) => (component))
       <TestTabs paths={[{path: "accounts", label: "accounts"}, {path: "create", label: "create"}]} />
      }
      {/* <Form
        title={"Create Seller Account"}
        inpustData={inpustData}
        btn_title={"Create Account"}
        functionSubmit={createEmployeeAccount}
        initialState={initialState}
        market_id={market_id}
      />
      <Form
        title={"Create Admin Account"}
        inpustData={inpustData}
        btn_title={"Create Account"}
        functionSubmit={createEmployeeAccount}
        initialState={initialState2}
        market_id={market_id}
      /> */}
    </div>
  );
}
