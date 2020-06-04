import { Template } from 'meteor/templating';

import { ToDos } from '../both.js';

import './main.html';

import './routes.js';

Template.toDos.helpers({
    /** 
     * Returns the ToDos collection 
     * @returns {Mongo.Collection}
     */
    toDo(){
	return ToDos.find({}, {sort: { createdAt: -1 }});
    },
});

Template.toDosCount.helpers({
    /** Return the total number of items in the ToDos collection. */
    totalToDos(){
	return ToDos.find().count();
    },
    /** Return the number of completed items in the ToDos collection. */
    completedToDos(){
	return ToDos.find({ completed: true }).count();
    },
});

Template.addToDo.events({
    /** Creates a new toDo */
    'submit form'(event){
	event.preventDefault(); // prevent the page from refreshing
	var name = $('[name="toDoName"]').val(); // add a new toDo
	ToDos.insert({
	    name,
	    completed: false,
	    createdAt: new Date()
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
