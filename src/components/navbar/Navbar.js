import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/auth.service';


class Navbar extends React.Component {

  logoutUser = () => {
    authService.logout()
      .then(() => {
        this.props.getUser(null, false);
      });
  };

  renderAuthLinks() {
    return (
      <>
        <li><Link to="/signup">Register</Link></li>
        <li><Link to="/">Login</Link></li>
      </>
    );
  }

  renderLogoutLink() {
    return (
      <li>
        <Link to="/">
          <button onClick={() => this.logoutUser()}>Logout</button>
        </Link>
      </li>
    )
  }

  render() {
    return (
      <nav className="menu">
        {this.props.userIsLoggedIn && `Hello ${this.props.userData.username}`}
        <ul>
          <li><Link to="/projects">Projects</Link></li>
          {this.props.userIsLoggedIn
            ? this.renderLogoutLink()
            : this.renderAuthLinks()
          }
        </ul>
      </nav>
    )
  }
}

export default Navbar;