import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import BusinessProfile from './BusinessProfile.jsx';
import PetOwnerProfile from './PetOwnerProfile.jsx';
import PrimaryHeader from './PrimaryHeader.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('status'),
      userType: null,
      user: JSON.parse(localStorage.getItem('user'))
    };

    this.onChange = this.onChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.authenticateLogin = this.authenticateLogin.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  onChange(e) {
    console.log('on change called');
    let tempState = {};
    tempState[e.target.name] = e.target.value;
    this.setState(tempState);
  }

  fetchData() {
    console.log('inside fetch data');
    /*
       var that=this;
       $.get('/api/dogowner',function(res){
       var lastSignedUpProfile=res[res.length-1];
       that.setState({ mockedServerRetrievedData : lastSignedUpProfile})
       console.log('in app fetchData and resp = ',lastSignedUpProfile)
       that.toggleView();
       })
     */
  }

  submitData(dataToUpstream) {

    var that = this;

    console.log('in app submit Data state = ', this.state);

    var dataReferencer = {
      businessSignupUserInput : ['signup-business-email','signup-business-name','signup-business-password','signup-business-pet','signup-business-zip'],
      petOwnerSignupUserInput : ['signup-petowner-email','signup-petowner-name','signup-petowner-password','signup-petowner-pet','signup-petowner-zip']
    };

    function CreateJSONWithUserIntendedData(dataToUpstream) {

      var userIntendedData = {};
      dataReferencer[dataToUpstream].map((userInputedPropKey) => {
        // why are we loosing contect of this here
        userIntendedData[userInputedPropKey] = that.state[userInputedPropKey]
      });
      return JSON.stringify(userIntendedData);
    }

    console.log(CreateJSONWithUserIntendedData(dataToUpstream));

    var modifier = '';
    if (dataToUpstream === 'businessSignupUserInput') {
      modifier = '/business';
    } else if (dataToUpstream === 'petOwnerSignupUserInput') {
      modifier = '/petOwner';
    }

    axios.post('/api' + modifier + '/signup', {
    })
      .then()
      .catch((error) => {
      // alert error
      return console.error(error);
    });

    /*
    fetch('/api/dogowner/signup', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       },
       body: JSON.stringify(this.state)
       }).then((res)=>{
       console.log('in .then() function of post ',res)
       this.fetchData()
       // toggle profile view if success
       //this.toggleView();
       })

     */
    /*
       var dataz={};

       Object.keys(this.state).map(key=>{
       if (key !== 'mockedServerRetrievedData' && key !== 'showProfile') {
       dataz[key] = this.state[key];
       }
       })

       this.setState({
       mockedServerRetrievedData : dataz
       })
       //this.toggleView();
     */
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
      .then((response) => this.onLogIn(response.data))
      .catch((error) => {
        // alert error
        console.log('error is',error);
        alert('Incorrect login. Please log in or sign up.');
      });
    }

  onLogIn(user) {
    // save user data in local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('status', 'true');
    this.setState({user: user, isLoggedIn: true});
  }

  onLogOut() {
    console.log('ON_LOGOUT_FIRED!'');
    localStorage.setItem('user', 'null');
    localStorage.setItem('status', 'null');
    this.setState({user: null, isLoggedIn: false});
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        this.state.userType === 'business' ?
        <MuiThemeProvider><BusinessProfile user={this.state.user} /></MuiThemeProvider> : <MuiThemeProvider><PetOwnerProfile user={this.state.user} /></MuiThemeProvider>
        );
    } else {
      return (
          <MuiThemeProvider>
           <div>
            <PrimaryHeader onLogOut={this.onLogOut} />
          </div>
          <div>
            <BrowserRouter>
                <div>
                  <NavLink to="/login" activeClassName="active">Login</NavLink><br></br>
                  <NavLink to="/signup" activeClassName="active">Sign up</NavLink><br></br>
                  <Switch>
                    <Route path="/login" render={() => (<Login authenticateLogin={this.authenticateLogin} />)} />
                    <Route path="/signup" render={() => (<Signup app={this} test="eeeeee" />)} />
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
