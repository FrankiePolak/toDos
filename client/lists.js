// lists.js: functionality for To-Do lists, not invidividual todos

import { Template } from 'meteor/templating';

import { Lists } from '../both.js';

import './lists.html';

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
	});
	$('[name=listName]').val(''); // blank the input after submitting
    },
});
