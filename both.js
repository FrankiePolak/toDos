// both.js: code to run on both the client and server

import { Mongo } from 'meteor/mongo';

// individual tasks
ToDos = new Mongo.Collection('toDos');
export { ToDos };

// categories of tasks
Lists = new Mongo.Collection('lists');
export { Lists };
