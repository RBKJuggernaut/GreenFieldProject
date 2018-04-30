import React from 'react';
import {NavLink} from 'react-router-dom';
import { FormControl} from "react-bootstrap";
import axios from 'axios';

class NavBarComponent extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      value: '',
      jobsUser:''
    };

    this.SearchUser  = this.SearchUser.bind(this);
  }

  SearchUser(e) {
  	this.setState({
      value: e.target.value
    });
    var that = this;
   axios.post('/findUser', {"userName": this.state.value})
        .then(function(response){
          const posts = response.data;
          console.log('ho ho ho  finally',posts)
            that.setState({jobsUser: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
    
  }
    render(){
    	//console.log('ttteeessssttt')
    	if(this.props.session){
    		return(
	<nav className="navbar navbar-fixed-top" >
  <div >
		<ul id='HNA'>
		<li id='Na'><NavLink to = "/" activeClassName = "is-active" exact = {true}>Home</NavLink></li>
		<li id='Na'><NavLink to = "/jobsForm" activeClassName = "is-active" >Add Job</NavLink></li>
		<li id='Na'><NavLink to = "/UpdateUser" activeClassName = "is-active" >UpdateUserProfile</NavLink></li>
		<li id='Na'><NavLink to = "/Profile" activeClassName = "is-active" >Profile</NavLink></li>
		<li id='Na'><NavLink to = "/userProfile" activeClassName = "is-active" > <FormControl
          id='catI'
          className="Sform-control"
          type="text"
          value={this.state.value}
          onChange={this.SearchUser}
          placeholder="Job Title"
        /></NavLink></li>

		<li className="nav navbar-nav pull-right" id='Na'><NavLink to = "/logout" activeClassName = "is-active" >Logout</NavLink></li>
		
		</ul>
	 </div>
</nav>
	);
    	}else{
    		return(
	<nav className="navbar navbar-fixed-top" >
  <div >
		<ul id='HNA'>
		<li id='Na'><NavLink to = "/" activeClassName = "is-active" exact = {true}>Home</NavLink></li>
		<li className="nav navbar-nav pull-right" id='Na'><NavLink to = "/login" activeClassName = "is-active" >Login</NavLink></li>
		<li className="nav navbar-nav pull-right" id='Na'><NavLink to = "/signup" activeClassName = "is-active" >Sign up</NavLink></li>
		</ul>
	 </div>
</nav>
	);
    	}
        
 }
}
export default NavBarComponent;
 