import React from 'react';

let PetOwnerSignup = (props) => {
	console.log('propsfrom app =',props);
	console.log("in sign up before return statement");
	let onChange=props.app.onChange;
	let onSubmit= () => {
		props.app.submitData('petOwnerSignupUserInput');
	}
	return (
		<div>
			<h2> in Pet Owner sign upcomponent</h2>
		
			Email : <input type="text" name="signup-petowner-email" onChange={onChange}></input><br/>
			Name : <input type="text" name="signup-petowner-name" onChange={onChange}></input><br/>
			Zip : <input type="text" name="signup-petowner-zip" onChange={onChange} ></input><br/>
			password : <input type="text" name="signup-petowner-password" onChange={onChange}></input><br/>
			Pet : <input type="text" name="signup-petowner-pet" onChange={onChange}></input><br/>
			<button type="button" onClick={onSubmit}> VALIDATE </button>
		</div>
	)
}

export default PetOwnerSignup;




      //  <Route path="/signup/business" component={BusinessSignup} />
      //  <Route path="/signup/petOwner" component={PetOwnerSignup} />

      	/*
		<div>
			 <h2> IN Pet Owner S U </h2>
		</div>
	*/