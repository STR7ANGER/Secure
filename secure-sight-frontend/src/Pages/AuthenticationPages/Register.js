import React from 'react';

import logolight from '../../assets/images/logo-light.png';
import logodark from '../../assets/images/logo-dark.png';

import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const Register = () => {
    document.title = "Register | Upzet - React Admin & Dashboard Template";
    return (
        <React.Fragment>

            <div className="bg-pattern" style={{height:"100vh"}}>
                <div className="bg-overlay"></div>
                <div className="account-pages pt-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6} md={8} xl={4}>
                                <Card className='mt-5'>
                                    <CardBody className="p-4">
                                        <div className="text-center">
                                            <Link to="/" className="">
                                                <img src={logodark} alt="" height="24" className="auth-logo logo-dark mx-auto" />
                                                <img src={logolight} alt="" height="24" className="auth-logo logo-light mx-auto" />
                                            </Link>
                                        </div>

                                        <h4 className="font-size-18 text-muted text-center mt-2">Free Register</h4>
                                        <p className="text-muted text-center mb-4">Get your free Upzet account now.</p>
                                        <form className="form-horizontal" action="#">

                                            <Row>
                                                <Col md={12}>
                                                    <div className="mb-4">
                                                        <label className="form-label" htmlFor="username">Username</label>
                                                        <input type="text" className="form-control" id="username" placeholder="Enter username" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="form-label" htmlFor="useremail">Email</label>
                                                        <input type="email" className="form-control" id="useremail" placeholder="Enter email" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="form-label" htmlFor="userpassword">Password</label>
                                                        <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                    </div>
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="term-conditionCheck" />
                                                        <label className="form-check-label fw-normal" htmlFor="term-conditionCheck">I accept <Link to="#" className="text-primary">Terms and Conditions</Link></label>
                                                    </div>
                                                    <div className="d-grid mt-4">
                                                        <button className="btn btn-primary waves-effect waves-light" type="submit">Register</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </form>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p className="text-white-50">Already have an account ?<Link to="/auth-login" className="fw-medium text-primary"> Login </Link> </p>
                                    <p className="text-white-50">© {new Date().getFullYear()} Upzet. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesdesign</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;