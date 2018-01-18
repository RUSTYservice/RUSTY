import React from 'react';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';
import ImageProfileContainer from './businessSignup/imageProfile.jsx';

class PetOwnerSignup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			petName: '',
			zip: '',
			password: '',
      imageProfile: {
        visible: false,
        source: null,
        url: null,
      },
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    this.uploadImageProfile = this.uploadImageProfile.bind(this);
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
	}

  onSubmit(ev) {
  	ev.preventDefault();
  	const obj = {};
  	obj.name = this.state.name;
  	obj.email = this.state.email;
  	obj.petName = this.state.petName;
  	obj.zip = this.state.zip;
  	obj.image = this.state.imageProfile.url;
  	obj.password = this.state.password;
  	this.props.signUp(obj);
  }

  onChange(ev) {
  	const obj = {};
  	obj[ev.target.name] = ev.target.value;
  	this.setState(obj);
  }

  turnOff(media) {
    this.setState(state => {
      state[media].visible = false;
      state[media].source = null;
      return state;
    });
    this.props.app.setState(state => {
      var appStateKey = 'signup-' + this.category + '-' + media;
      state[appStateKey] = null;
      return state;
    });
  }

  turnOn(media, source, url) {
    this.setState(state => {
      state[media].visible = true;
      state[media].source = source;
      state[media].url = url;
      return state;
    });
    // var localState = this.state;
    // this.props.app.setState(state => {
    //  var appStateKey = "signup-" + this.category + "-" + media;
    //  state[appStateKey] = localState[media];
    //  return state;
    // });
  }

  uploadImageProfile() {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "nicko",
        upload_preset: "avqjuqpq",
        folder: "widgetdocs",
        form: ".upload_multiple_images_holder",
        sources: [
          "local",
          "image_search",
          "facebook",
          "instagram",
          "google_photos"
        ],
        thumbnails: ".upload_multiple_images_holder",
        cropping: "server",
        multiple: false,
        google_api_key: "AIzaSyDaQj7FO1IQtp9DSB5YNP5jjG6f_mItEQ4",
        max_files: 1,
        show_powered_by: false,
        client_allowed_formats: ["jpg", "jpeg", "png", "gif", "svg"],
        keep_widget_open: false
      },
      (error, result) => {
        if (error) {
          console.log(error, result);
          return;
        }
        this.turnOn('imageProfile', result[0].public_id, result[0].url);
      }
    );
  }

  render() {
	  const style = {
	    button: {
	      fontFamily: 'Roboto, sans-serif',
	      backgroundColor: '#7CB342',
	      color: 'white',
	    },
	  };

    $(document).ready(function() {
      $('#upload_widget_multiple').click(function(e) {
        e.preventDefault();
        window.cloudinary.openUploadWidget(
        {
            cloud_name: "nicko",
            upload_preset: "avqjuqpq",
            folder: "widgetdocs",
            form: ".upload_multiple_images_holder",
            sources: [
              "local",
              "image_search",
              "facebook",
              "instagram",
              "google_photos"
            ],
            thumbnails: ".upload_multiple_images_holder",
            multiple: true,
            google_api_key: "AIzaSyDaQj7FO1IQtp9DSB5YNP5jjG6f_mItEQ4",
            max_files: 10,
            show_powered_by: false,
            client_allowed_formats: ["jpg", "jpeg", "png", "gif", "svg"],
            keep_widget_open: true
          },
          function(error, result) {
            if (error) {
              console.log(error, result);
              return;
            }
          });
      });
    });

	  return (
	    <div>
	    <form id="signupForm" onSubmit={this.onSubmit}>
	      <TextField name="email" onChange={this.onChange} hintText="Email" />
	      <br />
	      <TextField name="name" onChange={this.onChange} hintText="Name" />
	      <br />
	      <TextField name="zip" onChange={this.onChange} hintText="Zip Code" />
	      <br />
	      <TextField name="petName" onChange={this.onChange} hintText="Pet Name" />
	      <br />
	      <TextField name="password" onChange={this.onChange} hintText="Password" />
        <br />
        <RaisedButton
          id="upload_widget_singleFromMultiple"
          label="Choose an Image"
          labelPosition="before"
          containerElement="label"
          style={{ margin: 12 }}
          onClick={this.uploadImageProfile}
        />
        <br />
          {this.state.imageProfile.visible ? (
        <div>
        <br />
            <br />
            <ImageProfileContainer
              publicId={this.state.imageProfile.source}
              turnOff={this.turnOff}
            />
            <br />
            <br />
          </div>
        ) : null}
	      <RaisedButton
	        containerElement="label"
	        style={{ margin: 12 }}
	        buttonStyle={style.button}
	        onClick={this.onSubmit}
	      >
	        SIGN UP
	      </RaisedButton>
	      </form>
	    </div>
	  );
  }
};

export default PetOwnerSignup;
