import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

export default function SideNav({ children, activeSubMenu, onSubMenuClick }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [expandedMenus, setExpandedMenus] = React.useState({});

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenuExpand = (menuText) => {
    setExpandedMenus((prevExpandedMenus) => ({
      ...prevExpandedMenus,
      [menuText]: !prevExpandedMenus[menuText],
    }));
  };

  const drawer = (
    <div>
      <Toolbar>
        <img
          src={"/images/logo.png"}
          alt="Logo"
          style={{ marginRight: 16, width: "20%" }}
        />
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>MedInvent</div>
      </Toolbar>
      <Divider />
      <List>
        {[
          {
            text: "Doctors",
            subMenus: ["All Doctors", "New Doctor"],
            icon: <PersonIcon />,
          },
          {
            text: "Pharmacies",
            subMenus: ["All Pharmacies", "New Pharmacy"],
            icon: <LocalPharmacyIcon />,
          },
          {
            text: "Clinics /\nDispensaries",
            subMenus: [
              "All Clinics /\n Dispensaries",
              "New Clinic /\n Dispensaries",
            ],
            icon: <LocalHospitalIcon />,
          },
        ].map((menu, index) => (
          <React.Fragment key={menu.text}>
            <ListItem>
              <ListItemButton onClick={() => handleMenuExpand(menu.text)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.text} />
                {expandedMenus[menu.text] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse
              in={expandedMenus[menu.text]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {menu.subMenus.map((subMenu) => (
                  <ListItem
                    key={subMenu}
                    onClick={() => onSubMenuClick(subMenu)}
                  >
                    <ListItemButton
                      sx={{
                        backgroundColor:
                          activeSubMenu === subMenu ? "#06B6D4" : "inherit",
                        color: activeSubMenu === subMenu ? "white" : "inherit",
                        borderRadius:
                          activeSubMenu === subMenu ? "5px" : "inherit",
                        transition: "background-color 0.3s, color 0.5s",
                        "&:hover": {
                          backgroundColor: "#BEE3F8",
                          color: "#000",
                          borderRadius: "5px",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Dot
                          color={
                            activeSubMenu === subMenu ? "white" : "#717272"
                          }
                        />
                      </ListItemIcon>
                      <ListItemText primary={subMenu} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#06B6D4",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div></div>
          <span style={{ display: "flex" }}>
            <span style={{ marginRight: "15px" }}>Hi Admin</span>
            <AccountCircleIcon />
          </span>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

const Dot = ({ color }) => {
  const size = 7;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
    </svg>
  );
};
