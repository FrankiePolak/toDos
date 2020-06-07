// server.js: stuff the runs on the server: publications

import { Meteor } from 'meteor/meteor';

import { Lists } from '../both.js';
import { ToDos } from '../both.js';

/**
 * Publish the lists that belong to the current user.
 * @this the publish handler object
 */
Meteor.publish('lists', function(){
    var currentUser = this.userId;
    return Lists.find({ createdBy: currentUser }); 
});

/**
 * Publish the tasks from the current list that belong to the current user.
 * @this the publish handler object
 */
Meteor.publish('todos', function(currentList){
    var currentUser = this.userId;
    return ToDos.find({ createdBy: currentUser, listId: currentList });
});
