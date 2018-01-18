import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import CloudinaryCore from 'cloudinary-core';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import BusinessProfile from './BusinessProfile.jsx';
import PetOwnerProfile from './PetOwnerProfile.jsx';
import PrimaryHeader from './PrimaryHeader.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: JSON.parse(localStorage.getItem('status')) || false,
      userType: localStorage.getItem('type'),
      user: JSON.parse(localStorage.getItem('user')),
    };
    this.signUp = this.signUp.bind(this);
    this.authenticateLogin = this.authenticateLogin.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  signUp(user, userType) {
    if (userType ==='Business') {
      axios.post('/api/business/signup', user)
        .then((res) => {
          this.onLogIn(res.data[0], 'Business');
        })
        .catch((err) => console.log(err));
    } else {
      axios.post('/api/petOwner/signup', user)
        .then((res) => {
          this.onLogIn(res.data[0], 'Pet Owner');
        })
        .catch((err) => console.log(err));
    }
  }

  authenticateLogin(email, pw, userType) {
    // set userType
    this.setState({userType: `${userType}`});
    // check login
    axios.post('/api/login', {
      email: `${email}`,
      password: `${pw}`,
      userType: `${userType}`
    })
      .then((response) => this.onLogIn(response.data, userType))
      .catch((error) => {
        alert('Incorrect login. Please log in or sign up.');
      });
    }

  onLogIn(user, userType) {
    // save user data in local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('status', 'true');
    localStorage.setItem('type', userType);
    this.setState({user: user, isLoggedIn: true, userType: userType});
  }

  onLogOut() {
    // reset localstorage
    localStorage.setItem('user', 'null');
    localStorage.setItem('status', 'false');
    localStorage.setItem('type', 'null');
    this.setState({user: null, isLoggedIn: false, userType: null});
  }

  render() {
    const style = {
      button: {
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: '#7CB342',
        color: 'white',
      },
      navButtonLeft: {
        margin: 22,
      },
      bg: {
        background: 'url(https://images.unsplash.com/photo-1506993708131-b0bf29d16b76?auto=format&fit=crop&w=1500&q=80) no-repeat center center fixed',
        minHeight: '100vh',
        backgroundSize: 'cover',
      },
    };

    if (this.state.isLoggedIn) {
      return (
        this.state.userType === 'Business' ?
        <MuiThemeProvider><BusinessProfile user={this.state.user[0]} onLogOut={this.onLogOut} reviews={this.state.user[1]} promotions={this.state.user[2]} />
        </MuiThemeProvider>
        :
        <MuiThemeProvider><PetOwnerProfile user={this.state.user[0]} onLogOut={this.onLogOut} reviews={this.state.user[1]} />
        </MuiThemeProvider>
        );
    } else {
      return (
          <MuiThemeProvider>
           <div>
            <PrimaryHeader />
          </div>
          <div style={style.bg}>
          <br/>
          <br/>
            <BrowserRouter>
                <div>
                  <NavLink to="/login" style={style.navButtonLeft}><RaisedButton buttonStyle={style.button}>LOG IN</RaisedButton></NavLink>
                  <NavLink to="/signup"><RaisedButton buttonStyle={style.button}>SIGN UP</RaisedButton></NavLink>
                  <Switch>
                    <Route path="/login" render={() => (<Login authenticateLogin={this.authenticateLogin} />)} />
                    <Route path="/signup" render={() => (<Signup onChange={this.onChange} signUp={this.signUp}/>)} />
                  </Switch>
                </div>
            </BrowserRouter>
          </div>
          </MuiThemeProvider>
      );
    }
  }
}

export default App;
