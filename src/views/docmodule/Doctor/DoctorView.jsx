import SideNavNew from "../../../Components/SideNavNew.jsx";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { useContext, useState } from "react";
import NavigationContex from "../../admin/context/navigation.js";

import Calendar from "../../docmodule/Doctor/Calendar.jsx";
import NewSession from "../../docmodule/Doctor/NewSession.jsx";
import SessionHistory from "../../docmodule/Doctor/SessionHistory.jsx";
import UpcomingSessions from "../../docmodule/Doctor/UpcomingSessions.jsx";
import Profile from "../../docmodule/Doctor/Profile.jsx";

import Route from "../../../Components/Routes.js";
import Prescriptions from "./Prescriptions.jsx";

const menuItems = [
  {
    text: "Sessions",
    subMenus: [
      "Upcoming|Sessions",
      "New Session",
      "History|Sessions",
      "Calendar",
    ],
    icon: <LocalHospitalOutlinedIcon />,
  },
];

function DoctorView() {
  const [activeSubMenu, setActiveSubMenu] = useState("Upcoming|Sessions");
  const { navigate } = useContext(NavigationContex);

  const PathReturn = (getSubMenuText) => {
    switch (getSubMenuText) {
      case "Upcoming|Sessions":
        return "";

      case "New Session":
        return "/new-session";

      case "History|Sessions":
        return "/session-history";

      case "Calendar":
        return "/calendar";

      case "Prescriptions":
        return "/prescriptions";

      case "Profile":
        return "/profile";

      default:
        return null;
    }
  };

  const handleSubMenuClick = (subMenuText) => {
    const path = PathReturn(subMenuText);
    navigate(path);
    setActiveSubMenu(subMenuText);
  };

  const renderSubMenu = (title) => {
    return (
      <>
        <Route path="">
          <UpcomingSessions />
        </Route>
        <Route path="/new-session">
          <NewSession />
        </Route>
        <Route path="/session-history">
          <SessionHistory />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/prescriptions">
          <Prescriptions />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </>
    );
  };

  return (
    <div>
      <SideNavNew
        menuItems={menuItems}
        onSubMenuClick={handleSubMenuClick}
        activeSubMenu={activeSubMenu}
        username={"Doctor"}
        user="doctor"
      >
        {renderSubMenu(activeSubMenu)}
      </SideNavNew>
    </div>
  );
}

export default DoctorView;
