import React from 'react';
import ReactDOM from 'react-dom';

class SignupWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userID: '',
            name: '',
            home: '',
            homes: {}
        }
        this.props.manageSignup(true)
    }

    componentDidMount() {
        if (this.state.currentUser!={}) {
            fetch(`https://roomies-80535.firebaseio.com/homes.json`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)

                this.setState({
                    homes: response
                })
            })
        } 
    }
    fillName = (event) => {
        this.setState({
            name: event.target.value
        })
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

    fillPickhome = (event) => {
        this.setState({
            home: event.target.value
        })
    }

    completeSignup = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        const auth = firebase.auth();
        const user = auth.currentUser;
        console.log('1', user)
        let newUser, newRoommate; 
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise
            .then((r) => {
            console.log('r', r.user.uid);
                
                this.setState({
                    loggedin: true,
                    userID: r.user.uid
                })
            })
            .then(() => {
                console.log('create new user');
                    newUser = {
                    userID: this.state.userID,
                    name: this.state.name,
                    email: this.state.email,
                    home: this.state.home
                };
                console.log('created', newUser);

            })
            .then(() => {
                console.log('add user to home');
                    newRoommate = this.state.userID
                console.log('added', newRoommate);

            })
            .then(() => {
                if (this.state.home!=='') {
                    fetch(`https://roomies-80535.firebaseio.com/homes/${this.state.home}/roommates.json`,
                    {
                        method: "POST",
                        body: JSON.stringify(newRoommate)
                    }
                )
                }                
            })
            .then( ()=> {
                console.log('switch to logged in');
                this.props.manageLogin(true);
            })
            .catch(error => console.log(error.message))
     }


    render() {
     
        let formOptions = [];
        let objectKeys = Object.keys(this.state.homes);
        for (var key in this.state.homes){
            formOptions.push(this.state.homes[key]);
        }

        return (
            <div className="page-center-height">
                <h2>Create Account</h2>
                
                <form className="form">
                    
                        <input type="text" value={this.state.name} placeholder="type your name" onChange={this.fillName} />
                    
                        <input type="email" value={this.state.email} placeholder="type your email" onChange={this.fillEmail} />
                        <input type="password" value={this.state.password} placeholder="type your password" onChange={this.fillPassword} />
                        Pick your home:
                        
                        <select value={this.state.home} placeholder="" onChange={this.fillPickhome}>  
                        <option value=""> </option> 
                            {formOptions.map((elem, index) => {
                                return <option key={`option-${index}`} value={objectKeys[index]}>{elem.name}</option>
                            })}
                        </select>

                    <input type="submit" value="sign up" onClick={this.completeSignup} />
                </form>
            </div>
        )
    }
}

export default SignupWrapper;