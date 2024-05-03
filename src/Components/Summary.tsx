import { useState, useEffect } from "react";
import axios from "axios";
import { IField } from "../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../Stylesheets/Summary.css";
import { goBack } from "react-chrome-extension-router";
import { toast } from "react-toastify";
import parse from "html-react-parser";

const Summary = ({ fields }: { fields: IField[] }) => {
  const [summary, setSummary] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let url = tabs[0].url;

      if(!url?.includes("indeed.com")){
        toast.error("Please open an Indeed job description to summarise it.");
        goBack();
        return;
      };
      
      axios
        .post(
          "http://localhost:8000/extract/",
          { url, fields },
          { timeout: 30000 }
        )
        .then((response) => {
          setLoading(false);
          const result = response.data;
          if (result.error) {
            toast.error(result.error);
            goBack();
            return;
          }
          setSummary(result.summary);
        })
        .catch((error) => {
          toast.error(
            "An error occurred while summarising the job description. Please try again later."
          );
          goBack();
        });
    });
    console.log(summary)
  }, []);

  return loading ? (
    <div className="loading-container">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2>Summarising the job description...</h2>
    </div>
  ) : (
    <div className="summary container">
      <div className="summary-header">
        <ArrowBackIcon onClick={() => goBack()} sx={{ cursor: "pointer" }} />
        <h1>📝Summary</h1>
      </div>
      {summary &&
        Object.keys(summary).map((key, index) => {
          return (
            <div className="summary-item" key={index}>
              <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                {key}
              </span>
              <p>{summary[key] ? parse(summary[key]) : "Not Specified"}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Summary;
