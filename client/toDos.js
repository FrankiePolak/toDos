import { Template } from 'meteor/templating';

import { ToDos } from '../both.js';

import './toDos.html';

Template.toDos.helpers({
    /** 
     * Returns the ToDos from the current list.
     * @returns {Mongo.Collection}
     * @this the list from {{#each list}}
     */
    toDo(){
	var currentList = this._id;
	return ToDos.find({ listId: currentList },
			  {sort: { createdAt: -1 }});
    },
});

Template.toDosCount.helpers({
    /**
     * Returns the total number of items in the current list.
     * @returns number
     * @this the list from {{#each list}}
     */
    totalToDos(){
	var currentList = this._id;
	return ToDos.find({ listId: currentList }).count();
    },
    /** 
     * Returns the number of completed items in the current list.
     * @returns number
     * @this the list from {{#each list}}
     */
    completedToDos(){
	var currentList = this._id;
	return ToDos.find({ listId: currentList, completed: true }).count();
    },
});

Template.addToDo.events({
    /** 
     * Creates a new toDo
     * @this the list from {{#each list}}
     */
    'submit form'(event){
	event.preventDefault(); // prevent the page from refreshing
	var name = $('[name="toDoName"]').val(); // add a new toDo
	var listId = this._id;
	ToDos.insert({
	    name,
	    completed: false,
	    createdAt: new Date(),
	    listId
	});
	$('[name="toDoName"]').val(''); // clear the input box after submitting
    },
});

Template.toDoItem.helpers({
    /**
     * Returns "checked" for items that are completed.
     * @this refers to the toDo currently being iterated through by the each block.
     * @returns {string}
     */
    checked(){
	var isCompleted = this.completed;
	if (isCompleted){
	    return "checked";
	} else {
	    return "";
	}
    },
});

Template.toDoItem.events({
    /** 
     * If completed is false, change it to true. It it's true, change it to false.
     * @this refers to the toDo currently being iterated through by the each block.
     */
    'change [type=checkbox]'(event){
	ToDos.update(this._id, {$set: { completed: ! this.completed }}); 
    },
     /** 
     * Updates the toDo item as the user types. The toDo item loses focus if the user presses Return or Escape.
     * @this refers to the toDo currently being iterated through by the each block.
     * Since the event is associated with toDoItem, event.target refers to the toDoItem input.
     */
    'keyup [name=toDoItem]'(event){
	var key = event.which; // the HTML code of the pressed key
	if (key === 13 || key === 27){ // Return or Escape
	    $(event.target).blur(); // remove focus
	} else {
	    var name = $(event.target).val();
	    ToDos.update(this._id, {$set: { name }}); // newer selection and field syntax
	}
    }, 
    /** 
     * Removes the toDo from the ToDos collection 
     * @this refers to the toDo currently being iterated through by the each block
     */
    'click .delete-todo'(event){
	event.preventDefault(); // prevent the URL from changing
	var name = this.name; // the name of the toDo
	var confirm = window.confirm("Delete \'" + name + "\' from the To-Do list?"); // ask if the user's sure
	if (confirm){
	    ToDos.remove(this._id); // newer selection syntax to remove a document
	}
    },
});
