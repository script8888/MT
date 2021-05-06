import "./dashboard.css";
import { Helmet } from "react-helmet";
import SettingsContent from "../components/settings/SettingsContent";

function Settings() {
  return (
    <div className="dashhh noselect">
      <Helmet>
        <title> Settings | Verigo </title>{" "}
      </Helmet>{" "}
      <div className="container-dash">
        <SettingsContent />
      </div>{" "}
    </div>
  );
}

export default Settings;
