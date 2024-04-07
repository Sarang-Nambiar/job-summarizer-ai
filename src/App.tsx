import { Button, CircularProgress } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import "./App.css";
import chatbot_logo from "./assets/favicon.svg";
import { Suspense, useState } from "react";
import axios from "axios";
import initFields from "./constants";

function App() {
  const [loading, setLoading] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [fields, setFields] = useState(initFields); 

  const onClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let url = tabs[0].url;
      // use `url` here inside the callback because it's asynchronous!
      axios.get("http://localhost:8000/extract/", {params : { url }}).then((response) => {
        setLoading(true);
        console.log(response);
      })
    });
  };
  return !loading ? (
    <>
      <div className="settings-icon">
        <SettingsIcon onClick={() => setOpenSettings(true)}/>
      </div>
      <div className="container">
        <img src={chatbot_logo} alt="Chatbot logo" width="15%" />
        <h2>Job Description Summariser</h2>
        <Button variant="contained" color="primary" onClick={onClick}>
          Search this website
        </Button>
      </div>
    </>
  ) : (
    <Suspense fallback={<CircularProgress />}>
      <div className="container">
        <CircularProgress />
      </div>
    </Suspense>
  );
}

export default App;
