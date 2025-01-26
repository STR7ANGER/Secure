import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Row, Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CostomDropdow from "../../components/Common/costomDropdown";
import EditModals, {
  EditHeaderModals,
  ReorderColumnsModels,
} from "../../components/Common/editModel";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
import { DashboardList, ReportList } from "../ulit/dashboardlist";
import CreateSubReport from "./createSubReport";
import UserReport from "./userReport";
import DeleteModal from "../../components/Common/DeleteModal";

const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(
  ReactGridLayout.Responsive
);

const Report = () => {
  // document.title = "Report | trend micro unity";
  document.title = "Report | Secure Sight";
  let param = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openLoader, setOpenLoader] = React.useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editHeaderModal, setEditHeaderModal] = useState(false);
  const [reorderHeaderModal, setReorderHeaderModal] = useState(false);
  const [reportData, setReportData] = React.useState([]);
  const [report_id, setReport_id] = React.useState("");
  const [tableData, setTableData] = React.useState({
    title: "",
    Id: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [headerEdit, setHeaderEdit] = React.useState({
    column: [],
    data: [],
    headerName: [],
  });
  const [userData, setUserData] = React.useState({
    email: "",
    dbName: "",
    user_id: "",
  });

  const reportRef = React.useRef();

  useEffect(() => {
    let userObject = localStorage.getItem("authUser");
    var userInfo = userObject ? JSON.parse(userObject) : "";

    setUserData(() => ({
      email: userInfo.email,
      dbName: userInfo.dbName,
      user_id: userInfo._id,
    }));
    ReportList({
      dbName: userInfo.dbName,
      userId: userInfo._id,
      reload: false,
    });
    DashboardList({
      dbName: userInfo.dbName,
      userId: userInfo._id,
      reload: false,
    });
  }, []);

  useEffect(() => {
    const userReport = localStorage.getItem("report");
    var userReportData = userReport ? JSON.parse(userReport) : [];
    const reportid =
      userReportData &&
      userReportData.filter((i) => i.reportName == param.id).map((i) => i._id);
    setReport_id(reportid[0]);
    GetReportData(reportid[0]);
  }, [param.id, userData]);
  //   ############################################ report list ##########################################
  const GetReportData = async (item) => {
    setOpenLoader(true);
    setReportData([]);
    setTableData({ title: "", Id: "" });
    let payload = {
      info: { dbName: userData.dbName },
      data: { report_id: item, user_id: userData.user_id },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.GetReportData
    );
    if (response.data) {
      setReportData(response?.data);
    }
    setOpenLoader(false);
  };
  //   ############################################ edit and delete model ##########################################

  const OpenDeleteModel = (item) => {
    setTableData((prev) => ({
      ...prev,
      Id: item,
    }));
    setDeleteModal(true);
  };
  const OpenEditModel = ({ id, title }) => {
    setTableData({
      Id: id,
      title: title,
    });
    setEditModal(true);
  };
  const OpenHeaderEditModel = (Data) => {
    setHeaderEdit({
      headerName: Data.headerName,
      data: Data.data,
      column: Data.column,
    });
    setTableData((prev) => ({
      ...prev,
      Id: Data._id,
    }));
    setEditHeaderModal(true);
  };
  const OpenHeaderReorderModel = (Data) => {
    setHeaderEdit({
      headerName: Data.headerName,
      data: Data.data,
      column: Data.column,
    });
    setTableData((prev) => ({ ...prev, Id: Data._id }));
    setReorderHeaderModal(true);
  };
  const handelEditHeaderChange = (e) => {
    const { name, value } = e.target;
    headerEdit.headerName[name] = value;
  };
  const handelReorderHeader = ({ column, header }) => {
    headerEdit.column = column;
    headerEdit.headerName = header;
  };

  const tableTitleChange = (e) => {
    setTableData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  //   ############################################ edit and delete model ##########################################

  const UpdateTableTitle = async (item) => {
    setOpenLoader(true);
    let payload = {
      info: {
        dbName: userData.dbName,
        user_id: userData.user_id,
        table_id: tableData.Id,
        report_id: report_id,
      },
      data: { title: tableData.title },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.UpdateReportTitle
    );

    toast(response.msg);
    GetReportData(report_id);
    setEditModal(false);
    setOpenLoader(false);
  };
  const UpdateTableData = async (item) => {
    setOpenLoader(true);
    let payload = {
      info: {
        dbName: userData.dbName,
        user_id: userData.user_id,
        id: tableData.Id,
        report_id: report_id,
        column: headerEdit.column,
        headerName: headerEdit.headerName,
      },
      data: { data: headerEdit.data },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.UpdateReportData
    );

    toast(response.msg);
    setReorderHeaderModal(false);
    setEditHeaderModal(false);
    GetReportData(report_id);
    setOpenLoader(false);
  };

  const DeleteReport = async () => {
    setOpenLoader(true);
    let payload = {
      dbName: userData.dbName,
      user_id: userData.user_id,
      report_id: report_id,
      id: tableData.Id,
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.DeleteReportData
    );
    toast(response.msg);
    GetReportData(report_id);
    setDeleteModal(false);
    setOpenLoader(false);
  };
  //   ############################################ export report   ##########################################
  const exportContent = React.useCallback(() => {
    return reportRef.current;
  }, [reportRef.current]);

  //   ############################################ report show ##########################################

  const layout =
    reportData &&
    reportData.map((item) => {
      return { i: item._id, x: 0, y: 0, w: 12, h: 5 };
    });

  return (
    <React.Fragment>
      <ToastContainer />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={DeleteReport}
        onCloseClick={() => setDeleteModal(false)}
      />
      <EditModals
        title="Edit Table Title"
        show={editModal}
        onCloseClick={() => setEditModal(false)}
        onClick={UpdateTableTitle}
        value={tableData.title}
        onInputChange={tableTitleChange}
      />
      <EditHeaderModals
        show={editHeaderModal}
        onCloseClick={() => setEditHeaderModal(false)}
        onClick={UpdateTableData}
        data={headerEdit}
        handelChange={handelEditHeaderChange}
      />
      <ReorderColumnsModels
        data={headerEdit}
        open={reorderHeaderModal}
        habndelClose={() => {
          setReorderHeaderModal();
        }}
        onClick={UpdateTableData}
        onChange={handelReorderHeader}
      />
      <div className="page-content">
        <Breadcrumbs title="Report" breadcrumbItem={param.id} />
        <CreateSubReport reportId={report_id} GetReportData={GetReportData} />
        {/* <ResponsiveReactGridLayout
          layouts={{ lg: layout }}
          measureBeforeMount={true}
          className="layout"
          isDragable={true}
          isResizable={true}
          margin={[0, 25]}
        > */}
        {reportData &&
          reportData.map((data) => (
            <div key={data._id} ref={reportRef}>
              <CostomDropdow
                i={data}
                OpenEditModel={OpenEditModel}
                OpenHeaderEditModel={OpenHeaderEditModel}
                OpenDeleteModel={OpenDeleteModel}
                exportContent={exportContent}
                OpenHeaderReorderModel={OpenHeaderReorderModel}
              />
              <UserReport
                data={data}
                key={data._id}
                userData={userData}
                report_id={report_id}
              />
            </div>
          ))}{" "}
        {/* </ResponsiveReactGridLayout> */}
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

export default Report;
const drrr = [
  "account-id",
  "attributes.rule-title",
  "attributes.service",
  "attributes.provider",
  "attributes.categories",
  "attributes.risk-level",
  "attributes.status",
  "attributes.message",
  "account-details.name",
  "attributes.region",
];
