import React from 'react';
import $ from 'jquery';


let BusinessSignup = (props) => {
	console.log('propsfrom app =',props);
	console.log("in sign up before return statement");
	let onChange=props.app.onChange;
	$('.test').text('hey');
	let onSubmit= () => {
		props.app.submitData('businessSignupUserInput');
	}
	return (
		<div>
			<h2 className="test"> in business sign upcomponent</h2>
			
			Email : <input type="text" name="signup-business-email" onChange={onChange}></input><br/>
			Name : <input type="text" name="signup-business-name" onChange={onChange}></input><br/>
			Zip : <input type="text" name="signup-business-zip" onChange={onChange} ></input><br/>
			password : <input type="text" name="signup-business-password" onChange={onChange}></input><br/>
			Pet : <input type="text" name="signup-business-pet" onChange={onChange}></input><br/>
			<button type="button" onClick={onSubmit}> VALIDATE </button>
		</div>
	)
}


export default BusinessSignup;

      //  <Route path="/signup/business" component={BusinessSignup} />
      //  <Route path="/signup/petOwner" component={PetOwnerSignup} />

/*
 let onChange=this.props.parent.onChange
 //console.log('message in signup = ',this.props.message)
 return ( 
 <div>
 	<h2> in sign up component</h2>
 	<h4> {this.props.message}</h4>

 	Email : <input type="text" name="email" onChange={onChange}></input><br/>
 	Name : <input type="text" name="name" onChange={onChange}></input><br/>
 	Zip : <input type="text" name="zip" onChange={onChange} ></input><br/>
 	password : <input type="text" name="password" onChange={onChange}></input><br/>
 	Pet : <input type="text" name="pet" onChange={onChange}></input><br/>
 	<button type="button" onClick={this.props.parent.submitData}> VALIDATE </button>
 </div>
 )

 */