import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sidebarData from './SidebarData';
//Simple bar
import SimpleBar from 'simplebar-react';
// MetisMenu
import MetisMenu from 'metismenujs';
import withRouter from '../../components/Common/withRouter';
import { Link } from 'react-router-dom';
//i18n
import { withTranslation } from 'react-i18next';
const Sidebar = (props) => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }
    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;
      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag
        const parent3 = parent2.parentElement; // li tag
        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);
  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains('active')) {
        item.classList.remove('active');
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.length && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.remove('mm-show');
        }
        parent.classList.remove('mm-active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.remove('mm-show');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('mm-active'); // li
            parent3.childNodes[0].classList.remove('mm-active');
            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove('mm-show'); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('mm-show'); // li
                parent5.childNodes[0].classList.remove('mm-active'); // a tag
              }
            }
          }
        }
      }
    }
  };
  const activeMenu = useCallback(() => {
    const pathName = props.router.location.pathname;
    const fullPath = pathName;
    let matchingMenuItem = null;
    const ul = document.getElementById('side-menu-item');
    const items = ul.getElementsByTagName('a');
    removeActivation(items);
    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.router.location.pathname, activateParentDropdown]);
  useEffect(() => {
    ref.current.recalculate();
  }, []);
  useEffect(() => {
    new MetisMenu('#side-menu-item');
    activeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    activeMenu();
  }, [activeMenu]);
  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }
  return (
    <React.Fragment>
      <div
        className="vertical-menu"
        style={{
          height: '100vh',
          overflowY: 'auto',
          background: '#0E0F1B',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        <SimpleBar className="h-100" ref={ref} style={{ maxHeight: '100vh' }}>
          <div id="sidebar-menu" style={{ padding: '1rem' }}>
            <ul className="metismenu list-unstyled" id="side-menu-item">
              {(sidebarData || []).map((item, key) => (
                <React.Fragment key={key}>
                  {item.isMainMenu ? (
                    <li
                      className="menu-title"
                      style={{
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        letterSpacing: '0.05em',
                        padding: '0.75rem',
                        marginTop: '1rem',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {props.t(item.label)}
                    </li>
                  ) : (
                    <li key={key} style={{ marginBottom: '0.25rem' }}>
                      <Link
                        to={item.url ? item.url : '/#'}
                        className={`sidebar-link ${
                          item.issubMenubadge || item.isHasArrow
                            ? ' '
                            : 'has-arrow'
                        }`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.5rem 0.75rem',
                          color: '#ffffff',
                          borderRadius: '0.5rem',
                          transition: 'all 0.15s ease',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                      >
                        <i
                          className={`${item.icon}`}
                          style={{
                            marginRight: '12px',
                            color: '#ffffff',
                            fontSize: '1.125rem'
                          }}
                        ></i>
                        <span style={{ flex: 1 }}>{props.t(item.label)}</span>
                        {item.issubMenubadge && (
                          <span
                            className={item.bgcolor || ''}
                            style={{
                              marginLeft: 'auto',
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '9999px',
                              backgroundColor: !item.bgcolor
                                ? 'rgba(255, 255, 255, 0.2)'
                                : '',
                              color: '#ffffff'
                            }}
                          >
                            {item.badgeValue}
                          </span>
                        )}
                      </Link>
                      {item.subItem && (
                        <ul
                          className="sub-menu"
                          style={{
                            paddingLeft: '2rem',
                            marginTop: '0.25rem',
                            listStyle: 'none'
                          }}
                        >
                          {item.subItem.map((subItem, key) => (
                            <li key={key}>
                              <Link
                                to={subItem.link}
                                style={{
                                  display: 'block',
                                  padding: '0.5rem 0.75rem',
                                  fontSize: '0.875rem',
                                  color: '#ffffff',
                                  borderRadius: '0.5rem',
                                  textDecoration: 'none',
                                  transition: 'all 0.15s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    'rgba(255, 255, 255, 0.1)';
                                  e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '';
                                  e.currentTarget.style.color = '#ffffff';
                                }}
                              >
                                {props.t(subItem.sublabel)}
                              </Link>
                              {subItem.subMenu && (
                                <ul
                                  className="sub-menu"
                                  style={{
                                    paddingLeft: '1rem',
                                    marginTop: '0.25rem',
                                    listStyle: 'none'
                                  }}
                                >
                                  {subItem.subMenu.map((menuItem, key) => (
                                    <li key={key}>
                                      <Link
                                        to="#"
                                        style={{
                                          display: 'block',
                                          padding: '0.5rem 0.75rem',
                                          fontSize: '0.875rem',
                                          color: '#ffffff',
                                          borderRadius: '0.5rem',
                                          textDecoration: 'none',
                                          transition: 'all 0.15s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.backgroundColor =
                                            'rgba(255, 255, 255, 0.1)';
                                          e.currentTarget.style.color =
                                            '#ffffff';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.backgroundColor =
                                            '';
                                          e.currentTarget.style.color =
                                            '#ffffff';
                                        }}
                                      >
                                        {props.t(menuItem.title)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </SimpleBar>
      </div>
    </React.Fragment>
  );
};
Sidebar.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
};
export default withRouter(withTranslation()(Sidebar));
