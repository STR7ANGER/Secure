import React from 'react';
import PropTypes from 'prop-types';
import withRouter from "../components/Common/withRouter";

const PublicLayout = (props) => {
  return (
    <React.Fragment>{props.children}</React.Fragment>
  );
};

PublicLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

export default withRouter(PublicLayout);
