import React from 'react';

import img1 from '../../assets/images/logo-dark.png'
import img2 from '../../assets/images/logo-light.png'

import { Container, Row, Col, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';




const Maintenance = () => {
    document.title = "Maintenance  | Upzet - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="py-5">
            
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6} md={8} xl={5}>
                            <div className="text-center mt-sm-5 mb-4">
                                <Link to="/" className="">
                                    <img src={img1} alt="" height="24" className="auth-logo logo-dark mx-auto" />
                                    <img src={img2} alt="" height="24" className="auth-logo logo-light mx-auto" />
                                </Link>
                                <p className="mt-3">Responsive Bootstrap 5 Admin Dashboard</p>

                                <div className="mt-5">
                                    <div className="mb-4">
                                        <i className="ri-tools-fill display-3"></i>
                                    </div>
                                    <h4>Site is Under Maintenance</h4>
                                    <p>Please check back in sometime</p>

                                    <div className="mt-4 pt-2">
                                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                                    </div>

                                </div>
                            </div>

                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={4}>
                            <div className="text-center">
                                <CardBody>
                                    <div className="avatar-sm mx-auto mb-4">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-broadcast-line font-size-24"></i>
                                        </div>
                                    </div>
                                    <h5 className="font-size-15 text-uppercase">Why is the Site Down ?</h5>
                                    <p className="mb-0">There are many variations of passages of
                                        Lorem Ipsum available, but the majority have suffered alteration.</p>
                                </CardBody>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                <CardBody>
                                    <div className="avatar-sm mx-auto mb-4">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-time-line font-size-24"></i>
                                        </div>
                                    </div>
                                    <h5 className="font-size-15 text-uppercase">
                                        What is the Downtime ?</h5>
                                    <p className="mb-0">Contrary to popular belief, Lorem Ipsum is not
                                        simply random text. It has roots in a piece of classical.</p>
                                </CardBody>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                <CardBody>
                                    <div className="avatar-sm mx-auto mb-4">
                                        <div className="avatar-title rounded-circle">
                                            <i className="ri-mail-line font-size-24"></i>
                                        </div>
                                    </div>
                                    <h5 className="font-size-15 text-uppercase">
                                        Do you need Support ?</h5>
                                    <p className="mb-0">If you are going to use a passage of Lorem
                                        Ipsum, you need to be sure there isn't anything embar.. <Link
                                            to="mailto:no-reply@domain.com"
                                            className="text-decoration-underline">no-reply@domain.com</Link></p>
                                </CardBody>
                            </div>
                        </Col>
                    </Row>

                </Container>

            </div>
        </React.Fragment>
    )
}

export default Maintenance;
