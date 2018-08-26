import React from 'react';
import ReactDOM from 'react-dom';

class CreateHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homename: '',
            homeid: '',
            numberOfHomes: '',
            user: this.props.userId
        }
    }

    componentDidMount() {
        fetch(`https://roomies-80535.firebaseio.com/homes.json`)
            .then(resp => resp.json())
            .then(resp => this.setState({ numberOfHomes: Object.keys(resp).length }))
    }

    fillName = (e) => {
        this.setState({
            homename: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        const newHome = {
            homename: this.state.homename,
            roomies: [this.state.user]
        }
        fetch(`https://roomies-80535.firebaseio.com/homes/home-${this.state.numberOfHomes + 1}.json`,
            {
                method: "PUT",
                body: JSON.stringify(newHome)
            }
        )
            .then(() => {
                this.setState({
                    homeid: `home-${this.state.numberOfHomes + 1}`
                })
            })
            .then(() => {
                const updatedUser = {
                    home: this.state.homeid
                }

                fetch(`https://roomies-80535.firebaseio.com/users/${this.state.user}.json`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(updatedUser)
                    })
                })
    }

    render() {

        return (
            <div>
                <h2>Creating your home</h2>
                <form id="form-create-home">
                    {this.state.homeid === '' && <p>Your home name</p> }
                    {this.state.homeid === '' && <input value={this.state.homename} type="text" onChange={this.fillName} />} <br/>
                    {this.state.homeid === '' && <button onClick={this.handleClick}>Continue</button> }<br/>
                    invite roomies (send the link below to your roommates)
                    <div className="link">
                        {this.state.homeid !== '' && <p>http://www.roomies.com/join/{this.state.homeid}</p>}
                    </div>

                </form>
            </div>
        )
    }
}

export default CreateHome;