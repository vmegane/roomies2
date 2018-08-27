import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import LogoutWrapper from './logoutwrapper.jsx';

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    toggleMenu = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    handleClick = (e) => {
        this.toggleMenu();
        console.log("clicked");
        e.stopPropagation();
    }

    render() {
        let menuShowHide = !this.state.visible ? "navigation hideMenu" : "navigation showMenu";
        // let menuHide = this.state.visible ? "hideMenu" : "hideMenu"
        return (
            <div>
                <div className="burger-menu-icon" onClick={this.handleClick}></div>
                <div className={menuShowHide} onClick={this.handleClick}>
                    <ul>
                        <li>
                            <Link to="/home">Your home</Link>
                        </li>
                        <li>
                            <Link to="/messages">Your messages</Link>
                        </li>
                        {/* <li>
                            <Link to="/home">Your home</Link>
                        </li>
                        <li>
                            <Link to="/user">Your profile</Link>
                        </li>
                        <li>
                            <Link to="/help">Help</Link>
                        </li> */}
                        <LogoutWrapper manageLogin={this.props.manageLogin}/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Nav;