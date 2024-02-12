import "./App.css";
import * as React from "react";
import Sidebar from "./Components/MyComponents/SideNav";
import Form from "./Components/MyComponents/Container";
import AllDoctors from "./pages/doctors/DoctorList";
import NewDoctorForm from "./pages/doctors/AddNewDoctor";
import AllClinics from "./pages/clinics/ClinicList";
import AllPharmacies from "./pages/pharmacies/PharmaciesList";
import NewClinicForm from "./pages/clinics/AddNewClinic";
import NewPharmacyForm from "./pages/pharmacies/AddNewPharmacy";

function App() {
  const [activeSubMenu, setActiveSubMenu] = React.useState("All Doctors");

  const handleSubMenuClick = (subMenuText) => {
    setActiveSubMenu(subMenuText);
  };

  const renderSubMenuComponent = () => {
    switch (activeSubMenu) {
      case "All Doctors":
        return <AllDoctors />;
      case "Add New Doctor":
        return <NewDoctorForm />;
      case "All Clinics":
        return <AllClinics />;
      case "All Pharmacies":
        return <AllPharmacies />;
      case "Add New Clinic":
        return <NewClinicForm />;
      case "Add New Pharmacy":
        return <NewPharmacyForm />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div>
        <Sidebar
          onSubMenuClick={handleSubMenuClick}
          activeSubMenu={activeSubMenu}
        >
          <Form title={activeSubMenu}>{renderSubMenuComponent()}</Form>
        </Sidebar>
      </div>
    </div>
  );
}

export default App;
