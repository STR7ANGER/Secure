// import React from 'react';
// import {
//     Card,
//     CardBody,
//     CardTitle,
//     Col,
//     Row,
// } from "reactstrap";

// import { OrderStatusData } from '../../CommonData/Data/index';


// const OrderStatus = () => {
//     return (
//         <React.Fragment>
//             <Col xl={4}>
//                 <Card>
//                     <CardBody>
//                         <CardTitle>Order Stats</CardTitle>
//                         <div>
//                             <ul className="list-unstyled">
//                                 {OrderStatusData.map((item, key) => (<li key={key} className="py-3">
//                                     <div className="d-flex">
//                                         <div className="avatar-xs align-self-center me-3">
//                                             <div className="avatar-title rounded-circle bg-light text-primary font-size-18">
//                                                 <i className={item.icon}></i>
//                                             </div>
//                                         </div>

//                                         <div className="flex-grow-1">
//                                             <p className="text-muted mb-2">{item.title}</p>
//                                             <div className="progress progress-sm animated-progess">
//                                                 <div className={"progress-bar bg-" + item.color} role="progressbar" style={{ width: item.width + "%" }} aria-valuenow={item.width} aria-valuemin="0" aria-valuemax="100"></div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </li>))}
//                             </ul>
//                         </div>
                        
//                         <hr />

//                         <div className="text-center">
//                             <Row>
//                                 {OrderStatusData.map((item, key) => (<div key={key} className="col-4">
//                                     <div className="mt-2">
//                                         <p className="text-muted mb-2">{item.title}</p>
//                                         <h5 className="font-size-16 mb-0">{item.width}</h5>
//                                     </div>
//                                 </div>))}

//                             </Row>
//                         </div>
//                     </CardBody>
//                 </Card>
//             </Col>
//         </React.Fragment>
//     )
// }

// export default OrderStatus;