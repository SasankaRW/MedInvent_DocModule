import "./App.css";
import Sidebar from "./Components/SideNav";
import TopBar from "./Components/TopBar";
import Form from "./Components/Form";
import InputField from "./Components/InputField";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Sidebar />
        <div className="content">
          <TopBar />
          <div className="main-content">
            <Form title="All Doctors">
              <form></form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
