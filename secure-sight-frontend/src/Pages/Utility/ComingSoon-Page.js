import React from "react";
import { Container, Row, Col } from "reactstrap";

// Import Img
import img1 from "../../assets/images/logo-light.png";

//Import Countdown
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  document.title = "Cooming Soon  | Upzet - React Admin & Dashboard Template";
  // const renderer = ({ days, hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     // Render a completed state
  //     return (
  //       <div>
  //         <div className="coming-box bg-light">
  //           {days} <span>Days</span>
  //         </div>{" "}
  //         <div className="coming-box bg-light">
  //           {hours} <span>Hours</span>
  //         </div>{" "}
  //         <div className="coming-box bg-light">
  //           {minutes} <span>Minutes</span>
  //         </div>{" "}
  //         <div className="coming-box bg-light">
  //           {seconds} <span>Seconds</span>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <div className="coming-box">
  //           {days} <span>Days</span>
  //         </div>{" "}
  //         <div className="coming-box">
  //           {hours} <span>Hours</span>
  //         </div>{" "}
  //         <div className="coming-box">
  //           {minutes} <span>Minutes</span>
  //         </div>{" "}
  //         <div className="coming-box">
  //           {seconds} <span>Seconds</span>
  //         </div>
  //       </>
  //     );
  //   }
  // };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    

    if (completed) {
      // Render a completed state
      return <span>You are good to go!</span>
    } else {
      return (
        <>
          <div className="coming-box">
            {days} <span>Days</span>
          </div>{" "}
          <div className="coming-box">
            {hours} <span>Hours</span>
          </div>{" "}
          <div className="coming-box">
            {minutes} <span>Minutes</span>
          </div>{" "}
          <div className="coming-box">
            {seconds} <span>Seconds</span>
          </div>
        </>
      )
    }
  }
  return (
    <React.Fragment>
      <div className="bg-pattern" style={{ height: "100vh" }}>
        <div className="bg-overlay">
          <div className="account-pages py-5">

            <Container>
              <Row>
                <Col lg={12}>
                  <div className="text-center mb-5 mt-5">
                    <Link to="/#" className="logo">
                      <img src={img1} height="24" alt="logo" />
                    </Link>

                    <h5 className="font-size-16 text-white-50 mb-4">
                      Responsive Bootstrap 5 Admin Dashboard
                    </h5>

                    <h4 className="text-white mt-5">
                      Let's get started with Upzet
                    </h4>
                    <p className="text-white-50">
                      It will be as simple as Occidental in fact it will be
                      Occidental.
                    </p>

                    <Row className="justify-content-center mt-5">
                      <Col md={8}>
                        <div className="counter-number">
                          <Countdown
                            date="2022/12/01"
                            renderer={renderer}
                            className="counter-number"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ComingSoon;
