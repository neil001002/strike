import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { generateChallenge } from "../graphQL/queries/generate-challenge";
import { authenticate } from "../graphQL/mutations/authenticate";
import { refreshAuth } from "../graphQL/mutations/refresh-authenticate";
import { Networks } from "../constants/Networks";

export const LoginContext = React.createContext();
const { ethereum } = window;

export const LoginProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [network, setNetwork] = useState("");

  const useInterval = (callback, delay) => {
    const savedCallback = React.useRef();

    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    let refreshToken = localStorage.getItem("refreshToken");
    currentAccount && refreshToken && console.log(refreshAuth(refreshToken));
  }, 600000);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask. Get MetaMask -> https://metamask.io/");
      console.log("We have ethereum object");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }

      // This is the new part, we check the user's network chain ID
      const chainId = await ethereum.request({ method: "eth_chainId" });
      setNetwork(Networks[chainId]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const signText = async (text) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log("signer", signer);
    return await signer.signMessage(text);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length !== 0) {
        const account = accounts[0].trim();
        console.log("connected wallet --> ", account);
        setCurrentAccount(account);

        // we request a challenge from the server
        const challengeResponse = await generateChallenge(account);

        // sign the text with the wallet
        const signature = await signText(challengeResponse.data.challenge.text);

        const accessTokens = await authenticate(account, signature);
        console.log("accessTokens-->", accessTokens);
        let accessToken = await accessTokens.data.authenticate.accessToken;
        let refreshToken = await accessTokens.data.authenticate.refreshToken;
        // console.log("accessToken",accessToken)
        // console.log("refreshToken",refreshToken)
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return <LoginContext.Provider value={{ connectWallet, currentAccount, network }}>{children}</LoginContext.Provider>;
};
