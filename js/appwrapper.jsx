import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import LoginWrapper from './loginwrapper.jsx';
import Nav from './navigation.jsx';
import Messages from './messages.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';
import SignupWrapper from './signupwrapper.jsx';
import User from './user.jsx';
import CreateHome from './createhome.jsx';


class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            currentUser: {},
            signupopen: false, 
            userData: {}
        }
        
    }
    
    componentWillMount() {
        this.watchAuthState();
    }

    componentDidUpdate() {
        if (this.state.currentUser!={}) {
            fetch(`https://roomies-80535.firebaseio.com/users/${this.state.userId}.json`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    userData: response
                })
            })
        } 
    }



    manageLogin = (loginstate) => {
        this.setState({
            loggedin: loginstate
        })
    }
    manageSignup = (issignupopen) => {
        this.setState({
            signupopen: issignupopen
        })
    }

    watchAuthState() {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({
                    currentUser: firebaseUser,
                    loggedin: true,
                    userId: firebaseUser.uid
                })
                console.log('watcher: user loggedin: ', firebaseUser.uid)
            } else {
                this.setState({
                    currentUser: null,
                    loggedin: false
                })
                console.log('not logged in')
            }
        })
    }

    render() {
        if (this.state.loggedin === true) {
            return (
                <HashRouter>
                    <div className="main-wrapper">
                        <Header />
                        <LoginWrapper
                            manageLogin={this.manageLogin}
                            isLoggedIn={this.state.loggedin}
                            userName={this.state.userData.name}
                        />
                        <Nav />
                        <Switch>
                            <Route exact path='/messages' component={Messages} />
                            <Route path='/user' component={User} />
                            <Route path='/createhome' render={() =>  <CreateHome
                               userId={this.state.currentUser.uid}
                            /> }/>
                        </Switch>
                        <Footer />
                    </div>
                </HashRouter>
            )
        } else {
            return (
                <HashRouter>
                    <div className="main-wrapper">
                        <Header />
                        <Switch>
<div className="page-center-height">
{ this.state.signupopen===false && <div> <h2>Sign in <span> <Link to='/signup'> or create account</Link></span></h2>
                        </div>}
                                <Route exact path='/' render={() =>  <LoginWrapper
                                    manageLogin={this.manageLogin}
                                    isLoggedIn={this.state.loggedin}
                            /> }/>
                                <Route path='/signup' render={() => <SignupWrapper 
                                manageLoggin={this.manageLogin}
                                manageSignup={this.manageSignup}
                                />} />
</div>
                           
                        </Switch>
                        <Footer />
                    </div>
                </HashRouter>
            )

        }

    }
}

export default AppWrapper;