import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart1 = ({ value, total, lable }) => {
  const series = [((value / total) * 100).toFixed(1)];
  const radialoptions = {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors:
      lable === "Critical" || lable === "critical"
        ? ["#A9343A"]
        : lable === "VERY_HIGH" || lable === "very_high"
        ? ["#D34726"]
        : lable === "HIGH" || lable === "high"
        ? ["#F8A01A"]
        : lable === "MEDIUM" || lable === "medium"
        ? ["#71974C"]
        : lable === "LOW" || lable === "low"
        ? ["#00A0DE"]
        : ["#0ab39c"],

    stroke: {
      lineCap: "round",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
        },
        track: {
          margin: 0,
        },

        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 5,
            show: true,
          },
        },
      },
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={radialoptions}
        series={series}
        type="radialBar"
        height="72"
        width="72"
      />
    </React.Fragment>
  );
};

export default RadialChart1;
