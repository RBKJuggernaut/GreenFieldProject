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
    var that =this;
    axios.get('/userJobs')
    .then(response => {
    const posts = response.data;
    that.setState({jobs:posts});
    
  }).catch(function (error) {
    console.log(error);
  });
  axios.get('/UserInfo')
    .then(response => {
    const posts = response.data;
    that.setState({user:posts});
    console.log(that.state.user.image)
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
    <div className="row container-fluid">
    <div className="col-md-4 " >
    <img src={this.state.user.image}/>
     
    
    </div>
    <div className="col-md-8">

    <div>
    {arr}
    </div>

    </div>
     </div>
    <br />
    <br />

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
