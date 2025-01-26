import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import Breadcrumbs, { Breadcrumbsub } from "../../../components/Common/Breadcrumb";
import ApiServices from "../../../Network_call/apiservices";
import ApiEndPoints from "../../../Network_call/ApiEndPoints";
import DeleteModal from "../../../components/Common/DeleteModal";
import Dropzone from "react-dropzone";
import Papa from "papaparse";

const CSVDataList = () => {
  document.title = "CSV Data | Secure Sight";
  const [csvList, setCSVList] = useState([]);
  const [openLoader, setOpenLoader] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [csvDataId, setCSVDataId] = useState("");
  const [searchedVal, setSearchedVal] = useState("");
  const [importModal, setImportModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    getCSVData();
  }, []);

  const getCSVData = async () => {
    setOpenLoader(true);
    try {
      const response = await ApiServices("get", {}, ApiEndPoints.FileList);
      if (response.success) {
        setCSVList(response.data);
      } else {
        toast(response.msg, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error fetching CSV data:", error);
      toast("Error fetching CSV data", { autoClose: 2000 });
    } finally {
      setOpenLoader(false);
    }
  };

  const DeleteAlert = (item) => {
    setCSVDataId(item);
    setDeleteModal(true);
  };

  const DeleteCSVData = async () => {
    setOpenLoader(true);
    let payload = {
      _id: csvDataId,
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.FileDelete
    );
    setDeleteModal(false);
    toast(response.msg, { autoClose: 2000 });
    getCSVData();
    setOpenLoader(false);
  };

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedData(results.data);
        toast.success("File parsed successfully!");
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        toast.error("Error parsing CSV file");
      }
    });
  };

  const handleUpload = async () => {
    if (!uploadedFile || !parsedData) {
      toast.error("Please select a file first");
      return;
    }

    setOpenLoader(true);
    try {
      const payload = {
        info: {
          dbName: "secure-sight",
          document_name: uploadedFile.name,
        },
        data: { data: parsedData }
      };

      const response = await ApiServices(
        "post",
        payload,
        ApiEndPoints.UploadFileData
      );

      if (response.success) {
        toast.success("File uploaded successfully!");
        setImportModal(false);
        setUploadedFile(null);
        setParsedData(null);
        getCSVData(); // Refresh the list
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setOpenLoader(false);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
          <DeleteModal
            show={deleteModal}
            onDeleteClick={DeleteCSVData}
            onCloseClick={() => setDeleteModal(false)}
          />

          <Breadcrumbs title="Report" breadcrumbItem="List" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Breadcrumbsub
                      title="Report List"
                      breadcrumbItem={
                        <div className="input-group" style={{ width: "300px" }}>
                          <button
                            onClick={() => setSearchedVal("")}
                            className="input-group-text"
                          >
                            <CloseOutlined />
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={searchedVal}
                            onChange={(e) => setSearchedVal(e.target.value)}
                          />
                        </div>
                      }
                    />
                    <Button
                      color="primary"
                      onClick={() => setImportModal(true)}
                    >
                      Import CSV
                    </Button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>File Name</th>
                          <th>Created Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csvList &&
                          csvList
                            .filter(
                              (x) =>
                                !searchedVal.length ||
                                x.document_name
                                  .toString()
                                  .toLowerCase()
                                  .includes(searchedVal.toLowerCase())
                            )
                            .map((item, index) => (
                              <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                  <Link to={`/csv-list/${item._id}`}>
                                    {item.document_name}
                                  </Link>
                                </td>
                                <td>
                                  {new Date(item.upload_date).toLocaleDateString()}
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

          {/* Import Modal */}
          <Modal
            isOpen={importModal}
            toggle={() => setImportModal(false)}
            size="lg"
          >
            <ModalHeader toggle={() => setImportModal(false)}>
              Import CSV File
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <Dropzone onDrop={handleFileDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="dropzone text-center p-5"
                      style={{
                        border: '2px dashed #ced4da',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <input {...getInputProps()} />
                      <i className="display-4 text-muted mdi mdi-upload mb-2" />
                      <p>Drag & drop a CSV file here, or click to select one</p>
                      {uploadedFile && (
                        <div className="mt-3">
                          <strong>Selected file:</strong> {uploadedFile.name}
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="text-center">
                <Button
                  color="secondary"
                  className="me-2"
                  onClick={() => setImportModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={handleUpload}
                  disabled={!uploadedFile}
                >
                  Upload
                </Button>
              </div>
            </ModalBody>
          </Modal>
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

export default CSVDataList;