import "./App.css";
import Sidebar from "./Components/MyComponents/SideNav";
import TopBar from "./Components/MyComponents/TopBar";
import Form from "./Components/MyComponents/Form";
import InputField from "./Components/MyComponents/InputField";

const docDetails =[
  {
    Name:"Nithila",
    Location:"katubedda",
    Number:"0777997689"
  },
  {
    Name:"Pramesh",
    Location:"Panadura",
    Number:"0777997689"
  },
  {
    Name:"Sasanka",
    Location:"Rathnapura",
    Number:"0777997689"
  },
  {
    Name:"Supun",
    Location:"katubedda",
    Number:"0777997689"
  }
]
const tableTitleDeatils = ["Name","Location","Number"];

function App() {
  return (
    <div className="App">
      <div className="container">
        <Sidebar />
        <div className="content">
          <TopBar />
          <div className="main-content">
            <Form title="All Doctors" detailList={docDetails} captions={tableTitleDeatils}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
