// lists.js: functionality for To-Do lists, not invidividual todos

import { Template } from 'meteor/templating';
// import Router from iron:router

import { Lists } from '../both.js';

import './lists.html';

import './toDos.js';

Template.lists.helpers({
    /**
     * Returns the Lists collection, sorted by name.
     * @returns {Mongo.Collection}
     */
    list(){
	return Lists.find({}, {sort: { name: 1 }});
    }
});

Template.addList.events({
    /** Adds a new list to the Lists collection. */
    'submit form'(event){
	event.preventDefault(); // prevent page from refreshing
	var listName = $('[name=listName]').val(); // retrieve input
	Lists.insert({ // create a new list
	    name: listName
	}, function(error, results){
	    Router.go('listPage', { _id: results }); // redirects to the listPage with the id of the newly created list
	});
	$('[name=listName]').val(''); // blank the input after submitting
    },
});
