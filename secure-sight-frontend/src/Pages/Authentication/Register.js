import React from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import ApiEndPoints from '../../Network_call/ApiEndPoints'
import PointDropBG from "../../components/point-drop-bg";
import { toast } from "react-toastify";
import withRouter from "../../components/Common/withRouter";

const Register = (props) => {
  document.title = "Sign Up | Upzet - React Admin & Dashboard Template";

  // Formik Validation
  const validation = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          ApiEndPoints.Register,
          values
        );
        toast('Registration is completed. Please try to login.', {
          autoClose: 2000
        })
        props.router.navigate('/')
        // Handle success (optional)
      } catch (e) {
        if (e.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          let res = e.response.data
          toast(res.data.message, {
            autoClose: 2000
          })
        } else if (e.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(e.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', e.message);
        }
      }
    },
  });

  return (
    <div>
      <PointDropBG />
      <div className="account-pages py-5">
        <Container className="h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col lg={6} md={8} xl={5}>
              <Card
                className="p-4 mb-0"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4 px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardBody
                  className="d-flex flex-column justify-content-center"
                  style={{ height: "100%" }}
                >
                  <h4
                    className="font-size-24 text-black text-start mt-0 mb-4"
                    style={{ fontWeight: "600" }}
                  >
                    Sign Up
                  </h4>
                  <Form
                    className="form-horizontal flex-grow-1"
                    onSubmit={validation.handleSubmit}
                  >
                    <div className="d-flex flex-column gap-4">
                      <div>
                        <Label className="form-label text-black">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="elevated-input"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email &&
                            validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email &&
                        validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div>
                        <Label className="form-label text-black">
                          Username
                        </Label>
                        <Input
                          className="elevated-input"
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username &&
                            validation.errors.username
                              ? true
                              : false
                          }
                        />
                        {validation.touched.username &&
                        validation.errors.username ? (
                          <FormFeedback type="invalid">
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div>
                        <Label className="form-label text-black">
                          Password
                        </Label>
                        <Input
                          className="elevated-input"
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="d-grid mt-4">
                        <button
                          className="btn btn-lg-submit"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted">
                          Already have an account?{" "}
                          <Link to="/login" className="text-[#27294F]">
                            Login
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col
              lg={6}
              className="text-center d-flex flex-column justify-content-center align-items-start"
              style={{ paddingLeft: "180px" }}
            >
              <h2
                style={{
                  color: "#f0f0f0",
                  fontWeight: "bold",
                  fontSize: "40px",
                  textAlign: "left",
                  marginBottom: "30px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Custom Reports for CloudOne/Deep Security <br /> All in One
              </h2>
              <h2
                style={{
                  color: "#f0f0f0",
                  fontWeight: "bold",
                  fontSize: "20px",
                  textAlign: "left",
                  marginBottom: "70px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Unlock insights with tailored reports for CloudOne and Deep
                Security. Streamline security and make informed decisions.
              </h2>
              {/* <div>
                <img
                  src="https://png.pngtree.com/thumb_back/fw800/background/20230928/pngtree-dark-background-showcasing-3d-safety-security-logo-and-ample-copy-space-image_13513928.png"
 alt="Logo"
                  className="auth-logo"
                  style={{
                    maxWidth: "90%",
                    height: "auto",
                  }}
                />
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default withRouter(Register);
