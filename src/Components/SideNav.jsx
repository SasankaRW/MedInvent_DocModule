import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#F1F3F4",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  logo: {
    width: "20%",
    height: "auto",
    marginRight: "15px",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [openDoctors, setOpenDoctors] = React.useState(false);
  const [openPharmacies, setOpenPharmacies] = React.useState(false);
  const [openClinics, setOpenClinics] = React.useState(false);

  const handleClick = (menu) => {
    switch (menu) {
      case "doctors":
        setOpenDoctors(!openDoctors);
        break;
      case "pharmacies":
        setOpenPharmacies(!openPharmacies);
        break;
      case "clinics":
        setOpenClinics(!openClinics);
        break;
      default:
        break;
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.logoContainer}>
        <img src=".\images\logo.png" alt="Logo" className={classes.logo} />
        <span style={{ fontSize: "25px", fontWeight: "bold" }}>MedInvent</span>
      </div>
      <List>
        <ListItem button onClick={() => handleClick("doctors")}>
          <ListItemIcon>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText primary="Doctors" />
          {openDoctors ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openDoctors} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="All Doctors" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="New Doctor" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick("pharmacies")}>
          <ListItemIcon>
            <LocalPharmacyIcon />
          </ListItemIcon>
          <ListItemText primary="Pharmacies" />
          {openPharmacies ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPharmacies} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="All Pharmacies" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="New Pharmacy" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick("clinics")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Clinics" />
          {openClinics ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openClinics} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="All Clinics" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="New Clinic" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
