import SideNavNew from "../../../Components/MyComponents/SideNavNew";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { useContext, useState } from "react";
import NavigationContex from "../../admin/context/navigation";

import Calendar from "../../docmodule/Doctor/Calendar.jsx";
import NewSession from "../../docmodule/Doctor/NewSession.jsx";
import SessionHistory from "../../docmodule/Doctor/SessionHistory.jsx";
import UpcomingSessions from "../../docmodule/Doctor/UpcomingSessions.jsx";
import Profile from "../../docmodule/Doctor/Profile.jsx";

import Route from "../../../Components/MyComponents/Routes";

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
      case "":
        return "/upcoming-appointments";

      case "History|Appointments":
        return "/appointments-history";

      case "Upcoming|Sessions":
        return "/upcoming-sessions";

      case "New Session":
        return "/new-session";

      case "History|Sessions":
        return "/session-history";

      case "Calendar":
        return "/calendar";

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
      >
        {renderSubMenu(activeSubMenu)}
      </SideNavNew>
    </div>
  );
}

export default DoctorView;
