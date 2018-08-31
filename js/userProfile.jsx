import React from 'react';
import ReactDOM from 'react-dom';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        console.log('user profile', this.props.match.params)
    }
        render() {
            return (
                <div className="homes-content-wrapper">
                    <h1>userProfile</h1>
                   <h2> {this.props.user.name}</h2>
                </div>
            )
        }
}
export default UserProfile;