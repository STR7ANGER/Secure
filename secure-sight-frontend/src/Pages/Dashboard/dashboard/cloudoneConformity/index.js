import React, { useEffect, useState } from "react";

import { Card, CardBody, Col, Row } from "reactstrap";

//Import Breadcrumb

import { useParams } from "react-router-dom";
import ReactGridLayout from "react-grid-layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Backdrop, CircularProgress } from "@mui/material";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import BarChart from "../charts/barChartGroup";
import UserPanel from "../../UserPanel";

const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(
  ReactGridLayout.Responsive
);

const CloudoneConformityDashboard = () => {
  // document.title = "Dashboard | trend micro unity";
  document.title = "Dashboard | Secure Sight";

  const dashboardRef = React.useRef();

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer />
        <Breadcrumbs title="Dashboard" breadcrumbItem="Cloudone Conformity" />
        <UserPanel url="ConformityChecks" columns="Risk_level" />
        <Row>
          <ResponsiveReactGridLayout
            layouts={{ lg: layout }}
            measureBeforeMount={true}
            className="layout"
            isDragable={true}
            isResizable={true}
            ref={dashboardRef}
            margin={[20, 20]}
          >
            <div key="All provider">
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <BarChart
                      title="All"
                      url="ConformityChecks"
                      columns={["Provider", "Risk_level"]}
                    />
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div key="AWS provider">
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <BarChart
                      title="AWS"
                      url="ConformityChecks"
                      columns={["Provider", "Risk_level"]}
                    />
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div key="Azure provider">
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <BarChart
                      title="Azure"
                      url="ConformityChecks"
                      columns={["Provider", "Risk_level"]}
                    />
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div key="GCP provider">
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <BarChart
                      title="GCP"
                      url="ConformityChecks"
                      columns={["Provider", "Risk_level"]}
                    />
                  </CardBody>
                </Card>
              </Col>
            </div>
          </ResponsiveReactGridLayout>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CloudoneConformityDashboard;
//   ############################################ dashboard layout ##########################################
const layout = [
  {
    i: "All provider",
    x: 0,
    y: 0,
    w: 5,
    h: 3,
  },
  {
    i: "AWS provider",
    x: 6,
    y: 0,
    w: 5,
    h: 3,
  },
  {
    i: "Azure provider",
    x: 0,
    y: 0,
    w: 5,
    h: 3,
  },
  {
    i: "GCP provider",
    x: 6,
    y: 0,
    w: 5,
    h: 3,
  },
];
