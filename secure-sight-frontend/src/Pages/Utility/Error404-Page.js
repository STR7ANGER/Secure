import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


const Error404 = () => {
    document.title = "Error-404  | Upzet - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="my-5 pt-5">
                <div className="w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <div className="text-center">
                                    <div>
                                        <h1 className="display-2 error-text fw-bold">4<i className="ri-ghost-smile-fill align-bottom text-primary mx-1"></i>4</h1>
                                    </div>
                                    <div>
                                        <h4 className="text-uppercase mt-4">Sorry, page not found</h4>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                                        <div className="mt-4">
                                            <Link to="/" className="btn btn-primary">Back to Home<i className="ri-arrow-right-line align-bottom ms-2"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

        </React.Fragment>
    );
}

export default Error404;