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
  flattenObj,
  formatCapilize,
  getFields,
  sortObject,
  uniqs,
} from "../ulit/commonFunction";
import { Divider } from "@mui/material";

const DashboardTable = ({ data }) => {
  const dataFilter = data?.data.map((i) => flattenObj(i));

  const filter = data?.column.map((item, index) => getFields(dataFilter, item));

  const sortedData = sortObject(uniqs(filter));

  return (
    <React.Fragment>
      <Row>{/* <p>Top 10 violation</p> */}</Row>
      <Row className="border-bottom border-3   border-light p-1">
        <Col>
          <h5> {formatCapilize(data?.column[0])}</h5>
        </Col>
        <Col>
          <h5>Counts</h5>
        </Col>
      </Row>
      {sortedData.map((item, index) => (
        <div>
          {index <= 9 ? (
            <Row className="border-bottom border-3   border-light p-1 text-left">
              <Col className="violation-table-text-left" >
                {item[0]}
              </Col>

              <Col>{item[1]}</Col>
            </Row>
          ) : null}
        </div>
      ))}
    </React.Fragment>
  );
};

export default DashboardTable;
