import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import SignUpForm from '../components/SignUp.jsx';
import JobsForm from '../components/JobsForm.jsx';
import NavBarComponent from '../components/NavBarComponent.jsx';
import Login from '../components/Login.jsx';
import Home from '../components/Home.jsx';
import UpdateUser from '../components/UpdateUser.jsx';
import NotAuthenticatedHome from '../components/NotAuthenticatedHome.jsx';
import UserJobs from '../components/UserJobs.jsx';
import Profile from '../components/Profile.jsx';
import UserProfile from '../components/UserProfile.jsx';
import axios from 'axios';

class AppRouter extends React.Component {
constructor(props) {
    super(props);
    this.state = { 
      session: false
    }
   
  }

 componentDidMount() {
axios.get('/logged')
  .then(response => {
    const posts = response.data;
    // console.log(response);
    this.setState({session:posts});
     
  })
  .catch(function (error) {
    console.log(error);
  });
}
  
   render() {

    return (
	<BrowserRouter>
		<div>
			<NavBarComponent session={this.state.session}/><br /><br />
			<Switch>
			<Route  exact path = "/"  component = {Home}/>	
			<Route  path = "/signup" component = {SignUpForm} />
			<Route  path = "/UserJobs/:jobTitle/:userName" component = {UserJobs} />				
			<Route  path = "/jobsForm" component = {JobsForm} />
			<Route  path = "/UpdateUser" component = {UpdateUser} />			
			<Route  path = "/login"	component = {Login} />	
			<Route  path = "/Profile"	component = {Profile} />
			<Route  path = "/logout"	component = {NotAuthenticatedHome} />	
			<Route  path = "/userProfile"	component = {UserProfile} />	




			</Switch>
		</div>
	</BrowserRouter>

	)
}
}
export default AppRouter;