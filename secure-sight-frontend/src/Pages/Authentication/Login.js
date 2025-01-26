import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser  } from "../../store/actions";
import "react-toastify/dist/ReactToastify.css";
import PointDropBG from "../../components/point-drop-bg";

const Login = (props) => {
  document.title = "Login | Secure Sight";

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser (values, props.router.navigate));
    },
  });

  const { error } = useSelector((state) => ({
    error: state.login.error,
  }));

  useEffect(() => {
    document.body.className = "bg-pattern";
    return function cleanup() {
      document.body.className = "";
    };
  }, []);

  return (
    <React.Fragment>
      <PointDropBG />
      <div className="account-pages py-5">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col lg={6} className="text-center">
              <h2
                style={{
                  color: "#f0f0f0",
                  fontWeight: "bold",
                  fontSize: "52px",
                  textAlign: "left",
                  marginBottom: "30px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0. 6)",
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
                Unlock insights with tailored reports for CloudOne and Deep Security. Streamline security and make informed decisions.
              </h2>
              {/* <div className="text-center">
                <img
                  src="https://png.pngtree.com/thumb_back/fw800/background/20230928/pngtree-dark-background-showcasing-3d-safety-security-logo-and-ample-copy-space-image_13513928.png"
                  alt="Logo"
                  className="auth-logo mx-auto"
                  style={{
                    maxWidth: "90%",
                    height: "auto",
                  }}
                />
              </div> */}
            </Col>
            <Col lg={6} md={8} xl={5}>
              <div
                className="p-4"
                style={{
                  backgroundColor: "#f9f9f9", // A lighter gray instead of pure white
                  borderRadius: "10px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                  height: "auto",
                  padding: "40px",
                }}
              >
                <h1
                  className="mb-4"
                  style={{
                    color: "#333",
                    fontWeight: "700",
                    fontSize: "32px",
                    textAlign: "left",
                  }}
                >
                  Welcome Back
                </h1>
                <p
                  className="mb-5"
                  style={{
                    color: "#777",
                    fontSize: "16px",
                    textAlign: "left",
                  }}
                >
                  Log in to access your account
                </p>
                <CardBody style={{ paddingTop: "0" }}>
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    {error ? (
                      <div className="alert alert-danger">
                        <div>{error}</div>
                      </div>
                    ) : null}
                    <div className="d-flex flex-column gap-4">
                      <div>
                        <Label className="form-label" style={{ color: "#444" }}>
                          Email
                        </Label>
                        <Input
                          name="email"
                          className="elevated-input"
                          placeholder="Enter your email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.email}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div>
                        <Label className="form-label" style={{ color: "#444" }}>
                          Password
                        </Label>
                        <Input
                          className="elevated-input"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.password}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="d-flex flex-row justify-content-between">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customControlInline"
                            style={{ color: "#444" }}
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="text-md-end mt-3 mt-md-0">
                          <Link
                            to="/auth-recoverpw"
                            className="text-muted"
                            style={{
                              textDecoration: "underline",
                              color: "#27294F",
                            }}
                          >
                            Forgot your password?
                          </Link>
                        </div>
                      </div>
                      <div className="d-grid mt-4">
                        <button
                          className="btn btn-lg-submit"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                      <div className="mt-4 text-left">
                        <p style={{ color: "#777" }}>
                          Don't have an account?{" "}
                          <Link
                            to="/register"
                            className="fw-medium"
                            style={{ color: "#27294F" }}
                          >
                            Register
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  router: PropTypes.object.isRequired,
};
// import PropTypes from "prop-types";
// import React, { useEffect } from "react";
// import {
//   Row,
//   Col,
//   CardBody,
//   Container,
//   Form,
//   Input,
//   FormFeedback,
//   Label,
// } from "reactstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import withRouter from "../../components/Common/withRouter";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import { loginUser   } from "../../store/actions";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = (props) => {
//   document.title = "Login | Secure Sight";

//   const dispatch = useDispatch();

//   const validation = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Please Enter Your Email"),
//       password: Yup.string().required("Please Enter Your Password"),
//     }),
//     onSubmit: (values) => {
//       dispatch(loginUser  (values, props.router.navigate));
//     },
//   });

//   const { error } = useSelector((state) => ({
//     error: state.login.error,
//   }));

//   useEffect(() => {
//     document.body.className = "bg-pattern";
//     return function cleanup() {
//       document.body.className = "";
//     };
//   }, []);

//   return (
//     <React.Fragment>
//       <ToastContainer />
//       <style>
//         {`
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box !important;
//           }

//           html, body {
//             height: 100%;
//           }

//           body {
//             display: table;
//             width: 100%;
//             height: 100%;
//             background-color: #171717;
//             color: #000;
//             line-height: 1.6;
//             position: relative;
//             font-family: sans-serif;
//             overflow: hidden;
//           }

//           .lines {
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             height: 100%;
//             margin: auto;
//             width: 90vw;
//           }

//           .line {
//             position: absolute;
//             width: 3px; /* Increased width for larger lines */
//             height: 100%;
//             top: 0;
//             left: 50%;
//             background: rgba(255, 255, 255, 0.3); /* Brighter line color */
//             overflow: hidden;
//           }

//           .line::after {
//             content: '';
//             display: block;
//             position: absolute;
//             height: 15vh;
//             width: 100%;
//             top: -50%;
//             left: 0;
//             background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 75%, rgba(255, 255, 255, 0.8) 100%); /* Brighter gradient */
//             animation: drop 7s 0s infinite;
//             animation-fill-mode: forwards;
//             animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
//           }

//           .line:nth-child(1) {
//             margin-left: -25%;
//           }

//           .line:nth-child(1)::after {
//             animation-delay: 2s;
//           }

//           .line:nth-child(3) {
//             margin-left: 25%;
//           }

//           .line:nth-child(3)::after {
//             animation-delay: 2.5s;
//           }

//           @keyframes drop {
//             0% {
//               top: -50%;
//             }
//             100% {
//               top: 110%;
//             }
//           }
//         `}
//       </style>
//       <div className="lines"> {/* Add lines div here */}
//         <div className="line"></div>
//         <div className="line"></div>
//         <div className="line"></div>
//       </div>
//       <div className="bg-overlay"></div>
//       <div className="account-pages my-5 pt-5">
//         <Container>
//           <Row className="justify-content-between align-items-center">
// <Col lg={6} className="text-center">
//               <h2
//                 style={{
//                   color: "#f0f0f0",
//                   fontWeight: "bold",
//                   fontSize: "52px",
//                   textAlign: "left",
//                   marginBottom: "30px",
//                   textShadow: "2px 2px 4px rgba(0, 0, 0, 0. 6)",
//                 }}
//               >
//                 Custom Reports for CloudOne/Deep Security <br /> All in One
//               </h2>
//               <h2
//                 style={{
//                   color: "#f0f0f0",
//                   fontWeight: "bold",
//                   fontSize: "20px",
//                   textAlign: "left",
//                   marginBottom: "70px",
//                   textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//                 }}
//               >
//                 Unlock insights with tailored reports for CloudOne and Deep Security. Streamline security and make informed decisions.
//               </h2>
//               {/* <div className="text-center">
//                 <img
//                   src="https://png.pngtree.com/thumb_back/fw800/background/20230928/pngtree-dark-background-showcasing-3d-safety-security-logo-and-ample-copy-space-image_13513928.png"
//                   alt="Logo"
//                   className="auth-logo mx-auto"
//                   style={{
//                     maxWidth: "90%",
//                     height: "auto",
//                   }}
//                 />
//               </div> */}
//             </Col>
//             <Col lg={6} md={8} xl={5}>
//               <div
//                 className="p-4"
//                 style={{
//                   backgroundColor: "#f9f9f9", // A lighter gray instead of pure white
//                   borderRadius: "10px",
//                   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//                   height: "auto",
//                   padding: "40px",
//                 }}
//               >
//                 <h1
//                   className="mb-4"
//                   style={{
//                     color: "#333",
//                     fontWeight: "700",
//                     fontSize: "32px",
//                     textAlign: "left",
//                   }}
//                 >
//                   Welcome Back
//                 </h1>
//                 <p
//                   className="mb-5"
//                   style={{
//                     color: "#777",
//                     fontSize: "16px",
//                     textAlign: "left",
//                   }}
//                 >
//                   Log in to access your account
//                 </p>
//                 <CardBody style={{ paddingTop: "0" }}>
//                   <Form
//                     className="form-horizontal"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       validation.handleSubmit();
//                       return false;
//                     }}
//                   >
//                     {error ? (
//                       <div className="alert alert-danger">
//                         <div>{error}</div>
//                       </div>
//                     ) : null}
//                     <Row>
//                       <Col md={12}>
//                         <div className="mb-4">
//                           <Label className="form-label" style={{ color: "#444" }}>
//                             Email
//                           </Label>
//                           <Input
//                             name="email"
//                             className="form-control"
//                             placeholder="Enter your email"
//                             onChange={validation.handleChange}
//                             onBlur={validation.handleBlur}
//                             value={validation.values.email || ""}
//                             invalid={
//                               validation.touched.email && validation.errors.email
//                                 ? true
//                                 : false
//                             }
//                             style={{
//                               backgroundColor: "#f4f4f4",
//                               border: "2px solid #ddd",
//                               color: "#444",
//                               height: "50px",
//                               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow effect
//                               transition: "all 0.3s ease", // Add transition for smooth hover effect
//                             }}
//                             onMouseEnter={(e) => e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"}
//                             onMouseLeave={(e) => e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"}
//                           />
//                           {validation.touched.email && validation.errors.email ? (
//                             <FormFeedback type="invalid">
//                               <div>{validation.errors.email}</div>
//                             </FormFeedback>
//                           ) : null}
//                         </div>
//                         <div className="mb-4">
//                           <Label className="form-label" style={{ color: "#444" }}>
//                             Password
//                           </Label>
//                           <Input
//                             name="password"
//                             type="password"
//                             placeholder="Enter your password"
//                             onChange={validation.handleChange}
//                             onBlur={validation.handleBlur}
//                             value={validation.values.password || ""}
//                             invalid={
//                               validation.touched.password && validation.errors.password
//                                 ? true
//                                 : false
//                             }
//                             style={{
//                               backgroundColor: "#f4f4f4",
//                               border: "2px solid #ddd",
//                               color: "#444",
//                               height: "50px",
//                               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow effect
//                               transition: "all 0.3s ease", // Add transition for smooth hover effect
//                             }}
//                             onMouseEnter={(e) => e.target.style.boxShadow = " 0 8px 16px rgba(0, 0, 0, 0.2)"}
//                             onMouseLeave={(e) => e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"}
//                           />
//                           {validation.touched.password && validation.errors.password ? (
//                             <FormFeedback type="invalid">
//                               <div>{validation.errors.password}</div>
//                             </FormFeedback>
//                           ) : null}
//                         </div>
//                         <Row>
//                           <Col>
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id="customControlInline"
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor="customControlInline"
//                                 style={{ color: "#444" }}
//                               >
//                                 Remember me
//                               </label>
//                             </div>
//                           </Col>
//                           <Col className="col-7">
//                             <div className="text-md-end mt-3 mt-md-0">
//                               <Link
//                                 to="/auth-recoverpw"
//                                 className="text-muted"
//                                 style={{
//                                   textDecoration: "underline",
//                                   color: "#27294F",
//                                 }}
//                               >
//                                 Forgot your password?
//                               </Link>
//                             </div>
//                           </Col>
//                         </Row>
//                         <div className="d-grid mt-4">
//                           <button
//                             className="btn"
//                             style={{
//                               backgroundColor: "#27294F",
//                               color: "white",
//                               padding: "15px 20px",
//                               borderRadius: "8px",
//                               fontSize: "16px",
//                               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow effect
//                               transition: "all 0.3s ease", // Add transition for smooth hover effect
//                             }}
//                             onMouseEnter={(e) => e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"}
//                             onMouseLeave={(e) => e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"}
//                             type="submit"
//                           >
//                             Log In
//                           </button>
//                         </div>
//                         <div className="mt-4 text-left">
//                           <p style={{ color: "#777" }}>
//                             Don't have an account?{" "}
//                             <Link
//                               to="/register"
//                               className="fw-medium"
//                               style={{ color: "#27294F" }}
//                             >
//                               Register
//                             </Link>
//                           </p>
//                         </div>
//                       </Col>
//                     </Row>
//                   </Form>
//                 </CardBody>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default withRouter(Login);

// Login.propTypes = {
//   router: PropTypes.object.isRequired,
// };