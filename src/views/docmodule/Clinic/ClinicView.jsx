import SideNav from "../../../Components/SideNavNew.jsx";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { useContext } from "react";
import { useState } from "react";
import Route from "../../../Components/Routes.js";
import NavigationContex from "../../../Contexts/navigation";
import NewAppointment from "../../docmodule/Clinic/NewAppointment.jsx";
import UpcomingAppointments from "../../docmodule/Clinic/UpcomingAppointments.jsx";
import AppointmentHistory from "../../docmodule/Clinic/AppointmentHistory.jsx";
import Calendar from "../../docmodule/Clinic/Calendar.jsx";
import NewSession from "../../docmodule/Clinic/NewSession.jsx";
import SessionHistory from "../../docmodule/Clinic/SessionHistory.jsx";
import UpcomingSessions from "../../docmodule/Clinic/UpcomingSessions.jsx";
import Profile from "../../docmodule/Clinic/Profile.jsx";
import { useAuth } from "../../../Contexts/AuthContext.jsx";

const menuItems = [
  {
    text: "Appointments",
    subMenus: [
      "New Appointment",
      "Upcoming|Appointments",
      "History|Appointments",
    ],
    icon: <InsertInvitationOutlinedIcon />,
  },
  {
    text: "Sessions",
    subMenus: [
      "Upcoming|Sessions",
      "New Session",
      "History|Session",
      "Calendar",
    ],
    icon: <LocalHospitalOutlinedIcon />,
  },
];

function ClinicView() {
  const [activeSubMenu, setActiveSubMenu] = useState("New Appointment");
  const { navigate } = useContext(NavigationContex);
  const { user } = useAuth();

  const PathReturn = (getSubMenuText) => {
    switch (getSubMenuText) {
      case "New Appointment":
        return "";

      case "Upcoming|Appointments":
        return "/upcoming-appointments";

      case "History|Appointments":
        return "/appointments-history";

      case "Upcoming|Sessions":
        return "/upcoming-sessions";

      case "New Session":
        return "/new-session";

      case "History|Session":
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
          <NewAppointment />
        </Route>
        <Route path="/upcoming-appointments">
          <UpcomingAppointments />
        </Route>
        <Route path="/appointments-history">
          <AppointmentHistory />
        </Route>
        <Route path="/upcoming-sessions">
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
      <SideNav
        menuItems={menuItems}
        onSubMenuClick={handleSubMenuClick}
        activeSubMenu={activeSubMenu}
        username={user.name}
      >
        {renderSubMenu(activeSubMenu)}
      </SideNav>
    </div>
  );
}

export default ClinicView;
