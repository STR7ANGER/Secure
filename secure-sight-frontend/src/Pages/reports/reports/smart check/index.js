import React from "react";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import "react-toastify/dist/ReactToastify.css";

import Breadcrumbs, {
  Breadcrumbsub,
} from "../../../../components/Common/Breadcrumb";

import SmartChecksReport from "./smartChecksReport";
import SmartChecksScanReport from "./scan";
import SmartChecksRegistriesReport from "./registriesList";

const SmartChecks = () => {
  // document.title = "Report | trend micro unity";
  document.title = "Report | Secure Sight";
  const [inventory, setInventory] = React.useState("Scan");

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Smart Checks" breadcrumbItem={inventory} />
          <Breadcrumbsub
            title="Smart Checks"
            breadcrumbItem={
              <select
                className="form-select m-1"
                id="floatingSelectGrid"
                aria-label="Floating label select example"
                onChange={(e) => {
                  setInventory(e.target.value);
                }}
              >
                <option value="">Select Report</option>

                {InventoryData &&
                  InventoryData.map((i) => (
                    <option value={i.value}>{i.lable}</option>
                  ))}
              </select>
            }
          />

          {inventory === "Vulnerabilities Finding" && (
            <SmartChecksReport
              title="Vulnerabilities Finding"
              url="smart-check-list-layer-vulnerabilities-findings"
            />
          )}
          {inventory === "Malware Finding" && (
            <SmartChecksReport
              title="Malware Finding"
              url="smart-check-list-layer-malware-findings"
            />
          )}
          {inventory === "Registries Dashboard" && (
            <SmartChecksReport
              title="Registries Dashboard"
              url="smart-check-describe-registries-dashboard"
            />
          )}
          {inventory === "Scan" && (
            <SmartChecksScanReport title="Scan" url="smart-check-scans" />
          )}
          {inventory === "User List" && (
            <SmartChecksReport title="User List" url="smart-check-list-users" />
          )}
          {inventory === "List Sessions" && (
            <SmartChecksReport
              title="List Sessions"
              url="smart-check-list-sessions"
            />
          )}
          {inventory === "Registries List" && (
            <SmartChecksRegistriesReport
              title="Registries List"
              url="smart-check-list-registries"
            />
          )}
          {inventory === "Content Ruleset Collections" && (
            <SmartChecksReport
              title="Content Ruleset Collections"
              url="smart-check-list-content-ruleset-collections"
            />
          )}
          {inventory === "Roles" && (
            <SmartChecksReport title="Roles" url="smart-check-roles" />
          )}
          {inventory === "Describe License" && (
            <SmartChecksReport
              title="Describe License"
              url="smart-check-describe-license"
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SmartChecks;
const InventoryData = [
  { value: "Vulnerabilities Finding", lable: "Vulnerabilities Finding" },
  { value: "Malware Finding", lable: "Malware Finding" },
  { value: "Registries Dashboard", lable: "Registries Dashboard" },
  { value: "List Sessions", lable: "List Sessions" },
  { value: "Scan", lable: "Scan" },
  { value: "User List", lable: "User List" },
  { value: "Registries List", lable: "Registries List" },
  {
    value: "Content Ruleset Collections",
    lable: "Content Ruleset Collections",
  },
  { value: "Roles", lable: "Roles" },
  { value: "Describe License", lable: "Describe License" },
];
