import React, { useEffect } from "react";
import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { ChartHeader } from "../../../../components/Common/Breadcrumb";
import ApiServices from "../../../../Network_call/apiservices";
import ApiEndPoints from "../../../../Network_call/ApiEndPoints";
import {
  arrayReduce,
  sortObject,
  uniqs,
  uniqsarr,
} from "../../../ulit/commonFunction";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Bolt,
  CheckCircleOutline,
  CheckSharp,
  More,
  MoreHoriz,
  MoreVert,
} from "@mui/icons-material";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

export default function ContentFindings({ title, url, columns }) {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [newData, setNewData] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);
  const [menubtn, setmenubtn] = React.useState(false);
  const [legent, setLegend] = React.useState(false);

  React.useEffect(() => {
    getSmartChecksData();
  }, []);

  const getSmartChecksData = async () => {
    setOpenLoader(true);

    const payload = {
      index: url,
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.SearchData
    );

    setData(response);
    setOpenLoader(false);
  };

  useEffect(() => {
    const countByRiskLevel = {
      unknown: 0,
      low: 0,
      medium: 0,
      high: 0,
    };
    data.length > 0 &&
      data?.forEach((d) => {
        d?.vulnerabilities?.map((ff) => {
          countByRiskLevel[ff?.severity]++;
        });
      });
    setNewData(
      Object.entries(countByRiskLevel).map(([name, value]) => ({
        name,
        value,
      }))
    );
  }, [data]);

  return (
    <React.Fragment>
      <Grid container direction="row" justifyContent="space-between">
        <Grid container width="100%" direction="row">
          <Avatar>
            <Bolt />
          </Avatar>
          <Typography variant="h6" paddingLeft="20px" paddingTop="5px">
            {title}
          </Typography>
        </Grid>
        <Grid></Grid>
      </Grid>
      <CheckCircleOutline
        fontSize="200px"
        color="red"
        sx={{ color: "green", fontSize: "200px" }}
      />
      <h4>No content findings</h4>
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
