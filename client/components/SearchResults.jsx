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
      businessTuples: [],
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

  addBusinesses(businessTuples) {
    this.setState({ businessTuples });
  }

  handleChange(event, index, value) {
    this.setState({ category: value });
  }

  /* businessTuple is [{business}, [review 0, review 1, ...]] */
  render() {
    const callback = (businessTuple) => {
      var business = businessTuple[0];
      var reviews = businessTuple[1];
      return (<BusinessMini
                userId={this.props.userId}
                business={business}
                id={business._id}
                reviews={reviews}
                businessName={business.businessName}
                businessCategory={business.businessCategory}
                profileImg={business.profileImg}
      />);
    };
    const businessTuples = this.state.businessTuples;
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
              businessTuples.map(callback)
          ) : (
              businessTuples.filter(businessTuple => businessTuple[0].businessCategory === legend[this.state.category])
                            .map(callback)
          )};
        </div>
      </div>
    );
  }
}


export default SearchResults;
