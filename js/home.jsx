import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log('params',this.props.params)
    }
    render() {
        return (
            <div className="homes-content-wrapper">
                <h2>Home :)</h2>
                {this.props.match.params.home_id}
            </div>
        )
    }
}

export default Home;