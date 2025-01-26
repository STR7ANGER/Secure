import { Fragment, useEffect, useRef, useState } from "react";


import {
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import ApiServices from "../../Network_call/apiservices";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import PieChart from "../usedCharts/pieChart";
import DonutChart from "../usedCharts/donutChart";
import LineChart from "../usedCharts/lineChart";
import BarChart from "../usedCharts/barChart";
import ReactGridLayout from "react-grid-layout";
import RadialChart from "../usedCharts/radialChart";
import EditModals, {
  RawDataModel,
} from "../../components/Common/editModel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CostomDropdow from "../../components/Common/costomDropdown";
import CreateChart from "./d";
import "./index.css";
import BarChartWithGroup from "../usedCharts/barChartWithGroup";
import { MaterialTableBasic } from "../Tables/Table";
import DashboardTable from "../Tables/tableChart";
import DashboardTableCluster from "../Tables/clousterTable";
import { DashboardList, ReportList } from "../ulit/dashboardlist";
import DeleteModal from "../../components/Common/DeleteModal";
import ModalLoading from "../../components/modal-loading";
// import './dark-theme.css';
const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(
  ReactGridLayout.Responsive
);
const Dashboard = () => {
  let param = useParams();
  // document.title = "Dashboard | trend micro unity";
  document.title = "Dashboard | Secure Sight";
  const [deleteModal, setDeleteModal] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [dashboardId, setDashboardId] = useState("");
  const [chartTitle, setChartTitle] = useState("");
  const [chartId, setChartId] = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    dbName: "",
    user_id: "",
  });

  const dashboardRef = useRef();


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
    const userDashboard = localStorage.getItem("dashboard");
    var userDashboardData = userDashboard ? JSON.parse(userDashboard) : [];
    const dashboardId =
      userDashboardData &&
      userDashboardData
        .filter((i) => i.dashboardName == param.id)
        .map((i) => i._id);
    setDashboardId(dashboardId[0]);
    GetDashboaesData(dashboardId[0]);
  }, [param.id, userData]);

  //   ############################################ dashboard layout ##########################################
  const layout =
    dashboardData &&
    dashboardData.map((item, index) => {
      return {
        i: item._id,
        x: `${index}` % 2 == 0 ? 0 : 6,
        y: 0,
        w:
          item.type === "Table" ||
            item.type === "Table Chart" ||
            item.type === "Table Cluster"
            ? 12
            : 5,
        h:
          item.type === "Table" ||
            item.type === "Table Chart" ||
            item.type === "Table Cluster"
            ? 3
            : 3,
      };
    });

  //   ############################################ dashboard list ##########################################

  const GetDashboaesData = async (item) => {
    setOpenLoader(true);
    setDashboardData([]);
    let payload = {
      info: { dbName: userData.dbName },
      data: { dashboard_id: item, user_id: userData.user_id },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.GetDashboardData
    );
    setDashboardData(response.data);
    setOpenLoader(false);
  };
  //   ############################################ chart change title ##########################################
  const OpenEditModel = ({ id, title }) => {
    setChartTitle(title);
    setChartId(id);
    setEditModal(true);
  };
  const chartTitleChange = (e) => {
    setChartTitle(e.target.value);
  };

  const UpdateChartTitle = async (item) => {
    setOpenLoader(true);
    let payload = {
      info: {
        dbName: userData.dbName,
        user_id: userData.user_id,
        table_id: chartId,
        dashboard_id: dashboardId,
      },
      data: { title: chartTitle },
    };
    const response = await ApiServices(
      "post",
      payload,
      ApiEndPoints.UpdateDashboardTitle
    );
    setEditModal(false);
    toast(response.msg);
    GetDashboaesData(dashboardId);
    setOpenLoader(false);
  };
  //   ############################################ chart delete  ##########################################

  const OpenDeleteModel = (item) => {
    setChartId(item);
    setDeleteModal(true);
  };
  const DeleteDashData = async () => {
    setOpenLoader(true);
    let payload = {
      dbName: userData.dbName,
      user_id: userData.user_id,
      dashboard_id: dashboardId,
      id: chartId,
    };
    const respons = await ApiServices("post", payload, ApiEndPoints.DeleteData);
    toast(respons.msg);
    setDeleteModal(false);
    GetDashboaesData(dashboardId);
    setOpenLoader(false);
  };
  const habndelClose = () => {
    setOpen(false);
  };
  const HadndelOpen = () => {
    // setRowData(data);
    setOpen(true);
  };
  const OpenRowDataModel = (item) => {
    setRowData(item);
    setOpen(true);
  };

  return (
    <Fragment>
      <div className="page-content">
        <ToastContainer />
        <Breadcrumbs title="Dashboard" breadcrumbItem={param.id} />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={DeleteDashData}
          onCloseClick={() => setDeleteModal(false)}
        />
        <EditModals
          title="Edit Chart Title"
          show={editModal}
          onCloseClick={() => setEditModal(false)}
          onClick={UpdateChartTitle}
          value={chartTitle}
          onInputChange={chartTitleChange}
        />

        <RawDataModel data={rowData} open={open} habndelClose={habndelClose} />
        <CreateChart dashboardId={dashboardId} updateFun={GetDashboaesData} />
        {/* <Map markerData={markerData} /> */}
        <Row>
          <ResponsiveReactGridLayout
            layouts={{ lg: layout }}
            measureBeforeMount={true}
            className="layout"
            isDragable={true}
            isResizable={true}
            ref={dashboardRef}
            margin={[20, 20]}
          >
            {dashboardData &&
              dashboardData
                .filter((i) => i.type === "Pie Chart")
                .map((i) => (
                  <div key={i._id}>
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <CostomDropdow
                            i={i}
                            OpenEditModel={OpenEditModel}
                            OpenDeleteModel={OpenDeleteModel}
                            OpenRowDataModel={OpenRowDataModel}
                            RawData={true}
                          />
                          <PieChart data={i} key={i._id} />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                ))}
            {dashboardData &&
              dashboardData
                .filter((i) => i.type === "Radial Chart")
                .map((i) => (
                  <div key={i._id}>
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <CostomDropdow
                            i={i}
                            OpenEditModel={OpenEditModel}
                            OpenDeleteModel={OpenDeleteModel}
                            RawData={true}
                          />

                          <RadialChart data={i} key={i._id} />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                ))}
            {dashboardData &&
              dashboardData
                .filter((i) => i.type === "Table Chart")
                .map((i) => (
                  <div key={i._id}>
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <CostomDropdow
                            i={i}
                            OpenEditModel={OpenEditModel}
                            OpenDeleteModel={OpenDeleteModel}
                            RawData={true}
                          />
                          <DashboardTable data={i} key={i._id} />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                ))}
            {dashboardData &&
              dashboardData
                .filter((i) => i.type === "Table Cluster")
                .map((i) => (
                  <div key={i._id}>
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <CostomDropdow
                            i={i}
                            OpenEditModel={OpenEditModel}
                            OpenDeleteModel={OpenDeleteModel}
                            RawData={true}
                          />
                          <DashboardTableCluster data={i} key={i._id} />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                ))}
            {dashboardData &&
              dashboardData
                .filter((i) => i.type === "Doughnut chart")
                .map((i) => (
                  <div key={i._id}>
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <CostomDropdow
                            i={i}
                            OpenEditModel={OpenEditModel}
                            OpenDeleteModel={OpenDeleteModel}
                            RawData={true}
                          />
                          <DonutChart data={i} />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                ))}
            {dashboardData &&
              dashboardData
                .filter((i) => i.type === "Line Chart")
                .map((i) => (
                  <div key={i._id}>
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <CostomDropdow
                            i={i}
                            OpenEditModel={OpenEditModel}
                            OpenDeleteModel={OpenDeleteModel}
                            RawData={true}
                          />
                          <LineChart data={i} />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                ))}
            {dashboardData &&
              dashboardData
                .filter((i) => i.type === "Bar Chart")
                .map((i) => (
                  <div key={i._id}>
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <CostomDropdow
                            i={i}
                            OpenEditModel={OpenEditModel}
                            OpenDeleteModel={OpenDeleteModel}
                            RawData={true}
                          />
                          {/* <MixBarChart data={i.data} columns={i.columns} /> */}
                          <BarChart data={i} />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                ))}
            {dashboardData &&
              dashboardData
                .filter((i) => i.type === "Bar Chart with group")
                .map((i) => (
                  <div key={i._id}>
                    <Col xl={12}>
                      <Card>
                        <CardBody>
                          <CostomDropdow
                            i={i}
                            OpenEditModel={OpenEditModel}
                            OpenDeleteModel={OpenDeleteModel}
                            RawData={true}
                          />
                          <BarChartWithGroup data={i} />
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                ))}
          </ResponsiveReactGridLayout>
          {dashboardData && dashboardData
            .filter((i) => i.type === "Table")
            .map((i) => (
              <div key={i._id}>
                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <CostomDropdow
                        i={i}
                        OpenEditModel={OpenEditModel}
                        OpenDeleteModel={OpenDeleteModel}
                      />
                      <MaterialTableBasic data={i} />
                    </CardBody>
                  </Card>
                </Col>
              </div>
            ))
          }
        </Row>
      </div>
      <ModalLoading
        isOpen={openLoader}
        onClose={() => setOpenLoader(false)}
      />
    </Fragment>
  );
};

export default Dashboard;

const markerData = [
  {
    latLng: [41.9, 12.45],
    name: "GCP",
  },
  {
    latLng: [43.73, 7.41],
    name: "GCP",
  },
  {
    latLng: [-0.52, 166.93],
    name: "GCP",
  },
  {
    latLng: [-8.51, 179.21],
    name: "GCP",
  },
  {
    latLng: [43.93, 12.46],
    name: "GCP",
  },
  {
    latLng: [47.14, 9.52],
    name: "GCP",
  },
  {
    latLng: [7.11, 171.06],
    name: "GCP",
  },
  {
    latLng: [17.3, -62.73],
    name: "GCP",
  },
  {
    latLng: [3.2, 73.22],
    name: "AWS",
  },
  {
    latLng: [35.88, 14.5],
    name: "AWS",
  },
  {
    latLng: [12.05, -61.75],
    name: "AWS",
  },
  {
    latLng: [13.16, -61.23],
    name: "AWS",
  },
  {
    latLng: [13.16, -59.55],
    name: "AWS",
  },
  {
    latLng: [17.11, -61.85],
    name: "AWS",
  },
  {
    latLng: [-4.61, 55.45],
    name: "AWS",
  },
  {
    latLng: [7.35, 134.46],
    name: "AWS",
  },
  {
    latLng: [42.5, 1.51],
    name: "AWS",
  },
  {
    latLng: [14.01, -60.98],
    name: "AWS",
  },
  {
    latLng: [6.91, 158.18],
    name: "AWS",
  },
  {
    latLng: [1.3, 103.8],
    name: "AZURE",
  },
  {
    latLng: [1.46, 173.03],
    name: "AZURE",
  },
  {
    latLng: [-21.13, -175.2],
    name: "AZURE",
  },
  {
    latLng: [15.3, -61.38],
    name: "AZURE",
  },
  {
    latLng: [-20.2, 57.5],
    name: "AZURE",
  },
  {
    latLng: [26.02, 50.55],
    name: "AZURE",
  },
  {
    latLng: [0.33, 6.73],
    name: "AZURE",
  },
];

const processData = (data) => {
  const providers = {};
  const labels = ["Low", "Medium", "High"];
  const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
  ];

  data.forEach((item) => {
    const provider = item.provider.value;
    const riskLevel = item.pretty_risk_level;

    if (!providers[provider]) {
      providers[provider] = {
        low: 0,
        medium: 0,
        high: 0,
      };
    }

    providers[provider][riskLevel.toLowerCase()]++;
  });

  const datasets = Object.entries(providers).map(([provider, counts], i) => {
    return {
      label: provider,
      data: Object.values(counts),
      backgroundColor: colors[i],
    };
  });

  return {
    labels,
    datasets,
  };
};
