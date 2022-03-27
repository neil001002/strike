// import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import Profiles from "./components/profile/Profiles";
import Feeds from "./components/feeds/Feeds";
import { LoginContext } from "./context/LoginContext";
import { useContext, useState } from "react";
import logo from "./assets/lens-favicon.png";
import smallLogo from "./assets/lens-favicon-2.png";
import polygonVector from "./assets/polygon-vector-1.svg";
import ethLogo from "./assets/eth-logo.png";
import polygonLogo from "./assets/polygon-logo.png";
import Footer from "./components/footer/Footer";

function App() {
  const { currentAccount, network } = useContext(LoginContext);
  const [activeComponent, setActiveComponent] = useState("feedsComponent");

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">⚡Strike</p>
            </div>
            {/* Display a logo and wallet connection status */}
            <div className="right-buttons">
              {currentAccount && (
                <div className="rightFeedsButton" onClick={() => setActiveComponent("feedsComponent")}>
                  Explore
                </div>
              )}
              <div className="right">
                <img className="polygon-logo" src={network.includes("Polygon") ? polygonVector : ethLogo} />
                {currentAccount ? (
                  <p>
                    {" "}
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}{" "}
                  </p>
                ) : (
                  <p>Not connected</p>
                )}
              </div>
              {currentAccount && <img onClick={() => setActiveComponent("profileComponent")} className="img" src={logo} />}
            </div>
          </header>
        </div>

        {!currentAccount && <Login />}
        {currentAccount && activeComponent === "feedsComponent" && <Feeds />}
        {activeComponent === "profileComponent" && <Profiles />}

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
