import { useContext, useState } from "react";
import AllDoctors from "./doctors/AllDoctors";
import NewDoctorForm from "./doctors/NewDoctorForm";
import AllClinics from "./clinics/AllClinics";
import AllPharmacies from "./pharmacies/AllPharmacies";
import NewClinicForm from "./clinics/NewClinicForm";
import NewPharmacyForm from "./pharmacies/NewPharmacyForm";

import Rout from "../../../Components/MyComponents/Routes";
import SideNav from "../../../Components/MyComponents/SideNav";
import NavigationContex from "../context/navigation";

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

  // const renderSubMenuComponent = () => {
  //   switch (activeSubMenu) {
  //     case "All Doctors":
  //       return (<Rout path=""><AllDoctors /></Rout>);
  //     case "Add New Doctor":
  //       return (<Rout path="/pages/Home/New/Doctor"><NewDoctorForm /></Rout>);
  //     case "All Clinics":
  //       return (<Rout path="/pages/Clinics"><AllClinics /></Rout>);
  //     case "All Pharmacies":
  //       return (<Rout path="/pages/Pharmacies"><AllPharmacies /></Rout>);
  //     case "Add New Clinic":
  //       return (<Rout path="/pages/New/Clinic"><NewClinicForm /></Rout>);
  //     case "Add New Pharmacy":
  //       return (<Rout path="/pages/New/Pharmacy"><NewPharmacyForm /></Rout>);
  //     default:
  //       return null;
  //   }
  // };

  const renderSubMenu = (title) => {
    return (
      <>
        <Rout path="">
          <AllDoctors />
        </Rout>
        <Rout path="/pages/Home/New/Doctor">
          <NewDoctorForm />
        </Rout>
        <Rout path="/pages/Clinics">
          <AllClinics />
        </Rout>
        <Rout path="/pages/Pharmacies">
          <AllPharmacies />
        </Rout>
        <Rout path="/pages/New/Clinic">
          <NewClinicForm />
        </Rout>
        <Rout path="/pages/New/Pharmacy">
          <NewPharmacyForm />
        </Rout>
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
