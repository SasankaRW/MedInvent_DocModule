import "./App.css";
import * as React from "react";
import { useContext } from "react";
import Sidebar from "./Components/MyComponents/SideNav";
import AllDoctors from "./views/admin/pages/doctors/DoctorList";
import NewDoctorForm from "./views/admin/pages/doctors/AddNewDoctor";
import AllClinics from "./views/admin/pages/clinics/ClinicList";
import AllPharmacies from "./views/admin/pages/pharmacies/PharmaciesList";
import NewClinicForm from "./views/admin/pages/clinics/AddNewClinic";
import NewPharmacyForm from "./views/admin/pages/pharmacies/AddNewPharmacy";
import NavigationContex from "./views/admin/context/navigation";
import Rout from "./Components/MyComponents/Routes";

function App() {
  const [activeSubMenu, setActiveSubMenu] = React.useState("All Doctors");
  const { navigate } = useContext(NavigationContex);

  const PathReturn = (getSubMenuText) => {
    switch (getSubMenuText) {
      case "All Doctors":
        return "";
      case "New Doctor":
        return "/pages/Home/New/Doctor";
      case "All Clinics":
        return "/pages/Clinics";
      case "All Pharmacies":
        return "/pages/Pharmacies";
      case "New Clinic":
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
    <div className="App">
      <div>
        <Sidebar
          onSubMenuClick={handleSubMenuClick}
          activeSubMenu={activeSubMenu}
        >
          {renderSubMenu(activeSubMenu)}
        </Sidebar>
      </div>
    </div>
  );
}

export default App;
