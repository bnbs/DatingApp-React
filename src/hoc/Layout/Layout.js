import React, { Component } from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import { connect } from 'react-redux';

class Layout extends Component {

    render() {
        return (
            <div>
                <Navbar isAuth={this.props.isAuthenticated}/>
                <main>
                    teste
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps)(Layout);