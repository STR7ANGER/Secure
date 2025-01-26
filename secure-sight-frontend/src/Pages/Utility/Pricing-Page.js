import React from "react";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const PricingData = [
  
  {
    title: "Starter",
    caption: "Neque quis est",
    icon: "fas fa-cube",
    price: "19",
    isChild: [
      { id: "1", features: "Free Live Support" },
      { id: "2", features: "Unlimited User" },
      { id: "3", features: "No Time Tracking" },
      { id: "4", features: "Free Setup" },
    ],
  },
  {
    title: "Professional",
    caption: "Quis autem iure",
    icon: "fas fa-trophy",
    price: "29",
    isChild: [
      { id: "1", features: "Free Live Support" },
      { id: "2", features: "Unlimited User" },
      { id: "3", features: "No Time Tracking" },
      { id: "4", features: "Free Setup" },
    ],
  },
  {
    title: "Enterprise",
    caption: "Sed neque unde",
    icon: "fas fa-shield-alt",
    price: "39",
    isChild: [
      { id: "1", features: "Free Live Support" },
      { id: "2", features: "Unlimited User" },
      { id: "3", features: "No Time Tracking" },
      { id: "4", features: "Free Setup" },
    ],
  },
  {
    title: "Unlimited",
    caption: "Itque eam rerum",
    icon: "fas fa-headset",
    price: "49",
    isChild: [
      { id: "1", features: "Free Live Support" },
      { id: "2", features: "Unlimited User" },
      { id: "3", features: "No Time Tracking" },
      { id: "4", features: "Free Setup" },
    ],
  },
];

const Pricing = () => {
  document.title = "Pricing  | Upzet - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Utility" breadcrumbItem="Pricing" />



          <Row className="justify-content-center">
            <Col lg={5}>
              <div className="text-center mb-5">
                <h4>Choose your Pricing plan</h4>
                <p className="text-muted">
                  To achieve this, it would be necessary to have uniform
                  grammar, pronunciation and more common words If several
                  languages coalesce
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {PricingData.map((item, key) => (
              <Col xl={3} md={60} key={key}>
                <Card>
                  <CardBody className="p-4">
                    <div className="d-flex mb-1">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i className={item.icon + " font-size-20"}></i>
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="font-size-16">{item.title}</h5>
                        <p className="text-muted">{item.caption}</p>
                      </div>
                    </div>
                    <div className="py-4 border-bottom">
                      <div className="float-end plan-btn">
                        <Link
                          to="#"
                          className="btn btn-primary btn-sm waves-effect waves-light"
                        >
                          Sign up Now
                        </Link>
                      </div>
                      <h4>
                        <sup>
                          <small>$</small>
                        </sup>{" "}
                        {item.price}/ <span className="font-size-16">m</span>
                      </h4>
                    </div>
                    <div className="plan-features mt-4">
                      <h5 className="text-center font-size-15 mb-4">
                        Plan Features :
                      </h5>
                      {item.isChild.map((subitem, key) => (
                        <p key={key}>
                          <i className="mdi mdi-checkbox-marked-circle-outline font-size-16 align-middle text-primary me-2"></i>{" "}
                          {subitem.features}
                        </p>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Pricing;
