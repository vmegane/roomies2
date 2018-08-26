import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'

class LoginWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '@',
            password: ''
        }        
    }
    fillEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    fillPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    login = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        const promise = firebase.auth().signInWithEmailAndPassword(email, password)
        promise
            .then(() => {
                this.props.manageLogin(true);
            }
            )
            .catch(error => console.log(error.message))
    }

   
    logout = (event) => {
        event.preventDefault();
        console.log('clicked logout', this.state.email)
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
            <div className="logged-in-user-greeting">                
                { this.props.isLoggedIn===true && <h2>{this.props.userName} :)</h2> }

                <form className="form"> 
                { this.props.isLoggedIn===false && <input type="email" placeholder="type your email" value={this.props.email} onChange={this.fillEmail} /> }
                { this.props.isLoggedIn===false && <input type="password" placeholder="type your password" value={this.props.password} onChange={this.fillPassword} /> } 
                { this.props.isLoggedIn===false && <input type="submit" value="login" onClick={this.login} />}  
                { this.props.isLoggedIn===true && <input type="submit" value="log out" onClick={this.logout} /> }
                </form>

            </div>
        )
    }
}

export default LoginWrapper;
