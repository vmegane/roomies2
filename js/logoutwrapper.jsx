import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

class LogoutWrapper extends React.Component {

    constructor(props) {
        super(props);
      
    }
   

    logout = (event) => {
        event.preventDefault();
        console.log('clicked logout')
        firebase.auth().signOut;
        this.setState({
            email: '@',
            password: '',
            userID: '',
            loggedin: false,
            currentUser: null
        });
        this.props.manageLogin(false);
    }

    render() {
        return (
            <div className="login-form-wrapper page-center-height">
          
            <div className="logged-in-user-greeting">     
                <form className="form">  
               <input type="submit" value="log out" onClick={this.logout} /> 
                </form>

                </div>
            </div>
        )
    }
}

export default LogoutWrapper;
