// routes.js: define the app pages and what shows on them

import { Router } from 'meteor/iron:router';

import './routes.html';

import './navigation.js';
import './lists.js';
import './register.js';

/** Route that appears on every page */
Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home'
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
 * @this the route or the URL?
 */
Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
	var currentList = this.params._id;
	return Lists.findOne(currentList);
    }
});
