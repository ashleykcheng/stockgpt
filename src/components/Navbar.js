import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DrawerComp from "./Drawer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";


async function handleSignOut(){
  const auth = getAuth();
  try {
      await signOut(auth);
  } catch (error) {
      console.log(error)
  }
}
const Header = () => {
 const [value, setValue] = useState();
 const theme = useTheme();
 const {user} = useContext(Context);
 const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <TrendingUpIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                TradeGPT
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Link to ="/" style={{ color: 'inherit', textDecoration: 'inherit'}}><Tab label="Home" /></Link>
                <Link to ="/dashboard" style={{ color: 'inherit', textDecoration: 'inherit'}}><Tab label="Dashboard" /></Link>
                <Link to ="/search" style={{ color: 'inherit', textDecoration: 'inherit'}}><Tab label="Search" /></Link>
              </Tabs>
              {
                !user ? (
                  <>
                    <Button sx={{ marginLeft: "auto" }} variant="contained">
                    <Link to ="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>Login</Link>
                    </Button>
                    <Button sx={{ marginLeft: "10px" }} variant="contained">
                      <Link to ="/signup" style={{ color: 'inherit', textDecoration: 'inherit'}}>Sign Up</Link>
                    </Button>
                  </>
                ) : (
                  <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                )
              }
              

            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;