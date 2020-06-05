import { Template } from 'meteor/templating';
// import Accounts from accounts-password

import './register.html';

Template.register.events({
    'submit form'(event){
	event.preventDefault();
	var email = $('[name=email]').val();
	var password = $('[name=password]').val();
	Accounts.createUser({
	    email,
	    password
	});
	Router.go('home');
    },
});
