import React, { Component } from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import { connect } from 'react-redux';

class Layout extends Component {

    render() {
        console.log(this.props);
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
        isAuthenticated: state.token !== null,
        userPhoto: state.user ? JSON.parse(state.user).photoUrl : null,
        userKnownAs: state.user ? JSON.parse(state.user).knownAs : null,
    }
}

export default connect(mapStateToProps)(Layout);