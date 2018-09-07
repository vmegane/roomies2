import React from 'react';
import ReactDOM from 'react-dom';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }
        render() {
            return (
                <div className="homes-content-wrapper">
                    <h2>userProfile</h2>
                   <h2> {this.props.user.name}</h2>
                </div>
            )
        }
}
export default UserProfile;