import React from "react";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { arrayReduce, capitalizedArray } from "../../../ulit/commonFunction";
import ApiServices from "../../../../Network_call/apiservices";
import ApiEndPoints from "../../../../Network_call/ApiEndPoints";
import { Col, Row } from "reactstrap";
import { Backdrop, CircularProgress } from "@mui/material";
import { ChartHeader } from "../../../../components/Common/Breadcrumb";
import "../../index.css";

const BarChart = ({ title, url, columns }) => {
  const [chartData, setChartData] = React.useState({});
  const [rawData, setRawData] = React.useState({});
  const [menuItem, setMenuItem] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    getChecksData();
  }, []);
  React.useEffect(() => {
    getChecksData();
  }, [time]);

  const dateNow = new Date();
  const lessTime = new Date(dateNow.getTime() - time)
    .toISOString()
    .slice(0, -1);

  const getChecksData = async () => {
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

    // toast(response.msg, { autoClose: 2000 });
  };

  useEffect(() => {
    const countByRiskLevel = {};
    data.length > 0 &&
      data?.forEach((d) => {
        const riskLevel = d[columns[1]]
          ? d.Risk_level.toLowerCase()
          : d.Risk_level;
        const provider = d[columns[0]];
        if (!countByRiskLevel[provider]) {
          countByRiskLevel[provider] = {
            critical: 0,
            very_high: 0,
            high: 0,
            medium: 0,
            low: 0,
          };
        }
        countByRiskLevel[provider][riskLevel]++;
      });
    setRawData(countByRiskLevel);
    setMenuItem(Object.keys(countByRiskLevel));
  }, [data]);
  useEffect(() => {
    setChartContent();
  }, [menuItem]);
  const setChartContent = () => {
    setChartData({
      labels: capitalizedArray(Object.keys(rawData)),
      datasets: [
        {
          label: "Critical",
          data: Object.values(rawData).map((d) => d.critical),
          backgroundColor: "#A9343A",
          borderColor: "#A9343A",
          borderWidth: 1,
        },
        {
          label: "Very High",
          data: Object.values(rawData).map((d) => d.very_high),
          backgroundColor: "#D24625",
          borderColor: "#D24625",
          borderWidth: 1,
        },
        {
          label: "High",
          data: Object.values(rawData).map((d) => d.high),
          backgroundColor: "#F9A11B",
          borderColor: "#F9A11B",

          borderWidth: 1,
        },
        {
          label: "Medium",
          data: Object.values(rawData).map((d) => d.medium),
          backgroundColor: "#71974C",
          borderColor: "#71974C",
          borderWidth: 1,
        },
        {
          label: "Low",
          data: Object.values(rawData).map((d) => d.low),
          backgroundColor: "#00A0DE",
          borderColor: "#00A0DE",
          borderWidth: 1,
        },
      ],
    });
  };
  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "white",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "white",
          },
        },
      ],
    },

    legend: {
      display: false,
      labels: {
        display: true,
      },
    },
  };

  const handleChange = (e) => {
    setChartData({});
    const data = rawData[e.target.value.toLowerCase()];
    if (e.target.value === "") {
      setChartContent();
    } else {
      setChartData({
        labels: capitalizedArray(Object.keys(data)),
        datasets: [
          {
            label: e.target.value,
            data: Object.values(data),
            backgroundColor: [
              "#A9343A",
              "#D34726",
              "#F8A01A",
              "#71974C",
              "#00A0DE",
            ],
            show: true,
          },
        ],
      });
    }
  };

  //   ################################################  time Change   ####################################################

  const setTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <React.Fragment>
      <ChartHeader
        title={`${title} Providers`}
        reload={getChecksData}
        handleChange={setTimeChange}
      />
      <Row>
        {title === "All" && (
          <Col md={6}>
            <select
              className="form-select"
              id="autoSizingSelect"
              onChange={handleChange}
            >
              <option defaultValue value="">
                Group By{" "}
              </option>
              {menuItem &&
                menuItem.map((item) => <option value={item}>{item}</option>)}
            </select>
          </Col>
        )}
      </Row>
      <br />
      <Row>
        <Col md={2}>
          <h6 className="text-success"></h6>
        </Col>
        {chartData?.datasets?.map((item, index) => (
          <>
            {!item.show ? (
              <Col md={2}>
                <h6>{arrayReduce(item?.data)}</h6>
                <h6
                  className={`text-${
                    item.label === "Very High" ? "Very-High" : item.label
                  }`}
                >
                  {item.label}
                </h6>
              </Col>
            ) : (
              <>
                <Col md={2}>
                  <h6>{item?.data[0]}</h6>
                  <h6 className="text-Critical">Critical</h6>
                </Col>
                <Col md={2}>
                  <h6>{item?.data[1]}</h6>
                  <h6 className="text-Very-High">Very High</h6>
                </Col>
                <Col md={2}>
                  <h6>{item?.data[2]}</h6>
                  <h6 className="text-High">High</h6>
                </Col>
                <Col md={2}>
                  <h6>{item?.data[3]}</h6>
                  <h6 className="text-Medium">Medium</h6>
                </Col>
                <Col md={2}>
                  <h6>{item?.data[4]}</h6>
                  <h6 className="text-Low">Low</h6>
                </Col>
              </>
            )}
          </>
        ))}
      </Row>
      {data.length > 0 && (
        <Bar width={537} height={268} data={chartData} options={options} />
      )}
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

export default BarChart;
