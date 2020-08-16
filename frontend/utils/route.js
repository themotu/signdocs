/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { signedIn as signedInSelector } from '../reducers/session';

const mapStateToProps = (state) => ({
  signedIn: signedInSelector(state),
});

const AUTH_REDIRECT_PATH = '/';
const PROTECTED_REDIRECT_PATH = '/signup';

const Auth = ({ component: Component, path, signedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      signedIn ? <Redirect to={AUTH_REDIRECT_PATH} /> : <Component {...props} />
    }
  />
);

const Protected = (
  { component: Component, path, signedIn, exact },
  ...rest
) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      signedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={PROTECTED_REDIRECT_PATH} {...rest} {...props} />
      )
    }
  />
);

Auth.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.string.isRequired,
  signedIn: PropTypes.bool.isRequired,
  exact: PropTypes.bool,
};

Auth.defaultProps = {
  exact: false,
};

Protected.propTypes = Auth.propTypes;
// Protected.propTypes = {
//   component: PropTypes.oneOfType([PropTypes.element, PropTypes.object])
//     .isRequired,
//   path: PropTypes.string.isRequired,
//   signedIn: PropTypes.bool.isRequired,
//   exact: PropTypes.bool,
// };

Protected.defaultProps = {
  exact: false,
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
