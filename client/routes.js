// routes.js: define the app pages and what shows on them

import { Router } from 'meteor/iron:router';

import './routes.html';

import './navigation.js';
import './lists.js';

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
