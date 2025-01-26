import React from "react";

import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Backdrop, CircularProgress } from "@mui/material";
import ApiEndPoints from "../../../../Network_call/ApiEndPoints";
import ApiServices from "../../../../Network_call/apiservices";
import Breadcrumbs, {
  Breadcrumbsub,
} from "../../../../components/Common/Breadcrumb";
import MaterialTable from "../../../Tables/Table";
import { Columns, deepKeys } from "../../../ulit/commonFunction";

import { Refresh } from "@mui/icons-material";
import { timedata } from "../../../ulit/timeforGertData";
import MultipleSelect from "./selecttext";

const AzureInventoryReport = ({ url, column }) => {
  // document.title = "Report | trend micro unity";
  document.title = "Report | Secure Sight";
  const [openLoader, setOpenLoader] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [report, setReport] = React.useState({ title: "", url: "" });
  const [time, setTime] = React.useState(0);
  const [list, setList] = React.useState([]);
  const [filterVal, setFilterVal] = React.useState("");
  const [filterVal123, setFilterVal123] = React.useState([]);

  React.useEffect(() => {
    handleFilter(data);
  }, [filterVal123]);
  React.useEffect(() => {
    getInventoryData();
  }, [time, report]);

  const dateNow = new Date();
  const lessTime = new Date(dateNow.getTime() - time)
    .toISOString()
    .slice(0, -1);
  // const lessTimetoString = lessTime.toISOString().slice(0, -1);

  const getInventoryData = async () => {
    setOpenLoader(true);
    const payloadwithTime = {
      index: "azure-inventory",
      column: [],
      curruntTime: dateNow.toISOString(),
      lessTime: lessTime,
    };
    const payload = {
      index: "azure-inventory",
      column: [],
    };
    const response = await ApiServices(
      "post",
      time.length > 0 ? payloadwithTime : payload,
      ApiEndPoints.SearchData
    );

    setList([
      ...new Set(response && response.map((item) => item["Subscription ID"])),
    ]);
    setData(response);
    setOpenLoader(false);
    handleFilter(response);
  };
  const key = Array.from(deepKeys(data.length > 0 && data[0]));
  const columns = Columns(key);

  const handleFilter = (data) => {
    const newData =
      data &&
      data.filter(
        (x) =>
          !filterVal123.length ||
          filterVal123.indexOf(x["Subscription ID"]) > -1
      );
    setFilteredData(newData);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterVal123(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
      <Breadcrumbs title="Report" breadcrumbItem="Azure Inventory" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              {/* <Breadcrumbsub
                    title="Azure Inventory"
                    breadcrumbItem={
                      <select
                        className="form-select m-1"
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
                    }
                  /> */}
            </CardHeader>
            <CardBody>
              <Breadcrumbsub
                title="Azure Inventory Report"
                breadcrumbItem={
                  <div className="d-flex">
                    <select
                      className="form-select m-1"
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
                    {/* <select
                      className="form-select m-1"
                      id="floatingSelectGrid"
                      aria-label="Floating label select example"
                      value={filterVal}
                      onChange={(e) => {
                        setFilterVal(e.target.value);
                      }}
                    >
                      <option value="">Select Subscription</option>
                      {list && list.map((i) => <option value={i}>{i}</option>)}
                    </select> */}
                    {list && (
                      <MultipleSelect
                        data={list}
                        handleChange={handleChange}
                        lable="Subscription"
                        value={filterVal123}
                      />
                    )}

                    <button
                      type="button"
                      className="btn btn-success  m-1"
                      onClick={getInventoryData}
                    >
                      <Refresh color="inherit" />
                    </button>
                  </div>
                }
              />

              {data.length > 0 && filteredData && (
                <MaterialTable
                  columns={columns}
                  data={filteredData}
                  title="Azure Inventory Report"
                />
              )}
              {data.length === 0 && <div>Data Not Found!</div>}
            </CardBody>
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

export default AzureInventoryReport;
