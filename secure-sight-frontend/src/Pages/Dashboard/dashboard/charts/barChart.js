import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Breadcrumbsub,
  ChartHeader,
} from "../../../../components/Common/Breadcrumb";
import ApiServices from "../../../../Network_call/apiservices";
import ApiEndPoints from "../../../../Network_call/ApiEndPoints";
import { Backdrop, CircularProgress } from "@mui/material";
import { flattenObj, getFields, uniqs } from "../../../ulit/commonFunction";
import { capitalizedArray } from "../../../ulit/commonFunction";

const option = {
  responsive: true,
  maintainAspectRatio: true,
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

    dataset: [
      {
        display: false,
        gridLines: {
          drawBorder: false,
          offset: true,
        },
        ticks: {
          fontColor: "#686868",
        },
      },
    ],
    dataset1: [
      {
        barPercentage: 0.7,
        categoryPercentage: 0.5,

        ticks: {
          fontColor: "#7b919e",
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        elements: {
          point: {
            radius: 0,
          },
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

const BarChart = ({ url, title, columns }) => {
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

  //   ################################################  time Change   ####################################################

  const setTimeChange = (event) => {
    setTime(event.target.value);
  };
  //   ################################################  time Change   ####################################################
  const dataFilter = data.length > 0 && data.map((i) => flattenObj(i));

  const filter =
    columns && columns.map((item, index) => getFields(dataFilter, item));
  const singleColumnKeys = Object.keys(uniqs(filter));
  const singleColumnValues = Object.values(uniqs(filter));

  const chartData = {
    labels:
      columns.length > 1
        ? capitalizedArray(filter[0])
        : capitalizedArray(singleColumnKeys),
    datasets: columns.map((item, index) => ({
      label: item,
      data: columns.length > 1 ? filter[index] : singleColumnValues,
      fill: true,
      backgroundColor: [
        "#A9343A",
        "#D34726",
        "#F8A01A",
        "#71974C",
        "#00A0DE",
        "#0db4d6",
        "#f1b44c",
        "#fb4d53",
      ],
    })),
  };
  return (
    <React.Fragment>
      <ChartHeader
        title={title}
        reload={getChartData}
        handleChange={setTimeChange}
      />
      {data.length > 0 && (
        <Bar width={537} height={268} data={chartData} options={option} />
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
