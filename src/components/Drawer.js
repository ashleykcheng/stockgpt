
import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {Link} from 'react-router-dom';
import MenuIcon from "@mui/icons-material/Menu";
const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <List>
            <ListItemButton key='1'>
              <ListItemIcon>
                <ListItemText><Link to="/">Home</Link></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton key='2'>
              <ListItemIcon>
                <ListItemText><Link to="/dashboard">Dashboard</Link></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton key='3'>
              <ListItemIcon>
                <ListItemText><Link to="/login">Login2</Link></ListItemText>
              </ListItemIcon>
            </ListItemButton>
    
        </List>
      </Drawer>
      <IconButton
       sx={{
        color: "white",
        marginLeft: "auto",
        marginTop: "2em", 
      }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;