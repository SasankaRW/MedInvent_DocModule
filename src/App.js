import "./App.css";
import AdminView from "./views/admin/pages/AdminView";
import DoctorView from "./views/docmodule/Doctor/DoctorView";
import ClinicView from "./views/docmodule/Clinic/ClinicView";

function App() {
  return (
    <div className="App">
      {/* <AdminView /> */}
      {/* <DoctorView /> */}
      <ClinicView />
    </div>
  );
}

export default App;
