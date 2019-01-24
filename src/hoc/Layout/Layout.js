import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navigation/Navbar/Navbar';

class Layout extends Component {

    render() {
        return (            
            <div>
                <Navbar isAuth={this.props.isAuthenticated} userPhoto={this.props.userPhoto} userKnownAs={this.props.userKnownAs}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userPhoto: state.auth.user ? JSON.parse(state.auth.user).photoUrl : null,
        userKnownAs: state.auth.user ? JSON.parse(state.auth.user).knownAs : null
    }
}

export default connect(mapStateToProps)(Layout);