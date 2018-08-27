import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
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
import Homes from './homes.jsx';
import Home from './home.jsx';
import CreateHome from './createhome.jsx';

import { createBrowserHistory } from 'history';
import Redirect from 'react-router/Redirect';

const history = createBrowserHistory();

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            currentUser: {},
            signupopen: false,
            userData: {},
            homeData: {}
        }

    }

    componentWillMount() {
        fetch(`https://roomies-80535.firebaseio.com/homes.json`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            this.setState({
                homeData: response
            })
        })
}

    getUserData() {
        let userData;
        fetch(`https://roomies-80535.firebaseio.com/users/${this.state.currentUser.uid}.json`)
            .then((response) => response.json())
            .then((response) => {
                userData = response;
                this.setState({ userData: userData });
                console.log(userData)
            })
          
}
   






    manageLogin = (loginstate) => {
        this.setState({
            loggedin: loginstate,
            currentUser: firebase.auth().currentUser
        }, () => {
            this.getUserData()
        })
    }

    manageSignup = (issignupopen) => {
        this.setState({
            signupopen: issignupopen
        })
    }

    // watchAuthState() {
    //     firebase.auth().onAuthStateChanged((firebaseUser) => {
    //         if (firebaseUser) {
    //             this.setState({
    //                 currentUser: firebaseUser,
    //                 loggedin: true,
    //                 userId: firebaseUser.uid
    //             })
    //             console.log('watcher: user loggedin: ', firebaseUser.uid)
    //         } else {
    //             this.setState({
    //                 currentUser: null,
    //                 loggedin: false
    //             })
    //             console.log('not logged in')
    //         }
    //     })
    // }

    render() {
        if (this.state.loggedin === true) {
            return (
                <Router  history={history}>
                    <div className="main-wrapper">
                        <Header />
                        {/* <LoginWrapper
                            manageLogin={this.manageLogin}
                            isLoggedIn={this.state.loggedin}
                        // userName={this.state.userData.name}
                        /> */}
                        <Nav manageLogin={this.manageLogin}/>
                        <div className="content-wrapper">
                        <Switch>
                            <Route exact path='/messages' component={Messages} />
                            <Route exact path='/' render={() => <Homes
                                user={this.state.userData}
                                homeData={this.state.homeData}
                                history={history}
                            />} />
                            <Route path='/createhome' render={() => <CreateHome
                                userId={this.state.currentUser.uid}
                            />} />
                            <Route path='/home/:home_id' render={() => <Home
                                userId={this.state.currentUser.uid}
                                homeData={this.state.homeData}
                            />} />
                        </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            )
        } else {
            return (
                <Router history={history}>
                    <div className="main-wrapper">
                        <Header />
                        <Switch>
                            <div className="login-page-wrapper">
                                {this.state.signupopen === false && <div> <h2>Sign in <span> <Link to='/signup'> or create account</Link></span></h2>
                                </div>}
                                <Route exact path='/' render={() => <LoginWrapper
                                    manageLogin={this.manageLogin}
                                    isLoggedIn={this.state.loggedin}
                                // userName={this.state.userData.name}
                                />} />
                                <Route path='/signup' render={() => <SignupWrapper
                                    manageLogin={this.manageLogin}
                                    manageSignup={this.manageSignup}
                                    history={history}
                                />} />
                            </div>

                        </Switch>
                        <Footer />
                    </div>
                </Router>
            )

        }

    }
}

export default AppWrapper;