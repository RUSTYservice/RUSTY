import React from 'react';
import axios from 'axios';
import { greenA200, blue500 } from 'material-ui/styles/colors';
import ActionSearch from 'material-ui/svg-icons/action/search';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      const business = businessTuple[0];
      const reviews = businessTuple[1];
      const promotions = businessTuple[2];
      return (<BusinessMini
        petOwnerId={this.props.petOwnerId}
        business={business}
        id={business._id}
        reviews={reviews}
        promotions={promotions}
        businessName={business.businessName}
        businessCategory={business.businessCategory}
        profileImg={business.profileImg.cloudinaryURL}
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
      <MuiThemeProvider>
        <div>
          <DropDownMenu
            iconButton={<ActionSearch color={blue500} hoverColor={greenA200} />}
            value={this.state.value}
            onChange={(event, index, value) => this.handleChange(event, index, value)}
          >
            <MenuItem value={1} label="browse local businesses" primaryText={legend['1']} />
            <MenuItem value={2} label="browse local bars and restaurants" primaryText={legend['2']} />
            <MenuItem value={3} label="browse local cafes" primaryText={legend['3']} />
            <MenuItem value={4} label="browse local hotels"primaryText={legend['4']} />
          </DropDownMenu>
          <div>
            { this.state.category === 1 ? (
                businessTuples.map(callback)
            ) : (businessTuples.filter(businessTuple =>
              businessTuple[0].businessCategory === legend[this.state.category])
                              .map(callback)
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default SearchResults;
