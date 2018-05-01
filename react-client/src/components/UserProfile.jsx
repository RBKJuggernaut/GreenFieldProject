import React from 'react';
import {FormControl} from "react-bootstrap";
import axios from 'axios';
import JobsForUser from './JobsForUser.jsx';


class UserProfile extends React.Component {
  
constructor(props) {
    super(props);

    this.state = {
      value: '',
      user:'',
      userJobs:[]
    };

    this.SearchUser  = this.SearchUser.bind(this);
  }

  SearchUser(e) {
    this.setState({
      value: e.target.value
    });
    var that = this;
    //some Info about user
   axios.post('/findUser', {"userName": this.state.value})
        .then(function(response){
          const posts = response.data;
          console.log('ho ho ho  finally',posts)
            that.setState({user: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
          //info about Jobs in this user
    axios.get('/userJobss/'+this.state.value)
        .then(function(response){
          const posts = response.data;
          console.log('ho ho ho  finally',posts)
            that.setState({userJobs: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
  }
 
  render() {
    var arr = [];
  
    this.state.userJobs.forEach(function(item) {
      arr.push(<JobsForUser item={item} />)
    })
    return (
      <div>
      <FormControl
          id='catI'
          className="Sform-control"
          type="text"
          value={this.state.value}
          onChange={this.SearchUser}
          placeholder="Search"
          
        />
        <br/>
        <br/>
        <div>
        {arr}
        </div>
      </div>
    );
  }
}


export default UserProfile;

















