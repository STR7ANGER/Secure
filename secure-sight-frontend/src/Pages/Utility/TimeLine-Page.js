import React, { useState } from "react";
import Slider from "react-slick";

import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import "./TimeLine.css";

const AsNavFor = () => {
  document.title = "Time Line  | Upzet - React Admin & Dashboard Template";

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Utility" breadcrumbItem="Time Line" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle>Horizontal Timeline</CardTitle>
                  <div dir="ltr">
                    <Row>
                      <Col lg={{ offset: 1, size: 8 }}>
                        <Row className="justify-content-center">
                          <Col lg={{ offset: 1, size: 9 }}>
                            <Slider
                              asNavFor={nav2}
                              ref={(slider1) => setNav1(slider1)}
                              className="slick-slider slider-for hori-timeline-desc"
                            >
                              <div className="slick-slider slider-for hori-timeline-desc">
                                <div>
                                  <h5 className="text-primary">2013 - 14</h5>
                                  <p>UI / UX Designer of xyz Company</p>

                                  <p>
                                    " To achieve this, it would be necessary to
                                    have uniform grammar, pronunciation and more
                                    common words. If several languages coalesce,
                                    the grammar of the resulting language of the
                                    individual languages. "
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <h5 className="text-primary">2014 - 16</h5>
                                  <p>Frontend Developer of abc Company</p>

                                  <p>
                                    " If several languages coalesce, the grammar
                                    of the resulting language is more simple and
                                    regular than that of the individual
                                    languages. The new common language will than
                                    the existing European languages. "
                                  </p>
                                </div>
                              </div>

                              <div>
                                <div>
                                  {" "}
                                  <h5 className="text-primary">2016 - 18</h5>
                                  <p>Backend Developer of xyz Company</p>
                                  <p>
                                    " The new common language will be more
                                    simple and regular than the existing
                                    European languages. It will be as simple as
                                    in fact, it will be Occidental. To an
                                    English person, it will seem like simplified
                                    "
                                  </p>
                                </div>
                              </div>

                              <div>
                                <div>
                                  <h5 className="text-primary">2018 - 19</h5>
                                  <p>Full stack Developer of abc Company</p>

                                  <p>
                                    " Their separate existence is a myth. For
                                    science, music, sport, etc, Europe uses the
                                    same vocabulary. The languages only differ
                                    in their grammar, their pronunciation and
                                    their most common words. "
                                  </p>
                                </div>
                              </div>
                            </Slider>
                          </Col>
                        </Row>
                        <Slider
                          asNavFor={nav1}
                          ref={(slider2) => setNav2(slider2)}
                          slidesToShow={3}
                          swipeToSlide={true}
                          focusOnSelect={true}
                          centerMode={true}
                          className="slick-slider slider-nav hori-timeline-nav"
                        >
                          <div className="slick-slider slider-nav hori-timeline-nav">
                            <div className="slider-nav-item py-2">
                              <h5 className="mb-1">2013 - 14</h5>
                              <p className="mb-0 d-none d-sm-block font-size-13">
                                UI / UX Designer
                              </p>
                            </div>
                          </div>
                          <div className="slick-slider slider-nav hori-timeline-nav">
                            <div className="slider-nav-item py-2">
                              <h5>2014 - 16</h5>
                              <p className="mb-0 d-none d-sm-block font-size-13">
                                Frontend Developer
                              </p>
                            </div>
                          </div>
                          <div className="slick-slider slider-nav hori-timeline-nav">
                            <div className="slider-nav-item py-2">
                              <h5>2016 - 18</h5>
                              <p className="mb-0 d-none d-sm-block font-size-13">
                                Backend Developer
                              </p>
                            </div>
                          </div>
                          <div className="slick-slider slider-nav hori-timeline-nav">
                            <div className="slider-nav-item py-2">
                              <h5>2018 - 19</h5>
                              <p className="mb-0 d-none d-sm-block font-size-13">
                                Full stack Developer
                              </p>
                            </div>
                          </div>
                        </Slider>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-5">Vertical Timeline</h4>

                  <ul className="verti-timeline list-unstyled">
                    <li className="event-list">
                      <div>
                        <p className="text-primary">07 Nov</p>
                        <h5>Ordered</h5>
                        <p className="text-muted">
                          New common language will be more simple and regular
                          than the existing.
                        </p>
                      </div>
                    </li>
                    <li className="event-list">
                      <div>
                        <p className="text-primary">09 Nov</p>
                        <h5>Packed</h5>
                        <p className="text-muted">
                          To achieve this, it would be necessary to have uniform
                          grammar.
                        </p>
                      </div>
                    </li>
                    <li className="event-list">
                      <div>
                        <p className="text-primary">10 Nov</p>
                        <h5>Shipped</h5>
                        <p className="text-muted">
                          It will be as simple as Occidental in fact, it will be
                          Occidental.
                        </p>
                      </div>
                    </li>
                    <li className="event-list">
                      <div>
                        <p className="text-primary">11 Nov</p>
                        <h5>Delivered</h5>
                        <p className="text-muted">
                          To an English person, it will seem like simplified
                          English.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AsNavFor;
