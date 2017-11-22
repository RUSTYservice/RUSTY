import React from 'react';
import axios from 'axios';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PrimaryHeader from './PrimaryHeader.jsx';
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
           console.log('SEARCH_RESULTS DID MOUNT:', response.data);
           this.addBusinesses(response.data);
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
    const callback = (business) => {
      return (<BusinessMini
                business={business}
                key={business._id}
                businessName={business.businessName}
                businessCategory={business.businessCategory}
                profileImg={business.profileImg}
      />);
    };
    const businesses = this.state.businesses;
    const legend = {
      1: 'All Local Businesses',
      2: 'Bars/Restaurants',
      3: 'Cafes',
      4: 'Hotels',
    };
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={(event, index, value) => this.handleChange(event, index, value)}>
          <MenuItem value={1} primaryText={legend['1']} />
          <MenuItem value={2} primaryText={legend['2']} />
          <MenuItem value={3} primaryText={legend['3']} />
          <MenuItem value={4} primaryText={legend['4']} />
        </DropDownMenu>
        <div>
          { this.state.category === 1 ? (
              businesses.map(callback)
          ) : (
              businesses.filter(business => business.businessCategory === legend[this.state.category])
                        .map(callback)
          )};
        </div>
      </div>
    );
  }
}


export default SearchResults;
