import React, { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Modal,
  Row,
} from "reactstrap";
import Papa from "papaparse";

export const ImportCSVDataModals = ({
  show,
  onCloseClick,

  onFileLoad,
  title,
}) => {
  const [data, setData] = useState([]);
  const handleAcceptedFiles = async (files) => {
 
    if (files) {
      Papa.parse(files[0], {
        header: true,
        complete: function (results) {
          setData(results.data);
        },
      });
    }
  };

  return (
    <React.Fragment>
      <Modal isOpen={show} toggle={onCloseClick} centered>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onCloseClick}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle>CSV Upload</CardTitle>
                  <CardSubtitle className="mb-3"></CardSubtitle>

                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleAcceptedFiles(acceptedFiles);
                    }}
                  >
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onFileLoad(data);
            }}
            className="btn btn-primary"
          >
            Import
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};
