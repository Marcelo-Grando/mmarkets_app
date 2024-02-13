import { useEffect, useState } from "react";
import { createEmployeeAccount } from "../api/Accounts";
import Form from "../components/Form";
import { useQueryData } from "../hooks/useQueryData";
import BasicButtonGroup from "../components/BasicButtonGroup";
import SwipeableTemporaryDrawer from "../components/SwipeableTemporaryDrawer";
import LabelBottomNavigation from "../components/LabelButtonNavigation";
import VerticalTabs from "../components/VerticalTabs";
import TestTabs from "../components/TestTabs";
import SelectedList from "../components/SelectedList"

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

export default function AccountsPage() {
  const { market_id, loading } = useQueryData();

  return (
    <>
      {loading && <h3>loading...</h3>}
      {market_id && (
        <SelectedList
          paths={[
            { path: "default", label: "accounts" },
            { path: "create", label: "create" },
          ]}
        />
      )}
    </>
  );
}
