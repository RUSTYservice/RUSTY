import React from 'react';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {green500, blue500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import PrimaryHeader from './PrimaryHeader.jsx';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import Review from './Review.jsx'
import Wag from './Wag.jsx';


const paperStyle = {
  width: 600,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
};

const hintStyle = {
  textAlign: 'center',
}

const styles = {
  errorStyle: {
    color: blue500,
  },
  underlineStyle: {
    borderColor: blue500,
  },
  floatingLabelStyle: {
    color: green500,
  },
  floatingLabelFocusStyle: {
    color: green500,
  },
};


class BusinessMini extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wags: Array(5).fill(null),
      reviewText: '',
      expanded: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
  }

  handleExpandChange(expanded) {
     this.setState({expanded: expanded});
  };

  /* state contains: selected number of wags; review description */

  handleSubmit() {
    var numWags = 0;
    while (this.state.wags[numWags]) {
      numWags++;
    }
    axios.post('/api/review', {
      wags: numWags,
      description: this.state.reviewText,
      petOwnerId: this.props.petOwnerId,
      businessId: this.props.id
    })
         .then((res) => {
           console.log(res);
         })
         .catch((err) => {
           return console.error(err);
         });
  }

  handleChange(event) {
    this.setState({ reviewText: event.target.value });
  }

  handleClick(i) {
    const wags = this.state.wags.map((wag, index) => {
      return index <= i ? 'X' : null;
    });
    this.setState({ wags: wags });
  }

  renderWag(i) {
    return <Wag value={this.state.wags[i]} onClick={() => this.handleClick(i)} />
  }

  render() {

    var sumWags = 0;
    const reviews = this.props.reviews;
    for (var i = 0; i < reviews.length; i++) {
      sumWags += reviews[i].wags;
    }
    var avgWags = 'no'
    if (i > 0) {
      avgWags = (sumWags / i).toString();
    }

    return (
      <div>
      <Paper style={paperStyle} zDepth={2}>
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          avatar={this.props.profileImg}
          title={this.props.businessName}
          subtitle={this.props.businessCategory}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardMedia
          expandable={true}
          overlay={<CardTitle title={this.props.businessName} />}
           >
          <img src={this.props.profileImg} />
        </CardMedia>
        <CardTitle subtitle={avgWags + ' wags!'} />
        <CardText
          expandable={true}>
          {reviews.map((review) => {
             return <Review description={review.description} />
          })}
        </CardText>
        <CardActions
          expandable={true}
        >
          {this.renderWag(0)}
          {this.renderWag(1)}
          {this.renderWag(2)}
          {this.renderWag(3)}
          {this.renderWag(4)}
          {this.props.promotions.map((promotion) => {
             return <p>{promotion.description}</p>
          })}
           <TextField
            hintText="(<--) some wags, then (-->) a review. "
            hintStyle={{hintStyle}}
            multiLine={true}
            value={this.state.reviewText}
            onChange={event => this.handleChange(event)}
            />
          <FlatButton label="submit a review!" primary={true} onClick={() => this.handleSubmit()}></FlatButton>
        </CardActions>
      </Card>
      </Paper>
      <br />
      </div>
    );
  }
};

export default BusinessMini;
