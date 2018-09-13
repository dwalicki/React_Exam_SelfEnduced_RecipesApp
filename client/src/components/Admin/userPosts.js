import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserPosts } from '../../actions';

class UserPosts extends Component {

    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.user.login.id))
    }

    showUserPosts = (user) => (
        user.userPosts ? 
            user.userPosts.map(item => (
                <tr key={item._id}>
                    <td><Link to={`/user/edit-post/${item._id}`}
                    
                    >
                    {item.name}
                    </Link></td>
                    <td>{item.chef}</td>
                </tr>
            ))
        :null
    )

    render() {
        console.log(this.props)
        
        let user = this.props.user

        return (
            <div className="user_posts">
                <h4>Your appreciated recipes:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Chef</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
                </table>                
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user:state.user    
    }
}

export default connect(mapStateToProps)(UserPosts)