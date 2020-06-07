// both.js: code to run on both the client and server
// declaring collections and methods

import { Mongo } from 'meteor/mongo';
//import Meteor

// collection declarations
ToDos = new Mongo.Collection('toDos'); // individual tasks
export { ToDos };
Lists = new Mongo.Collection('lists'); // categories of tasks
export { Lists };

// method helper
function defaultName(currentUser){
    var nextLetter = 'A';
    var nextName = 'List' + nextLetter;
    while(Lists.findOne({ name: nextName, createdBy: currentUser })){
	nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
	nextName = 'List' + nextLetter;
    }
    return nextName;
}

Meteor.methods({
    createNewList(listName){
	var currentUser = Meteor.userId();
	check(listName, String);
	if (listName == ""){
	    listName = defaultName(currentUser);
	}
	var data = {
	    name: listName,
	    createdBy: currentUser
	}
	if (!currentUser){
	    throw new Meteor.Error("not-logged-in", "You're not logged in.");
	}
	return Lists.insert(data); // else create a new list 
    }
});
