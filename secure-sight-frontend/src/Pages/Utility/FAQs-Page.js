import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FAQs = () => {
    document.title = "FAQs  | Upzet - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Utility" breadcrumbItem="FAQs" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <Row className="justify-content-center mt-3">
                                        <Col lg={8}>
                                            <Row>
                                                <Col lg={3}>
                                                    <div className="border p-3 text-center rounded mb-4">
                                                        <Link to="#">
                                                            <div className="my-3">
                                                                <i className="dripicons-question h2 text-primary"></i>
                                                            </div>
                                                            <h5 className="font-size-15 mb-3">
                                                                General Questions
                                                            </h5>
                                                        </Link>
                                                    </div>
                                                </Col>
                                                <Col lg={3}>
                                                    <div className="border p-3 text-center rounded mb-4">
                                                        <Link to="#">
                                                            <div className="my-3">
                                                                <i className="dripicons-tags h2 text-primary"></i>
                                                            </div>
                                                            <h5 className="font-size-15 mb-3">
                                                                Privacy Policy
                                                            </h5>
                                                        </Link>
                                                    </div>
                                                </Col>
                                                <Col lg={3}>
                                                    <div className="border p-3 text-center rounded mb-4">
                                                        <Link to="#">
                                                            <div className="my-3">
                                                                <i className="dripicons-help h2 text-primary"></i>
                                                            </div>
                                                            <h5 className="font-size-15 mb-3">
                                                                Help & Support
                                                            </h5>
                                                        </Link>
                                                    </div>
                                                </Col>
                                                <Col lg={3}>
                                                    <div className="border p-3 text-center rounded mb-4">
                                                        <Link to="#">
                                                            <div className="my-3">
                                                                <i className="dripicons-article h2 text-primary"></i>
                                                            </div>
                                                            <h5 className="font-size-15 mb-3">
                                                                Pricing & Plans
                                                            </h5>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-center mt-5">
                                        <Col lg={10}>
                                            <Row className="justify-content-center">
                                                <Col lg={5}>
                                                    <div className="faq-box d-flex mt-4">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    01
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="font-size-15">
                                                                What is Lorem Ipsum?
                                                            </h5>
                                                            <p className="text-muted">
                                                                New common language will be more simple and
                                                                regular than the existing European languages.
                                                                It will be as simple as occidental.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="faq-box d-flex mt-4">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    02
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="font-size-15">
                                                                Where does it come from?
                                                            </h5>
                                                            <p className="text-muted">
                                                                Everyone realizes why a new common language
                                                                would be desirable one could refuse to pay
                                                                expensive translators.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="faq-box d-flex mt-4">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    03
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="font-size-15">
                                                                Where can I get some?
                                                            </h5>
                                                            <p className="text-muted">
                                                                If several languages coalesce, the grammar of
                                                                the resulting language is more simple and
                                                                regular than that of the individual languages.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={5} className="offset-lg-1">
                                                    <div className="faq-box d-flex mt-4">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    04
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="font-size-15">Why do we use it?</h5>
                                                            <p className="text-muted">
                                                                Their separate existence is a myth. For
                                                                science, music, sport, etc, Europe uses the
                                                                same vocabulary.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="faq-box d-flex mt-4">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    05
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="font-size-15">
                                                                Where can I get some?
                                                            </h5>
                                                            <p className="text-muted">
                                                                To an English person, it will seem like
                                                                simplified English, as a skeptical Cambridge
                                                                friend of mine told me what Occidental
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="faq-box d-flex mt-4">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    06
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="font-size-15">
                                                                Where can I get some?
                                                            </h5>
                                                            <p className="text-muted">
                                                                If several languages coalesce, the grammar of
                                                                the resulting language is more simple and
                                                                regular than that of the individual languages.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-center">
                                        <Col lg={5}>
                                            <div className="text-center mt-5 mb-4">
                                                <h5>Can't find what you are looking for?</h5>
                                                <p className="text-muted mb-4">
                                                    To achieve this, it would be necessary to have
                                                    uniform grammar, pronunciation and more common words
                                                    if several languages coalesce
                                                </p>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger mt-1 waves-effect waves-light me-2"
                                                >
                                                    Email Us
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mt-1 waves-effect waves-light"
                                                >
                                                    Send us a tweet
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FAQs;
