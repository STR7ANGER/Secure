import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { arrayReduce, capitalizedArray } from "../ulit/commonFunction";
import { Col, Row } from "reactstrap";

const BarChartWithGroup = ({ data }) => {
  const [chartData, setChartData] = useState({});
  const [rawData, setRawData] = useState({});
  const [menuItem, setMenuItem] = useState([]);

  const modifiedData = data?.data.map((obj) => {
    const newObj = {};
    data.column.forEach((key) => {
      const keyParts = key.split(".");
      let value = obj;
      keyParts.forEach((part) => {
        value = value[part];
      });
      newObj[key] = value;
    });
    return newObj;
  });
  useEffect(() => {
    const countByRiskLevel = {};
    modifiedData?.forEach((d) => {
      const riskLevel = d[data.column[1]]
        ? d[data.column[1]].toLowerCase()
        : d[data.column[1]];
      const provider = d[data.column[0]];
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
  }, []);
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
        labels: Object.keys(data),
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
  return (
    <>
      <Row>
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
                <h6 className="text-success">{item.label}</h6>
              </Col>
            ) : (
              <>
                <Col md={2}>
                  <h6>{item?.data[0]}</h6>
                  <h6 className="text-success">Critical</h6>
                </Col>
                <Col md={2}>
                  <h6>{item?.data[1]}</h6>
                  <h6 className="text-success">Very High</h6>
                </Col>
                <Col md={2}>
                  <h6>{item?.data[2]}</h6>
                  <h6 className="text-success">High</h6>
                </Col>
                <Col md={2}>
                  <h6>{item?.data[3]}</h6>
                  <h6 className="text-success">Medium</h6>
                </Col>
                <Col md={2}>
                  <h6>{item?.data[4]}</h6>
                  <h6 className="text-success">Low</h6>
                </Col>
              </>
            )}
          </>
        ))}
      </Row>
      {chartData.labels && (
        <Bar width={537} height={268} options={options} data={chartData} />
      )}
    </>
  );
};
export default BarChartWithGroup;
