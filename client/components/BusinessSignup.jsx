import React from 'react';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';
import RaisedButton from 'material-ui/RaisedButton';
import CloudinaryVideoPlayer from 'cloudinary-video-player';
import VideoContainer from './businessSignup/video.jsx';
import ImageProfileContainer from './businessSignup/imageProfile.jsx';

// set video source to be the uploaded video
// make video visually closable
// send video to db object on submit
// remove video from db object on close
// refactor video to a stateless comp
// make an image component in the same fashion
// quid doing an high order container
// make a gallery component that holds images components
// make pet owner profile
// connect the object to db
// make the environment var app for any legacy
// fix multiple successive upload of videos
// ***************** improvement
// position video , image and gallery better
// check email is valid
// make business category a select

class BusinessSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {
				visible: false,
				source: null
			},
			gallery: {
				visible: false,
				source: null
			},
			imageProfile: {
				visible: false,
				source: null,
        url: null,
			},
			name: '',
			email: '',
			zip: '',
			phone: '',
			street: '',
			category: '',
			password: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.turnOff = this.turnOff.bind(this);
		this.turnOn = this.turnOn.bind(this);
		this.uploadVideo = this.uploadVideo.bind(this);
		this.uploadImageProfile = this.uploadImageProfile.bind(this);
		this.category = 'business';
	}

	onSubmit(ev) {
		ev.preventDefault();
		const obj = {};
		obj.name = this.state.name;
		obj.email = this.state.email;
		obj.zip = this.state.zip;
		obj.phone = this.state.phone;
		obj.street = this.state.street;
		obj.category = this.state.category;
		obj.password = this.state.password;
    obj.image = this.state.imageProfile.url;
    obj.video = this.state.video.source;
    obj.gallery = this.state.gallery.source;
		this.props.signUp(obj, 'Business');
	}

	onChange(e) {
		const obj = {};
		obj[e.target.name] = e.target.value;
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
		// 	var appStateKey = "signup-" + this.category + "-" + media;
		// 	state[appStateKey] = localState[media];
		// 	return state;
		// });
	}

	uploadVideo() {
		window.cloudinary.openUploadWidget(
			{
				cloud_name: "nicko",
				upload_preset: "zahnf2xg",
				folder: "widgetdocs",
				form: ".upload_multiple_images_holder",
				sources: ["local"],
				thumbnails: ".upload_multiple_images_holder",
				multiple: false,
				google_api_key: "AIzaSyDaQj7FO1IQtp9DSB5YNP5jjG6f_mItEQ4",
				max_files: 1,
				show_powered_by: false,
				client_allowed_formats: ["mp4"],
				keep_widget_open: false
			},
			(error, result) => {
				if (error) {
					console.log(error, result);
					return;
				}
        // displayVideo(result[0].public_id)
				this.turnOn('video', result[0].public_id, result[0].url);
			}
		);
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
      }
    };

    $(document).ready(function() {
      /*
        const displayVideo = function  (public_id) {
          $(document ).ready(function() {
             that.setState({
                video : {
                  source : public_id,
                  visible : true
                }
            })
          });
        }
      */

      // comp 2
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
      /*
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
            //console.log('result .public_id = ',result[0].public_id)
            //console.log('result thumnail = ',result[0].thumbnail_url)
            console.log('result  = ',result)
            //displayVideo(result[0].public_id)
            that.turnOn('video',result[0].public_id,result[0].url);
          });
        });
      */
		});

    return (
      <form id="signupForm" onSubmit={this.onSubmit}>
        <TextField name="email" onChange={this.onChange} hintText="Email" />
        <br />
        <TextField name="name" onChange={this.onChange} hintText="Business Name" />
        <br />
        <TextField name="zip" onChange={this.onChange} hintText="Zip Code" />
        <br />
        <TextField name="phone" onChange={this.onChange} hintText="Phone" />
        <br />
        <TextField name="street" onChange={this.onChange} hintText="Street Address" />
        <br />
        <TextField name="category" onChange={this.onChange} hintText="Business Category" />
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
          id="upload_widget_singleFromMultiple"
          label="Create An Image Gallery"
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
					id="upload_widget_video"
		      label="Upload A Video"
		      labelPosition="before"
		      containerElement="label"
		      style={{ margin: 12 }}
					onClick={this.uploadVideo}
		    />
				<br />
				{this.state.video.visible ? (
					<VideoContainer
						publicId={this.state.video.source}
						turnOff={this.turnOff}
					/>
				) : null}
		    <RaisedButton
		      containerElement="label"
		      style={{ margin: 12 }}
		      buttonStyle={style.button}
					type="submit"
					onClick={this.onSubmit}
		    >SIGN UP</RaisedButton>
			</form>
		);
	}
}

export default BusinessSignup;
