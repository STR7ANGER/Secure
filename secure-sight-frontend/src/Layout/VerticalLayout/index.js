import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import withRouter from '../../components/Common/withRouter';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import RightSidebar from '../../components/Common/RightSideBar';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  showRightSidebarAction
} from '../../store/actions';

const Layout = (props) => {
  const dispatch = useDispatch();
  const {
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    showRightSidebar,
    leftSideBarTheme
  } = useSelector((state) => ({
    leftSideBarType: state.Layout.leftSideBarType,
    layoutWidth: state.Layout.layoutWidth,
    topbarTheme: state.Layout.topbarTheme,
    showRightSidebar: state.Layout.showRightSidebar,
    leftSideBarTheme: state.Layout.leftSideBarTheme
  }));

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (leftSideBarType === 'default') {
      dispatch(changeSidebarType('condensed', isMobile));
    } else if (leftSideBarType === 'condensed') {
      dispatch(changeSidebarType('default', isMobile));
    }
  };

  const hideRightbar = useCallback(
    (event) => {
      var rightbar = document.getElementById('right-bar');
      if (rightbar && rightbar.contains(event.target)) {
        return;
      } else {
        dispatch(showRightSidebarAction(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // Set global styles for html, body, and #root
    document.documentElement.style.height = '100%';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';

    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.height = '100%';
      rootElement.style.margin = '0';
      rootElement.style.padding = '0';
    }

    document.body.addEventListener('click', hideRightbar, true);
    return () => {
      document.body.removeEventListener('click', hideRightbar, true);
    };
  }, [hideRightbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(changeLayout('vertical'));
  }, [dispatch]);

  useEffect(() => {
    if (leftSideBarTheme) {
      dispatch(changeSidebarTheme(leftSideBarTheme));
    }
  }, [leftSideBarTheme, dispatch]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [layoutWidth, dispatch]);

  useEffect(() => {
    if (leftSideBarType) {
      dispatch(changeSidebarType(leftSideBarType));
    }
  }, [leftSideBarType, dispatch]);

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [topbarTheme, dispatch]);

  const styles = {
    root: {
      height: '100%',
      margin: 0,
      padding: 0
    },
    layoutWrapper: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#000000'
    },
    mainContent: {
      flex: '1 0 auto',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 30px)' // Adjusted for header height
    },
    contentWrapper: {
      display: 'flex',
      flex: '1 1 auto'
    },
    sidebar: {
      flexShrink: 0
    },
    mainSection: {
      flex: '1 1 auto',
      marginLeft: leftSideBarType === 'condensed' ? '70px' : '250px',
      transition: 'margin-left .3s ease-in-out',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 60px)'
    },
    pageContent: {
      flex: '1 1 auto',
      padding: '20px'
    }
  };

  return (
    <React.Fragment>
      <div style={styles.layoutWrapper} id="layout-wrapper">
        <Header toggleMenuCallback={toggleMenuCallback} />
        <div style={styles.contentWrapper}>
          <div style={styles.sidebar}>
            <Sidebar
              theme={leftSideBarTheme}
              type={leftSideBarType}
              isMobile={isMobile}
            />
          </div>
          <div style={styles.mainSection}>
            <div style={styles.mainContent}>
              <div style={styles.pageContent}>{props.children}</div>
            </div>
            <hr/>
            <Footer />
          </div>
        </div>
      </div>
      {showRightSidebar ? <RightSidebar /> : null}
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any
};

export default withRouter(Layout);
