import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const obj = {};
    obj[ev.target.name] = ev.target.value;
    this.setState(obj);
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.authenticateLogin(this.state.email, this.state.password, this.props.userType);
  }

  render() {
    const style = {
      button: {
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: '#7CB342',
        color: 'white',
      },
    };
    return (
      <div>
        <form id="loginForm" onSubmit={this.onSubmit}>
          <TextField
            name="email"
            hintText="Email"
            type="email"
            onChange={this.onChange}
          />
          <br />
          <TextField
            name="password"
            hintText="Password"
            type="password"
            onChange={this.onChange}
          />
          <br />
          <br />
          <RaisedButton onClick={this.onSubmit} buttonStyle={style.button} type="submit">LOG IN</RaisedButton>
        </form>
      </div>
    );
  }
}

export default UserLogin;
