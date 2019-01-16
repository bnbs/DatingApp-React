import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Home from './containers/Home/Home';
import Matches from './containers/Matches/Matches';
import Lists from './containers/Lists/Lists';
import Messages from './containers/Messages/Messages';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/matches" component={Matches} />
          <Route path="/lists" component={Lists} />
          <Route path="/logout" component={Logout} />
          <Route path="/messages" component={Messages} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
