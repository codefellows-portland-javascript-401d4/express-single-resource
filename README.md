This is a simple express persistent file api.

Directions



GET: see a list of world countries and capitals
    Url: 'localhost:3000/capitals'
    Content: a JSON list of countries and their capitals
    
POST: add a capital to the list though an external post request
    Url: 'localhost:3000/capitals'
    what it does: adds your capital to the list, which can be seen by the above method.  You must add your capital as an object with the keys "country" and "capital".  You will get an error message if that capital is already on the list.
Example: posting {county: 'Italy', capital:'Rome'}

DELETE: delete the list 
    Url: 'localhost:3000/delete'
    what it does: Deletes the list of capitals. You can then add more if you'd like.
Example: posting {county: 'Italy', capital:'Rome'}


