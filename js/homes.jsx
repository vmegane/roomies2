import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { browserHistory } from "react-router";

class Homes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeData: this.props.homeData,
            pickedHome: ''
        }
        //console.log('homes props', this.props)
    }



    joinHome = (event) => {
        let homeId = event.target.dataset.id;
        console.log('event target', event.target.dataset.id)
        console.log('id', this.props.user.userID)
        fetch(`https://roomies-80535.firebaseio.com/homes/${homeId}/roommates.json`,
            {
                method: "POST",
                body: JSON.stringify(this.props.user.userID)
            }).then(() => {
                fetch(`https://roomies-80535.firebaseio.com/users/${this.props.user.userID}/home.json`,
                    {
                        method: "PUT",
                        body: JSON.stringify(homeId)
                    })
            }).then(() => {
                this.setState({
                    pickedHome: homeId
                })
            }).then(() => {
                this.props.history.push(`/home/${this.state.pickedHome}`)
            })
    }


    render() {
        let homeNames = [];
        let objectKeys = Object.keys(this.state.homeData);
        for (var key in this.state.homeData) {
            homeNames.push(this.state.homeData[key].name);
        }

        return (
            <div className="homes-content-wrapper">

                <h2>Homes</h2>
                <p>Join one of the homes or create your own
                    </p>
                <Link to='/createhome'>
                    <button className="button">Create home</button></Link>

                <ul>
                    {homeNames.map((elem, index) => {
                        return <div className="single-home-wrapper">
                            <li key={`home-${index + 1}`} >{elem} <br />
                                <span>Roommates: 3</span>
                                <input type="submit" className="join-input" data-id={`home${index + 1}`} value="Join" onClick={this.joinHome} />
                            </li>
                        </div>
                    })}
                </ul>

            </div>
        )
    }
}

export default Homes;