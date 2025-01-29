import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import Breadcrumbs, {
  Breadcrumbsub
} from '../../../components/Common/Breadcrumb';
import ApiServices from '../../../Network_call/apiservices';
import ApiEndPoints from '../../../Network_call/ApiEndPoints';
import DeleteModal from '../../../components/Common/DeleteModal';
import Dropzone from 'react-dropzone';

const JSONDataList = () => {
  document.title = 'JSON Data | Secure Sight';
  const [jsonList, setJSONList] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [jsonDataId, setJSONDataId] = useState('');
  const [searchedVal, setSearchedVal] = useState('');
  const [importModal, setImportModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    getJSONData();
  }, []);

  const getJSONData = async () => {
    setOpenLoader(true);
    try {
      const response = await ApiServices('get', {}, ApiEndPoints.FileList);
      if (response.success) {
        const jsonFiles = response.data.filter((file) =>
          file.document_name.endsWith('.json')
        );
        setJSONList(jsonFiles);
      } else {
        toast(response.msg, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error fetching JSON data:', error);
      toast('Error fetching JSON data', { autoClose: 2000 });
    } finally {
      setOpenLoader(false);
    }
  };

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setParsedData(jsonData);
        toast.success('File parsed successfully!');
      } catch (error) {
        console.error('Error parsing JSON:', error);
        toast.error('Error parsing JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!uploadedFile || !parsedData) {
      toast.error('Please select a file first');
      return;
    }

    setOpenLoader(true);
    try {
      const payload = {
        info: {
          dbName: 'secure-sight',
          document_name: uploadedFile.name
        },
        data: { data: parsedData }
      };

      const response = await ApiServices(
        'post',
        payload,
        ApiEndPoints.UploadFileData
      );

      if (response.success) {
        toast.success('File uploaded successfully!');
        setImportModal(false);
        setUploadedFile(null);
        setParsedData(null);
        getJSONData();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    } finally {
      setOpenLoader(false);
    }
  };

  const DeleteAlert = (item) => {
    setJSONDataId(item);
    setDeleteModal(true);
  };

  const DeleteJSONData = async () => {
    setOpenLoader(true);
    const payload = {
      _id: jsonDataId
    };
    const response = await ApiServices(
      'post',
      payload,
      ApiEndPoints.FileDelete
    );
    setDeleteModal(false);
    toast(response.msg, { autoClose: 2000 });
    getJSONData();
    setOpenLoader(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
          <DeleteModal
            show={deleteModal}
            onDeleteClick={DeleteJSONData}
            onCloseClick={() => setDeleteModal(false)}
          />

          <Breadcrumbs title="JSON Files" breadcrumbItem="List" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Breadcrumbsub
                      title="JSON File List"
                      breadcrumbItem={
                        <div className="input-group" style={{ width: '300px' }}>
                          <button
                            onClick={() => setSearchedVal('')}
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
                      Import JSON
                    </Button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>File Name</th>
                          <th>Created Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jsonList
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
                                <Link to={`/json-view/${item._id}`}>
                                  {item.document_name}
                                </Link>
                              </td>
                              <td>
                                {new Date(item.upload_date).toLocaleDateString()}
                              </td>
                              <td>
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => DeleteAlert(item._id)}
                                >
                                  Delete
                                </Button>
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
              Import JSON File
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <Dropzone onDrop={handleFileDrop} accept=".json">
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
                      <p>Drag & drop a JSON file here, or click to select one</p>
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
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={() => setOpenLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default JSONDataList;