import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Grid from 'react-bootstrap/lib/Grid';
import UserCard from '../../components/User/UserCard/UserCard';
import Pagination from '../../components/UI/Pagination/Pagination';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

import './Matches.css';

class Matches extends Component {

    state = {
        filter: 'Likers'
    }

    componentDidMount() {
        this.props.onGetUsers(null, null, null, 'Likers');
    }

    getMembersWhoLikeMe = () => {
        this.setState({filter: 'Likers'});
        this.props.onGetUsers(this.props.pagination.currentPage, this.props.pagination.itemsPerPage, null, 'Likers');
    }

    getMembersWhoILike = () => {
        this.setState({filter: 'Likees'});
        this.props.onGetUsers(this.props.pagination.currentPage, this.props.pagination.itemsPerPage, null, 'Likees');
    }

    pageChangeHandler = (event) => {

        let page = event.target.text;
        if(typeof page != 'number'){
            if(page === '«') page = 1;
            else if(page === '‹') page = this.props.pagination.currentPage - 1;
            else if(page === '›') page = this.props.pagination.currentPage + 1;
            else if(page === '»') page = this.props.pagination.totalPages;
        }
        this.props.onGetUsers(page, this.props.pagination.itemsPerPage, null, this.state.filter);
    }

    sendLike = (id: number) => {
        this.props.onSendLike(this.props.user.id, id);
    }
    
    render() {

        let users = null;
        if(this.props.users){
            users = this.props.users.map( user => (
                <UserCard
                    key={user.id}
                    user={user}
                    likeUser={() => this.sendLike(user.id)} />
            ) );
        }        

        return(
            <Grid>
                <ButtonGroup className="d-flex">
                    <Button bsStyle="danger" onClick={this.getMembersWhoLikeMe}>Members who like me</Button>
                    <Button bsStyle="danger" onClick={this.getMembersWhoILike}>Members who I like</Button>
                </ButtonGroup>
                <div className="d-flex">
                    {users}                  
                </div>
                <Pagination pagination={this.props.pagination} changed={( event ) => this.pageChangeHandler( event )}/>
            </Grid>
        );
    }    
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        pagination: state.user.pagination,
        user: JSON.parse(state.auth.user)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: (page, itemsPerPage, userParams, likesParam) => dispatch( actions.getUsers(page, itemsPerPage, userParams, likesParam) ),
        onSendLike: (id, recipientId) => dispatch( actions.sendLike(id, recipientId) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);