import React from "react";
import "./SettingsContent.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SettingsTable from "./SettingsTable";

const style = {
  flex: "1",
};

function SettingsContent() {
  return (
    <section id="settings-sec" style={style}>
      <div className="overflow-shii" id="overflow-id">
        <h1 className="dash-h1">Settings</h1>

        <div className="settings-div">
          <div className="settings-div-bg">
            <Tabs>
              <TabList>
                <Tab className="noselect react-tabs__tab">
                  Price, Commission & Coverage
                </Tab>
              </TabList>

              <TabPanel>
                <SettingsTable />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsContent;
