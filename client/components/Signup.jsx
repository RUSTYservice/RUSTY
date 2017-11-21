import React from 'react';
import { BrowserRouter,  Route, NavLink, Switch, Redirect } from 'react-router-dom';
import BusinessSignup from './BusinessSignup.jsx';
import PetOwnerSignup from './PetOwnerSignup.jsx';

const Signup = (props) => {

console.log('test retrieving data from app =',props.test)
console.log('propsfrom app =',props)
console.log("in sign up before return statement")
  return (
    <BrowserRouter>
      <div>
        <h2> IN SIGN UP </h2>
        <ul>
          <li><NavLink to="/signup/business" activeClassName="active">Business Owner</NavLink></li>
          <li><NavLink to="/signup/petOwner" activeClassName="active">Pet Owner</NavLink></li>
        </ul>
        <Switch>
          <Route path="/signup/business" render={()=> <BusinessSignup app={props.app}  />} />
          <Route path="/signup/petOwner" render={()=> <PetOwnerSignup app={props.app}  />} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};

export default Signup;

