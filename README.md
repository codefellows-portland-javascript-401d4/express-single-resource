This application is a filestore.

It uses an express server.

It stores information about boardsports.

A "GET" request can give you all the stored boardsports (localhost:3000/boardsports) or one specific file (localhost:3000/boardsports/name-of-sport). 

With this app, you are able to make a "POST" request to create new boardsports by sending JSON in the following format: {"name":"snowskating","environment":"snowy mountain","weather":"any","equipment":"snowskate, boots, jacket"}.

A "PUT" request will override the object (that shares the name) with new information that you input. This request should use the same JSON format as a POST request.

A "DELETE" request will delete a file of your choosing by sending the delete request to localhost:3000/boardsports/name-of-sport

[License](./LICENSE.md)


