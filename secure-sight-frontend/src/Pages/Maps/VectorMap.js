import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardBody } from 'reactstrap';
// Import Vector Map
import Vector from './MapVector';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const VectorMaps = () => {
    document.title = "Vector Maps | Upzet - React Admin & Dashboard Template";

    return (
        <React.Fragment>

                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title="Maps" breadcrumbItem="Vector Maps" />

                        <Row>
                            <div className="col-12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>World Vector Map</CardTitle>
                                        <p className="card-title-dsec">Example of world vector maps.</p>
                                        <div id="world-map-markers" className="vector-map-height" style={{ height: "420px" }}>
                                            <Vector
                                                value="world_mill"
                                                width="500"
                                                color="rgb(212, 218, 221)"
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>USA Vector Map</CardTitle>
                                        <p className="card-title-dsec">Example of united states of ameria vector maps.</p>
                                        <div id="usa-vectormap" style={{ height: "420px" }}>
                                            <Vector
                                                value="us_aea"
                                                width="500"
                                                color="#0bb197"
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>India Vector Map</CardTitle>
                                        <p className="card-title-dsec">Example of india vector maps.</p>
                                        <div id="india-vectormap" style={{ height: "420px" }}>
                                            <Vector
                                                value="in_mill"
                                                width="500"
                                                color="#0bb197"
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>


                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Australia Vector Map</CardTitle>
                                        <p className="card-title-dsec">Example of australia vector maps.</p>
                                        <div id="australia-vectormap" style={{ height: "420px" }}>
                                            <Vector
                                                value="au_mill"
                                                width="500"
                                                color="#0bb197"
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>


                            <Col lg={6}>

                                <Card>
                                    <CardBody>
                                        <CardTitle>Canada Vector Map</CardTitle>
                                        <p className="card-title-dsec">Example canada of vector maps.</p>
                                        <div id="canada-vectormap" style={{ height: "420px" }}>
                                            <Vector
                                                value="ca_lcc"
                                                width="500"
                                                color="#0bb197"
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

        </React.Fragment>
    );
}

export default VectorMaps;