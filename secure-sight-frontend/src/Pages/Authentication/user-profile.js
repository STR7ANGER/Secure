import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import user1 from "../../assets/images/logo/Images/profile.png";

const UserProfile = () => {
  document.title = "Profile | Secure Sight";

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);
  const [dbName, setDbName] = useState("");

  const { error, success } = useSelector((state) => ({
    error: state.profile.error,
    success: state.profile.success,
  }));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      setname(obj.full_name);
      setemail(obj.email);
      setidx(obj._id);
      setDbName(obj.dbName);
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: name || "",
      email: email || "",
      dbName: dbName || "",
      idx: idx || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Username"),
      email: Yup.string().email("Invalid email").required("Please Enter Your Email"),
      dbName: Yup.string().required("Please Enter Your Database Name"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="User" breadcrumbItem="Profile" />

          <Row className="justify-content-center">
            <Col lg="8">
              {error && error ? (
                <Alert color="danger">
                  <div>{error}</div>
                </Alert>
              ) : null}
              {success ? (
                <Alert color="success">
                  <div>{success}</div>
                </Alert>
              ) : null}

              <Card className="shadow-lg border-0" style={{ borderRadius: "12px", background: "linear-gradient(to bottom right, #333, #1a1a1a)" }}>
                <CardBody className="p-4 text-white">
                  <Row className="align-items-center">
                    <Col md={4} className="text-center">
                      <img
                        src={user1}
                        alt="User"
                        className="avatar-lg rounded-circle img-thumbnail shadow"
                      />
                    </Col>
                    <Col md={8}>
                      <div className="text-center text-md-start">
                        <h3 className="text-white fw-bold">{name}</h3>
                        {/* Updated details to be displayed in white */}
                        <p className="text-white mb-1">{email}</p>
                        <p className="text-white">{dbName}</p>
                        <p className="text-white mb-0">ID: {idx}</p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              {/* Edit Profile Form */}
              <Card className="shadow mt-4" style={{ borderRadius: "12px", background: "#2d2d2d" }}>
                <CardBody>
                  <h4 className="card-title mb-4 text-center text-white">Edit Profile</h4>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    {/* Username Field */}
                    <div className="form-group mb-3">
                      <Label className="form-label text-white">Username</Label>
                      <Input
                        name="username"
                        placeholder="Enter new username"
                        type="text"
                        className="form-control"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.username || ""}
                        invalid={
                          validation.touched.username && validation.errors.username
                            ? true
                            : false
                        }
                      />
                      {validation.touched.username && validation.errors.username ? (
                        <FormFeedback type="invalid">
                          {validation.errors.username}
                        </FormFeedback>
                      ) : null}
                    </div>

                    {/* Email Field */}
                    <div className="form-group mb-3">
                      <Label className="form-label text-white">Email</Label>
                      <Input
                        name="email"
                        placeholder="Enter new email"
                        type="email"
                        className="form-control"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email ? true : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>

                    {/* Database Name Field */}
                    <div className="form-group mb-3">
                      <Label className="form-label text-white">Database Name</Label>
                      <Input
                        name="dbName"
                        placeholder="Enter new database name"
                        type="text"
                        className="form-control"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.dbName || ""}
                        invalid={
                          validation.touched.dbName && validation.errors.dbName ? true : false
                        }
                      />
                      {validation.touched.dbName && validation.errors.dbName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.dbName}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="text-center">
                      <Button type="submit" color="primary" className="w-100">
                        Update Profile
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
