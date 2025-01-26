import React, { useState } from "react";
import { Col, Row } from "reactstrap";

import ApiServices from "../../../../Network_call/apiservices";
import ApiEndPoints from "../../../../Network_call/ApiEndPoints";
import {
  Breadcrumbsub,
  ChartHeader,
} from "../../../../components/Common/Breadcrumb";
import { Refresh } from "@mui/icons-material";
import { timedata } from "../../../ulit/timeforGertData";
import { arrayReduce } from "../../../ulit/commonFunction";
import { Backdrop, CircularProgress } from "@mui/material";
import SimpleBar from "simplebar-react";

const ClusterTable = ({ title, columns, url }) => {
  const [data, setData] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    getClusterData();
  }, []);

  React.useEffect(() => {
    getClusterData();
  }, [time]);

  //   ################################################  get data   ####################################################

  const dateNow = new Date();
  const lessTime = new Date(dateNow.getTime() - time)
    .toISOString()
    .slice(0, -1);

  const getClusterData = async () => {
    setOpenLoader(true);
    const payload = {
      curruntTime: dateNow.toISOString(),
      lessTime: lessTime,
    };
    const response = await ApiServices(
      "post",
      time > 0 ? payload : "",
      ApiEndPoints[url]
    );
    if (response) {
      setData(response);
    }
    setOpenLoader(false);
  };

  const counts = {};

  data.length > 0 &&
    data.forEach((obj) => {
      if (!counts[obj[columns[0]]]) {
        counts[obj[columns[0]]] = {
          low: 0,
          medium: 0,
          high: 0,
          warning: 0,
          notice: 0,
          critical: 0,
        };
      }
      counts[obj[columns[0]]][obj[columns[1]]]++;
    });

  //   ################################################  time Change   ####################################################

  const setTimeChange = (event) => {
    setTime(event.target.value);
  };
  return (
    <React.Fragment>
      <ChartHeader
        title={title}
        reload={getClusterData}
        handleChange={setTimeChange}
      />
      <div>
        <SimpleBar style={{ maxHeight: "287px" }}>
          <div>
            <Row className="cluster-table-row">
              <Col md={4}>Cluster Name</Col>
              <Col>No Of Images</Col>
              <Col>Low</Col>
              <Col></Col>
              <Col>HiMediumgh</Col>
              <Col>Notice</Col>
              <Col>Warning</Col>
              <Col>Critical</Col>
            </Row>
            {data.length > 0 &&
              Object.keys(counts).map((item, index) => (
                <Row className="cluster-table-row">
                  <>
                    <Col md={4} className="violation-table-text-left">
                      {item}
                    </Col>
                    <Col> {arrayReduce(Object.values(counts[item]))}</Col>
                    <Col>{counts[item]["low"]}</Col>
                    <Col>{counts[item]["medium"]}</Col>
                    <Col>{counts[item]["high"]}</Col>
                    <Col>{counts[item]["notice"]}</Col>
                    <Col>{counts[item]["warning"]}</Col>
                    <Col>{counts[item]["critical"]}</Col>
                  </>
                </Row>
              ))}
          </div>
        </SimpleBar>
      </div>
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

export default ClusterTable;
