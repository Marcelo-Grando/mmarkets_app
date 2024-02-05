import { useState } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Form from './Form';

import { createEmployeeAccount } from '../api/Accounts';
import { useQueryData } from '../hooks/useQueryData';

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

const initialState2 = {
  name: "",
  lastname: "",
  email: "",
  dni: "",
  password: "",
  position: `["admin"]`
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);
  const {market_id} = useQueryData()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Existing accounts" {...a11yProps(0)} />
        <Tab label="Create account" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel children={<Form
        title={"Create Admin Account"}
        inpustData={inpustData}
        btn_title={"Create Account"}
        functionSubmit={createEmployeeAccount}
        initialState={initialState2}
        market_id={market_id}
      /> } className='VeticalTabs' value={value} index={0}>
      
      </TabPanel>
      <TabPanel children={<Form
        title={"Create Admin Account"}
        inpustData={inpustData}
        btn_title={"Create Account"}
        functionSubmit={createEmployeeAccount}
        initialState={initialState2}
        market_id={market_id}
      /> } value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}