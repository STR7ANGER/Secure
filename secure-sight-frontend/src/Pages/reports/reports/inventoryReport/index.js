import React from "react";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import "react-toastify/dist/ReactToastify.css";

import { Backdrop, CircularProgress } from "@mui/material";
import Breadcrumbs, {
  Breadcrumbsub,
} from "../../../../components/Common/Breadcrumb";
import AWSInventoryReport from "./awsInventory";
import GCPInventoryReport from "./gcpInventory";
import AzureInventoryReport from "./azureInventory";
import MultipleSelect from "./selecttext";

const InventoryReport = () => {
  // document.title = "Report | trend micro unity";
  document.title = "Report | Secure Sight";
  const [openLoader, setOpenLoader] = React.useState(true);
  const [inventory, setInventory] = React.useState("");

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbsub
            title="Cloud Inventory"
            breadcrumbItem={
              <select
                className="form-select m-1"
                id="floatingSelectGrid"
                aria-label="Floating label select example"
                onChange={(e) => {
                  setInventory(e.target.value);
                }}
              >
                <option value="">Select Inventory</option>

                {InventoryData &&
                  InventoryData.map((i) => (
                    <option value={i.value}>{i.lable}</option>
                  ))}
              </select>
            }
          />
          {inventory === "AWS Invenitry" ? (
            <AWSInventoryReport url="aws-inventory" colunm="Account no" />
          ) : inventory === "GCP Invenitry" ? (
            <GCPInventoryReport url="gcp-inventory" colunm="Project ID" />
          ) : inventory === "Azure Invenitry" ? (
            <AzureInventoryReport
              url="azure-inventory"
              colunm="Subscription ID"
            />
          ) : (
            ""
          )}
          {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={() => setOpenLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default InventoryReport;
const InventoryData = [
  { value: "AWS Invenitry", lable: "AWS" },
  { value: "GCP Invenitry", lable: "GCP" },
  { value: "Azure Invenitry", lable: "Azure" },
];
