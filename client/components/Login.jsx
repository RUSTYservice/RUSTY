import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import UserLogin from './UserLogin.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'petOwner',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, value) {
    this.setState({ selected: value });
  }

  render() {
    const style = {
      paper: {
        height: 'auto',
        width: 'auto',
        padding: 25,
        margin: 20,
        textAlign: 'left',
        display: 'inline-block',
      },
      linkText: {
        fontFamily: 'Roboto, sans-serif',
        display: 'inline',
      },
      radioButton: {
        marginBottom: 16,
      },
      icon: {
        fill: '#33691E',
      },
      paperContents: {
        whiteSpace: 'nowrap',
        marginTop: 15,
        backgroundColor: 'white',
      },
    };
    return (
      <div>
        <Paper style={style.paper} zDepth={5}>
          <div style={style.paperContents}>
            <RadioButtonGroup
              name="loginType"
              defaultSelected="petOwner"
              onChange={this.onChange}
            >
              <RadioButton
                iconStyle={style.icon}
                value="business"
                label="Business"
                style={style.radioButton}
              />
              <RadioButton
                iconStyle={style.icon}
                value="petOwner"
                label="Pet Owner"
                style={style.radioButton}
              />
            </RadioButtonGroup>
            <br />
            {
          this.state.selected === 'business' ?
          (<UserLogin userType="Business" authenticateLogin={this.props.authenticateLogin} />) :
          (<UserLogin userType="Pet Owner" authenticateLogin={this.props.authenticateLogin} />)
            }
          </div>
        </Paper>
      </div>
    );
  }
}

export default Login;
