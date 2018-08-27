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
import Homes from './homes.jsx';
import CreateHome from './createhome.jsx';
import { createBrowserHistory } from 'history';
import Redirect from 'react-router/Redirect';
import { browserHistory } from "react-router";

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

    // componentWillMount() {
    //     this.watchAuthState();
    // }

    getUserData() {
        let userData;
        fetch(`https://roomies-80535.firebaseio.com/users/${this.state.currentUser.uid}.json`)
            .then((response) => response.json())
            .then((response) => {
                userData = response;
                this.setState({ userData: userData });
                console.log(userData)
            })
            // .then( ()=> {
            //     this.getHomeData()
            // })
}
    //             .then((response) => {
    //     this.setState({
    //         userData: response
    //     }, (response) => {
    //             console.log('response1', response);
    //             if (this.state.userData.home) {
    //                 console.log('if')
    //                 fetch(`https://roomies-80535.firebaseio.com/homes/${this.state.userData.home}.json`)
    //         }
    //     })
    // })






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
                <HashRouter  history={history}>
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
                            />} />
                            <Route path='/createhome' render={() => <CreateHome
                                userId={this.state.currentUser.uid}
                            />} />
                            <Route path='/home/:home_id' render={() => <Home
                                userId={this.state.currentUser.uid}
                            />} />
                        </Switch>
                        </div>
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
                </HashRouter>
            )

        }

    }
}

export default AppWrapper;