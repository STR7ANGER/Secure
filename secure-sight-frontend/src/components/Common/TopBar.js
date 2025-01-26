import React from "react";

import logosm from "../../assets/images/logo-sm.png";
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

// import component
import ProfileMenu from "./TopbarDropdown/ProfileMenu";

import NotificationDropdown from "./TopbarDropdown/NotificationDropdown";

import LanguageDropdown from "./TopbarDropdown/LanguageDropdown";

import AppsDropdown from "./TopbarDropdown/AppsDropdown";

const TopBar = () => {
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box text-center">
              <a href="#" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logosm} alt="logo-sm-dark" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logodark} alt="logo-dark" height="24" />
                </span>
              </a>

              <a href="#" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logosm} alt="logo-sm-light" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logolight} alt="logo-light" height="24" />
                </span>
              </a>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="ri-menu-2-line align-middle"></i>
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="ri-search-line"></span>
              </div>
            </form>
          </div>

          <div className="d-flex">
            <LanguageDropdown />
            <AppsDropdown />
            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="ri-fullscreen-line"></i>
              </button>
            </div>
            <NotificationDropdown />
            <ProfileMenu />

            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="mdi mdi-cog"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default TopBar;
