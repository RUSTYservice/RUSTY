import React from 'react';
import ProfileHeader from './ProfileHeader.jsx';

const BusinessProfile = (props) => {
  return (
    <div>
      <ProfileHeader onLogOut={props.onLogOut} />
      <div>
        <h2>Welcome, {props.user.businessName}</h2>
        <img src={props.user.profileImg} style={{ maxHeight: 500 }}></img>
      </div>
    </div>
  );
};

export default BusinessProfile;

/*


   class Profile extends React.Component {



   render () {
   //console.log('in PRofile ')
   let dataz=this.props.parent.state.mockedServerRetrievedData;
   //console.log('in PRofile dataz = ', dataz)

   return (
   <div>

   <h2> in Profile component // THIS IS SERVER RETRIEVED DATA </h2>

   Email : {dataz.email || ''} <br/>
   Name : {dataz.name || ''} <br/>
   Zip : {dataz.zip || ''} <br/>
   password : {dataz.password || ''} <br/>
   Pet : {dataz.pet || ''}
   </div>
   )
   }
   }


 */
