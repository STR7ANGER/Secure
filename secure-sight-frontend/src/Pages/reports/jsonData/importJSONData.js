import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardTitle,
  Container,
  Spinner
} from 'reactstrap';
import Dropzone from 'react-dropzone';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import MaterialTable from '../../Tables/Table';
import {
  deepKeys,
  formatCapilize,
  replaceDot,
  allReplace
} from '../../ulit/commonFunction';
import ApiServices from '../../../Network_call/apiservices';
import ApiEndPoints from '../../../Network_call/ApiEndPoints';

const ImportJSONData = () => {
  document.title = 'JSON Upload | Secure Sight';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [userData, setUserData] = useState({
    dbName: 'secure-sight',
    user_id: '6704c7e61118b252ff43f13a'
  });

  const handleAcceptedFiles = (files) => {
    if (files && files.length > 0) {
      const file = files[0];

      if (!file.name.endsWith('.json')) {
        toast.error('Please upload only JSON files');
        return;
      }

      setFileName(files);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setData(Array.isArray(jsonData) ? jsonData : [jsonData]);
          toast.success('JSON file parsed successfully!');
        } catch (error) {
          console.error('Error parsing JSON:', error);
          toast.error('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const keys = data && Array.from(deepKeys(data[0]));
  const columns = keys.map((name) => ({
    accessorKey: name,
    header: formatCapilize(
      replaceDot(
        allReplace(name, {
          'source.': ' ',
          'attributes.': ' ',
          '-': ' ',
          _: ' '
        })
      )
    )
  }));

  const UploadFileData = async () => {
    setIsLoading(true);

    const payload = {
      info: {
        dbName: userData.dbName,
        user_id: userData.user_id,
        document_name: fileName[0]?.name
      },
      data: { data: data }
    };

    try {
      const response = await ApiServices(
        'post',
        payload,
        ApiEndPoints.UploadJSONData
      );

      if (response.success) {
        setData([]);
        navigate('/json-list');
      }

      toast(response.msg);
    } catch (error) {
      console.error('Error uploading JSON data:', error);
      toast.error('Error uploading JSON data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="JSON" breadcrumbItem="JSON Upload" />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Form className="dropzone">
                    <Dropzone
                      onDrop={handleAcceptedFiles}
                      accept={{
                        'application/json': ['.json']
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div style={{ textAlign: 'center' }}>
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted mdi mdi-cloud-upload-outline"></i>
                            </div>
                            <h4>Drop JSON files here to upload</h4>
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
                        'Upload Files'
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
                    <CardTitle>JSON Data Preview</CardTitle>
                    <MaterialTable
                      data={data}
                      columns={columns}
                      hidecolumn={''}
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

export default ImportJSONData;