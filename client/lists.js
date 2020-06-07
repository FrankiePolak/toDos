// lists.js: functionality for To-Do lists, not invidividual todos

// import Meteor
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

/** @this template instance object */
Template.lists.onCreated(function(){
    this.subscribe('lists');
});

Template.addList.events({
    /** Adds a new list to the Lists collection. */
    'submit form'(event){
	event.preventDefault(); // prevent page from refreshing
	var listName = $('[name=listName]').val(); // retrieve input
	Meteor.call('createNewList', listName, function(error, results){
	    if (error){
		console.log(error.reason);
	    } else {
		Router.go('listPage', { _id: results }); // redirects to the listPage with the id of the newly created list
		$('[name=listName]').val(''); // blank the input after submitting
	    }
	}); 
    },
});
