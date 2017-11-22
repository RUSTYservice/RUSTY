import React from 'react';
import axios from 'axios';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import BusinessMini from './BusinessMini.jsx';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      category: 1,
    };
  }

  componentDidMount() {
    axios.get('/api/businessListings')
         .then((response) => {
           console.log('SEARCH_RESULTS DID MOUNT:', response);
           this.addBusinesses(response.businesses);
         })
         .catch((error) => {
           console.log('ERROR ON SEACH_RESULTS DID MOUNT:', error);
         });
  }

  addBusinesses(businesses) {
    this.setState({ businesses });
  }

  handleChange(event, index, value) {
    this.setState({ category: value });
  }

  render() {
    var callback = (business) => {
      return (<BusinessMini
                business={business}
                key={business._id}
                businessName={business.businessName}
                businessCategory={business.businessCategory}
                profileImg={business.profileImg}
      />);
    };
    var businesses = this.state.businesses;
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="All Local Businesses" />
          <MenuItem value={2} primaryText="Bar/Restaurant" />
          <MenuItem value={3} primaryText="Cafe" />
          <MenuItem value={4} primaryText="Hotel" />
        </DropDownMenu>
        <div>
          { this.state.category === 1 ? (
              businesses.map(callback)
          ) : (
              businesses.filter(business => business.category === this.state.value)
                        .map(callback)
          )};
        </div>
      </div>
    );
  }
}


export default SearchResults;
