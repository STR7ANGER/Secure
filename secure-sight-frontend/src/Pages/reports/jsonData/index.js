import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import Breadcrumbs, { Breadcrumbsub } from "../../../components/Common/Breadcrumb";
import ApiServices from '../../../Network_call/apiservices';
import ApiEndPoints from '../../../Network_call/ApiEndPoints';

const JSONData = () => {
  document.title = "JSON Data | Secure Sight";

  const [documents, setDocuments] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    dbName: "",
    user_id: "",
  });

  useEffect(() => {
    let userObject = localStorage.getItem("authUser");
    var userInfo = userObject ? JSON.parse(userObject) : "";
    setUserData({
      email: userInfo.email,
      dbName: userInfo.dbName,
      user_id: userInfo._id,
    });
    fetchDocumentList(userInfo.dbName, userInfo._id);
  }, []);

  const fetchDocumentList = async (dbName, userId) => {
    setOpenLoader(true);
    try {
      const response = await ApiServices.get(
        `${ApiEndPoints.getJSONDocuments}?dbName=${dbName}&userId=${userId}`
      );
      if (response.data.success) {
        setDocuments(response.data.data);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error fetching document list: " + error.message);
    } finally {
      setOpenLoader(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setOpenLoader(true);
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            const formData = new FormData();
            formData.append('jsonData', JSON.stringify(jsonData));
            formData.append('dbName', userData.dbName);
            formData.append('userId', userData.user_id);
            formData.append('fileName', file.name);

            const response = await ApiServices.post(
              ApiEndPoints.uploadJSONDocument,
              formData
            );

            if (response.data.success) {
              toast.success(response.data.msg);
              fetchDocumentList(userData.dbName, userData.user_id);
            } else {
              toast.error(response.data.msg);
            }
          } catch (parseError) {
            toast.error("Invalid JSON file format");
          }
        };
        reader.readAsText(file);
      } catch (error) {
        toast.error("Error uploading data: " + error.message);
      } finally {
        setOpenLoader(false);
      }
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="JSON" breadcrumbItem="Data" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>JSON Documents</h4>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleUpload}
                      style={{ display: 'none' }}
                      id="json-upload"
                    />
                    <label htmlFor="json-upload">
                      <Button color="primary" as="span">
                        Upload JSON
                      </Button>
                    </label>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Document Name</th>
                          <th>Uploaded At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documents.map((doc) => (
                          <tr key={doc._id}>
                            <td>{doc.document_name}</td>
                            <td>{new Date(doc.uploaded_at).toLocaleString()}</td>
                            <td>
                              <Link to={`/json-data?_id=${doc._id}&document_name=${doc.document_name}`}>
                                <Button color="info" size="sm">View</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={() => setOpenLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default JSONData;