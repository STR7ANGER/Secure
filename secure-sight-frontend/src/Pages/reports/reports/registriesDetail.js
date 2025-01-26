import React from "react";
import { useLocation } from "react-router-dom/dist";

import {
  Card,
  CardBody,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import DonutOfSmartChecks from "../../Dashboard/dashboard/charts/donutForSmartChecks";
import { Bolt, FindInPage, ListOutlined } from "@mui/icons-material"; 
import {  Typography } from "@mui/material"; 
import ScanCompletion from "../../Dashboard/dashboard/charts/scanCompletion";
import SmartScanCard from "../../Dashboard/dashboard/charts/smartCheckCard";
 
const RegistriesDetails = () => {
  // document.title = "Report | trend micro unity";
  document.title = "Report | Secure Sight";
  const location = useLocation();
  const { data, id } = location.state;
  const newData = data && data.filter((i) => i._source.name === id).pop();

  //   useEffect(() => {
  //     getData();
  //   }, [data, id]);

  //   const getData = async () => {
  //     setOpenLoader(true);
  //     const payload = { index: "smart-check-scans", id: { id: id } };
  //     const response = await ApiServices(
  //       "post",
  //       payload,
  //       ApiEndPoints.SmartScanDetail
  //     );

  //     response && setData(response?._source);
  //     setOpenLoader(false);
  //   };

  const dashboardRef = React.useRef();
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Smart Checks" breadcrumbItem="Scan Details" />
          {/* <Card> */}
          {/* <Breadcrumbs title="Scan Details" breadcrumbItem={id} /> */}
          {/* <CardBody>
              <Row>
                <Col xl={9}>
                  <h4> {data?.name}</h4>
                </Col>
                <Col>
                  <h5> {data?.status}</h5>
                  <h5 style={{ color: "gray" }}>{data?.details?.updated}</h5>
                </Col>
              </Row> */}
          <Typography variant="h4">{newData?._source?.name}</Typography>
          <div className="smartscancardlayout">
            <Card>
              <CardBody>
                <ScanCompletion
                  icon={<Bolt />}
                  title="Scan Completion"
                  data={newData && newData?._source?.metrics?.scans}
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <DonutOfSmartChecks
                  icon={<Bolt />}
                  title="Malware"
                  data={newData && newData?._source?.metrics}
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <DonutOfSmartChecks
                  data={newData && newData?._source?.metrics}
                  icon={<Bolt />}
                  title="Vulnerabilities"
                  column={"vulnerabilities"}
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <DonutOfSmartChecks
                  data={newData && newData?._source?.metrics}
                  icon={<FindInPage />}
                  title="Content Findings"
                  column={"contents"}
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <DonutOfSmartChecks
                  data={newData && newData?._source?.metrics}
                  icon={<ListOutlined />}
                  title="Checklists"
                  column={"checklists"}
                />
              </CardBody>
            </Card>
            {data &&
              Object.keys(newData?._source?.metrics?.content)?.map(
                (item, index) => (
                  <SmartScanCard
                    data={newData?._source?.metrics?.content[item]}
                    title={item}
                  />
                )
              )}
            {data &&
              Object.keys(newData?._source?.metrics.history)?.map(
                (item, index) => (
                  <SmartScanCard
                    data={newData?._source?.metrics?.history[item]?.scans}
                    title={
                      item == ("1d" || "1D")
                        ? "Scans last 24 hours"
                        : "Scans last 7 Day"
                    }
                  />
                )
              )}
          </div>
          {/* </CardBody>
          </Card> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegistriesDetails;

