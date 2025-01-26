import React, { useEffect } from "react";
import { Cell, Label, Legend, Pie, PieChart, Sector, Tooltip } from "recharts";
import ApiServices from "../../../../Network_call/apiservices";
import ApiEndPoints from "../../../../Network_call/ApiEndPoints";

import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  CheckCircleOutline,
  CheckSharp,
  DoDisturbAlt,
  MoreVert,
} from "@mui/icons-material";
import { Dropdown, DropdownItem, DropdownMenu } from "reactstrap";
import { formatCapilize } from "../../../ulit/commonFunction";

export default function ScanCompletion({ title, icon, data }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [openLoader, setOpenLoader] = React.useState(false);
  const [menubtn, setmenubtn] = React.useState(false);
  const [legent, setLegend] = React.useState(false);
  const [newData, setNewData] = React.useState([]);
  const sum = data && Object.values(data).reduce((a, b) => a + b, 0);
  useEffect(() => {
    data &&
      setNewData([
        { name: "Scaned", value: sum - data?.errors },
        { name: "Errors", value: data?.errors },
      ]);
  }, [data]);

  const onPieEnter = React.useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  const pieColors = [
    "green",
    "rgb(197, 22, 22)",
    "rgb(239, 139, 67)",
    "rgb(231, 116, 116)",
  ];
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-10}
          fontSize={25}
          textAnchor="middle"
          fill="white"
        >
          {((payload.value / sum) * 100).toFixed(0) + "%"}
        </text>
        <text
          x={cx}
          y={cy}
          dy={10}
          fontSize={17}
          textAnchor="middle"
          fill="white"
        >
          {formatCapilize(payload.name)}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };
  return (
    <React.Fragment>
      <Grid container direction="row" justifyContent="space-between">
        <Grid container width="80%" direction="row">
          <Avatar>{icon}</Avatar>
          <Typography paddingLeft="20px" paddingTop="5px">
            {title}
          </Typography>
        </Grid>
        <Grid>
          <Dropdown isOpen={menubtn} toggle={() => setmenubtn(!menubtn)}>
            {newData.length > 0 && (
              <IconButton
                onClick={() => {
                  setmenubtn(true);
                }}
                color="white"
                sx={{ color: "white" }}
              >
                <MoreVert color="white" />
              </IconButton>
            )}
            <DropdownMenu>
              {legent ? (
                <DropdownItem
                  onClick={() => {
                    setLegend(false);
                  }}
                >
                  Hide Legend
                </DropdownItem>
              ) : (
                <DropdownItem
                  onClick={() => {
                    setLegend(true);
                  }}
                >
                  Show Legend
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </Grid>
      </Grid>{" "}
      {newData.length > 0 && (
        <PieChart width={280} height={200}>
          {
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={newData}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={65}
              outerRadius={85}
              dataKey="value"
              onMouseEnter={onPieEnter}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {newData.length > 0 &&
                newData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
            </Pie>
          }

          {legent && (
            <Legend align="center" verticalAlign="bottom" layout="horizontal" />
          )}
        </PieChart>
      )}
      <Typography variant="h6" textAlign="center">
        {data?.errors > 0
          ? "Completed with errors"
          : "Completed with No errors"}
      </Typography>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={() => setOpenLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
