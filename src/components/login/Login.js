import "./Login.css";
import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import lensBgLogo from "../../assets/lens-illustration_grow.svg";

function Login() {
  const { connectWallet } = useContext(LoginContext);
  // const { error, loading, data } = useQuery(GET_CHALLENGE);
  // console.log("Here's the challenge text: ", { error, loading, data });

  return (
    <div className="login-page">
      <div className="connect-wallet-container">
        <div className="img-container">
          <img className="bg-logo" src={lensBgLogo} />
        </div>
        <button className="cta-button connect-wallet-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
      <p className="subtitle">The Last Social Media Handle You'll Ever Have To Create</p>
    </div>
  );
}

export default Login;
