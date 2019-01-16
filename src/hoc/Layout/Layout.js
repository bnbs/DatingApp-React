import React, { Component } from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import { connect } from 'react-redux';

class Layout extends Component {

    render() {
        return (
            <div>
                <Navbar isAuth={this.props.isAuthenticated} userPhoto={this.props.userPhoto}/>
                <main>
                    teste
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        userPhoto: state.user ? JSON.parse(state.user).photoUrl : null
    }
}

export default connect(mapStateToProps)(Layout);