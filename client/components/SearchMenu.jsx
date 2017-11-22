import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class SearchMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="All Local Businesses" />
          <MenuItem value={2} primaryText="Bar/Restaurant" />
          <MenuItem value={3} primaryText="Cafe" />
          <MenuItem value={4} primaryText="Hotel" />
        </DropDownMenu>
      </div>
    );
  }
}

export default SearchMenu;
