import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
  <Link to= "/dashboard" style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    </Link>
    <Link to= "/trade" style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Trade" />
    </ListItemButton>
    </Link>
    <Link to= "/predict" style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Predictions" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);
