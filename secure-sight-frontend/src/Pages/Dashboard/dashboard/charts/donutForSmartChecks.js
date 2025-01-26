import React, { useEffect } from "react";
import { Cell, Label, Legend, Pie, PieChart, Sector } from "recharts";
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

export default function DonutOfSmartChecks({ title, column, icon, data }) {
  const [activeIndex, setActiveIndex] = React.useState(null);
  // const [data, setData] = React.useState([]);
  const [newData, setNewData] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(false);
  const [menubtn, setmenubtn] = React.useState(false);
  const [legent, setLegend] = React.useState(false);

  useEffect(() => {
    data &&
      column &&
      setNewData(
        Object.entries(data && data?.findings[column]?.total).map(
          ([name, value]) => ({
            name,
            value,
          })
        )
      );
  }, [data, column]);

  const onPieEnter = React.useCallback((_, index) => {
    setActiveIndex(index);
  }, []);
  const onPieEnd = React.useCallback((_, index) => {
    setActiveIndex(null);
  }, []);

  const pieColors = [
    "rgb(197, 22, 22)",
    "rgb(255, 181, 128)",
    "rgb(239, 139, 67)",
    "rgb(231, 116, 116)",
  ];
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
      {title === "Malware" && (
        <>
          <DoDisturbAlt
            fontSize="200px"
            color="red"
            sx={{ fontSize: "200px", marginLeft: "30px" }}
          />
          <Typography variant="h6" textAlign="center">
            Malware disabled
          </Typography>
        </>
      )}
      {newData.length > 0 && column && (
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
              onMouseLeave={onPieEnd}
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
              {/* <Label value={<CustomIcon />} position="center" /> */}
              {activeIndex == null ? (
                <>
                  <Label
                    value={`${newData[3]?.value} High`}
                    position="centerBottom"
                    fontSize={20}
                    fontFamily="sans-serif"
                    color="white"
                    fill="#fff"
                    className="label-top"
                  />
                  <Label
                    value={`${
                      newData.reduce((a, b) => a + b.value, 0) -
                      newData[3]?.value
                    } Other`}
                    position="centerTop"
                    fontSize={20}
                    fontFamily="sans-serif"
                    color="white"
                    fill="#fff"
                    className="font-size-13  "
                  />
                </>
              ) : (
                ""
              )}
            </Pie>
          }

          {legent && (
            <Legend align="center" verticalAlign="bottom" layout="horizontal" />
          )}
        </PieChart>
      )}
      {newData.length === 0 && column && (
        <>
          <CheckCircleOutline
            sx={{ color: "green", fontSize: "200px", marginLeft: "30px" }}
          />{" "}
          <Typography variant="h6" textAlign="center">
            No {}
            {title}
          </Typography>
        </>
      )}
      {newData.length > 0 && !legent && (
        <Typography variant="h6" textAlign="center">
          {newData && newData.reduce((a, b) => a + b.value, 0)} {}
          {title}
        </Typography>
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
}

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
        fontSize={20}
        textAnchor="middle"
        fill="white"
      >
        {payload.value}
      </text>
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill="white">
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

const CustomIcon = () => (
  <svg width="40" height="40">
    <path
      d="M16.7 0L6.7 10L0 3.3L3.3 0L6.7 3.3L16.7 0Z"
      fill="#00C49F"
      transform="translate(10 10)"
    />
  </svg>
);
