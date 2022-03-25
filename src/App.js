import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import Profiles from "./components/profile/Profiles";
import { LoginContext } from "./context/LoginContext";
import { useContext } from "react";

function App() {
  const { currentAccount } = useContext(LoginContext);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">Strike</p>
            </div>
            {/* Display a logo and wallet connection status */}
            <div className="right">
              {currentAccount ? (
                <p>
                  {" "}
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}{" "}
                </p>
              ) : (
                <p>Not connected</p>
              )}
            </div>
          </header>
        </div>

        {!currentAccount ? <Login /> : <Profiles />}

        {/* footer */}
        <div className="footer-container">
          <a className="footer-text">Lens Protocol</a>
          <a className="footer-text">developed by sunil</a>
        </div>
      </div>
    </div>
  );
}

export default App;
