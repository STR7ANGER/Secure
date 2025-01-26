import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import { flattenObj, getFields, uniqs } from "../ulit/commonFunction";

const LineChart = ({ data }) => {
  const [btnprimary1, setBtnprimary1] = useState(false);
  const [columns, setColumns] = useState(data.column);
  // const flatData = data?.data.map((i) => flattenObj(i));
  // const datafilter =
  //   columns && columns.map((item, index) => getFields(flatData, item));

  const label = columns.map((item) => item);

  var newCol = columns.map((item, index) => ({
    label: item,
    data: data?.data[index],
    fill: true,
    backgroundColor:
      columns.length > 1
        ? ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"]
        : ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
    pointRadius: 2,
  }));

  const chartdata = { labels: label, datasets: newCol };
  var option = {
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
            max: 250,
            min: 0,
            stepSize: 50,
            zeroLineColor: "#7b919e",
            borderDash: [3, 3],
          },
        },
      ],
    },
  };
  return (
    <React.Fragment>
      <Line width={537} height={268} data={chartdata} options={option} />
    </React.Fragment>
  );
};

export default LineChart;
