import { Template } from 'meteor/templating';
// import Accounts from accounts-password
// import Meteor.loginWithPassword from accounts-password
// import Router from iron:router
// import .validate() from themeteorchef:jquery-validation

import './accounts.html';

import './validatorDefaults.js';

Template.register.events({
    'submit form'(event){
	event.preventDefault();
	// rest of submission is in Template.register.onRendered
    }
});

Template.register.onRendered(function(){
    var validator = $('.register').validate({
	submitHandler: function(event){
	    var email = $('[name=email]').val();
	    var password = $('[name=password]').val();
	    Accounts.createUser({
		email,
		password
	    }, function(error){
		if (error){
		    if (error.reason === "Email already exists."){
			validator.showErrors({
			    email: "That email already belongs to a registered user."
			});
		    }
		} else {
		    Router.go('home');
		}
	    });
	}
    });
});

Template.login.events({
    'submit form'(event){
	event.preventDefault();
	// rest of submission is in Template.login.onRendered
    }
});

Template.login.onRendered(function(){
    var validator = $('.login').validate({
	submitHandler: function(event){
	    var email = $('[name=email]').val();
	    var password = $('[name=password]').val();
	    Meteor.loginWithPassword(email, password, function(error){
		if (error){
		    if (error.reason === "User not found"){
			validator.showErrors({
			    email: "That email doesn't belong to a registered user."
			});
		    }
		    if (error.reason === "Incorrect password"){
			validator.showErrors({
			    password: "You entered an incorrect password."
			});
		    }
		} else {
		    var currentRoute = Router.current().route.getName();
		    if (currentRoute === 'login'){
			Router.go('home');
		    } // else remain on currentRoute
		} 
	    });
	}
    });
});
