import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import RadialChart3 from "./userpanelChart3";
import ApiServices from "../../Network_call/apiservices";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import {
  allReplace,
  arrayReduce,
  formatCapilize,
  uniqsarr,
} from "../ulit/commonFunction";

const UserPanel = ({ url, columns }) => {
  const [data, setData] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    getChartData();
  }, []);

  React.useEffect(() => {
    getChartData();
  }, [time]);

  //   ################################################  get data   ####################################################

  const dateNow = new Date();
  const lessTime = new Date(dateNow.getTime() - time)
    .toISOString()
    .slice(0, -1);

  const getChartData = async () => {
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

  //   ################################################  modify data   ####################################################

  const sortArray = (array) => {
    const order = [
      "critical",
      "CRITICAL",
      "Critical",
      "high",
      "High",
      "HIGH",
      "medium",
      "Medium",
      "MEDIUM",
      "low",
      "Low",
      "LOW",
    ];
    return array.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  };
  const singleColumnKeys =
    data.length > 0 &&
    Object.keys(
      uniqsarr(sortArray(data.length > 0 && data.map((item) => item[columns])))
    );
  const singleColumnValues =
    data.length > 0 &&
    Object.values(
      uniqsarr(sortArray(data.length > 0 && data.map((item) => item[columns])))
    );

  return (
    <React.Fragment>
      <Row>
        {singleColumnKeys &&
          sortArray(singleColumnKeys).map((item, index) => (
            <Col xl={3} sm={6}>
              <Card>
                <CardBody>
                  <div className="d-flex text-muted">
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div id="radialchart-1" className="apex-charts" dir="ltr">
                        <RadialChart1
                          value={singleColumnValues[index]}
                          total={arrayReduce(singleColumnValues)}
                          lable={item}
                        />
                      </div>
                    </div>

                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">
                        {formatCapilize(allReplace(item, { _: " " }))}
                      </p>
                      <h5 className="mb-3">{singleColumnValues[index]}</h5>
                      <p className="text-truncate mb-0">
                        <span className="text-success me-2">
                          {" "}
                          Total :
                          {/* <i className="ri-arrow-right-up-line align-bottom ms-1"></i> */}
                        </span>{" "}
                        {arrayReduce(singleColumnValues)}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}

        {/* <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart2
                    id="radialchart-2"
                    className="apex-charts"
                    dir="ltr"
                  />
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Views per minute</p>
                  <h5 className="mb-3">50</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      1.7%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart3
                    id="radialchart-3"
                    className="apex-charts"
                    dir="ltr"
                  />
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Bounce Rate</p>
                  <h5 className="mb-3">24.03 %</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-danger me-2">
                      {" "}
                      0.01%{" "}
                      <i className="ri-arrow-right-down-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-group-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">New Visitors</p>
                  <h5 className="mb-3">435</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      0.01%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col> */}
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;
