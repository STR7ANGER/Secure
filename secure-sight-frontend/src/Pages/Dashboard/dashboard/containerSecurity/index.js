import React, { useCallback, useEffect, useState } from "react";

import { Card, CardBody, Col, Row } from "reactstrap";

import ReactGridLayout from "react-grid-layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import ClusterTable from "../charts/clusterTable";
import VoilationTable from "../charts/voilationTable";
import BarChart from "../charts/barChart";
import UserPanel from "../../UserPanel";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from "recharts";

const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(
  ReactGridLayout.Responsive
);

const ContainerSecurityDashboard = () => {
  // document.title = "Dashboard | trend micro unity";
  document.title = "Dashboard | Secure Sight";

  const dashboardRef = React.useRef();

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer />
        <Breadcrumbs title="Dashboard" breadcrumbItem="Container Security" />
        <UserPanel url="ContainerRuntimeVulnerabilityView" columns="Severity" />
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
                    <VoilationTable
                      title="Container Security Violation Table"
                      column="Cluster"
                      url="ContainerRuntimeVulnerabilityView"
                    />
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div key="AWS provider">
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <VoilationTable
                      title="Container Security Violation Table"
                      column="Severity"
                      url="ContainerRuntimeVulnerabilityView"
                    />
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div key="Azure provider">
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <VoilationTable
                      title="Container Security Runtime Sensor Violation Table"
                      column="Rule"
                      url="ContainerRuntimeSensor"
                    />
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div key="Cluser Table">
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <ClusterTable
                      title="Container Security Cluster Table "
                      url="ContainerRuntimeVulnerabilityView"
                      columns={["Cluster", "Severity"]}
                    />
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div key="Bar Chart">
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <BarChart
                      title="Container Security Cluster Table "
                      url="ContainerRuntimeVulnerabilityView"
                      columns={["Severity"]}
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

export default ContainerSecurityDashboard;
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
    i: "Bar Chart",
    x: 6,
    y: 0,
    w: 5,
    h: 3,
  },
  {
    i: "Cluser Table",
    x: 0,
    y: 0,
    w: 12,
    h: 3,
  },
];
