import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Layout></Layout>
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

export default connect( mapStateToProps, mapDispatchToProps )( App );
