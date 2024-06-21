import { useContext, useState } from "react";
import AllDoctors from "./doctors/AllDoctors";
import NewDoctorForm from "./doctors/NewDoctorForm";
import AllClinics from "./clinics/AllClinics";
import AllPharmacies from "./pharmacies/AllPharmacies";
import NewClinicForm from "./clinics/NewClinicForm";
import NewPharmacyForm from "./pharmacies/NewPharmacyForm";

import Route from "../../Components/Routes";
import SideNav from "../../Components/SideNav";
import NavigationContex from "../../Contexts/navigation";

function AdminView() {
  const [activeSubMenu, setActiveSubMenu] = useState("All Doctors");
  const { navigate } = useContext(NavigationContex);

  const PathReturn = (getSubMenuText) => {
    switch (getSubMenuText) {
      case "All Doctors":
        return "";
      case "New Doctor":
        return "/pages/Home/New/Doctor";
      case "All Clinics /\n Dispensaries":
        return "/pages/Clinics";
      case "All Pharmacies":
        return "/pages/Pharmacies";
      case "New Clinic /\n Dispensaries":
        return "/pages/New/Clinic";
      case "New Pharmacy":
        return "/pages/New/Pharmacy";
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
          <AllDoctors />
        </Route>
        <Route path="/pages/Home/New/Doctor">
          <NewDoctorForm />
        </Route>
        <Route path="/pages/Clinics">
          <AllClinics />
        </Route>
        <Route path="/pages/Pharmacies">
          <AllPharmacies />
        </Route>
        <Route path="/pages/New/Clinic">
          <NewClinicForm />
        </Route>
        <Route path="/pages/New/Pharmacy">
          <NewPharmacyForm />
        </Route>
      </>
    );
  };
  return (
    <div>
      <SideNav
        onSubMenuClick={handleSubMenuClick}
        activeSubMenu={activeSubMenu}
      >
        {renderSubMenu(activeSubMenu)}
      </SideNav>
    </div>
  );
}

export default AdminView;
