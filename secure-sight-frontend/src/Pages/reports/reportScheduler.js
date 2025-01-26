import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Input } from "reactstrap";
import Breadcrumbs, { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import ApiServices from "../../Network_call/apiservices";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { objectkey } from "../ulit/commonFunction"; 

const ReportSchedule = () => {
  // document.title = "scheduler | trend micro unity";
  document.title = "scheduler | Secure Sight";
  const [openLoader, setOpenLoader] = React.useState(false);
  const [reportList, setReportList] = useState([]);
  const [emailSchedulerData, setEmailSchedulerData] = useState({
    email: "",
    subject: "",
    title: "",
  });
  const [schedulerData, setSchedulerData] = React.useState({
    reportId: "",
    repeat: "",
    minute: "",
    hour: "",
    weekDay: "",
    monthDay: "",
  });
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

    const userReport = localStorage.getItem("report");
    var userReportData = userReport ? JSON.parse(userReport) : [];
    setReportList(userReportData);
  }, []);

  // ############################################ scheduler repeat  ########################################

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    emailSchedulerData[name] = value;
  };

  const handelChange = ({ event, name }) => {
    setSchedulerData((prev) => ({
      ...prev,
      [name]: event,
    }));
  }; 
  // ############################################ scheduler repeat  ########################################
  const RunEmailScheduler = async () => {
    setOpenLoader(true);
    let payload = {
      emailData: {
        to: emailSchedulerData.email,
        subject: emailSchedulerData.subject,
        text: "reportDaily",
        html: emailSchedulerData.title,
      },
      schedulingTime: {
        minutes: schedulerData.minute,
        hours: schedulerData.hour,
        days: schedulerData.monthDay,
        months: 0,
        dayOfWeek:
          schedulerData.repeat === "weekly" ? schedulerData.weekDay : 0,
        isSpecificDateAndTime: false,
      },
      dbName: userData.dbName,
      userId: userData.user_id,
      reportIds: [schedulerData.reportId],
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.EmailScheduler
    );
    setEmailSchedulerData({ email: "", subject: "", title: "" });
    setSchedulerData(() => ({
      reportId: "",
      repeat: "",
      minute: "",
      hour: "",
      weekDay: "",
      monthDay: "",
    }));
    setOpenLoader(false);
    toast(response.msg, { autoClose: 2000 });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer />
        <Breadcrumbs title="Report" breadcrumbItem="Schedule" />
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <form action="javascript:void(0)">
                  <Row>
                    <Col md={6}>
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="floatingSelectGrid"
                          aria-label="Floating label select example"
                          onChange={(e) => {
                            handelChange({
                              event: e.target.value,
                              name: "reportId",
                            });
                          }}
                        >
                          <option value="">Select Report</option>
                          {reportList &&
                            reportList.map((item, index) => (
                              <option value={item._id}>
                                {item.reportName}
                              </option>
                            ))}
                        </select>
                        <label htmlFor="floatingSelectGrid">
                          Select Report
                        </label>
                      </div>
                    </Col>

                    <SelectOption
                      data={shedulerRepeat}
                      name="repeat"
                      handelChange={handelChange}
                    />

                    {schedulerData.repeat === "monthly" ? (
                      <SelectOption
                        data={monthData}
                        name="monthDay"
                        handelChange={handelChange}
                      />
                    ) : null}
                    {schedulerData.repeat === "weekly" && (
                      <SelectOption
                        data={weekData}
                        name="weekDay"
                        handelChange={handelChange}
                      />
                    )}
                    {schedulerData.repeat !== "minute" && (
                      <SelectOption
                        data={hourData}
                        name="hour"
                        handelChange={handelChange}
                      />
                    )}

                    <SelectOption
                      data={minuteData}
                      name="minute"
                      handelChange={handelChange}
                    />
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {objectkey(emailSchedulerData).length > 0 && (
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Row>
                    {emailSchedulerData &&
                      objectkey(emailSchedulerData).map((i, u) => (
                        <Col md={6}>
                          <div className="form-floating mb-3 fullwidth">
                            <input
                              name={i}
                              className="form-control"
                              id="floatingFirstnameInput"
                              placeholder="Enter Your First Name"
                              onChange={handleInputChange}
                            />
                            <label htmlFor="floatingFirstnameInput">{i} </label>
                          </div>
                        </Col>
                      ))}
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div>
                        <button
                          onClick={() => {
                            RunEmailScheduler();
                          }}
                          className="btn btn-primary w-md"
                        >
                          Report Schedule
                        </button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
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

export default ReportSchedule;

const SelectOption = ({ data, name, handelChange }) => {
  return (
    <React.Fragment>
      <Col md={6}>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="floatingSelectGrid"
            aria-label="Floating label select example"
            onChange={(e) => {
              handelChange({
                event: e.target.value,
                name: name,
              });
            }}
          >
            <option value="">Select {name}</option>
            {data.map((item, index) => (
              <>
                {name === "connector" ? (
                  <option value={item.id}>{item.display_name}</option>
                ) : name === "weekDay" ? (
                  <option value={item.value}>{item.name}</option>
                ) : (
                  <option value={item}>{item}</option>
                )}{" "}
              </>
            ))}
          </select>
          <label htmlFor="floatingSelectGrid">Select {name}</label>
        </div>
      </Col>
    </React.Fragment>
  );
};

const shedulerRepeat = ["monthly", "weekly", "daily", "hourly", "minute"];
const minuteData = [];
for (let i = 1; i <= 59; i++) {
  minuteData.push(i);
}
const monthData = [];
for (let i = 1; i <= 31; i++) {
  monthData.push(i);
}
const weekData = [
  { value: "0", name: "Sunday" },
  { value: "1", name: "Monday" },
  { value: "2", name: "Tuesday" },
  { value: "3", name: "Wednesday" },
  { value: "4", name: "Thursday" },
  { value: "5", name: "Friday" },
  { value: "6", name: "Saturday" },
];

const hourData = [];
for (let i = 1; i <= 23; i++) {
  hourData.push(i);
}
