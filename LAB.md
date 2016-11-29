![cf](http://i.imgur.com/7v5ASc8.png) Express with Mongo/Mongoose/Models
====

1. Create a new express app that's backed by Mongo using Mongoose. You can reference the previous lab,
but you should write this from scratch, don't just copy and paste code from previous project.

2. Add a second resource (for example, `/pirates` and `/crews`, or `/users` and `/cats`).

Use the Mongoose promise API

##Description

Be sure to implement full REST operations for each resource (`GET`/`GET id`/`POST`/`PUT`/`DELETE`)

Enforce required fields and validation (e.g. a users age should not negative), 
return meaningful errors.

This is pretty open to interpretation. 

Finally, implement a non CRUD endpoint (meaning one that is does not simply 
Create, Read, Update, or Destroy information in your database). 
When a user hits a url endpoint, the server will do something with the data 
that is not a CRUD operation and return the data. 

For example,  `/users/averageAge` might return the average age of all users. This could 
be something that happens in JavaScript, or using advanced features of Mongoose.

Models should be unit tested.

REST API's should be E2E tested.

## Bonus

* Make at least one of your resources queryable on a list `GET`,
eg `/birds&flightless=true` **2pts**

##Rubric
* Use of Mongo/Mongoose/Models: **4pts**
* non-CRUD endpoint: **1pts**
* Tests: **3pts**
* Code Quality/Project Organization: **2pts**

# Second LAB.md

![cf](http://i.imgur.com/7v5ASc8.png) expressjs-single-resource-api
====

## Description

For this assignment, rewrite your [`http-single-resource` assignment](../../../http-single-resource/blob/master/LAB.md)
using ExpressJS.

Go ahead and cut and paste your data storage module(s) into this project (or publish it on npm!), you shouldn't
need to rewrite those!

You API E2E tests should also be usable "as-is". Though correctness trumps re-use.

All requirements are still in play.

## Bonus

Create static files and/or rendered templates that allow you to exercise your API: 5pts

#### Rubric:
* Correctly working CRUD API: 3pts
* Code Quality: 2pts
* Express Implementation: 3pts
* Project Organization and Testing: 2pts
