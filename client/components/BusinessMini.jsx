import React from 'react';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PrimaryHeader from './PrimaryHeader.jsx';
import Wag from './Wag.jsx';

class BusinessMini extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wags: Array(5).fill(null),
      reviewText: '',
    };
    /* this.handleChange = this.handleChange.bind(this);*/
    /* this.handleClick = this.handleClick.bind(this);*/
  }

  /* state contains: selected number of wags; review description */

  handleChange(event) {
    this.setState({ reviewText: event.target.value });
  }

  /* consulted reactjs.org tutorial */

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
    return (
      <div>
        <PrimaryHeader />
        <Card>
          <CardHeader title={this.props.username} />
          <h1>Business Mini Listing</h1>
          <p>{this.props.username}</p>
          <p>{this.props.promotion}</p>
          <img src={this.props.image} />
          {this.renderWag(0)}
          {this.renderWag(1)}
          {this.renderWag(2)}
          {this.renderWag(3)}
          {this.renderWag(4)}
          <input value={this.state.reviewText} onChange={event => this.handleChange(event)}></input>
        </Card>
      </div>
    );
  }
};

export default BusinessMini;
