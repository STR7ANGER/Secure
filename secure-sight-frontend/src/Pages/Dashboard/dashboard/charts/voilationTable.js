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
import {
  arrayReduce,
  sortObject,
  uniqs,
  uniqsarr,
} from "../../../ulit/commonFunction";
import { Backdrop, CircularProgress } from "@mui/material";

const VoilationTable = ({ title, column, url }) => {
  const [data, setData] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    getTableData();
  }, []);

  React.useEffect(() => {
    getTableData();
  }, [time]);

  //   ################################################  get data   ####################################################

  const dateNow = new Date();
  const lessTime = new Date(dateNow.getTime() - time)
    .toISOString()
    .slice(0, -1);

  const getTableData = async () => {
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

  //   ################################################  filter data   ####################################################

  const dataFilter = data.length > 0 && data.map((i) => i[column]);

  const sortedData = sortObject(uniqsarr(dataFilter));

  //   ################################################  time Change   ####################################################

  const setTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <React.Fragment>
      <ChartHeader
        title={title}
        reload={getTableData}
        handleChange={setTimeChange}
      />

      <Row className="border-bottom border-3 border-light p-1">
        <Col>{column}</Col>
        <Col>Counts</Col>
      </Row>

      {sortedData.map((item, index) => (
        <div>
          {index <= 9 ? (
            <Row className="border-bottom border-3   border-light p-1 text-left">
              <Col className="violation-table-text-left">{item[0]}</Col>
              <Col>{item[1]}</Col>
            </Row>
          ) : null}
        </div>
      ))}
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

export default VoilationTable;
