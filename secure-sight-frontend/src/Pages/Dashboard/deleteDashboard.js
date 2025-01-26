import React, { useEffect, useState } from 'react';

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

//Import Breadcrumb
import Breadcrumbs, { Breadcrumbsub } from '../../components/Common/Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import ApiServices from '../../Network_call/apiservices';
import ApiEndPoints from '../../Network_call/ApiEndPoints';
import { DashboardList, ReportList } from '../ulit/dashboardlist';

import EditModals from '../../components/Common/editModel';
import { Link } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import DeleteModal from '../../components/Common/DeleteModal';

const DeleteDashboard = () => {
  // document.title = "Dashboard | trend micro unity";
  document.title = 'Dashboard | Secure Sight';
  const [dashboardList, setDadhboardList] = useState([]);
  const [openLoader, setOpenLoader] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [dashboardName, setDashboardName] = useState('');
  const [searchedVal, setSearchedVal] = useState('');
  const [dashboardId, setDashboardId] = useState('');
  const [userData, setUserData] = React.useState({
    email: '',
    dbName: '',
    user_id: ''
  });
  useEffect(() => {
    let userObject = localStorage.getItem('authUser');
    var userInfo = userObject ? JSON.parse(userObject) : '';
    setUserData(() => ({
      email: userInfo.email,
      dbName: userInfo.dbName,
      user_id: userInfo._id
    }));
    ReportList({
      dbName: userInfo.dbName,
      userId: userInfo._id,
      reload: false
    });
    DashboardList({
      dbName: userInfo.dbName,
      userId: userInfo._id,
      reload: false
    });
    const userDashboard = localStorage.getItem('dashboard');
    var userDashboardData = userDashboard ? JSON.parse(userDashboard) : [];
    setDadhboardList(userDashboardData);
  }, []);

  // ####################################delete dashboard ####################################
  const DeleteAlert = (item) => {
    setDashboardId(item);
    setDeleteModal(true);
  };
  const DeleteDashboard = async () => {
    setOpenLoader(true);
    let payload = {
      dbName: userData.dbName,
      user_id: userData.user_id,
      id: dashboardId
    };
    const response = await ApiServices(
      'post',
      payload,
      ApiEndPoints.DeleteDashboard
    );

    toast(response.msg, { autoClose: 2000 });
    DashboardList({
      dbName: userData.dbName,
      userId: userData.user_id,
      reload: true
    });
    setDeleteModal(false);
    setOpenLoader(false);
  };
  // #################################### edit dashboard ####################################
  const OpenEditModel = ({ id, name }) => {
    setDashboardId(id);
    setDashboardName(name);
    setEditModal(true);
  };
  const onchange = (e) => {
    setDashboardName(e.target.value);
  };
  const UpdateDashboard = async () => {
    setOpenLoader(true);
    let payload = {
      info: {
        dbName: userData.dbName,
        user_id: userData.user_id,
        dashboard_id: dashboardId
      },
      data: { dashboardName: dashboardName }
    };
    const response = await ApiServices(
      'post',
      payload,
      ApiEndPoints.UpdateDashboard
    );
    if (response) {
      toast(response.msg, { autoClose: 2000 });
      DashboardList({
        dbName: userData.dbName,
        userId: userData.user_id,
        reload: true
      });
    }
    setEditModal(false);
    setOpenLoader(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={DeleteDashboard}
        onCloseClick={() => setDeleteModal(false)}
      />
      <EditModals
        title="Edit Dashboard Title"
        show={editModal}
        onCloseClick={() => setEditModal(false)}
        onClick={UpdateDashboard}
        value={dashboardName}
        onInputChange={onchange}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Dashboard" breadcrumbItem="List" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div>
                    <Breadcrumbsub
                      title="Dashboard List"
                      breadcrumbItem={
                        <div className="input-group">
                          <button
                            onClick={() => {
                              setSearchedVal('');
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

                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Dashboard Name</th>

                          <th>Created Date</th>
                          <th>Updated Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardList &&
                          dashboardList
                            .filter(
                              (x) =>
                                !searchedVal.length ||
                                x.dashboardName
                                  .toString()
                                  .toLowerCase()
                                  .includes(
                                    searchedVal.toString().toLowerCase()
                                  ) ||
                                x.created_at
                                  .toString()
                                  .toLowerCase()
                                  .includes(
                                    searchedVal.toString().toLowerCase()
                                  )
                            )
                            .map((item, index) => (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>
                                  <Link to={'/dashboard/' + item.dashboardName}>
                                    {' '}
                                    {item.dashboardName}{' '}
                                  </Link>
                                </td>

                                <td>{item.created_at}</td>
                                <td>{item.updated_at}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      OpenEditModel({
                                        id: item._id,
                                        name: item.dashboardName
                                      });
                                    }}
                                    type="button"
                                    className="btn  noti-icon  m-0 p-0    "
                                  >
                                    <i className="mdi mdi-playlist-edit"></i>
                                  </button>
                                  <button
                                    onClick={() => {
                                      DeleteAlert(item._id);
                                    }}
                                    type="button"
                                    className="btn  noti-icon  m-0 p-0 "
                                  >
                                    <i className="mdi mdi-delete"></i>
                                  </button>
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
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={() => setOpenLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default DeleteDashboard;
























// import { ConstructionOutlined, Download } from "@mui/icons-material";
// import { Backdrop, Box, CircularProgress, useTheme } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Card,
//   CardBody,
//   Col,
//   Dropdown,
//   DropdownMenu,
//   DropdownToggle,
//   Row,
// } from "reactstrap";
// import Breadcrumbs, { Breadcrumbsub } from "../../components/Common/Breadcrumb";
// import ApiEndPoints from "../../Network_call/ApiEndPoints";
// import ApiServices from "../../Network_call/apiservices";
// import MaterialTable from "../Tables/Table";
// import {
//   Columns,
//   allReplace,
//   deepKeys,
//   flattenObj,
//   formatCapilize,
//   getFields,
//   hidencolumn,
// } from "../ulit/commonFunction";
// import ExportCSV from "../ulit/exportCSV";


// const CreateSubReport = ({ reportId, GetReportData }) => {
//   const theme = useTheme();
//   const [btnprimary1, setBtnprimary1] = useState(false);
//   const [openLoader, setOpenLoader] = React.useState(false);
//   const [connectorList, setConnectorList] = useState([]);
//   const [indexList, setIndexList] = useState([]);
//   const [checkbox, setCheckbox] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [reportTitle, setReportTitle] = useState("");
//   const [indexName, setIndexName] = useState("");
//   const [filterIndexName, setFilterIndexName] = useState("");
//   const [filterColumnValue, setFilterColumnValue] = useState("");
//   const [dataModal, setDataModal] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [hour, setHour] = useState(0);
//   const [selectedColumns, setSelectedColumns] = useState([]);
//   const [filteredTableData, setFilteredData] = useState([]);
//   const [userData, setUserData] = React.useState({
//     email: "",
//     dbName: "",
//     user_id: "",
//   });
//   useEffect(() => {
//     let userObject = localStorage.getItem("authUser");
//     var userInfo = userObject ? JSON.parse(userObject) : "";
//     setUserData(() => ({
//       email: userInfo.email,
//       dbName: userInfo.dbName,
//       user_id: userInfo._id,
//     }));
//     connectorData(userInfo.dbName);
//   }, []);

//   // ############################################ get report data ########################################
//   // const HandleConnectorChange = async (event) => {
//   //   setOpenLoader(true);
//   //   setIndexList([]);
//   //   setIndexName("");
//   //   let payload = { name: allReplace(event.target.value, { _: "-" }) };
//   //   const response = await ApiServices(
//   //     "POST",
//   //     payload,
//   //     ApiEndPoints.ElasticIndexList
//   //   );
//   //   if (response) {
//   //     setIndexList(response);
//   //   }
//   //   setReportTitle("");
//   //   setOpenLoader(false);
//   // };
//   const HandleConnectorChange = async (event) => {
//     setOpenLoader(true);
//     setIndexList([]);
//     setIndexName("");

//     const payload = { name: allReplace(event.target.value, { _: "-" }) };

//     try {
//       const response = await ApiServices(
//         "POST",
//         payload,
//         ApiEndPoints.ElasticIndexList // Ensure this points to your Express API
//       );

//       // Assuming the response contains an array of index names
//       if (response && Array.isArray(response)) {
//         setIndexList(response);
//       } else {
//         console.error("Unexpected response structure:", response);
//       }
//     } catch (error) {
//       console.error("Error fetching index list:", error);
//     }

//     setReportTitle("");
//     setOpenLoader(false);
//   };

//   // ############################################ connector list  ########################################
//   const connectorData = async (item) => {
//     setOpenLoader(true);
//     const payload = {
//       headers: { "Access-Control-Allow-Origin": "*" },
//       info: { dbName: item },
//     };
//     const response = await ApiServices(
//       "post",
//       payload,
//       ApiEndPoints.ConectoreList
//     );
//     setConnectorList(response);
//     setOpenLoader(false);
//   };
//   // ############################################ data for report  ########################################
//   function getAllKeys(data) {
//     const keys = [];

//     function collectKeys(obj, prefix = "") {
//       if (Array.isArray(obj)) {
//         obj.forEach((item, index) => {
//           collectKeys(item, `${prefix}[${index}]`);
//         });
//       } else if (typeof obj === "object" && obj !== null) {
//         Object.keys(obj).forEach((key) => {
//           const newPrefix = prefix ? `${prefix}.${key}` : key;
//           collectKeys(obj[key], newPrefix);
//         });
//       } else {
//         keys.push(prefix);
//       }
//     }

//     collectKeys(data);
//     return keys;
//   }
//   var keys = tableData && Array.from(deepKeys(tableData[0]));
//   var columns = tableData && Columns(keys);
//   // keys.map((name) => ({
//   //   accessorKey: name,
//   //   header: name,

//   //   Cell: ({ cell }) =>
//   //     name == "Risk" || name == "severity" || name == "risk-level" ? (
//   //       <Box
//   //         component="span"
//   //         sx={(theme) => ({
//   //           backgroundColor:
//   //             cell.getValue() == "High" || cell.getValue() == "high"
//   //               ? theme.palette.error.dark
//   //               : cell.getValue() == "low" || cell.getValue() == "Low"
//   //               ? theme.palette.warning.dark
//   //               : cell.getValue() == "Medium" || cell.getValue() == "medium"
//   //               ? theme.palette.warning.dark
//   //               : cell.getValue() == "critical" ||
//   //                 cell.getValue() == "Critical"
//   //               ? theme.palette.success.dark
//   //               : "",
//   //           borderRadius: "0.25rem",
//   //           // color: "#fff",
//   //           maxWidth: "9ch",
//   //           p: "0.25rem",
//   //         })}
//   //       >
//   //         {cell.getValue()?.toLocaleString?.("", {
//   //           style: "currency",
//   //           currency: "USD",
//   //           minimumFractionDigits: 0,
//   //           maximumFractionDigits: 0,
//   //         })}
//   //       </Box>
//   //     ) : (
//   //       cell.getValue()
//   //     ),
//   // }));

//   const hidecolumn = keys && hidencolumn(keys);
//   // ############################################ handek checkbox ########################################

//   const handleCheckboxChange = (e) => {
//     // const columnName = allReplace(e.target.value, { "_source.": "" });
//     const columnName = e.target.value;

//     if (e.target.checked) {
//       setSelectedColumns((prevColumns) => [...prevColumns, columnName]);
//     } else {
//       setSelectedColumns((prevColumns) =>
//         prevColumns.filter((item) => item !== columnName)
//       );
//     }
//   };

//   useEffect(() => {
//     postData();
//   }, [checkbox]);
//   const postData = () => {
//     if (Array.isArray(tableData)) { // Check if tableData is an array
//       const flatData = tableData.map((i) => flattenObj(i));
//       const datafilter = checkbox.map((item) => getFields(flatData, item));
//       setReportData(datafilter);
//     } else {
//       console.error("tableData is not an array:", tableData); // Log an error for debugging
//     }
//   };

//   // ############################################ FilterData  ########################################

//   const filterColumnChange = (e) => {
//     setFilterIndexName(e.target.value);
//   };

//   const FilterData = async ({ clear }) => {
//     const dateNow = new Date();
//     const thirtyMinutesAgo = new Date(
//       dateNow.getTime() - `${hour * 60 * 1000}`
//     );
//     const datetimeString = thirtyMinutesAgo.toISOString().slice(0, -1);
//     setOpenLoader(true);
//     setTableData([]);
//     const search = { [filterIndexName]: filterColumnValue };

//     let payload = {
//       index: indexName,
//       column: clear ? checkbox : [],
//       curruntTime: dateNow.toISOString().slice(0, -1),
//       lessTime: datetimeString,
//     };
//     let payloadsearch = {
//       index: indexName,
//       column: checkbox,
//       search,
//       curruntTime: dateNow.toISOString(),
//       lessTime: datetimeString,
//     };

//     const response = await ApiServices(
//       "post",
//       filterColumnValue ? payloadsearch : payload,
//       ApiEndPoints.SearchData
//     );
//     console.log("before filtering the columns response ", response);
//     toast(response.msg);
//     setTableData(response);
//     setOpenLoader(false);
//     setCheckbox([]);
//     setFilterColumnValue("");
//   };
//   // ############################################ post report data ########################################

//   const createReport = async () => {
//     setOpenLoader(true);
//     // var firstRecord = tableData.length > 0 ? Array(1).fill(tableData) : [];
//     var firstRecord = tableData;
//     const filteredData =
//       tableData.length > 0 &&
//       firstRecord.map((row) => {
//         const newRow = {};

//         selectedColumns.forEach((column) => {
//           const columnParts = column.split(".");

//           if (columnParts.length === 1) {
//             newRow[column] = row[column];
//           } else {
//             const parentProp = columnParts[0];
//             const childProp = columnParts[1];

//             if (!newRow[parentProp]) {
//               newRow[parentProp] = {};
//             }

//             newRow[parentProp][childProp] = row[parentProp][childProp];
//           }
//         });

//         return newRow;
//       });
//     setFilteredData(filteredData);
//     let payload = {
//       info: {
//         dbName: userData.dbName,
//         report_id: reportId,
//         user_id: userData.user_id,
//         title: reportTitle,
//         column: checkbox,
//         headerName: checkbox,
//       },
//       data: { data: filteredData, column: checkbox },
//     };
//     const response = await ApiServices(
//       "post",
//       payload,
//       ApiEndPoints.AddReportData
//     );
//     toast(response.msg);
//     GetReportData(reportId);
//     setCheckbox([]);
//     setReportTitle("");
//     setOpenLoader(false);
//     setTableData(filteredData);
//   };
//   // console.log("table data after filtering out the columns", tableData)
//   const ImportCSVData = () => {};
//   const onFileLoad = (data) => {
//     setTableData(data);
//     setDataModal(false);
//   };
//   return (
//     <div className="dark-dashboard">
//       <div className="gradient-overlay" />

//       <Row>
//         <Col xl={12}>
//           <Card className="dark-card">
//             <CardBody>
//               <form
//                 action="javascript:void(0)"
//                 onSubmit={() => {
//                   FilterData({ clear: true });
//                 }}
//               >
//                 <Row>
//                   <Col md={6}>
//                     <div className="form-floating mb-3">
//                       <select
//                         className="form-select dark-input"
//                         id="floatingSelectGrid"
//                         aria-label="Floating label select example"
//                         onChange={(e) => {
//                           HandleConnectorChange(e);
//                         }}
//                       >
//                         <option value="">Select Report</option>
//                         {connectorList &&
//                           connectorList.map((item, index) => (
//                             <option value={item.display_name}>
//                               {index + 1 + "  "}
//                               {formatCapilize(
//                                 allReplace(item.display_name, {
//                                   _: " ",
//                                   "-": " ",
//                                 })
//                               )}
//                             </option>
//                           ))}
//                       </select>
//                       <label className="dark-label" htmlFor="floatingSelectGrid">
//                         Select Connector
//                       </label>
//                     </div>
//                   </Col>
//                   <Col md={6}>
//                     <div className="form-floating mb-3">
//                       <select
//                         className="form-select dark-input"
//                         id="floatingSelectGrid"
//                         aria-label="Floating label select example"
//                         onChange={(e) => {
//                           setIndexName(e.target.value);
//                         }}
//                       >
//                         <option value="">Select Table</option>
//                         {Array.isArray(indexList) && indexList.length > 0 ? (
//                           indexList.map((i, index) => (
//                             <option key={index} value={i}>
//                               {i}
//                             </option>
//                           ))
//                         ) : (
//                           <option value="" disabled>
//                             No indices available
//                           </option>
//                         )}
//                       </select>
//                       <label className="dark-label" htmlFor="floatingSelectGrid">
//                         Select Index
//                       </label>
//                     </div>
//                   </Col>
//                   <Col md={6}>
//                     <div className="form-floating mb-3">
//                       <select
//                         className="form-select dark-input"
//                         id="floatingSelectGrid"
//                         aria-label="Floating label select example"
//                         onChange={(e) => {
//                           setHour(e.target.value);
//                         }}
//                       >
//                         <option value="">Select Time</option>
//                         {hourData.map((i, index) => (
//                           <option key={index} value={i.value}>
//                             {i.lable}
//                           </option>
//                         ))}
//                       </select>
//                       <label className="dark-label" htmlFor="floatingSelectGrid">
//                         Select Time
//                       </label>
//                     </div>
//                   </Col>
//                   <Col md={6}>
//                     <div>
//                       <button type="submit" className="btn btn-primary dark-button">
//                         Submit
//                       </button>
//                     </div>
//                   </Col>
//                 </Row>
//               </form>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>





//       {tableData.length > 0 && keys.length > 0 && (
//         <Row>
//           <Col xl={12}>
//             <Card className="dark-card">
//               <CardBody>
//               <form action="javascript:void(0)">
//                   <Row>
//                     <Col md={6}>
//                       <Card>
//                         <CardBody>
//                           <h4 className="mb-0 pb-0 font-size-18">
//                             Select Columns{" "}
//                           </h4>
//                           <p>Select Columns to Create the new Report</p>
//                           <ul
//                             className="message-list mb-0 maxh-3"
//                             style={{
//                               maxHeight: "500px",
//                               overflow: "scroll",
//                               scrollbarWidth: "0 !impotent",
//                             }}
//                           >
//                             {keys &&
//                               keys.map((i) => (
//                                 <li>
//                                   <span className="col-mail-1">
//                                     <span className="checkbox-wrapper-mail">
//                                       <input
//                                         type="checkbox"
//                                         id={i}
//                                         value={i}
//                                         // checked={selectedColumns.includes(allReplace(i, { "_source.": "" }))}
//                                         onChange={(e) => {
//                                           handleCheckboxChange(e);
//                                         }}
//                                       />
//                                       <label
//                                         htmlFor={i}
//                                         className="toggle"
//                                       ></label>
//                                     </span>
//                                   </span>

//                                   <option value={i}>{i}</option>
//                                 </li>
//                               ))}
//                           </ul>
//                           <br />
//                         </CardBody>
//                       </Card>
//                     </Col>
//                     <Col md={6}>
//                       <div className="form-floating mb-3">
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="floatingFirstnameInput"
//                           placeholder="Enter Chart Title"
//                           value={reportTitle}
//                           onChange={(e) => {
//                             setReportTitle(e.target.value);
//                           }}
//                         />
//                         <label htmlFor="floatingFirstnameInput">
//                           Enter Report Title
//                         </label>
//                       </div>

//                       <div className="form-floating mb-3">
//                         <select
//                           className="form-select"
//                           id="floatingSelectGrid"
//                           aria-label="Floating label select example"
//                           onChange={filterColumnChange}
//                         >
//                           <option value="">Select Filter Column</option>
//                           {keys &&
//                             keys.map((i) => <option value={i}>{i}</option>)}
//                         </select>
//                         <label htmlFor="floatingSelectGrid">Select Index</label>
//                       </div>
//                       <div className="form-floating mb-3">
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="floatingFirstnameInput"
//                           placeholder="Enter Chart Title"
//                           value={filterColumnValue}
//                           onChange={(e) => {
//                             setFilterColumnValue(e.target.value);
//                           }}
//                         />
//                         <label htmlFor="floatingFirstnameInput">
//                           Enter Filter Value
//                         </label>
//                       </div>

//                       <div>
//                         <Breadcrumbsub
//                           title={
//                             <button
//                               onClick={() => {
//                                 FilterData({ clear: true });
//                               }}
//                               className="btn btn-primary w-md"
//                             >
//                               Filter Data
//                             </button>
//                           }
//                           breadcrumbItem={
//                             <button
//                               onClick={createReport}
//                               className="btn btn-primary w-md"
//                             >
//                               Create Report
//                             </button>
//                           }
//                         />
//                       </div>
//                     </Col>
//                   </Row>
//                 </form>

//                 {/* ... [existing content with dark theme classes] ... */}
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {tableData.length > 0 && (
//         <Row>
//           <Col xl={12}>
//             <Card className="dark-card">
//               <CardBody>
//               <form action="javascript:void(0)">
//                   <Row>
//                     <Col md={6}>
//                       <Card className="dark-card">
//                         <CardBody>
//                           <h4 className="mb-0 pb-0 font-size-18 text-blue-400">
//                             Select Columns
//                           </h4>
//                           <p className="text-blue-200">
//                             Select Columns to Create the new Report
//                           </p>
//                           <ul
//                             className="message-list mb-0 maxh-3"
//                             style={{
//                               maxHeight: "500px",
//                               overflow: "scroll",
//                               scrollbarWidth: "0 !important",
//                             }}
//                           >
//                             {keys &&
//                               keys.map((i, index) => (
//                                 <li key={index} className="dark-list-item">
//                                   <span className="col-mail-1">
//                                     <span className="checkbox-wrapper-mail">
//                                       <input
//                                         type="checkbox"
//                                         id={i}
//                                         value={i}
//                                         onChange={(e) => {
//                                           handleCheckboxChange(e);
//                                         }}
//                                       />
//                                       <label
//                                         htmlFor={i}
//                                         className="toggle dark-checkbox"
//                                       ></label>
//                                     </span>
//                                   </span>
//                                   <span className="dark-text">{i}</span>
//                                 </li>
//                               ))}
//                           </ul>

//                 {/* ... [existing content with dark theme classes] ... */}
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>


//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={openLoader}
//         onClick={() => setOpenLoader(false)}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>

//       <style>
//         {`
//           .dark-dashboard {
//             background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
//             min-height: 100vh;
//             padding: 2rem 1rem;
//             position: relative;
//             overflow: hidden;
//           }

//           .gradient-overlay {
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background:
//               radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 25%),
//               radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 25%);
//             pointer-events: none;
//           }

//           .dark-card {
//             background: rgba(15, 23, 42, 0.95);
//             border: 1px solid rgba(56, 189, 248, 0.1);
//             border-radius: 24px;
//             box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
//             backdrop-filter: blur(10px);
//             transition: all 0.3s ease;
//           }

//           .dark-input {
//             background: rgba(15, 23, 42, 0.8);
//             border: 2px solid rgba(56, 189, 248, 0.2);
//             color: #f0f9ff;
//             border-radius: 16px;
//           }

//           .dark-input:focus {
//             border-color: #38bdf8;
//             box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
//           }

//           .dark-label {
//             color: #7dd3fc;
//             font-weight: 600;
//           }

//           .btn-primary {
//             background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
//             border: none;
//             border-radius: 16px;
//             padding: 0.75rem 1.5rem;
//             font-weight: 600;
//             transition: all 0.3s ease;
//           }

//           .btn-primary:hover {
//             background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
//             transform: translateY(-2px);
//           }

//           .form-select option {
//             background: #0f172a;
//             color: #f0f9ff;
//           }

//           .message-list {
//             background: rgba(15, 23, 42, 0.8);
//             border-radius: 16px;
//             padding: 1rem;
//           }

//           .message-list li {
//             border-bottom: 1px solid rgba(56, 189, 248, 0.1);
//             color: #f0f9ff;
//           }

//           .message-list li:hover {
//             background: rgba(56, 189, 248, 0.05);
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default CreateSubReport;

// const hourData = [
//   { lable: "Last 5 min Data", value: 5 },
//   { lable: "Last 10 min Data", value: 10 },
//   { lable: "Last 30 min Data", value: 30 },
//   { lable: "Last 60 min Data", value: 60 },
//   { lable: "Last 5 hour Data", value: 300 },
//   { lable: "Last 12 hour Data", value: 600 },
//   { lable: "Last 1 day Data", value: 1200 },
//   { lable: "Last 5 day Data", value: 6000 },
//   { lable: "Last 10 day Data", value: 12000 },
//   { lable: "Last 30 day Data", value: 36000 },
// ];























