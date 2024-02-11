import "./App.css";
import Sidebar from "./Components/SideNav";
import TopBar from "./Components/TopBar"; 

function App() {
  return (
    <div className="App">
      <div className="container">
        <Sidebar />
        <div className="content">
          <TopBar />
          <div className="main-content">
            <h1>Content</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
