// lists.js: functionality for To-Do lists, not invidividual todos

import { Template } from 'meteor/templating';
// import Router from iron:router
// import Meteor.userId() from accounts-password

import { Lists } from '../both.js';

import './lists.html';

import './toDos.js';

Template.lists.helpers({
    /**
     * Returns the Lists that belong to the current user, sorted by name.
     * @returns {Mongo.Collection}
     */
    list(){
	var currentUser = Meteor.userId();
	return Lists.find({ createdBy: currentUser }, {sort: { name: 1 }});
    }
});

Template.addList.events({
    /** Adds a new list to the Lists collection. */
    'submit form'(event){
	event.preventDefault(); // prevent page from refreshing
	var listName = $('[name=listName]').val(); // retrieve input
	var createdBy = Meteor.userId();
	Lists.insert({ // create a new list
	    name: listName,
	    createdBy
	}, function(error, results){
	    Router.go('listPage', { _id: results }); // redirects to the listPage with the id of the newly created list
	});
	$('[name=listName]').val(''); // blank the input after submitting
    },
});
