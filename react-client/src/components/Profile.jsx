import React from 'react';
import axios from 'axios';
import JobsForUser from './JobsForUser.jsx';
import UserInfo from './UserInfo.jsx';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { 
      jobs: [],
      user:[],
      myJobs:[]
    }
  }


//make new get requests for each filter
  componentDidMount() {
    axios.get('/userJobs')
    .then(response => {
    const posts = response.data;
    this.setState({jobs:posts});
    console.log(this.state.jobs)
    
  }).catch(function (error) {
    console.log(error);
  });
}


render() {
  var arr = [];
  
    this.state.jobs.forEach(function(item) {
      arr.push(<JobsForUser item={item} />)
    })
  
  
  return (
  
    <div id="profile">
    <div></div>
    <br/>
    <div>
    {arr}
    </div><br /><br />

    <div>
    <h1>
    Job For This User
    </h1>
    <br/>
    <br/>
    <div>
    {arr}
    </div>
    </div>
    </div>
    
    )
}
}
export default Profile;
