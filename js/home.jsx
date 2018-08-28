import React from 'react';
import ReactDOM from 'react-dom';
// import createFragment from 'react-addons-create-fragment';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home_id: this.props.match.params.home_id,
            homeData: this.props.homeData,
            openMessageForm: false,
            newMessage: '',
            allMessages: []
        }
    }

    componentDidMount() {
        console.log('component did mount', this.props.homeData)
        let homeId = this.state.home_id; //key
        let homeInfo = this.state.homeData; // object with all homes
        let currentHome = homeInfo[homeId]
        let objectKeys = Object.keys(currentHome.messages);
        console.log('current home messages', currentHome.messages)
        let allMessagesList = []
        for (let key in currentHome.messages) {
            allMessagesList.push(currentHome.messages[key])
            console.log('key', currentHome.messages[key])
        }
        console.log('all msg list', allMessagesList);
        this.setState({
            allMessages: allMessagesList.reverse()
        })
        console.log(this.state.allMessages)
    }

    openAddMessage = (event) => {
        event.preventDefault();
        this.setState({
            openMessageForm: true
        })
    }
    fillNewMessage = (event) => {
        event.preventDefault();
        this.setState({
            newMessage: event.target.value
        })
    }
    postMessage = (event) => {
        event.preventDefault();
        console.log('message', this.state.newMessage)
        let newMessage = {
            name: this.props.user.name,
            message: this.state.newMessage,
            timestamp: new Date().toUTCString()
        }
        fetch(`https://roomies-80535.firebaseio.com/homes/${this.state.home_id}/messages.json`,
            {
                method: "POST",
                body: JSON.stringify(newMessage)
            })
            .then(() => {
                fetch(`https://roomies-80535.firebaseio.com/homes.json`,
                    {
                        method: "GET"
                    })
                    .then((response) => response.json())
                    .then((response) => {
                        this.setState({
                            homeData: response
                        })
                    })
            })
            .then(() => {
                this.setState({
                    allMessages: [newMessage, ...this.state.allMessages]
                })
            })

           
    }

    render() {


        // console.log('msgs', currentHome.messages)
        // console.log('all msgs', allMessages)
        return (
            <div className="homes-content-wrapper">
                <h2> {this.state.homeData[this.state.home_id].name}</h2>
                <h3>Messages</h3>

                {this.state.openMessageForm === false && <button onClick={this.openAddMessage}> Add message </button>}
                {this.state.openMessageForm && <form>
                    <textarea value={this.state.newMessage} onChange={this.fillNewMessage} />
                    <input type="submit" value="Post" onClick={this.postMessage} />
                </form>}

                <ul>
                    {this.state.allMessages.map( (elem, index) => {
                        return <li key={`message-${index}`}><span>{elem.name}</span><p>{elem.message}</p><span>
                            {elem.timestamp}</span></li>
                    })}  
                </ul>
            </div>
        )
    }
}

export default Home;