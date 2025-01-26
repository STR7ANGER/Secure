
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

import { flattenObj, getFields, uniqs } from "../ulit/commonFunction";

const DonutChart = ({ data }) => {
  const [btnprimary1, setBtnprimary1] = useState(false);
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
    cutout: "50%",
    borderWidth: 0,
  }));
  const chartData = {
    labels: columns.length > 1 ? filter[0] : singleColumnKeys,
    datasets: newCol,
  };
  const option = {
    responsive: true,
    cutoutPercentage: 70,
    plugins: {
      legend: {
        labels: {
          fontColor: "red",
        },
        display: false,
      },
    },
  };

  return (
    <React.Fragment>
      <Pie width={537} height={268} data={chartData} options={option} />
    </React.Fragment>
  );
};

export default DonutChart;
