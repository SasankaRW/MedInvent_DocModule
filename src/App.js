import "./App.css";
import * as React from "react";
import Sidebar from "./Components/MyComponents/SideNav";
import Form from "./Components/MyComponents/Form";

const docDetails = [
  {
    Name: "Nithila",
    Location: "katubedda",
    Number: "0777997689",
  },
  {
    Name: "Pramesh",
    Location: "Panadura",
    Number: "0777997689",
  },
  {
    Name: "Sasanka",
    Location: "Rathnapura",
    Number: "0777997689",
  },
  {
    Name: "Supun",
    Location: "katubedda",
    Number: "0777997689",
  },
];
const tableTitleDeatils = ["Name", "Location", "Number"];

function App() {
  const [activeSubMenu, setActiveSubMenu] = React.useState("All Doctors");

  const handleSubMenuClick = (subMenuText) => {
    setActiveSubMenu(subMenuText);
  };

  return (
    <div className="App">
      <div className="container">
        <Sidebar
          onSubMenuClick={handleSubMenuClick}
          activeSubMenu={activeSubMenu}
        >
          {" "}
          <div className="content">
            <div className="main-content">
              <Form
                title="All Doctors"
                detailList={docDetails}
                captions={tableTitleDeatils}
              />
            </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default App;
