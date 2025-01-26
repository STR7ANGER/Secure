import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import {
  arrayReduce,
  flattenObj,
  formatCapilize,
  getFields,
  sortObject,
  uniqs,
} from "../ulit/commonFunction";
import { Divider } from "@mui/material";
import "./table.css";
const DashboardTableCluster = ({ data }) => {
  
  const [column, setColumn] = useState(data?.column);
  const modifiedData = data?.data.map((obj) => {
    const newObj = {};
    column.forEach((key) => {
      const keyParts = key.split(".");
      let value = obj;
      keyParts.forEach((part) => {
        value = value[part];
      });
      newObj[key] = value;
    });
    return newObj;
  });  
  const counts = {};

  modifiedData.forEach((obj) => {
    if (!counts[obj[column[0]]]) {
      counts[obj[column[0]]] = {
        low: 0,
        medium: 0,
        high: 0,
        warning: 0,
        notice: 0,
        critical: 0,
      };
    }

    counts[obj[column[0]]][obj[column[2]]]++;
  });
  return (
    <React.Fragment>
      <div>
        <div className="scroll-item-horizontal" style={{ overflowX: "scroll" }}>
          <Row className="cluster-table-row">
            <Col md={4}>Cluster Name</Col>
            <Col>No Of Images</Col>
            <Col>Low</Col>
            <Col>Medium</Col>
            <Col>High</Col>
            <Col>Notice</Col>
            <Col>Warning</Col>
            <Col>Critical</Col>
          </Row>
          {Object.keys(counts).map((item, index) => (
            <Row className="cluster-table-row">
              <>
                <Col md={4} className="violation-table-text-left">
                  {item}
                </Col>
                <Col> {arrayReduce(Object.values(counts[item]))}</Col>
                <Col>{counts[item]["low"]}</Col>
                <Col>{counts[item]["medium"]}</Col>
                <Col>{counts[item]["high"]}</Col>
                <Col>{counts[item]["notice"]}</Col>
                <Col>{counts[item]["warning"]}</Col>
                <Col>{counts[item]["critical"]}</Col>
              </>
            </Row>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardTableCluster;
