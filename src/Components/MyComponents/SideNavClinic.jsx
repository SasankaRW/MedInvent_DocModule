import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 250;

export default function SideNavClinic({
  children,
  activeSubMenu,
  onSubMenuClick,
}) {
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
      <Toolbar
        sx={{
          backgroundColor: "#a7d2ef",
          padding: "20px",
          margin: "10px",
          borderRadius: "20px",
        }}
      >
        <img
          src={"../../images/logo.png"}
          alt="Logo"
          style={{ marginRight: 16, width: "20%" }}
        />
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>MedInvent</div>
      </Toolbar>
      <div
        style={{
          height: "62vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <List>
            {[
              {
                text: "Appointments",
                subMenus: ["New Appointment", "Upcoming", "History"],
                icon: <InsertInvitationOutlinedIcon />,
              },
              {
                text: "Sessions",
                subMenus: ["Upcoming", "New Session", "History", "Calender"],
                icon: <LocalHospitalOutlinedIcon />,
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
                        sx={{
                          padding: "0 15px",
                          "&:hover": {
                            borderRadius: "10px",
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            backgroundColor:
                              activeSubMenu === subMenu ? "#06B6D4" : "inherit",
                            color:
                              activeSubMenu === subMenu ? "white" : "inherit",
                            borderRadius: "10px",
                            transition: "background-color 0.3s, color 0.5s",
                            "&:hover": {
                              backgroundColor: "#82CDFF",
                              color: "#000",
                              borderRadius: "10px",
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
            <ListItem>
              <ListItemButton
                sx={{
                  color: "inherit",
                  borderRadius: "10px",
                  transition: "background-color 0.3s, color 0.5s",
                  "&:hover": {
                    backgroundColor: "#82CDFF",
                    color: "#000",
                    borderRadius: "10px",
                  },
                }}
              >
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <div>
          <ListItem>
            <ListItemButton
              sx={{
                color: "inherit",
                borderRadius: "10px",
                transition: "background-color 0.3s, color 0.5s",
                "&:hover": {
                  backgroundColor: "#82CDFF",
                  color: "#000",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </div>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ boxShadow: "none", pt: 2, backgroundColor: "#EDF8FF" }}
      >
        <Toolbar
          sx={{
            backgroundColor: "#EDF8FF",
            color: "black",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h4" noWrap component="div">
              MedInvent
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth + 50 },
          flexShrink: { sm: 0 },
          backgroundColor: "#EDF8FF",
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
              backgroundColor: "white",
              margin: "20px",
              height: "80vh",
              marginTop: "100px",
              borderRadius: " 30px",
              border: "none",
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
              backgroundColor: "white",
              margin: "20px",
              height: "80vh",
              marginTop: "100px",
              borderRadius: " 30px",
              border: "none",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
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
          pt: 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#EDF8FF",
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
