import { MoreVert } from "@mui/icons-material";
import { number, object } from "prop-types";
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
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
import { flattenObj, getFields, uniqs, uniqsarr } from "../ulit/commonFunction";

const BarChart = ({ data }) => {
  const [columns, setColumns] = useState(data?.column);

  const dataFilter = data?.data.map((i) => flattenObj(i));

  const filter = data?.column.map((item, index) => getFields(dataFilter, item));
  const singleColumnKeys = Object.keys(uniqs(filter));
  const singleColumnValues = Object.values(uniqs(filter));
  const label = columns && columns.map((item) => item);

  var newCol = columns.map((item, index) => ({
    label: item,
    data: columns.length > 1 ? filter[index] : singleColumnValues,
    fill: true,
    backgroundColor: [
      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",
      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",
      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",
      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",

      "#0db4d6",
      "#f1b44c",
      "#fb4d53",
    ],
    pointRadius: 2,
    color: "#17202A",
  }));
  const chartData = {
    labels: columns.length > 1 ? filter[0] : singleColumnKeys,
    datasets: newCol,
  };
  // const chartData = {
  //   labels: columns.length > 1 ? label : singleColumnKeys,
  //   datasets: [
  //     {
  //       data: columns.length > 1 ? filter[index] : singleColumnValues,
  //       backgroundColor: ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
  //       borderColor: ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
  //       hoverBackgroundColor: ["#34c38f", "#ff3d60", "#4aa3ff", "#212529"],
  //       hoverBorderColor: "#fff",
  //     },
  //   ],
  // };

  const option = {
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
        // display: false,
      },
    },

    responsive: true,
    maintainAspectRatio: true,
    // scales: {
    //   dataset: [
    //     {
    //       display: false,
    //       gridLines: {
    //         drawBorder: false,
    //         offset: true,
    //       },
    //       ticks: {
    //         fontColor: "#686868",
    //       },
    //     },
    //   ],
    //   dataset1: [
    //     {
    //       barPercentage: 0.7,
    //       categoryPercentage: 0.5,

    //       ticks: {
    //         fontColor: "#7b919e",
    //       },
    //       gridLines: {
    //         display: false,
    //         drawBorder: false,
    //       },
    //       elements: {
    //         point: {
    //           radius: 0,
    //         },
    //       },
    //     },
    //   ],
    // },
  };

  // const singleColumnKeys = Object.keys(uniqs(data?.data));
  // const singleColumnValues = Object.values(uniqs(data?.data));

  // const DATA = data?.data.map((item) =>
  //   item.reduce(function (a, b) {
  //     return +a + +b;
  //   })
  // );
  // const label = columns.map((item) => item);

  // const chartData = {
  //   labels: columns.length > 1 ? label : singleColumnKeys,
  //   datasets: [
  //     {
  //       data: columns.length > 1 ? DATA : singleColumnValues,
  //       backgroundColor: ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
  //       borderColor: ["#0db4d6", "#f1b44c", "#fb4d53", "#343a40"],
  //       hoverBackgroundColor: ["#34c38f", "#ff3d60", "#4aa3ff", "#212529"],
  //       hoverBorderColor: "#fff",
  //     },
  //   ],
  // };
  // const option = {
  //   responsive: true,
  //   cutoutPercentage: 70,
  //   animation: {
  //     animateScale: true,
  //     animateRotate: true,
  //   },
  // };

  return (
    <React.Fragment>
      <Bar width={537} height={268} options={option} data={chartData} />
    </React.Fragment>
  );
};

export default BarChart;
