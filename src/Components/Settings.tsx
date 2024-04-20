import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import "../Stylesheets/Settings.css";
import { IField } from "../constants";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { goBack } from "react-chrome-extension-router";

const Settings = ({
  fields,
  setFields,
}: {
  fields: IField[];
  setFields: (fields: IField[]) => void;
}) => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="backbtn-title">
        <ArrowBackIcon onClick={() => goBack()} sx={{cursor:"pointer"}}/>
        <h1>⚙️ Settings</h1>
        </div>
        <Button variant="contained" onClick={() => {
          chrome.storage.local.set({ selectedFields: fields }).then(() => {
            toast.success("Settings saved successfully!")
            goBack();
          });
          }}>Save</Button>
      </div>
      <FormGroup>
        {fields.map((field, index) => {
            return (
            <FormControlLabel
              label={field.name}
              control={
              <Checkbox
                key={index}
                defaultChecked={field.value}
                onChange={(e) => {
                const updatedFields = [...fields];
                updatedFields[index].value = e.target.checked;
                setFields(updatedFields);
                }}
              />
              }
            />
            );
        })}
      </FormGroup>
    </div>
  );
};

export default Settings;
