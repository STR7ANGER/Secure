import React, { useEffect, useMemo, useState } from "react";

import { Row, Col, Card, CardBody } from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useLocation, useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import Breadcrumbs, {
  Breadcrumbsub,
} from "../../../components/Common/Breadcrumb";
import { DashboardList, ReportList } from "../../ulit/dashboardlist";
import ApiServices from "../../../Network_call/apiservices";
import ApiEndPoints from "../../../Network_call/ApiEndPoints";
import MaterialTable from "../../Tables/Table";
import { deepKeys, formatCapilize } from "../../ulit/commonFunction";
// const data = [
//   {
//     name: "string",
//     namespaceName: "string",
//     version: "string",
//     versionFormat: "string",
//     vulnerabilities: [
//       {
//         description: "string",
//         fixedBy: "string",
//         fixed: {
//           name: "string",
//           namespaceName: "string",
//           version: "string",
//           versionFormat: "string",
//           layer: "string",
//         },
//         override: {
//           id: "7a2f1d8c-7780-41d2-821b-7230005d4be8",
//           href: "/api/overrides/vulnerabilities/7a2f1d8c-7780-41d2-821b-7230005d4be8",
//           name: "CVE-2019-00000",
//           package: "sample-package",
//           version: "0.0.1",
//           registry: "registry.example.com",
//           repository: "organization/project",
//           tag: "latest",
//           created: "2019-03-01T00:00:00Z",
//           updated: "2019-03-01T00:00:00Z",
//           expires: "2019-04-01T00:00:00Z",
//           comment:
//             "Allowing CVE-2019-00000 for 30 days. Contact alice@example.com for\ndetails.",
//         },
//         link: "string",
//         name: "string",
//         namespaceName: "string",
//         severity: "high",
//         metadata: {},
//       },
//       {
//         description: "string",
//         fixedBy: "string",
//         fixed: {
//           name: "string",
//           namespaceName: "string",
//           version: "string",
//           versionFormat: "string",
//           layer: "string",
//         },
//         override: {
//           id: "7a2f1d8c-7780-41d2-821b-7230005d4be8",
//           href: "/api/overrides/vulnerabilities/7a2f1d8c-7780-41d2-821b-7230005d4be8",
//           name: "CVE-2019-00000",
//           package: "sample-package",
//           version: "0.0.1",
//           registry: "registry.example.com",
//           repository: "organization/project",
//           tag: "latest",
//           created: "2019-03-01T00:00:00Z",
//           updated: "2019-03-01T00:00:00Z",
//           expires: "2019-04-01T00:00:00Z",
//           comment:
//             "Allowing CVE-2019-00000 for 30 days. Contact alice@example.com for\ndetails.",
//         },
//         link: "string",
//         name: "string",
//         namespaceName: "string",
//         severity: "high",
//         metadata: {},
//       },
//     ],
//     metrics: {
//       total: {
//         defcon1: 0,
//         critical: 0,
//         high: 0,
//         medium: 0,
//         low: 0,
//         negligible: 0,
//         unknown: 0,
//       },
//       unresolved: {
//         defcon1: 0,
//         critical: 0,
//         high: 0,
//         medium: 0,
//         low: 0,
//         negligible: 0,
//         unknown: 0,
//       },
//       fixAvailable: {
//         defcon1: 0,
//         critical: 0,
//         high: 0,
//         medium: 0,
//         low: 0,
//         negligible: 0,
//         unknown: 0,
//       },
//     },
//   },
//   {
//     name: "string",
//     namespaceName: "string",
//     version: "string",
//     versionFormat: "string",
//     vulnerabilities: [
//       {
//         description: "string",
//         fixedBy: "string",
//         fixed: {
//           name: "string",
//           namespaceName: "string",
//           version: "string",
//           versionFormat: "string",
//           layer: "string",
//         },
//         override: {
//           id: "7a2f1d8c-7780-41d2-821b-7230005d4be8",
//           href: "/api/overrides/vulnerabilities/7a2f1d8c-7780-41d2-821b-7230005d4be8",
//           name: "CVE-2019-00000",
//           package: "sample-package",
//           version: "0.0.1",
//           registry: "registry.example.com",
//           repository: "organization/project",
//           tag: "latest",
//           created: "2019-03-01T00:00:00Z",
//           updated: "2019-03-01T00:00:00Z",
//           expires: "2019-04-01T00:00:00Z",
//           comment:
//             "Allowing CVE-2019-00000 for 30 days. Contact alice@example.com for\ndetails.",
//         },
//         link: "string",
//         name: "string",
//         namespaceName: "string",
//         severity: "high",
//         metadata: {},
//       },
//     ],
//     metrics: {
//       total: {
//         defcon1: 0,
//         critical: 0,
//         high: 0,
//         medium: 0,
//         low: 0,
//         negligible: 0,
//         unknown: 0,
//       },
//       unresolved: {
//         defcon1: 0,
//         critical: 0,
//         high: 0,
//         medium: 0,
//         low: 0,
//         negligible: 0,
//         unknown: 0,
//       },
//       fixAvailable: {
//         defcon1: 0,
//         critical: 0,
//         high: 0,
//         medium: 0,
//         low: 0,
//         negligible: 0,
//         unknown: 0,
//       },
//     },
//   },
// ];
function getAllKeys(data) {
  const keys = [];

  function collectKeys(obj, prefix = "") {
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        collectKeys(item, `${prefix}[${index}]`);
      });
    } else if (typeof obj === "object" && obj !== null) {
      Object.keys(obj).forEach((key) => {
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        collectKeys(obj[key], newPrefix);
      });
    } else {
      keys.push(prefix);
    }
  }

  collectKeys(data);
  return keys;
}

const CSVData = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const document_name = searchParams.get("document_name");
  const id = searchParams.get("_id");

  // document.title = "CSV Data | trend micro unity";
  document.title = "CSV Data | Secure Sight";

  const [data, setData] = useState([]);
  const [openLoader, setOpenLoader] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: "",
    dbName: "",
    user_id: "",
  });
  useEffect(() => {
    let userObject = localStorage.getItem("authUser");
    var userInfo = userObject ? JSON.parse(userObject) : "";
    setUserData(() => ({
      email: userInfo.email,
      dbName: userInfo.dbName,
      user_id: userInfo._id,
    }));
    getCSVData({ user_id: userInfo._id, dbName: userInfo.dbName });
  }, []);

  const getCSVData = async ({ dbName, user_id }) => {
    setOpenLoader(true);
    let payload = {
      dbName: dbName,
      user_id: user_id,
      _id: id,
      document_name: document_name,
    };
    const response = await ApiServices("post", payload, ApiEndPoints.FileGet);
    toast(response.msg, { autoClose: 2000 });
    setData(response?.data[0].data);
    setOpenLoader(false);
  };

  const keys = Array.from(getAllKeys(data.length > 0 && data[0]));
  const columns = useMemo(
    () =>
      keys &&
      keys.map((name) => ({
        accessorKey: name,
        header: formatCapilize(name),
      }))
  );
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="CSV" breadcrumbItem="Data" />
          <Breadcrumbsub
            title={document_name}
            breadcrumbItem={
              <>
                <Link to="/csv-list">
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    <i className="ri-arrow-left-line align-middle ms-2"></i>
                    Back{" "}
                  </button>{" "}
                </Link>
              </>
            }
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div>
                    {/* <Breadcrumbsub
                      title="Report List"
                      breadcrumbItem={
                        <div className="input-group">
                          <button
                            onClick={() => {
                              setSearchedVal("");
                            }}
                            className="input-group-text"
                          >
                            <CloseOutlined />
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            id="autoSizingInputGroup"
                            placeholder="Search"
                            value={searchedVal}
                            onChange={(e) => {
                              setSearchedVal(e.target.value);
                            }}
                          />
                        </div>
                      }
                    /> */}
                  </div>

                  <div className="table-responsive">
                    {data.length > 0 && (
                      <MaterialTable data={data} columns={columns} />
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>{" "}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={() => setOpenLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default CSVData;
