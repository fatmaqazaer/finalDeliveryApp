import React, { useState, useContext} from "react";
import { AppContext } from "./context/AppContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./App.css";
//files of components
import CustomerList from "./Component/CustomerList";
import PackageList from "./Component/PackageList";
import { AppProvider } from "./context/AppContext";
import Invoice from "./Component/Invoice";
import InvoiceList from "./Component/InvoiceList";
import SnackbarComponent from "./context/SnackbarComponent";
import { SnackbarProvider } from "./context/SnackbarContext";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <SnackbarProvider>
    <AppProvider>
      <div className="App">
        <Router>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Mail Delivery Service
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <List style={{ width: "300px" }}>
              <ListItem button component={Link} to="/Packages">
                <ListItemText primary={"Packages"} />
              </ListItem>
              <ListItem button component={Link} to="/customers">
                <ListItemText primary={"Customers"} />
              </ListItem>
              <ListItem button component={Link} to="/InvoiceList">
                <ListItemText primary={"InvoiceList"} />
              </ListItem>
              <ListItem button component={Link} to="/invoice">
                <ListItemText primary={"Invoice"} />
              </ListItem>
            </List>
          </Drawer>
            <Switch>
              <Route path="/customers">
                <CustomerList />
              </Route>
              <Route path="/Packages">
                <PackageList />
              </Route>
              <Route path="/InvoiceList">
                <InvoiceList />
              </Route>
              <Route path="/invoice/:customerId">
                <Invoice />
              </Route>
            </Switch>
        </Router>
      </div>
    </AppProvider>
    <SnackbarComponent 
    />
    </SnackbarProvider>
  );
}

export default App;
