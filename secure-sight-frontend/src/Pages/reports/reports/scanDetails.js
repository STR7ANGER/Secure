import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom/dist";

import {
  Row,
  Col,
  Card,
  CardBody,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  UncontrolledAccordion,
  CardHeader,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import DonutOfSmartChecks from "../../Dashboard/dashboard/charts/donutForSmartChecks";
import { Bolt, FindInPage, ListOutlined } from "@mui/icons-material";
import ReactGridLayout from "react-grid-layout";
import { Grid, Typography } from "@mui/material";
import { allReplace } from "../../ulit/commonFunction";
import ApiServices from "../../../Network_call/apiservices";
import ApiEndPoints from "../../../Network_call/ApiEndPoints";
const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(
  ReactGridLayout.Responsive
);

const ScanDetails = () => {
  // document.title = "Report | trend micro unity";
  document.title = "Report | Secure Sight";
  const location = useLocation();
  const [openLoader, setOpenLoader] = React.useState(false);
  const [scanData, setScanData] = React.useState();
  const { id } = location.state;

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    setOpenLoader(true);
    const payload = { index: "smart-check-scans", id: { id: id } };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.SmartScanDetail
    );

    response && setScanData(response?._source);
    setOpenLoader(false);
  };

  const dashboardRef = React.useRef();
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Smart Checks" breadcrumbItem="Scan Details" />
          <Card>
            {/* <Breadcrumbs title="Scan Details" breadcrumbItem={id} /> */}
            <CardBody>
              <Row>
                <Col xl={9}>
                  <h4> {scanData?.name}</h4>
                </Col>
                <Col>
                  <h5> {scanData?.status}</h5>
                  <h5 style={{ color: "gray" }}>
                    {scanData?.details?.updated}
                  </h5>
                </Col>
              </Row>
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
                  <div key="Malware">
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <DonutOfSmartChecks
                            icon={<Bolt />}
                            title="Malware"
                            url="smart-check-list-laycccer-vulnerabilities-findings"
                            // column={"vulnerabilities"}
                            data={scanData && scanData}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>

                  <div key="Vulnerabilities">
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <DonutOfSmartChecks
                            data={scanData && scanData}
                            icon={<Bolt />}
                            title="Vulnerabilities"
                            url="smart-check-list-layer-vulnerabilities-findings"
                            column={"vulnerabilities"}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>

                  <div key="Content Findings">
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <DonutOfSmartChecks
                            data={scanData && scanData}
                            icon={<FindInPage />}
                            title="Content Findings"
                            url="smart-check-list-layer-vulnerabilities-findings"
                            column={"contents"}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                  <div key="Checklists">
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <DonutOfSmartChecks
                            data={scanData && scanData}
                            icon={<ListOutlined />}
                            title="Checklists"
                            url="smart-check-list-layer-vulnfsderabilities-findings"
                            column={"checklists"}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                </ResponsiveReactGridLayout>
              </Row>

              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <h4>Layers</h4>
                      <UncontrolledAccordion>
                        {scanData &&
                          scanData.details?.results.map((item) => (
                            <AccordionItem>
                              <AccordionHeader targetId={item?.id}>
                                <Typography
                                  sx={{
                                    width: "99%",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    color: "grey",
                                  }}
                                >
                                  {allReplace(item?.createdBy, {
                                    "/bin/sh": "",
                                    "-c": "",
                                    set: "SET",
                                    add: "ADD",
                                    run: "RUN",
                                  })}
                                </Typography>
                              </AccordionHeader>
                              <AccordionBody accordionId={item?.id}>
                                <Typography>Layer ID: {item?.id}</Typography>
                                <Typography>Created at:</Typography>
                                <Typography>{item?.createdAt}</Typography>{" "}
                                <br />
                                <Typography>Created with:</Typography>
                                <Typography
                                  sx={{
                                    padding: "10px",
                                    backgroundColor: "grey",
                                  }}
                                >
                                  {allReplace(item?.createdBy, {
                                    "/bin/sh": "",
                                    "-c": "",
                                    set: "SET",
                                    add: "ADD",
                                    run: "RUN",
                                  })}
                                </Typography>
                              </AccordionBody>
                            </AccordionItem>
                          ))}
                      </UncontrolledAccordion>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <Typography variant="h5"> Scanner details</Typography>
                    </CardHeader>
                    <CardBody>
                      <Grid container direction="row">
                        <Typography> Malware patterns: </Typography>
                        <Typography>
                          {scanData && scanData?.scanners?.malware?.updated}{" "}
                        </Typography>
                      </Grid>
                      <Grid container direction="row">
                        <Typography> Vulnerability database:</Typography>
                        <Typography>
                          {scanData &&
                            scanData?.vulnerabilities?.malware?.updated}
                        </Typography>
                      </Grid>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScanDetails;
const layout = [
  {
    i: "Vulnerabilities",
    x: 6,
    y: 0,
    w: 3,
    h: 2,
  },

  {
    i: "Content Findings",
    x: 3,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    i: "Malware",
    x: 0,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    i: "Checklists",
    x: 9,
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
];
