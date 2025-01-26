import React, { useEffect } from "react";

import { Card, CardBody, Col, Row } from "reactstrap";
import ReactGridLayout from "react-grid-layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import DonutOfSmartChecks from "../charts/donutForSmartChecks";
import ContentFindings from "../charts/contentFindings";
import {
  Bolt,
  DoDisturbAlt,
  FindInPage,
  ListOutlined,
  YoutubeSearchedForOutlined,
} from "@mui/icons-material";
import ApiServices from "../../../../Network_call/apiservices";
import ApiEndPoints from "../../../../Network_call/ApiEndPoints";
import { Backdrop, CircularProgress } from "@mui/material";
import ScanCompletion from "../charts/scanCompletion";
import SmartScanCard from "../charts/smartCheckCard";

const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(
  ReactGridLayout.Responsive
);

const SmartChecksDashboard = () => {
  // document.title = "Dashboard | trend micro unity";
  document.title = "Dashboard | Secure Sight";
  const dashboardRef = React.useRef();
  const [data, setData] = React.useState(null);
  const [openLoader, setOpenLoader] = React.useState([]);
  const url = "smart-check-describe-registries-dashboard";
  React.useEffect(() => {
    getSmartChecksData();
  }, []);

  const getSmartChecksData = async () => {
    setOpenLoader(true);
    const payload = { index: url, column: [] };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.SearchData
    );
    response.length && setData(response.pop());
    setOpenLoader(false);
  };

  console.log(data);
  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer />
        <Breadcrumbs title="Dashboard" breadcrumbItem="Smart Checks" />

        {/* <ResponsiveReactGridLayout
            layouts={{ lg: layout }}
            measureBeforeMount={true}
            className="layout"
            isDragable={true}
            isResizable={true}
            ref={dashboardRef}
            margin={[20, 20]}
          > */}
        <div className="smartscancardlayout">
          <Card>
            <CardBody>
              <ScanCompletion
                icon={<Bolt />}
                title="Scan Completion"
                data={data && data?.scans}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <DonutOfSmartChecks
                icon={<Bolt />}
                title="Malware"
                data={data && data}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <DonutOfSmartChecks
                data={data && data}
                icon={<Bolt />}
                title="Vulnerabilities"
                column={"vulnerabilities"}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <DonutOfSmartChecks
                data={data && data}
                icon={<FindInPage />}
                title="Content Findings"
                column={"contents"}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <DonutOfSmartChecks
                data={data && data}
                icon={<ListOutlined />}
                title="Checklists"
                column={"checklists"}
              />
            </CardBody>
          </Card>

          {data &&
            Object.keys(data.content)?.map((item, index) => (
              <SmartScanCard data={data?.content[item]} title={item} />
            ))}

          {data &&
            Object.keys(data.history)?.map((item, index) => (
              <SmartScanCard
                data={data?.history[item]?.scans}
                title={
                  item == ("1d" || "1D")
                    ? "Scans last 24 hours"
                    : "Scans last 7 Day"
                }
              />
            ))}
        </div>
        {/* </ResponsiveReactGridLayout> */}
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

export default SmartChecksDashboard;
//   ############################################ dashboard layout ##########################################
const layout = [
  {
    i: "Vulnerabilities",
    x: 0,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    i: "Scan Completion",
    x: 3,
    y: 0,
    w: 3,
    h: 2,
  },

  {
    i: "Content Findings",
    x: 6,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    i: "Malware",
    x: 9,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    i: "Checklists",
    x: 0,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    i: "Scan Completion",
    x: 3,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    i: "SmartCheckScan0",
    x: 6,
    y: 0,
    w: 3,
    h: 1,
  },
  {
    i: "SmartCheckScan1",
    x: 9,
    y: 0,
    w: 3,
    h: 1,
  },
  {
    i: "SmartCheckScan2",
    x: 0,
    y: 0,
    w: 3,
    h: 1,
  },
];
