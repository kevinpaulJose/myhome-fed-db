import "./App.css";
import { BrowserRouter } from "react-router-dom";
import DashboardComponent from "./Components/Dashboard/DashboardComponent";
import Test from "./Components/Tst/TestComponent";

function App() {
  return (
    <BrowserRouter>
      <DashboardComponent />
      {/* <Test /> */}
    </BrowserRouter>
  );
}

export default App;
