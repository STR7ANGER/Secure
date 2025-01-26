import { Download } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  Row,
  Spinner,
} from "reactstrap";

import { Breadcrumbsub } from "../../components/Common/Breadcrumb";
import Loader from "../../components/Common/loader";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
import MaterialTable from "../Tables/Table";
import {
  Columns,
  deepKeys,
  flattenObj,
  getFields,
  hidencolumn,
} from "../ulit/commonFunction";
import ExportCSV from "../ulit/exportCSV";
import ModalLoading from "../../components/modal-loading";

const CreateChart = ({ dashboardId, updateFun }) => {
  const [reportList, setReportList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [btnprimary1, setBtnprimary1] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [reportTitle, setReportTitle] = useState("");
  const [loader, setLoader] = useState(false);
  const [switchCSVData, setSwitchCSVData] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [CSVDataList, setCSVDataList] = useState([]);
  const [chartTitle, setChartTitle] = useState({
    charttitle: "",
    chartType: "Bar Chart",
  });
  const [tableId, setTableId] = useState("");
  const [tableData, setTableData] = useState([]);
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
    const userReport = localStorage.getItem("report");
    var userReportData = userReport ? JSON.parse(userReport) : [];
    setReportList(userReportData);
    getCSVDataList({ user_id: userInfo._id, dbName: userInfo.dbName });
  }, []);

  useEffect(() => {
    setCheckbox([]);
    setReportData([]);
    setChartData([]);
    setTableData([]);
  }, [dashboardId]);
  // ############################################ get report data ########################################

  const HandleReportChange = async (event) => {
    setOpenLoader(true);
    let payload = {
      info: { dbName: userData.dbName },
      data: { report_id: event.target.value, user_id: userData.user_id },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.GetReportData
    );
    if (response) {
      setReportData(response?.data);
    }
    // setCheckbox([]);
    setChartTitle({ charttitle: "", chartType: "" });
    setOpenLoader(false);
  };
  // ############################################ data for report  ########################################

  const getTableData = () => {
    reportData
      .filter((id) => id._id === tableId)
      .map((data) => setTableData(data.data) + setReportTitle(data.title));
  };

  var keys = tableData && Array.from(deepKeys(tableData[0]));
  var columns = tableData && Columns(keys);
  // tableData &&
  // keys.map((name) => ({
  //   accessorKey: name,
  //   header: name,
  // }));

  const hidecolumn = keys && hidencolumn(keys);
  // ############################################ handek checkbox ########################################

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckbox((prev) => [...prev, e.target.value]);
    } else {
      setCheckbox(checkbox.filter((item) => item !== e.target.value));
    }
  };

  useEffect(() => {
    postData();
  }, [checkbox]);
  const postData = () => {
    const flatData = tableData && tableData.map((i) => flattenObj(i));
    const datafilter = checkbox.map((item, index) => getFields(flatData, item));
    // setChartData(datafilter);
  };
  // ############################################ get csv data list ########################################

  const getCSVDataList = async ({ dbName, user_id }) => {
    setOpenLoader(true);
    let payload = {
      dbName: dbName,
      user_id: user_id,
    };
    // const response = await ApiServices("post", payload, ApiEndPoints.FileList);

    // setCSVDataList(response?.data);
    setOpenLoader(false);
  };
  // ############################################ get csv data list ########################################

  const getCSVData = async (event) => {
    const id = event.target.value;
    const document_name =
      event.target.options[event.target.selectedIndex].dataset.additionalData;
    setOpenLoader(true);
    let payload = {
      dbName: userData.dbName,
      user_id: userData.user_id,
      _id: id,
      document_name: document_name,
    };
    const response = await ApiServices("post", payload, ApiEndPoints.FileGet);
    if (response.data) {
      setTableData(response.data[0]?.data);
    }
    toast(response.msg, { autoClose: 2000 });
    setOpenLoader(false);
  };

  // ############################################ handek checkbox ########################################

  const createChart = async (item) => {
    setOpenLoader(true);

    let payload = {
      info: {
        dbName: userData.dbName,
        dashboard_id: dashboardId,
        user_id: userData.user_id,
        type: chartTitle.chartType,
        title: chartTitle.charttitle,
        column: checkbox,
      },
      data: { data: tableData },
    };
    const respons = await ApiServices(
      "post",
      payload,
      ApiEndPoints.AddDashboardData
    );
    toast(respons.msg);
    setCheckbox([]);
    setChartTitle({ charttitle: "", chartType: "Bar Chart" });
    updateFun(dashboardId);
    setOpenLoader(false);
  };

  return (

      <div className="dark-dashboard">
        <div className="gradient-overlay" />
        <Loader load={loader} />
        <Row>
          <Col xl={12}>
            <Card className="dashboard-card">
              <CardBody>
                <Row>
                  <Col sm={4}>
                    <div className="mt-4 mt-lg-0">
                      <div className="form-check form-switch form-switch-md mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customSwitchsizemd"
                          onChange={() => setSwitchCSVData(!switchCSVData)}
                        />
                        <label className="form-check-label dark-label" htmlFor="customSwitchsizemd">
                          Get CSV Data
                        </label>
                      </div>
                    </div>
                  </Col>
                </Row>
                <form onSubmit={getTableData}>
                  {!switchCSVData && (
                    <Row>
                      <Col md={6}>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select dark-input"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                            onChange={HandleReportChange}
                          >
                            <option value="">Select Report</option>
                            {reportList?.map((item, index) => (
                              <option key={item._id} value={item._id}>
                                {index + 1 + '  '}
                                {item.reportName}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="floatingSelectGrid" className="dark-label">
                            Select Report
                          </label>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select dark-input"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                            onChange={(e) => setTableId(e.target.value)}
                          >
                            <option value="">Select Table</option>
                            {reportData?.map((i) => (
                              <option key={i._id} value={i._id}>{i.title}</option>
                            ))}
                          </select>
                          <label htmlFor="floatingSelectGrid" className="dark-label">Select Table</label>
                        </div>
                      </Col>
                      <Col md={6}>
                        <button type="submit" className="dark-button">
                          Submit
                        </button>
                      </Col>
                    </Row>
                  )}
                </form>
                {switchCSVData && (
                  <Row>
                    <Col md={6}>
                      <div className="form-floating mb-3">
                        <select
                          className="form-select dark-input"
                          id="floatingSelectGrid"
                          aria-label="Floating label select example"
                          onChange={getCSVData}
                        >
                          <option value="">Select Table</option>
                          {CSVDataList?.map((i) => (
                            <option
                              key={i._id}
                              value={i._id}
                              data-additional-data={i.document_name}
                            >
                              {i.document_name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="floatingSelectGrid" className="dark-label">Select Table</label>
                      </div>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {tableData.length > 0 && keys.length > 0 && (
          <Row>
            <Col xl={12}>
              <Card className="dashboard-card">
                <CardBody>
                  <form onSubmit={createChart}>
                    <Row>
                      <Col md={6}>
                        <Card className="dashboard-card">
                          <CardBody>
                            <h4 className="main-title">
                              Select Columns
                            </h4>
                            <p className="header-description">Select Columns for Create the new chart</p>
                            <ul
                              className="message-list mb-0 maxh-3"
                              style={{
                                maxHeight: '500px',
                                overflow: 'scroll',
                                scrollbarWidth: '0 !important',
                              }}
                            >
                              {keys?.map((i) => (
                                <li key={i}>
                                  <span className="col-mail-1">
                                    <span className="checkbox-wrapper-mail">
                                      <input
                                        type="checkbox"
                                        id={i}
                                        checked={checkbox.find((e) => e === i)}
                                        value={i}
                                        onChange={handleCheckboxChange}
                                      />
                                      <label
                                        htmlFor={i}
                                        className="toggle"
                                      ></label>
                                    </span>
                                  </span>
                                  <option value={i}>{i}</option>
                                </li>
                              ))}
                            </ul>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select dark-input"
                            id="floatingSelectGrid"
                            aria-label="Select Chart Type"
                            value={chartTitle.chartType}
                            onChange={(e) => {
                              setChartTitle((prev) => ({
                                ...prev,
                                chartType: e.target.value,
                              }));
                            }}
                          >
                            {chartList?.map((i) => (
                              <option key={i} value={i}>{i}</option>
                            ))}
                          </select>
                          <label htmlFor="floatingSelectGrid" className="dark-label">
                            Select Chart Type
                          </label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="dark-input"
                            id="floatingFirstnameInput"
                            placeholder="Enter Chart Title"
                            value={chartTitle.charttitle}
                            onChange={(e) => {
                              setChartTitle((prev) => ({
                                ...prev,
                                charttitle: e.target.value,
                              }));
                            }}
                          />
                          <label htmlFor="floatingFirstnameInput" className="dark-label">
                            Enter Chart Title
                          </label>
                        </div>
                        <button type="submit" className="dark-button">
                          Submit
                        </button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {tableData.length > 0 && (
          <Row>
            <Col xl={12}>
              <Card className="dashboard-card">
                <CardBody>
                  <Breadcrumbsub
                    title={reportTitle}
                    breadcrumbItem={
                      <Dropdown
                        isOpen={btnprimary1}
                        toggle={() => setBtnprimary1(!btnprimary1)}
                      >
                        <DropdownToggle tag="button" className="dark-button">
                          <Download />
                        </DropdownToggle>
                        <DropdownMenu>
                          <ExportCSV data={tableData} title={reportTitle} />
                          <DropdownItem
                            onClick={() => setIsMaximized(!isMaximized)}
                          >
                            {isMaximized ? 'Minimize' : 'Maximize'}
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    }
                  />
                  <div
                    style={{
                      transition: 'all 0.3s ease',
                      height: isMaximized ? 'calc(100vh - 200px)' : '400px',
                      overflow: 'auto',
                    }}
                  >
                    <MaterialTable
                      data={tableData}
                      columns={columns}
                      hidecolumn={hidecolumn}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        <ModalLoading
          isOpen={openLoader}
          onClose={() => {
            setOpenLoader(false)
          }}
        />

        <style>{`
          .dark-dashboard {
            background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
            position: relative;
            overflow: hidden;
          }

          .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 25%),
              radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 25%);
            pointer-events: none;
          }

          .dashboard-card {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 16px;
            border: 1px solid rgba(56, 189, 248, 0.1);
          }

          .dark-label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #7dd3fc;
            margin-bottom: 0.2rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .dark-input {
            height: 3.4rem;
            border-radius: 16px;
            border: 2px solid rgba(56, 189, 248, 0.2);
            padding: 0 1rem;
            font-size: 1rem;
            transition: all 0.2s ease;
            background: rgba(15, 23, 42, 0.8);
            color: #f0f9ff;
            width: 100%;
          }

          .dark-input:focus {
            border-color: #38bdf8;
            box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
            outline: none;
          }

          .dark-button {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: white;
            border: none;
            border-radius: 16px;
            padding: 1rem 2.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 1.5rem;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.2);
            margin-top: 2rem;
          }

          .dark-button:hover:not(:disabled) {
            background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 12px -1px rgba(56, 189, 248, 0.3);
          }

          .main-title {
            font-size: 1.5rem;
            color: #f0f9ff;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          .header-description {
            color: #bae6fd;
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }

          @media (max-width: 768px) {
            .dark-dashboard {
              padding: 1rem;
            }

            .dark-button {
              width: 100%;
              justify-content: center;
            }
          }
        `}</style>
      </div>
    );
  };


export default CreateChart;
const chartList = [
  "Bar Chart",
  "Bar Chart with group",
  // "Line Chart",
  "Doughnut chart",
  "Pie Chart",
  // "Radial Chart",
  "Table",
  "Table Chart",
  "Table Cluster",
];













// import { CheckBox, Download } from "@mui/icons-material";
// import React, { useEffect, useState } from "react";
// import {
//   Backdrop,
//   Checkbox,
//   CircularProgress,
//   FormControl,
//   FormHelperText,
//   ListItemText,
//   MenuItem,
//   OutlinedInput,
//   Select,
// } from "@mui/material";

// import ReactGridLayout from "react-grid-layout";
// import { Link, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   Col,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   Row,
// } from "reactstrap";

// import Breadcrumbs, { Breadcrumbsub } from "../../components/Common/Breadcrumb";
// import Loader from "../../components/Common/loader";
// import ApiEndPoints from "../../Network_call/ApiEndPoints";
// import ApiServices from "../../Network_call/apiservices";
// import MaterialTable from "../Tables/Table";
// import {
//   Columns,
//   deepKeys,
//   flattenObj,
//   getFields,
//   hidencolumn,
// } from "../ulit/commonFunction";
// import ExportCSV from "../ulit/exportCSV";

// // Custom styled components
// const DarkPaper = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#1a2035',
//   color: '#fff',
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(2),
//   border: '1px solid #2d3748'
// }));

// const DarkSelect = styled(Select)(({ theme }) => ({
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#2d3748',
//   },
//   '&:hover .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#3182ce',
//   },
//   '& .MuiSelect-icon': {
//     color: '#fff',
//   },
//   backgroundColor: '#1e2538',
//   color: '#fff',
// }));

// const DarkTextField = styled(TextField)(({ theme }) => ({
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: '#2d3748',
//     },
//     '&:hover fieldset': {
//       borderColor: '#3182ce',
//     },
//     '& input': {
//       color: '#fff',
//     },
//   },
//   '& .MuiInputLabel-root': {
//     color: '#a0aec0',
//   },
//   backgroundColor: '#1e2538',
// }));

// const DarkSwitch = styled(Switch)(({ theme }) => ({
//   '& .MuiSwitch-switchBase.Mui-checked': {
//     color: '#3182ce',
//   },
//   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//     backgroundColor: '#2c5282',
//   },
// }));

// const CreateChart = ({ dashboardId, updateFun }) => {
//     const [reportList, setReportList] = useState([]);
//     const [reportData, setReportData] = useState([]);
//     const [checkbox, setCheckbox] = useState([]);
//     const [btnprimary1, setBtnprimary1] = useState(false);
//     const [openLoader, setOpenLoader] = React.useState(false);
//     const [chartData, setChartData] = useState([]);
//     const [reportTitle, setReportTitle] = useState("");
//     const [loader, setLoader] = useState(false);
//     const [switchCSVData, setSwitchCSVData] = useState(false);
//     const [isMaximized, setIsMaximized] = useState(false);
//     const [CSVDataList, setCSVDataList] = useState([]);
//     const [chartTitle, setChartTitle] = useState({
//       charttitle: "",
//       chartType: "Bar Chart",
//     });
//     const [tableId, setTableId] = useState("");
//     const [tableData, setTableData] = useState([]);
//     const [userData, setUserData] = React.useState({
//       email: "",
//       dbName: "",
//       user_id: "",
//     });
//     useEffect(() => {
//       let userObject = localStorage.getItem("authUser");
//       var userInfo = userObject ? JSON.parse(userObject) : "";
//       setUserData(() => ({
//         email: userInfo.email,
//         dbName: userInfo.dbName,
//         user_id: userInfo._id,
//       }));
//       const userReport = localStorage.getItem("report");
//       var userReportData = userReport ? JSON.parse(userReport) : [];
//       setReportList(userReportData);
//       getCSVDataList({ user_id: userInfo._id, dbName: userInfo.dbName });
//     }, []);

//     useEffect(() => {
//       setCheckbox([]);
//       setReportData([]);
//       setChartData([]);
//       setTableData([]);
//     }, [dashboardId]);
//     // ############################################ get report data ########################################

//     const HandleReportChange = async (event) => {
//       setOpenLoader(true);
//       let payload = {
//         info: { dbName: userData.dbName },
//         data: { report_id: event.target.value, user_id: userData.user_id },
//       };
//       const response = await ApiServices(
//         "post",
//         payload,
//         ApiEndPoints.GetReportData
//       );
//       if (response) {
//         setReportData(response?.data);
//       }
//       // setCheckbox([]);
//       setChartTitle({ charttitle: "", chartType: "" });
//       setOpenLoader(false);
//     };
//     // ############################################ data for report  ########################################

//     const getTableData = () => {
//       reportData
//         .filter((id) => id._id === tableId)
//         .map((data) => setTableData(data.data) + setReportTitle(data.title));
//     };

//     var keys = tableData && Array.from(deepKeys(tableData[0]));
//     var columns = tableData && Columns(keys);
//     // tableData &&
//     // keys.map((name) => ({
//     //   accessorKey: name,
//     //   header: name,
//     // }));

//     const hidecolumn = keys && hidencolumn(keys);
//     // ############################################ handek checkbox ########################################

//     const handleCheckboxChange = (e) => {
//       if (e.target.checked) {
//         setCheckbox((prev) => [...prev, e.target.value]);
//       } else {
//         setCheckbox(checkbox.filter((item) => item !== e.target.value));
//       }
//     };

//     useEffect(() => {
//       postData();
//     }, [checkbox]);
//     const postData = () => {
//       const flatData = tableData && tableData.map((i) => flattenObj(i));
//       const datafilter = checkbox.map((item, index) => getFields(flatData, item));
//       // setChartData(datafilter);
//     };
//     // ############################################ get csv data list ########################################

//     const getCSVDataList = async ({ dbName, user_id }) => {
//       setOpenLoader(true);
//       let payload = {
//         dbName: dbName,
//         user_id: user_id,
//       };
//       // const response = await ApiServices("post", payload, ApiEndPoints.FileList);

//       // setCSVDataList(response?.data);
//       // setOpenLoader(false);
//     };
//     // ############################################ get csv data list ########################################

//     const getCSVData = async (event) => {
//       const id = event.target.value;
//       const document_name =
//         event.target.options[event.target.selectedIndex].dataset.additionalData;
//       setOpenLoader(true);
//       let payload = {
//         dbName: userData.dbName,
//         user_id: userData.user_id,
//         _id: id,
//         document_name: document_name,
//       };
//       const response = await ApiServices("post", payload, ApiEndPoints.FileGet);
//       if (response.data) {
//         setTableData(response.data[0]?.data);
//       }
//       toast(response.msg, { autoClose: 2000 });
//       setOpenLoader(false);
//     };

//     // ############################################ handek checkbox ########################################

//     const createChart = async (item) => {
//       setOpenLoader(true);

//       let payload = {
//         info: {
//           dbName: userData.dbName,
//           dashboard_id: dashboardId,
//           user_id: userData.user_id,
//           type: chartTitle.chartType,
//           title: chartTitle.charttitle,
//           column: checkbox,
//         },
//         data: { data: tableData },
//       };
//       const respons = await ApiServices(
//         "post",
//         payload,
//         ApiEndPoints.AddDashboardData
//       );
//       toast(respons.msg);
//       setCheckbox([]);
//       setChartTitle({ charttitle: "", chartType: "Bar Chart" });
//       updateFun(dashboardId);
//       setOpenLoader(false);
//     };

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', p: 3 }}>
//       <DarkPaper>
//         <Box sx={{ mb: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
//             <DarkSwitch
//               checked={switchCSVData}
//               onChange={(e) => setSwitchCSVData(e.target.checked)}
//             />
//             <Typography color="text.secondary">Get CSV Data</Typography>
//           </Box>

//           {!switchCSVData ? (
//             <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { md: '1fr 1fr' } }}>
//               <FormControl fullWidth>
//                 <Typography color="text.secondary" sx={{ mb: 1 }}>
//                   Select Report
//                 </Typography>
//                 <DarkSelect
//                   value=""
//                   onChange={HandleReportChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="">Select Report</MenuItem>
//                   {reportList?.map((item, index) => (
//                     <MenuItem key={item._id} value={item._id}>
//                       {`${index + 1}. ${item.reportName}`}
//                     </MenuItem>
//                   ))}
//                 </DarkSelect>
//               </FormControl>

//               <FormControl fullWidth>
//                 <Typography color="text.secondary" sx={{ mb: 1 }}>
//                   Select Table
//                 </Typography>
//                 <DarkSelect
//                   value={tableId}
//                   onChange={(e) => setTableId(e.target.value)}
//                   displayEmpty
//                 >
//                   <MenuItem value="">Select Table</MenuItem>
//                   {reportData?.map((i) => (
//                     <MenuItem key={i._id} value={i._id}>
//                       {i.title}
//                     </MenuItem>
//                   ))}
//                 </DarkSelect>
//               </FormControl>

//               <Box>
//                 <button
//                   onClick={getTableData}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                 >
//                   Submit
//                 </button>
//               </Box>
//             </Box>
//           ) : (
//             <FormControl fullWidth>
//               <Typography color="text.secondary" sx={{ mb: 1 }}>
//                 Select CSV Table
//               </Typography>
//               <DarkSelect
//                 onChange={getCSVData}
//                 displayEmpty
//               >
//                 <MenuItem value="">Select Table</MenuItem>
//                 {CSVDataList?.map((i) => (
//                   <MenuItem
//                     key={i._id}
//                     value={i._id}
//                     data-additional-data={i.document_name}
//                   >
//                     {i.document_name}
//                   </MenuItem>
//                 ))}
//               </DarkSelect>
//             </FormControl>
//           )}
//         </Box>
//       </DarkPaper>

//       {tableData.length > 0 && keys?.length > 0 && (
//         <DarkPaper>
//           <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { md: '1fr 1fr' } }}>
//             <DarkPaper elevation={3}>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Select Columns
//               </Typography>
//               <Typography color="text.secondary" sx={{ mb: 2 }}>
//                 Select columns to create the new chart
//               </Typography>
//               <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
//                 {keys?.map((key) => (
//                   <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <Checkbox
//                       checked={checkbox.includes(key)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setCheckbox(prev => [...prev, key]);
//                         } else {
//                           setCheckbox(prev => prev.filter(k => k !== key));
//                         }
//                       }}
//                       sx={{
//                         color: '#3182ce',
//                         '&.Mui-checked': {
//                           color: '#3182ce',
//                         },
//                       }}
//                     />
//                     <Typography>{key}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </DarkPaper>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               <FormControl fullWidth>
//                 <Typography color="text.secondary" sx={{ mb: 1 }}>
//                   Chart Type
//                 </Typography>
//                 <DarkSelect
//                   value={chartTitle.chartType}
//                   onChange={(e) => setChartTitle(prev => ({...prev, chartType: e.target.value}))}
//                 >
//                   {chartList.map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </DarkSelect>
//               </FormControl>

//               <FormControl fullWidth>
//                 <Typography color="text.secondary" sx={{ mb: 1 }}>
//                   Chart Title
//                 </Typography>
//                 <DarkTextField
//                   placeholder="Enter Chart Title"
//                   value={chartTitle.charttitle}
//                   onChange={(e) => setChartTitle(prev => ({...prev, charttitle: e.target.value}))}
//                   fullWidth
//                 />
//               </FormControl>

//               <button
//                 onClick={createChart}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//               >
//                 Create Chart
//               </button>
//             </Box>
//           </Box>
//         </DarkPaper>
//       )}

//       {tableData.length > 0 && (
//         <DarkPaper>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h6">{reportTitle}</Typography>
//             <IconButton
//               onClick={() => setIsMaximized(!isMaximized)}
//               sx={{ color: '#fff' }}
//             >
//               <Download />
//             </IconButton>
//           </Box>
//           <Box
//             sx={{
//               height: isMaximized ? 'calc(100vh - 200px)' : '400px',
//               overflow: 'auto',
//               transition: 'height 0.3s ease'
//             }}
//           >
//             {tableData.length > 0 && (
//         <Row>
//           <Col xl={12}>
//             <Card>
//               <CardBody>
//                 <Breadcrumbsub
//                   title={reportTitle}
//                   breadcrumbItem={
//                     <Dropdown
//                       isOpen={btnprimary1}
//                       toggle={() => setBtnprimary1(!btnprimary1)}
//                     >
//                       <DropdownToggle tag="button" className="btn">
//                         <Download />
//                       </DropdownToggle>
//                       <DropdownMenu>
//                         <ExportCSV data={tableData} title={reportTitle} />
//                         <DropdownItem
//                           onClick={() => setIsMaximized(!isMaximized)}
//                         >
//                           {isMaximized ? "Minimize" : "Maximize"}
//                         </DropdownItem>
//                       </DropdownMenu>
//                     </Dropdown>
//                   }
//                 />
//                 <div
//                   style={{
//                     transition: "all 0.3s ease",
//                     height: isMaximized ? "calc(100vh - 200px)" : "400px",
//                     overflow: "auto",
//                   }}
//                 >
//                   <MaterialTable
//                     data={tableData}
//                     columns={columns}
//                     hidecolumn={hidecolumn}
//                   />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       )}
//             {/* Table component goes here */}
//           </Box>
//         </DarkPaper>
//       )}

//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={openLoader}
//         onClick={() => setOpenLoader(false)}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </Box>
//   );
// };

// export default CreateChart;

// const chartList = [
//   "Bar Chart",
//   "Bar Chart with group",
//   "Doughnut chart",
//   "Pie Chart",
//   "Table",
//   "Table Chart",
//   "Table Cluster",
// ];