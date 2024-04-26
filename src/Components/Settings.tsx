import { FormGroup, Switch } from "@mui/material";
import "../Stylesheets/Settings.css";
import { IField } from "../constants";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { goBack } from "react-chrome-extension-router";
import { btnStyle } from "../App";

const Settings = ({
  fields,
  setFields,
}: {
  fields: IField[];
  setFields: (fields: IField[]) => void;
}) => {
  return (
    <div className="container">
      <div className="settings-header">
        <div className="backbtn-title">
          <ArrowBackIcon onClick={() => goBack()} sx={{ cursor: "pointer" }} />
          <h1>⚙️ Settings</h1>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            chrome.storage.local.set({ selectedFields: fields }).then(() => {
              toast.success("Settings saved successfully!");
              goBack();
            });
          }}
          sx={btnStyle}
        >
          Save
        </Button>
      </div>
      <FormGroup className="settings">
        {fields.map((field, index) => {
          return (
            <div className="settings-item bubble">
              <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                {field.name}
              </span>
              <Switch
                key={index}
                defaultChecked={field.value}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.checked;
                  setFields(updatedFields);
                }}
              />
            </div>
          );
        })}
      </FormGroup>
    </div>
  );
};

export default Settings;
