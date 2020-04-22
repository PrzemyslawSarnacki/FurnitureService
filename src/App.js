import React, { Component } from 'react';
import { HashRouter, BrowserRouter as HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';

// import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';
import ScrollToTop from './components/ScrollToTop'
import CustomLayout from './containers/Base';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <HashRouter basename='/' >
          <CustomLayout {...this.props}>
          <ScrollToTop>
              <BaseRouter />
          </ScrollToTop>
          </CustomLayout>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);