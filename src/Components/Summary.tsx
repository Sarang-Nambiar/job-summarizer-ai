import React, { useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { IField } from "../constants";

const Summary = ({ fields } : { fields : IField[]}) => {
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let url = tabs[0].url;
      axios
        .get("http://localhost:8000/extract/", { params: { url, fields } })
        .then((response) => {
          console.log(response);
        });
    });
  }, []);

  return (
    <React.Suspense fallback={<CircularProgress />}>
      <h1>Summary</h1>

    </React.Suspense>
  );
};

export default Summary;
