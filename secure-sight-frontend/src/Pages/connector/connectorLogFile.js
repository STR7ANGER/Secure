import { CloseOutlined } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Col,
  Row,
  CardBody,
  CardTitle,
  Card,
  Table,
} from "reactstrap";
import swal from "sweetalert";

//Import Breadcrumb
import Breadcrumbs, { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
import { useLocation } from "react-router-dom";

const ConnectorLogFile = () => {
  // document.title = "Connector Log | Trend Micro Unity";
  document.title = "Connector Log | Secure Sight";
  const location = useLocation();
  const [openLoader, setOpenLoader] = React.useState(false);
  const [connectorLogs, setConnectorLogs] = React.useState("");

  useEffect(() => {
    Connectorlog();
  }, [location]);
  const Connectorlog = async () => {
    setOpenLoader(true);
    const payload = {
      connectorBasePath: location.state.display_name,
      logfileName: location.state.display_name + ".log",
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.ConnectorLog
    );

    setConnectorLogs(response.data);
    setOpenLoader(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="connector" breadcrumbItem="Connector Log" />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <Breadcrumbsub
                      title={<div>Connector Log Detail</div>}
                      breadcrumbItem={
                        <DownloadLog
                          connectorLogs={connectorLogs}
                          title={location.state.display_name}
                        />
                      }
                    />{" "}
                  </CardTitle>
                  <div>
                    {connectorLogs ? connectorLogs : "Data not found! "}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
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

export default ConnectorLogFile;

function DownloadLog({ connectorLogs, title }) {
  const handleDownload = () => {
    const text = connectorLogs;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={handleDownload} className="btn btn-primary w-md">
        Download Log
      </button>
      {/* <button onClick={handleDownload}>Download Log</button> */}
    </div>
  );
}
