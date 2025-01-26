import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";
import { timedata } from "../../Pages/ulit/timeforGertData";
import { Refresh } from "@mui/icons-material";

const Breadcrumbs = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4>
            <div className="page-title-right">
              <Breadcrumb listClassName="m-0">
                <BreadcrumbItem>
                  <Link to="#">{props.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <Link to="#">{props.breadcrumbItem}</Link>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export const Breadcrumbsub = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-0 pb-0 font-size-18">{props.title}</h4>
            <div className="page-title-right">
              <Breadcrumb listClassName="m-0">
                {/* <BreadcrumbItem>
                  <div>{props.}</div>
                </BreadcrumbItem> */}
                <BreadcrumbItem active>
                  <div>{props.breadcrumbItem}</div>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export const ChartHeader = ({ handleChange, reload, title }) => {
  return (
    <React.Fragment>
      <Breadcrumbsub
        title={title}
        breadcrumbItem={
          <>
            <div className="d-flex">
              <button type="button" className="btn" onClick={reload}>
                <Refresh color="inherit" />
              </button>
              <select
                className="form-select"
                id="floatingSelectGrid"
                aria-label="Floating label select example"
                size="small"
                onChange={handleChange}
              >
                <option value="">Select Time</option>
                {timedata &&
                  timedata.map((i) => (
                    <option value={i.value}>{i.lable}</option>
                  ))}
              </select>
            </div>{" "}
          </>
        }
      />
    </React.Fragment>
  );
};
export default Breadcrumbs;
