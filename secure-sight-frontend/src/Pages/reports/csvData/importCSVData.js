//* CSV DATA UPLOAD PAGE
// export default ImportCSVData;
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardTitle,
  Container,
  Spinner,
} from "reactstrap";
import Dropzone from "react-dropzone";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Papa from "papaparse";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import MaterialTable from "../../Tables/Table";
import {
  deepKeys,
  formatCapilize,
  replaceDot,
  allReplace,
} from "../../ulit/commonFunction";
import ApiServices from "../../../Network_call/apiservices";
import ApiEndPoints from "../../../Network_call/ApiEndPoints";

const ImportCSVData = () => {
  document.title = "CSV Upload | Secure Sight";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [userData, setUserData] = useState({
    dbName: "secure-sight", // Hardcoded database name
    user_id: "6704c7e61118b252ff43f13a", // Hardcoded user ID
  });

  const handleAcceptedFiles = (files) => {
    if (files && files.length > 0) {
      setFileName(files);
      const file = files[0];

      if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const jsonData = JSON.parse(e.target.result);
          setData(jsonData);
          toast.success("JSON file parsed successfully!");
        };
        reader.readAsText(file);
      } else {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            toast.success("CSV file parsed successfully!");
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            toast.error("Error parsing CSV file.");
          },
        });
      }
    }
  };

  const keys = data && Array.from(deepKeys(data[0]));
  const columns = keys.map((name) => ({
    accessorKey: name,
    header: formatCapilize(
      replaceDot(
        allReplace(name, {
          "source.": " ",
          "attributes.": " ",
          "-": " ",
          _: " ",
        })
      )
    ),
  }));

const UploadFileData = async () => {
  setIsLoading(true);

  // Prepare the payload with file name and data
  const payload = {
    info: {
      dbName: userData.dbName, // Database name
      user_id: userData.user_id, // User ID
      document_name: fileName[0]?.name, // Persist the uploaded file name
    },
    data: { data: data }, // CSV or JSON data
  };

  try {
    // Send the payload to the backend using a POST request
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.UploadFileData
    );

    // Check if the upload was successful
    if (response.success) {
      setData([]); // Clear the data after upload
      navigate("/csv-list"); // Redirect after successful upload
    }

    // Show a success message
    toast(response.msg);
  } catch (error) {
    // Log any error and show an error message
    console.error("Error uploading CSV data:", error);
    toast.error("Error uploading CSV data.");
  } finally {
    // Stop the loading spinner
    setIsLoading(false);
  }
};


  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="CSV" breadcrumbItem="CSV Upload" />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Form className="dropzone">
                    <Dropzone onDrop={handleAcceptedFiles}>
                      {({ getRootProps, getInputProps }) => (
                        <div style={{ textAlign: "center" }}>
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted mdi mdi-cloud-upload-outline"></i>
                            </div>
                            <h4>Drop files here to upload</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {fileName.map((f, i) => (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={i}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={f.name}
                                  src={URL.createObjectURL(f)}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.size} bytes</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Form>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={UploadFileData}
                      disabled={isLoading || data.length === 0}
                    >
                      {isLoading ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        "Upload Files"
                      )}
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {data.length > 0 && (
            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>CSV Data</CardTitle>
                    <MaterialTable
                      data={data}
                      columns={columns}
                      hidecolumn={""}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ImportCSVData;
