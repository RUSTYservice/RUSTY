import React from 'react';
import $ from 'jquery';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';
import CloudinaryVideoPlayer from 'cloudinary-video-player';

let BusinessSignup = (props) => {
	console.log('propsfrom app =',props);
	console.log("in sign up before return statement");
	let onChange=props.app.onChange;

	$( document ).ready(function() {

	    console.log('in BSU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ')

	    const displayVideo = function  (public_id) {
	    	$(document ).ready(function() {
	    	    console.log( "in ready!" );    
	    	    //$( ".player" ).append( $.cloudinary.video( public_id,{cloud_name:"nicko"}) );

	    	    demoplayer.source({ "publicId" : public_id })
	    	    // widgetdocs/ycls6ongxof0cogajr5l
	    	});
	    }

	    // comp 2
	    $('#upload_widget_multiple').click(function(e) {
	      e.preventDefault();
	      window.cloudinary.openUploadWidget({ cloud_name:'nicko', upload_preset: 'avqjuqpq', folder: 'widgetdocs', form: '.upload_multiple_images_holder', sources: ['local', 'image_search','facebook', 'instagram', 'google_photos'], thumbnails: '.upload_multiple_images_holder', multiple : true, google_api_key: 'AIzaSyDaQj7FO1IQtp9DSB5YNP5jjG6f_mItEQ4', max_files :10, show_powered_by :false, client_allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg'],keep_widget_open : true  }, 
	      function(error, result) { 
	        if ( error) {
	          console.log(error, result) 
	          return;
	        } 
	        console.log('result url = ',result[0].url)
	        console.log('result thumnail = ',result[0].thumbnail_url)
	        console.log('result  = ',result)
	      });
	    });


	    // comp 1
	    $('#upload_widget_singleFromMultiple').click(function(e) {
	      e.preventDefault();
	      window.cloudinary.openUploadWidget({ cloud_name:'nicko', upload_preset: 'avqjuqpq', folder: 'widgetdocs', form: '.upload_multiple_images_holder', sources: ['local', 'image_search','facebook','instagram', 'google_photos'], thumbnails: '.upload_multiple_images_holder', cropping: 'server',multiple : false, google_api_key: 'AIzaSyDaQj7FO1IQtp9DSB5YNP5jjG6f_mItEQ4', max_files :1, show_powered_by :false, client_allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg'],keep_widget_open : false  }, 
	      function(error, result) { 
	        if ( error) {
	          console.log(error, result) 
	          return;
	        } 
	        console.log('result url = ',result[0].url)
	        console.log('result thumnail = ',result[0].thumbnail_url)
	        console.log('result  = ',result)

	      });
	    });

	    // comp 3 video
	    $('#upload_widget_video').click(function(e) {
	      e.preventDefault();
	      window.cloudinary.openUploadWidget({ cloud_name:'nicko', upload_preset: 'zahnf2xg', folder: 'widgetdocs', form: '.upload_multiple_images_holder', sources: ['local'], thumbnails: '.upload_multiple_images_holder', multiple : false, google_api_key: 'AIzaSyDaQj7FO1IQtp9DSB5YNP5jjG6f_mItEQ4', max_files :1, show_powered_by :false, client_allowed_formats: ['mp4'],keep_widget_open : false  }, 
	      function(error, result) { 
	        if ( error) {
	          console.log(error, result) 
	          return;
	        } 
	        console.log('result .public_id = ',result[0].public_id)
	        console.log('result thumnail = ',result[0].thumbnail_url)
	        console.log('result  = ',result)
	        displayVideo(result[0].public_id)
	      });
	    });
	});

	let onSubmit= () => {
		props.app.submitData('businessSignupUserInput');
	}

	const displayVideo = function  (public_id) {
		$(document ).ready(function() {
		    console.log( "in ready!" );    
		    //$( ".player" ).append( $.cloudinary.video( public_id,{cloud_name:"nicko"}) );

		    demoplayer.source({ "publicId" : public_id })
		    // widgetdocs/ycls6ongxof0cogajr5l
		});
	}



	return (
		<div>
			<h2 className="test"> in business sign up component 2 </h2>

			<CloudinaryContext cloudName="nicko" effect="art:aurora" width="300" >
				<Image publicId="widgetdocs/jrlef2na1ilfknmgevig" />
				<Image publicId="widgetdocs/jrlef2na1ilfknmgevig" />
				<Image publicId="widgetdocs/jrlef2na1ilfknmgevig" />
			</CloudinaryContext>
			
			Email : <input type="text" name="signup-business-email" onChange={onChange}></input><br/>
			Name : <input type="text" name="signup-business-name" onChange={onChange}></input><br/>
			<button id="upload_widget_singleFromMultiple" type="button"> upload profile picture </button><br/>
			password : <input type="text" name="signup-business-password" onChange={onChange}></input><br/>
			Zip : <input type="text" name="signup-business-zip" onChange={onChange} ></input><br/>
			Pet : <input type="text" name="signup-business-pet" onChange={onChange}></input><br/>
			<button id="upload_widget_multiple" type="button"> Create image gallery !</button> <br/>
			<button id="upload_widget_video" type="button"> upload profile video!</button> <br/>

			 <br/>

			 <br/>

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