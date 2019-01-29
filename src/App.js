import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Logout from './containers/Auth/Logout/Logout';
import Home from './containers/Home/Home';
import Lists from './containers/Lists/Lists';
import Matches from './containers/Matches/Matches';
import Messages from './containers/Messages/Messages';
import UserDetails from './containers/User/UserDetails/UserDetails';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

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
          <Route path="/users/:userId" component={UserDetails}/>
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
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
