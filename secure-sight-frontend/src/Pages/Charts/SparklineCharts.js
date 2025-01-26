// import React from "react";
// import { Container, Col, Row, Card, CardBody, CardTitle } from "reactstrap";

// // Import SparkLine Chart
// import { Sparklines, SparklinesLine, SparklinesBars } from "react-sparklines";

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";

// const Sparklinechart = () => {
//   document.title = "Sparkline Charts | Upzet - React Admin & Dashboard Template";
//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid={true}>
//           <Breadcrumbs title="Charts" breadcrumbItem="Sparkline Charts" />
//           <Row>
//             <Col xl={6}>
//               <Card>
//                 <CardBody>
//                   <CardTitle>Line Chart</CardTitle>
//                   <p className="card-title-desc">
//                     Example of line sparkline chart.
//                   </p>
//                   <div id="sparkline1">
//                     <Sparklines data={[46, 38, 43, 35, 44, 45, 52, 40]}>
//                       <SparklinesLine
//                         color="#3d8ef8"
//                         fill="'rgba(61, 142, 248, 0.3)"
//                         lineWidth="1"
//                       />
//                     </Sparklines>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>

//             <Col xl={6}>
//               <Card>
//                 <CardBody>
//                   <CardTitle>Bar Chart</CardTitle>
//                   <p className="card-title-desc">
//                     Example of bar sparkline chart.
//                   </p>
//                   <div id="sparkline2" className="text-center">
//                     <Sparklines
//                       data={[
//                         9, 8, 7, 8, 6, 11, 5, 7, 9, 6, 4, 7, 11, 13, 9, 12,
//                       ]}
//                     >
//                       <SparklinesBars
//                         style={{
//                           stroke: "white",
//                           strokeWidth: "1",
//                           fill: "#40c0f5",
//                           barWidth: "10",
//                           barSpacing: "3",
//                           barColor: "#0db4d6",
//                         }}
//                       />
//                     </Sparklines>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           <Row>
//             <Col xl={6}>
//               <Card>
//                 <CardBody>
//                   <CardTitle>Mouse Speed Chart</CardTitle>
//                   <p className="card-title-desc">
//                     Example of mouse speed sparkline chart.
//                   </p>
//                   <div id="sparkline4" className="text-center">
//                     <Sparklines
//                       data={[
//                         9, 8, 7, 8, 6, 11, 5, 7, 9, 6, 4, 7, 11, 13, 9, 12,
//                       ]}
//                       limit={5}
//                     >
//                       <SparklinesLine
//                         style={{
//                           stroke: "none",
//                           fill: "#3d8ef8",
//                           fillOpacity: "0.5",
//                         }}
//                       />
//                     </Sparklines>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>

//             <Col xl={6}>
//               <Card>
//                 <CardBody>
//                   <CardTitle>Composite Bar Chart</CardTitle>
//                   <p className="card-title-desc">
//                     Example of composite bar sparkline chart.
//                   </p>
//                   <div id="sparkline5" className="text-center">
//                     <Sparklines
//                       data={[
//                         9, 8, 7, 8, 6, 11, 5, 7, 9, 6, 4, 7, 11, 13, 9, 12,
//                       ]}
//                       limit={14}
//                     >
//                       <SparklinesBars
//                         style={{
//                           fill: "#3d8ef8",
//                           width: "10px",
//                           Spacing: "5px",
//                           composite: true,
//                         }}
//                       />
//                       <SparklinesLine
//                         style={{
//                           stroke: "#11c46e",
//                           fill: "rgba(17, 196, 110)",
//                         }}
//                       />
//                     </Sparklines>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Sparklinechart;
