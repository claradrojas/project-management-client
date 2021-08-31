import './App.css';
import ProjectList from './components/projects/ProjectList'
import ProjectDetails from './components/projects/ProjectDetails'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup'
import React from 'react';
import authService from './services/auth.service'
import Login from './components/auth/Login'
import ProtectedRoute from './components/auth/ProtectedRoute'


class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null
  }

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then(data => {
          this.setState({
            user: data,
            isLoggedIn: true
          });
        })
        .catch(err => {
          this.setState({
            user: null,
            isLoggedIn: false
          });
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  getTheUser = (userObj, loggedIn) => { //info about the user we pass from calling the method from signup 
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn
    });
  };

  render() {
    return (
      <div className="App">
        <h1> Welcome to the project management app</h1>
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        <Switch>
          <Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
          {/* here we pass a reference to getTheUser method */}
          <Route exact path="/projects" render={() => <ProjectList userIsLoggedIn={this.state.isLoggedIn} />} />

          {/* <Route exact path="/projects/:id" render={(props) => <ProjectDetails {...props} userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />} /> */}
          {/* here we create a protected route for the details passing several props, rendering them to protectedRoute.js */}
          
          <ProtectedRoute 
            path="/projects/:id"
            user={this.state.user}
            component={ProjectDetails}
          
          />
        </Switch>
      </div>
    );
  }
}


export default App;
