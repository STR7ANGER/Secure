import React from 'react';
import PropTypes from 'prop-types';
import withRouter from "../components/Common/withRouter";
import { useProfile } from '../Hooks/UserHooks';
import { Navigate } from 'react-router-dom';

const NonAuthLayout = (props) => {
  const {userProfile} = useProfile();
  if(userProfile) {
    return (
      <Navigate to={{ pathname: "/dashboard", state: { from: props.location } }} />
    );
  }
  return (
    <React.Fragment>{props.children}</React.Fragment>
  );
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

export default withRouter(NonAuthLayout);
