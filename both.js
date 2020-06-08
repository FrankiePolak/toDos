// both.js: code to run on both the client and server
// declaring collections and methods

import { Mongo } from 'meteor/mongo';
//import Meteor

// collection declarations
ToDos = new Mongo.Collection('toDos'); // individual tasks
export { ToDos };
Lists = new Mongo.Collection('lists'); // categories of tasks
export { Lists };

// method helpers
function checkLogin(currentUser){
    if (!currentUser){
	throw new Meteor.Error("not-logged-in", "You're not logged in.");
    }
}
function checkListExists(listId, currentUser){
    if (!Lists.findOne({ _id: listId, createdBy: currentUser })){
	throw new Meteor.Error("no-list", "List does not exist.");
    }
}
function checkTaskExists(itemId, currentUser){
    if (!ToDos.findOne({ _id: itemId, createdBy: currentUser })){
	throw new Meteor.Error("no-task", "Task does not exist.");
    }
}
function defaultListName(currentUser){
    var nextLetter = 'A';
    var nextName = 'List' + nextLetter;
    while(Lists.findOne({ name: nextName, createdBy: currentUser })){
	nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
	nextName = 'List' + nextLetter;
    }
    return nextName;
}
function defaultToDoName(currentUser, currentList){
    var nextLetter = 'A';
    var nextName = 'task' + nextLetter;
    while(ToDos.findOne({ name: nextName, createdBy: currentUser,  listId: currentList })){
	nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
	nextName = 'task' + nextLetter;
    }
    return nextName;
}

Meteor.methods({
    /** Adds a new to-do list */
    createNewList(listName){
	
	var currentUser = Meteor.userId();
	checkLogin(currentUser);
	check(listName, String);
	if (listName == ""){
	    listName = defaultListName(currentUser);
	}
	
	var data = {
	    name: listName,
	    createdBy: currentUser
	}
	
	return Lists.insert(data); // else create a new list 
    },
    /** Adds a to-do item to a list */
    createListItem(name, listId){
	
	var currentUser = Meteor.userId();
	checkLogin(currentUser);
	check(listId, String);
	checkListExists(listId, currentUser);
	check(name, String);
	if (name == ""){
	    name = defaultToDoName(currentUser, listId);
	}
	
	var data =  {
	    name,
	    completed: false,
	    createdAt: new Date(),
	    createdBy: currentUser,
	    listId
	}
	
	return ToDos.insert(data);
    },
    /** Saves changes to a to-do list item */
    updateListItem(name, itemId){
	
	var currentUser = Meteor.userId();
	checkLogin(currentUser);
	check(itemId, String);
	checkTaskExists(itemId, currentUser);
	check(name, String);
	if (name == ""){
	    console.log("Warning: name is empty.");
	}
	
	ToDos.update({ _id: itemId }, {$set: { name }});
    },
    /** Marks a task as complete or incomplete */
    changeItemStatus(itemId, completed){
	
	var currentUser = Meteor.userId();
	checkLogin(currentUser);
	check(itemId, String);
	checkTaskExists(itemId, currentUser);
	check(completed, Boolean);
	
	ToDos.update({ _id: itemId }, {$set: { completed: !completed }});
    },
    /** Deletes a to-do list item */
    removeListItem(itemId){
	
	var currentUser = Meteor.userId();
	checkLogin(currentUser);
	check(itemId, String);
	checkTaskExists(itemId, currentUser);
	
	ToDos.remove({ _id: itemId });
    }
});
