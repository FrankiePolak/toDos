import { Template } from 'meteor/templating';
// import Meteor.logout() from accounts-password
// import Router from iron:router

import './navigation.html';

Template.navigation.events({
    'click .logout'(event){
	event.preventDefault();
	Meteor.logout();
	Router.go('login');
    }
});
