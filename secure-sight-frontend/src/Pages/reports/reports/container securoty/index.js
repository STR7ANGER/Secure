import React from "react";

import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Backdrop, CircularProgress } from "@mui/material";
import ApiEndPoints from "../../../../Network_call/ApiEndPoints";
import ApiServices from "../../../../Network_call/apiservices";
import  {
  Breadcrumbsub,
} from "../../../../components/Common/Breadcrumb";
import MaterialTable from "../../../Tables/Table";
import { Columns, deepKeys } from "../../../ulit/commonFunction";

import { Refresh } from "@mui/icons-material";
import { timedata } from "../../../ulit/timeforGertData";

const ContainerSecurity = () => {
  // document.title = "Report | trend micro unity";
  document.title = "Report | Secure Sight";
  const [openLoader, setOpenLoader] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [report, setReport] = React.useState({ title: "", url: "" });
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    getChecksData();
  }, []);
  React.useEffect(() => {
    getChecksData();
  }, [time, report]);

  const dateNow = new Date();
  const lessTime = new Date(dateNow.getTime() - time)
    .toISOString()
    .slice(0, -1);
  // const lessTimetoString = lessTime.toISOString().slice(0, -1);

  const getChecksData = async () => {
    setOpenLoader(true);
    const payload = {
      curruntTime: dateNow.toISOString(),
      lessTime: lessTime,
    };
    const response = await ApiServices(
      "post",
      time > 0 ? payload : "",
      ApiEndPoints[report.url]
    );
    setData(response);
    setOpenLoader(false);
    // toast(response.msg, { autoClose: 2000 });
  };
  const key = Array.from(deepKeys(data.length > 0 && data[0]));
  const columns = Columns(key);

  const handleChange = (event) => {
    setReport({
      title: reportData.filter((item) => item.url === event.target.value)[0][
        "title"
      ],
      url: event.target.value,
    });
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
          {/* <Breadcrumbs title="Report" breadcrumbItem="Container Security" /> */}

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  {" "}
                  <Breadcrumbsub
                    title="Container Security"
                    breadcrumbItem={
                      <select
                        className="form-select"
                        id="floatingSelectGrid"
                        aria-label="Floating label select example"
                        onChange={handleChange}
                      >
                        <option value="">Select Report</option>
                        {reportData &&
                          reportData.map((item) => (
                            <option value={item.url}>{item.title}</option>
                          ))}
                      </select>
                    }
                  />
                </CardHeader>
                {report.title && (
                  <CardBody>
                    <Breadcrumbsub
                      title={report.title}
                      breadcrumbItem={
                        <div className="d-flex">
                          <select
                            className="form-select"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                            onChange={(e) => {
                              setTime(e.target.value);
                            }}
                          >
                            <option value="">Select Time</option>
                            {timedata &&
                              timedata.map((i) => (
                                <option value={i.value}>{i.lable}</option>
                              ))}
                          </select>
                          {/* <label htmlFor="floatingSelectGrid">Select Time</label> */}
                          <button
                            type="button"
                            className="btn btn-success  "
                            onClick={getChecksData}
                          >
                            <Refresh color="inherit" />
                          </button>
                        </div>
                      }
                    />
                    {data.length > 0 && (
                      <MaterialTable
                        columns={columns}
                        data={data}
                        title={report.title}
                      />
                    )}
                    {data.length === 0 && <div>Data Not Found!</div>}
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </div>
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

export default ContainerSecurity;
const reportData = [
  { title: "Evaluation", url: "ContainerEvaluation" },
  { title: "Runtime Sensor", url: "ContainerRuntimeSensor" },
  {
    title: "Runtime Vulnerabilities View",
    url: "ContainerRuntimeVulnerabilityView",
  },
  //   { title: "", url: "" },
  //   { title: "", url: "" },
];
