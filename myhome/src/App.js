import "./App.css";
import { BrowserRouter } from "react-router-dom";
import DashboardComponent from "./Components/Dashboard/DashboardComponent";

function App() {
  return (
    <BrowserRouter>
      <DashboardComponent />
    </BrowserRouter>
  );
}

export default App;
