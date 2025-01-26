import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import {
  arrayReduce,
  flattenObj,
  getFields,
  uniqs,
} from "../ulit/commonFunction";

const RadialChartData = {
  series: [44, 55, 67, 83],
};

const RadialChart = ({ data }) => {
  const [btnprimary1, setBtnprimary1] = useState(false);
  const [columns, setColumns] = useState(data.column);
  const flatData = data?.data.map((i) => flattenObj(i));
  const datafilter =
    columns && columns.map((item, index) => getFields(flatData, item));

  const singleColumnKeys = Object.keys(uniqs(datafilter));
  const singleColumnValues = Object.values(uniqs(datafilter));

  const DATA = datafilter.map((item) =>
    item.reduce(function (a, b) {
      return +a + +b;
    })
  );
  const label = columns.map((item) => item);

  const chartData = {
    labels: columns.length > 1 ? label : singleColumnKeys,
    datasets: [
      {
        data: columns.length > 1 ? DATA : singleColumnValues,
        backgroundColor: ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
        borderColor: ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
        hoverBackgroundColor: ["#34c38f", "#ff3d60", "#4aa3ff", "#212529"],
        hoverBorderColor: "#fff",
      },
    ],
  };
  const option = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return arrayReduce(
                columns.length > 1 ? DATA : singleColumnValues
              );
            },
          },
        },
      },

      labels: columns.length > 1 ? label : singleColumnKeys,
      colors: ["#556ee6", "#34c38f", "#f46a6a", "#f1b44c"],
    },
  };


  return (
    <React.Fragment>
      <ReactApexChart
        options={option}
        series={columns?.length > 1 ? DATA : singleColumnValues}
        type="radialBar"
        height="370"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default RadialChart;
