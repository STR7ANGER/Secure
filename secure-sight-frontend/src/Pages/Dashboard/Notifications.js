// import React from "react";
// import { Link } from "react-router-dom";

// //SimpleBar
// import SimpleBar from "simplebar-react";


// import { Card, CardBody, CardTitle, Col } from "reactstrap";

// import { NotificationsData } from "../../CommonData/Data/index";

// const Notifications = () => {
//   return (
//     <React.Fragment>
//       <Col lg={4}>
//         <Card>
//           <CardBody>
//             <CardTitle>Notifications</CardTitle>

//             <div className="pe-3">
//               <SimpleBar style={{ maxHeight: "287px" }}>
//                 {NotificationsData.map((item, key) => (
//                   <Link key={key} to="#" className="text-body d-block">
//                     <div className="d-flex py-3">
//                       <div className="flex-shrink-0 me-3 align-self-center">
//                         {item.src ? (
//                           <img
//                             className="rounded-circle avatar-xs"
//                             alt=""
//                             src={item.src}
//                           />
//                         ) : (
//                           <div className="avatar-xs">
//                             <span className="avatar-title bg-soft-primary rounded-circle text-primary">
//                               <i className={item.icon}></i>
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex-grow-1 overflow-hidden">
//                         <h5 className="font-size-14 mb-1">{item.name}</h5>
//                         <p className="text-truncate mb-0">{item.desc}</p>
//                       </div>
//                       <div className="flex-shrink-0 font-size-13">
//                         {item.time}
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </SimpleBar>
//             </div>
//           </CardBody>
//         </Card>
//       </Col>
//     </React.Fragment>
//   );
// };
// export default Notifications;
