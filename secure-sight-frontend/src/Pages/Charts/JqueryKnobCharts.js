// import React, { useState } from "react"

// import { Container, Col, Row, Card, CardBody, CardTitle} from "reactstrap";
// import Knob from "../AllCharts/knob/knob";

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"

// const JknobCharts = () => {
//     document.title = "Jquery Knob charts | Upzet - React Admin & Dashboard Template";
//     const [value, setvalue] = useState(65)
//     const [value_cur, setvalue_cur] = useState(54)
//     const [value_prev, setvalue_prev] = useState(72)
//     const [angle, setangle] = useState(75)
//     const [steps, setsteps] = useState(11000)
//     const [ang_offset_arc, setang_offset_arc] = useState(86)
//     const [readonly, setreadonly] = useState(33)

//     const handleChange = (newValue) => {
//         setvalue(newValue)
//     }
//     const handleChangecursor = newValue => {
//         setvalue_cur(newValue)
//     }
//     const handleChangeprev = newValue => {
//         setvalue_prev(newValue)
//     }

//     return (
//         <React.Fragment>

//                 <div className="page-content">
//                     <Container fluid={true}>
//                         <Breadcrumbs title="Charts" breadcrumbItem="Knob Charts" />

//                         <Row>
//                             <Col xl={4}>
//                                 <Card>
//                                     <CardBody>

//                                         <CardTitle>Disable Display Input</CardTitle>
//                                         <p className="card-title-desc">Example of disable display input knob chart.</p>

//                                         <div className="text-center" dir="ltr">
//                                             <Knob
//                                                 value={value}
//                                                 height={180}
//                                                 width={180}
//                                                 fgColor="#3d8ef8"
//                                                 displayCustom={() => {
//                                                     return false
//                                                 }}
//                                                 onChange={handleChange}
//                                                 displayInput={false}
//                                             />

//                                         </div>

//                                     </CardBody>
//                                 </Card>
//                             </Col>

//                             <Col xl={4}>
//                                 <Card>
//                                     <CardBody>

//                                         <CardTitle>Cursor Mode</CardTitle>
//                                         <p className="card-title-desc">Example of cursor mode chart.</p>

//                                         <div className="text-center" dir="ltr">

//                                             <Knob
//                                                 value={value_cur}
//                                                 height={180}
//                                                 width={180}
//                                                 fgColor="#11c46e"
//                                                 cursor={true}
//                                                 displayCustom={() => {
//                                                     return false
//                                                 }}
//                                                 onChange={handleChangecursor}
//                                             />

//                                         </div>

//                                     </CardBody>
//                                 </Card>
//                             </Col>

//                             <Col xl={4}>
//                                 <Card>
//                                     <CardBody>

//                                         <CardTitle>Display Previous Value</CardTitle>
//                                         <p className="card-title-desc">Example of display previous value chart.</p>

//                                         <div className="text-center" dir="ltr">

//                                             <Knob
//                                                 value={value_prev}
//                                                 height={180}
//                                                 width={180}
//                                                 fgColor="#f1b44c"
//                                                 onChange={handleChangeprev}
//                                             />
                                            
//                                         </div>

//                                     </CardBody>
//                                 </Card>
//                             </Col>
//                         </Row>

//                         <Row>
//                             <Col xl={4}>
//                                 <Card>
//                                     <CardBody>

//                                         <CardTitle>Angle Offset and Arc</CardTitle>
//                                         <p className="card-title-desc">Example of angle offset and arc chart.</p>

//                                         <div className="text-center" dir="ltr">
//                                             <Knob
//                                                 value={ang_offset_arc}
//                                                 fgColor="#0db4d6"
//                                                 thickness={0.3}
//                                                 angleArc={300}
//                                                 angleOffset={210}
//                                                 cursor={false}
//                                                 height={180}
//                                                 width={180}
//                                                 onChange={e => {
//                                                     setang_offset_arc(e)
//                                                 }}
//                                             />
                                            
//                                         </div>
//                                     </CardBody>
//                                 </Card>
//                             </Col>

//                             <Col xl={4}>
//                                 <Card>
//                                     <CardBody>

//                                         <CardTitle>Angle Offset</CardTitle>
//                                         <p className="card-title-desc">Example of angle offset chart.</p>

//                                         <div className="text-center" dir="ltr">
//                                             <Knob
//                                                 value={angle}
//                                                 fgColor="#fb4d53"
//                                                 lineCap="round"
//                                                 height={180}
//                                                 width={180}
//                                                 onChange={e => {
//                                                     setangle(e)
//                                                 }}
//                                             />
                                            
//                                         </div>

//                                     </CardBody>
//                                 </Card>
//                             </Col>

//                             <Col xl={4}>
//                                 <Card>
//                                     <CardBody>

//                                         <CardTitle>10-digit Values, Step 100</CardTitle>
//                                         <p className="card-title-desc">Example of 10-digit values and step 100 chart.</p>

//                                         <div className="text-center" dir="ltr">

//                                             <Knob
//                                                 value={steps}
//                                                 fgColor="#7c8a96"
//                                                 step={10}
//                                                 height={180}
//                                                 width={180}
//                                                 min={-15000}
//                                                 max={15000}
//                                                 onChange={e => {
//                                                     setsteps(e)
//                                                 }}
//                                             />
                                            
//                                         </div>
//                                     </CardBody>
//                                 </Card>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col xl={4}>
//                                 <Card>
//                                     <CardBody>
//                                         <CardTitle>Readonly</CardTitle>
//                                         <p className="card-title-desc">Example of readonly chart.</p>
//                                         <div className="text-center" dir="ltr">
//                                             <Knob
//                                                 value={readonly}
//                                                 fgColor="#846eff"
//                                                 lineCap="round"
//                                                 readOnly={true}
//                                                 height={180}
//                                                 width={180}
//                                                 onChange={e => {
//                                                     setreadonly(e)
//                                                 }}
//                                             />
                                            
//                                         </div>
//                                     </CardBody>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </div>

//         </React.Fragment>
//     );
// }

// export default JknobCharts;