A to-do list application with multiple pages of lists.

Uses the unmaintained package iron:router. An internet search found no known security issues, and a code skim found nothing risky-looking. It was decided to continue using iron:router on 1 June 2020.

Application Structure (<- means import):
CLIENT
client/main.js  <- routes.js  <- routes.html
	    	       	      <- navigation.js  <- navigation.html
			      <- lists.js       <- lists.html
			      	 		<- Lists from ../both.js
						<- toDos.js               <- toDos.html
						      			  <- ToDos from ../both.js
			      <- accounts.js    <- accounts.html
			      	 		<- validatorDefaults.js

client/main.css

SERVER
server/server.js  <- ../both.js
