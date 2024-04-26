import { Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import "./App.css";
import chatbot_logo from "./assets/chatbot.png";
import { goTo } from "react-chrome-extension-router";
import Summary from "./Components/Summary";
import Settings from "./Components/Settings";
import "@fontsource/inter"; // Defaults to weight 400
import { useEffect, useState } from "react";
import initFields, { IField } from "./constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const btnStyle = {
  backgroundImage: "linear-gradient(90deg, #cc2b5e, #753a88)",
  borderRadius: "20px",
  fontSize: "1.1rem",
  textTransform: "none",
  fontWeight: "500",
};

function App() {

  const [fields, setFields] = useState<IField[]>(initFields);

  useEffect(() => {
    chrome.storage.local.get("selectedFields", (result) => {
      if (result.selectedFields) {
        setFields(result.selectedFields);
      }
    });
  }, []);

  return (
    <>
      <ToastContainer pauseOnHover={false} draggable={false} />
      <div
        className="settings-icon"
        onClick={() => goTo(Settings, { fields, setFields })}
      >
        <SettingsIcon />
      </div>

      <div className="main-container">
        <img src={chatbot_logo} alt="Chatbot logo" width="50%" />
        <h1>
          JobSummar
          <span className="grad-text" data-text="AI">
            AI
          </span>
        </h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            goTo(Summary, { fields })
          }}
          sx={btnStyle}
        >
          Summarise this job
        </Button>
      </div>
    </>
  );
}

export default App;
