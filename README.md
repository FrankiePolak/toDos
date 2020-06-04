Application Structure (<- means import):
CLIENT
client/main.js  <- main.html
		<- ToDos from ../both.js
	 	<- routes.js		  <- routes.html
	    	       	      		  <- navigation.js  <- navigation.html
			      		  <- lists.js	    <- lists.html
			      	 			    <- Lists from ../both.js

client/main.css

SERVER
server/server.js  <- ../both.js
