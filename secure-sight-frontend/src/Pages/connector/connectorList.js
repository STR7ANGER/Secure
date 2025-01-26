import { CloseOutlined } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table
} from "reactstrap";
import swal from "sweetalert";

//Import Breadcrumb
import { Link } from "react-router-dom";
import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
import { allReplace, formatCapilize } from "../ulit/commonFunction";

const ConnectorList = () => {
  const [openLoader, setOpenLoader] = useState(false);
  const [connectorListData, setConnectorListData] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    dbName: "",
    user_id: "",
  });
  useEffect(() => {
    let userObject = localStorage.getItem("authUser");
    var userInfo = userObject ? JSON.parse(userObject) : "";
    setUserData(() => ({
      email: userInfo.email,
      dbName: userInfo.dbName,
      user_id: userInfo._id,
    }));
    connectorData(userInfo.dbName);
  }, []);

  //   ######################################## connector list  ##########################################
  const connectorData = async (dbName) => {
    setOpenLoader(true);
    const payload = {
      info: { dbName },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.ConectoreList
    );
    setConnectorListData(response);
    setOpenLoader(false);
  };
  // ############################################## connector conig ######################################

  const ConnectorConfigDetail = async ({ id, connectorData }) => {
    setOpenLoader(true);
    const payload = {
      info: { dbName: userData.dbName, connectorId: id },
      data: {
        config: connectorData?.config?.properties,
        connectorBasePath: connectorData?.display_name,
        connectorFileNameWithExtension: "inventry.py",
      },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.ConnectorConfig
    );
    toast(response.msg, { autoClose: 2000 });
    setOpenLoader(false);
  };

  // ############################################## connector delete ######################################
  const DeleteAlert = (item) => {
    swal("Are you sure?", " You want to delete connector!", "warning", {
      buttons: ["CANCEL", "DELETE"],
      dangerMode: true,
      className: "bgcolor",
    }).then((okay) => {
      if (okay) {
        DeleteConnecter(item);
      }
    });
  };

  const DeleteConnecter = async (item) => {
    setOpenLoader(true);
    const payload = {
      info: { dbName: userData.dbName, connectorId: item },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.ConnecterDeleteTenant
    );
    toast(response.msg, { autoClose: 2000 });
    setOpenLoader(false);
    connectorData(userData.dbName);
  };

  // const handleRowClick = (rowData) => {
  //   setSelectedRow(rowData);
  // };

  return (
    <Fragment>
      {/* <ToastContainer />
      <div className="page-content"> */}
      {/* <Container fluid={true}>
          <Breadcrumbs title="connector" breadcrumbItem="Connector List" /> */}
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle>
                <div>
                  <Breadcrumbsub
                    title={<span>Connector List { openLoader ? <Spinner color="dark" size="sm" /> : null }</span>}
                    breadcrumbItem={
                      <div className="input-group">
                        <button
                          onClick={() => {
                            setSearchedVal("");
                          }}
                          className="input-group-text"
                        >
                          <CloseOutlined />
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          id="autoSizingInputGroup"
                          placeholder="Search"
                          value={searchedVal}
                          onChange={(e) => {
                            setSearchedVal(e.target.value);
                          }}
                        />
                      </div>
                    }
                  />
                </div>
              </CardTitle>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Connector Name</th>
                    <th>Category</th>
                    <th>Installed On</th>
                    <th>Log File</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {connectorListData &&
                    connectorListData
                      .filter(
                        (x) =>
                          !searchedVal.length ||
                          x.display_name
                            .toString()
                            .toLowerCase()
                            .includes(
                              searchedVal.toString().toLowerCase()
                            ) ||
                          x.created_at
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase())
                      )
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage
                      // )
                      .map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {item.display_name ? formatCapilize(
                              allReplace(item.display_name, {
                                _: " ",
                                "-": " ",
                              })
                            ) : ''}
                          </td>
                          <td>{item.category}</td>
                          <td>{item.created_at}</td>
                          <td>
                            <Link
                              to={"/connector-log/" + item.display_name}
                              state={{ display_name: item.display_name }}
                            >
                              {item.display_name ? formatCapilize(
                                allReplace(item.display_name, {
                                  _: " ",
                                  "-": " ",
                                })
                              ) : ''}
                            </Link>
                          </td>
                          <td>
                            {item?.isConnectorScheduled &&
                              item?.isConnectorScheduled == true
                              ? "Running"
                              : item?.isConnectorScheduled == false
                                ? "Stoped"
                                : "Pending"}
                          </td>
                          <td>
                              <button
                                onClick={() => {
                                  ConnectorConfigDetail({
                                    id: item._id,
                                    connectorData: item,
                                  });
                                }}
                                type="button"
                                className="btn  noti-icon  m-0 p-0    "
                              >
                                <i className="mdi mdi-timer"></i>
                              </button>
                              <button
                                onClick={() => {
                                  DeleteAlert(item._id);
                                }}
                                type="button"
                                className="btn  noti-icon  m-0 p-0"
                              >
                                <i className="mdi mdi-delete"></i>
                              </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* </Container> */}
      {/* </div> */}
    </Fragment>
  );
};

export default ConnectorList;
