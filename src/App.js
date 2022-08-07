import "./App.css";
import { useState } from "react";

import { ethers } from "ethers";

import { ReactComponent as Spinner } from "./assets/spinner.svg";
import { contractAddress, contractJsonAbi } from "./data/contractData";

function App() {
  const [inputData, setInputData] = useState("");
  const [fetchedData, setFetchedData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [events, setEvents] = useState([]);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const getContractData = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractJsonAbi,
        provider
      );

      try {
        const contractData = await contract.getData();
        setFetchedData(contractData);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

  async function setContractData() {
    if (!inputData) return;
    if (typeof window.ethereum !== "undefined") {
      setIsLoading(true);
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractJsonAbi,
        signer
      );
      const transaction = await contract.setData(inputData);
      await transaction.wait();

      setIsLoading(false);
      setInputData("");
      setFetchedData("");
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

      contract.once("DataSet", (data, { blockHash }) => {
        const eventData = { data, blockHash };
        setEvents((prevEvents) => [eventData, ...prevEvents]);
      });
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className={`toast-message ${isSuccess && "toast-show"}`}>
          Transaction Successfull !
        </div>

        <div className="section-top">
          <input
            className="top-input"
            value={inputData}
            onChange={handleInput}
            placeholder="Add Something Here"
          />
          <button className="top-button" onClick={setContractData}>
            {isLoading ? <Spinner className="spinner" /> : "Set Data"}
          </button>
        </div>

        <div className="section-bottom">
          <div className="section-fetch-contract">
            <button
              className="fetch-button fetch-contract-button"
              onClick={getContractData}
            >
              Fetch Contract Data
            </button>
            <div className="fetched-data">{fetchedData}</div>
          </div>
          <div className="section-fetch-events">
            <div className="event-list">Event List</div>
            <div className="fetched-events">
              {events.map((item, idx) => {
                return (
                  <div key={`event-${idx}`}>
                    <div>Data: {item.data}</div>
                    <div>Blockhash: {item.blockHash}</div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
