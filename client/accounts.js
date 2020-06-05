import { Template } from 'meteor/templating';
// import Accounts from accounts-password
// import Meteor.loginWithPassword from accounts-password
// import Router from iron:router

import './accounts.html';

Template.register.events({
    'submit form'(event){
	event.preventDefault();
	var email = $('[name=email]').val();
	var password = $('[name=password]').val();
	Accounts.createUser({
	    email,
	    password
	}, function(error){
	    if (error){
		console.log(error.reason);
	    } else {
		Router.go('home');
	    }
	});
    },
});

Template.login.events({
    'submit form'(event){
	event.preventDefault();
	var email = $('[name=email]').val();
	var password = $('[name=password]').val();
	Meteor.loginWithPassword(email, password, function(error){
	    if (error){
		console.log(error.reason);
	    } else {
		var currentRoute = Router.current().route.getName();
		if (currentRoute === 'login'){
		    Router.go('home');
		} // else remain on currentRoute
	    }
	});
    },
});
