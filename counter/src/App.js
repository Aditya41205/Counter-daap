import React, { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0x3bc803a51068b7e0c4d3c613ab15e2da28eaa74d";
const contractABI = [
  {
    inputs: [{ internalType: "uint256", name: "_a", type: "uint256" }],
    name: "sum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "a",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "returna",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [retrievedNumber, setRetrievedNumber] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setWalletAddress(await signer.getAddress());
      setError("");
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const handleNumber = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.sum(inputNumber);
      await tx.wait();
      setInputNumber("");
      alert("Number updated successfully");
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const handleRetrieveNumber = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const result = await contract.returna();
      setRetrievedNumber(result.toString());
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="App">
      <h2>Counter DApp: Add 10 to an input number</h2>

      <button className="connector" onClick={connectWallet}>
        {walletAddress
          ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : "Connect Wallet"}
      </button>

      <div>
        <input
          type="number"
          placeholder="Enter a number"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
        />
        <button onClick={handleNumber}>Add 10</button>
      </div>

      <div>
        <button onClick={handleRetrieveNumber}>Retrieve Number</button>
        {retrievedNumber && <p>Retrieved Number: {retrievedNumber}</p>}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
