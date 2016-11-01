# HTTP Server

This server comes with CRUD access to a JSON file system.

## Operation:

Using Postman or a similar program you can access the API for full CRUD access. Otherwise you can see the existing entries inside of the database at localhost:3000/team or similar depending on your enviroment. Currently there are a list of people including there job and tool for a hypothetical "snipe" hunt. 

### Modules

This module uses the bad-store module for CRUD. As such it you must include a valid name key:value pair. Express is handling the routing for the server. Built in modules are not listed.

### Testing

Currently the CRUD operations function as intended. Mocha/Chai-http testing is in-progress.

### Credit

I have largely rewritten and modified the work of Marty N for this project.