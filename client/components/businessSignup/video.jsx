import React from 'react';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import CloudinaryVideoPlayer from 'cloudinary-video-player';


class VideoContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			publicId: this.props.publicId,
		};
	this.onClose = this.onClose.bind(this);
	}

	onClose() {
		this.props.turnOff('video');
	}

	render() {
		return (
			<div>
				<p onClick={this.onClose}> <a href="#" > undo </a> </p>
				<Video cloudName="nicko" publicId={this.props.publicId} width="400" controls />
			</div>
		)
	}
}

export default VideoContainer;
