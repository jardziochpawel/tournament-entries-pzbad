import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../img/pzbad_logo.png";

export default class Header extends React.Component {
  renderUser() {
    const {userData, logout} = this.props;

    if (null === userData) {
      return (<i className="fas fa-spinner fa-spin"/>);
    }

    return (
      <span>
        {userData.name}&nbsp;
        <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
      </span>
    );
  }

  render() {
    const {isAuthenticated} = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-pzbad">
        <Link to="/" className="navbar-brand">
            <img src={Logo} alt="PZBAD"/>
        </Link>

        <ul className="navbar-nav mr-auto">

          <li className="nav-item">
            <Link to="/players" className="nav-link">
              Zawodnicy
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/clubs" className="nav-link">
              Kluby
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tournaments" className="nav-link">
              Turnieje
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/classification/1/SM" className="nav-link">
              Listy klasyfikacyjne
            </Link>
          </li>
            {
                isAuthenticated &&
                (
                    <li className="nav-item">
                        <Link to="/register-tournament" className="nav-link">Dodaj turniej</Link>
                    </li>
                )
            }
        </ul>

        <span className="navbar-text">
          {isAuthenticated ? this.renderUser() : <Link to="/login">Sign-in</Link>}
        </span>
      </nav>
    );
  }
}
