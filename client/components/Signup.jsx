import React from 'react';
import { BrowserRouter,  Route, NavLink, Switch, Redirect } from 'react-router-dom';
import BusinessSignup from './BusinessSignup.jsx';
import PetOwnerSignup from './PetOwnerSignup.jsx';

const Signup = () => (
  <BrowserRouter>
    <div>
      <h2> IN SIGN UP </h2>
      <ul>
        <li><NavLink to="/signup/business" activeClassName="active">Business Owner</NavLink></li>
        <li><NavLink to="/signup/petOwner" activeClassName="active">Pet Owner</NavLink></li>
      </ul>
      <Switch>
        <Route path="/signup/business" component={BusinessSignup} />
        <Route path="/signup/petOwner" component={PetOwnerSignup} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Signup;
