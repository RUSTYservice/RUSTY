import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import BusinessProfile from './BusinessProfile.jsx';
import UserProfile from './UserProfile.jsx';
import PrimaryHeader from './PrimaryHeader.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.onChange = this.onChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  onChange (e) {
    console.log('on change called')
    var tempState={};
    tempState[e.target.name]=e.target.value;
    this.setState(
      tempState
    );
  }

  toggleView () {
    //console.log('in toggle View //  showProfile = ',this.state );
    //console.log('in toggle View //  showProfile = ',this.state.showProfile );
    var newCondition = !this.state.showProfile;
    this.setState({ showProfile : newCondition });
  }

  fetchData () {
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

  submitData (dataToUpstream) {

    var that=this;

    console.log('in app submit Data state = ',this.state)

    var dataReferencer={
      businessSignupUserInput : ['signup-business-email','signup-business-name','signup-business-password','signup-business-pet','signup-business-zip'],
      petOwnerSignupUserInput : ['signup-petowner-email','signup-petowner-name','signup-petowner-password','signup-petowner-pet','signup-petowner-zip']
    };

    function CreateJSONWithUserIntendedData (dataToUpstream) {

      var userIntendedData = {}
      dataReferencer[dataToUpstream].map(userInputedPropKey => {

        userIntendedData[userInputedPropKey] = that.state[userInputedPropKey] // why are we loosing contect of this here
      })
      return JSON.stringify(userIntendedData)
    }

    console.log(CreateJSONWithUserIntendedData(dataToUpstream))

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


  render() {

    return (
      <div className="primary-layout">
        <div>
          <PrimaryHeader />
        </div>
        <div>
          <BrowserRouter>
            <div>
              <ul>
              <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
              <li><NavLink to="/signup" activeClassName="active">Sign up</NavLink></li>
              </ul>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" render={()=> <Signup app={this} test="eeeeee" />} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }


}

export default App;


/*     

<div>
<h2> in Nick temp routing </h2>

{ this.state.showProfile ? <Signup message={this.props.message} parent={this}/> : <Profile parent={this}/> }
</div>


</div>
<div>
  <h2> in Nickemp routing </h2>

  2>

  { this.state.showProfile ? <Signup message={this.props.message} parent={this}/> : <Profile parentisis}/> }

</div>
</div>(props);

this.state={
  mockedServerRetrievedData : {},
  showProfile : true
};

this.onChange=this.onChange.bind(this);
this.submitData=this.submitData.bind(this);
}

onChange (e) {
  var tempState={};
  tempState[e.target.name]=e.target.value;
  this.setState(
    tempState)
}

toggleView () {
  //console.log('in toggle View //  showProfile = ',this.state );
  //console.log('in toggle View //  showProfile = ',this.state.showProfile );
  var newCondition = !this.state.showProfile
  this.setState({ showProfile : newCondition })
}

fetchData () {
  console.log('inside fetch data')
  var that=this;
  $.get('/api/dogowner',function(res){
    var lastSignedUpProfile=res[res.length-1];
    that.setState({ mockedServerRetrievedData : lastSignedUpProfile})
    console.log('in app fetchData and resp = ',lastSignedUpProfile)
    that.toggleView();
  })
}

submitData () {

  var that=this;
  console.log('this in app submit Data= ',this)

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


}

render() {
  //console.log('message in App = ',this.props.message)
  return (
    <div>
    <h2> in APP Component </h2>

    { this.state.showProfile ? <Signup message={this.props.message} parent={this}/> : <Profile parent={this}/> }
    </div>
  )
}
}


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
