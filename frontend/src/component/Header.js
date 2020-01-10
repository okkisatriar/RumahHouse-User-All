import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class Head extends Component {
    componentDidMount() {
        this.checkLogin();
    }

    checkLogin = () => {
        var Login = cookie.get('login')
        console.log('Login', Login)
        if (Login < "1" || Login === undefined) {
            this.setState({ login: false })
        } else {
            this.setState({ login: true })
        }
    }

    render() {
        console.log('123', this.props)
        var loginRegis = []
        var showProfile = []
        if (this.props.login) {
            showProfile = (
                <ul style={{ marginLeft: 1000 }} className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#" id="navbarDropdown"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            role="button" >Profile
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <Link to="/Profile" className="dropdown-item">My Profile</Link>
                            <Link to="/Dashboard" className="dropdown-item">Dashboard</Link>
                            <Link to="/Logout" className="dropdown-item">Log out</Link>
                        </div>
                    </li>
                </ul>
            )
        } else {
            loginRegis = (
                <ul style={{ marginLeft: 950 }} className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/Login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Register">Register</Link>
                    </li>
                </ul>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-right navbar-expand-lg navbar-dark bg-primary fixed-top">
                    <Link className="navbar-brand" to="/">RumaHouse</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"> Products
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/Products" className="dropdown-item">Rumah</Link>
                                    <Link to="/Products" className="dropdown-item">Apartement</Link>
                                </div>
                            </li>
                        </ul>
                        {loginRegis}
                        {showProfile}
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(Head);