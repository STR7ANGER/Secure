import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { capitalizedArray } from "../ulit/commonFunction";

const BarChartWithGroup = ({ data }) => {
  const [chartData, setChartData] = useState({});

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
          low: 0,
          medium: 0,
          high: 0,
          very_high: 0,
          critical: 0,
          unknown: 0,
        };
      }
      countByRiskLevel[provider][riskLevel]++;
    });

    setChartData({
      labels: capitalizedArray(Object.keys(countByRiskLevel)),
      datasets: [
        {
          label: "Low",
          data: Object.values(countByRiskLevel).map((d) => d.low),
          backgroundColor: "rgba(255, 0, 52, 1)",
          borderColor: "rgba(255, 0, 52, 1)",
          borderWidth: 1,
        },
        {
          label: "Medium",
          data: Object.values(countByRiskLevel).map((d) => d.medium),
          backgroundColor: "rgba(255, 206, 86, 1)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
        {
          label: "High",
          data: Object.values(countByRiskLevel).map((d) => d.high),
          backgroundColor: "rgba(0, 84, 48, 1)",
          borderColor: "rgba(0, 84, 48, 1)",

          borderWidth: 1,
        },
        {
          label: "Very High",
          data: Object.values(countByRiskLevel).map((d) => d.very_high),
          backgroundColor: "rgba(0, 217, 7, 1)",
          borderColor: "rgba(0, 217, 7, 1)",
          borderWidth: 1,
        },
        {
          label: "Critical",
          data: Object.values(countByRiskLevel).map((d) => d.critical),
          backgroundColor: "rgba(0, 217, 7, 1)",
          borderColor: "rgba(0, 217, 7, 1)",
          borderWidth: 1,
        },
        {
          label: "Unknown",
          data: Object.values(countByRiskLevel).map((d) => d.unknown),
          backgroundColor: "rgba(0, 217, 7, 1)",
          borderColor: "rgba(0, 217, 7, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  return (
    <>
      <Bar width={537} height={268} data={chartData} />
    </>
  );
};
export default BarChartWithGroup;
