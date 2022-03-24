import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import Profiles from "./components/profile/Profiles";
import { LoginContext } from "./context/LoginContext";
import { useContext } from "react";

function App() {
  const { currentAccount } = useContext(LoginContext);

  return <div className="App">{!currentAccount ? <Login /> : <Profiles />}</div>;
}

export default App;
