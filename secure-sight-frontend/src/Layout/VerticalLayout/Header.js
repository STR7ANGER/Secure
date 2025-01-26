import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType
} from '../../store/actions';
import ProfileMenu from '../../components/Common/TopbarDropdown/ProfileMenu';

// CSS Variables and Styling
const styleSheet = document.createElement('style');
styleSheet.textContent = `
:root {
  --primary-dark-bg: #0A0B15;
  --gradient-primary: linear-gradient(135deg, #6A11CB 0%, #2575FC 100%);
  --text-light: #F4F4F4;
  --accent-color: #00D8FF;
}

.header-container {
  background: var(--primary-dark-bg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.logo-container {
  display: flex;
  align-items: center;
  position: relative;
}

.secure-sight-title {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  margin-left: 15px;
}

.title-loading-line {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--gradient-primary);
  animation: lineGrow 1.5s ease-in-out infinite alternate;
}

@keyframes lineGrow {
  0% { width: 50%; opacity: 0.6; }
  100% { width: 100%; opacity: 1; }
}

.secure-sight-title:hover {
  transform: scale(1.03);
}

.loading-bar {
  background: var(--gradient-primary);
  height: 3px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: loadingAnimation 2s linear infinite;
}

@keyframes loadingAnimation {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.shield-icon {
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(37, 117, 252, 0.3));
}

.shield-icon:hover {
  transform: rotate(5deg) scale(1.1);
  filter: drop-shadow(0 4px 6px rgba(37, 117, 252, 0.5));
}

.search-input {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(0, 216, 255, 0.2);
}

.header-menu-button {
  background: transparent;
  color: var(--text-light);
  border: none;
  transition: all 0.3s ease;
}

.header-menu-button:hover {
  color: var(--accent-color);
  transform: scale(1.1);
}
`;
document.head.appendChild(styleSheet);

// Improved Shield Icon Component
const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 24 24"
    className="shield-icon"
    style={{
      fill: 'url(#shieldGradient)',
      strokeWidth: 1,
      stroke: 'rgba(255,255,255,0.3)'
    }}
  >
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6A11CB', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2575FC', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M12 2l10 4v6a10 10 0 1 1-20 0V6l10-4z" />
  </svg>
);

const Header = (props) => {
  const [search, setSearch] = useState(false);

  // Fullscreen toggle function
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  // Mobile sidebar toggle
  function tToggle() {
    const body = document.body;
    const isMobile = window.screen.width <= 998;

    if (isMobile) {
      body.classList.toggle('sidebar-enable');
    } else {
      body.classList.toggle('vertical-collpsed');
      body.classList.toggle('sidebar-enable');
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div
          className="navbar-header header-container"
          style={{
            height: '8vh',
            padding: '10px 20px',
            position: 'relative'
          }}
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            {/* Logo Section */}
            <div className="logo-container">
              <ShieldIcon />
              <div style={{ position: 'relative' }}>
                <h2 className="secure-sight-title">
                  SECURE SIGHT
                  <div className="title-loading-line" />
                </h2>
              </div>
            </div>


            {/* Header Actions */}
            <div className="d-flex align-items-center">
              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="btn btn-sm px-3 font-size-24 header-item header-menu-button waves-effect"
                onClick={tToggle}
              >
                <i className="ri-menu-2-line align-middle"></i>
              </button>

              {/* Desktop Search */}
              <form className="app-search d-none d-lg-block mx-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search..."
                  />
                  <span className="ri-search-line"></span>
                </div>
              </form>

              {/* Mobile Search Dropdown */}
              <div className="dropdown d-inline-block d-lg-none ms-2">
                <button
                  onClick={() => setSearch(!search)}
                  type="button"
                  className="btn header-item header-menu-button noti-icon"
                >
                  <i className="ri-search-line" />
                </button>
                <div
                  className={`dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 ${
                    search ? 'show' : ''
                  }`}
                >
                  <form className="p-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search ..."
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="ri-search-line" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Profile Menu */}
              <ProfileMenu />

              {/* Settings Toggle */}
              <div
                className="dropdown d-inline-block"
                onClick={() => {
                  props.showRightSidebarAction(!props.showRightSidebar);
                }}
              >
                <button
                  type="button"
                  className="btn header-item header-menu-button noti-icon right-bar-toggle waves-effect"
                >
                  <i className="mdi mdi-cog"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType
})(withTranslation()(Header));
