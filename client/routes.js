// routes.js: define the app pages and what shows on them

import { Router } from 'meteor/iron:router';

import './routes.html';

import './navigation.js';
import './lists.js';
import './accounts.js';

/** Route that appears on every page */
Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'home',
    template: 'home', 
});

Router.route('/register', {
    name: 'register',
    template: 'register'
});

Router.route('/login', {
    name: 'login',
    template: 'login'
});

/** 
 * The page for one to-do list
 * @this the route
 */
Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
	var currentList = this.params._id;
	var currentUser = Meteor.userId();
	return Lists.findOne({ _id: currentList, createdBy: currentUser });
    },
    onBeforeAction: function(){
	var currentUser = Meteor.userId();
	if (currentUser){ // logged in
	    this.next(); // execute the route normally
	} else { // logged out
	    this.render('login'); // switch to the login template
	}
    },
    waitOn: function(){
	var currentList = this.params._id; 
	return Meteor.subscribe('todos', currentList);
    }
});
    
    
