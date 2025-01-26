import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//Import images
import github from '../../../assets/images/brands/github.png'
import bitbucket from '../../../assets/images/brands/bitbucket.png'
import dribbble from '../../../assets/images/brands/dribbble.png'
import dropbox from '../../../assets/images/brands/dropbox.png'
import mail_chimp from '../../../assets/images/brands/mail_chimp.png'
import slack from '../../../assets/images/brands/slack.png'

//i18n
import { withTranslation } from "react-i18next";

const AppsDropdown = () => {
const [singlebtn, setSinglebtn] = useState(false);

  return(
    <React.Fragment>
        <Dropdown
          isOpen={singlebtn}
          toggle={() => setSinglebtn(!singlebtn)}
          className="dropdown d-inline-block ms-1"
          tag="li"
        >
          <DropdownToggle
            className="btn header-item noti-icon waves-effect"
            tag="button"
            id="page-header-notifications-dropdown"
          >
            <i className="ri-apps-2-line"></i>

          </DropdownToggle>

          <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end">

            <div className="px-lg-2">
              <SimpleBar >


                <Row className="g-0">
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={github} alt="Github" />
                      <span>GitHub</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={bitbucket} alt="bitbucket" />
                      <span>Bitbucket</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={dribbble} alt="dribbble" />
                      <span>Dribbble</span>
                    </Link>
                  </Col>
                </Row>
                <Row className="g-0">
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={dropbox} alt="dropbox" />
                      <span>Dropbox</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={mail_chimp} alt="mail_chimp" />
                      <span>Mail Chimp</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={slack} alt="slack" />
                      <span>Slack</span>
                    </Link>
                  </Col>
                </Row>
              </SimpleBar>
            </div>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
  )
}

export default withTranslation()(AppsDropdown);