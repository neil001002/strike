import "./Login.css";
import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";

function Login() {
  const { connectWallet } = useContext(LoginContext);
  // const { error, loading, data } = useQuery(GET_CHALLENGE);
  // console.log("Here's the challenge text: ", { error, loading, data });

  return (
    <div className="Login">
      <button onClick={connectWallet}>
        <h1>Connect Wallet</h1>
      </button>
    </div>
  );
}

export default Login;
