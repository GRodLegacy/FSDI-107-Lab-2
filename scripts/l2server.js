var http = require('http');
var express = require('express');
var app = express();


/************ Configurations ************/

/* be able to read the request data */

var bparse = require('body-parser');
app.use(bparse.json());

/* enable CORS for testing*/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT. POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
});

app.get('/', function (req, res) {
    res.send('You are in my homepage');

});

app.get("/about", function (req, res) {
    res.send('<h1>Victor D. Gonzalez Rodriguez</h1>');
});

app.listen(8080, function () {
    console.log('Server running on http://localhost:8080');

});

/************ API METHODS ************/

var cnt= 3; //this will be the unique id for todos
var todoDB = [
    {

    text: "TODO 1",
    user: "Victor Gonzalez Rodriguez",
    status: 0,
    id: 1

    },
    {
    
    text: "Get Milk",
    user: "Victor Gonzalez Rodriguez",
    status: 0,
    id: 2
    
    }
];
// SEND ALL THE TODOS BACK TO THE CLIENT
app.get('/API/todo', function (req, res) {
    console.log("Someone req the GET todos");

    res.json(todoDB);
    
}); 
    console.log("Someone req the POST");

    console.log(req.body);

    // create an object & assign the unique ID
    var todo = req.body;
    todo.id = cnt;
    cnt += 1;

    // store the object on the array
    todoDB.push(todo);


    res.json(todo);

app.put("/API/todo", function (req, res) {
var todo = req.body;
    if(!todo.id){
        res.status(412); //precondition failed
        res.send("TODO object should have an ID");
    }
    // find the item on the array
    // replace the ID with the todo

    /* find the todo obj in the array, using the todo.id */
    // compare each obj on the array
    // if todo.id is equal to item.id
    // then replace it

    for(var i=0; i < todoDB.length; i++) {
        var item = todoDB[i];

        if(todo.id == item.id) {
            //found
            todoDB[i] = todo;
            res.send("Todo Updated"); // res.send finishes the method
        }
    }

    // here, means the ID was not found
    res.status(404);
    res.send("Object with provided ID was not found on DB");

});

app.delete("/API/todo", function(req, res) {
    var todo = req.body;
    if(!todo.id){
        res.status(412); //precondition failed
        res.send("TODO object should have an ID");
    }

    //find the object on the array
    //remove the object, once it's found
    for (var i =0; i < todoDB.length; i++){
        var item = todoDB[i];

        if (todo.id == item.id){
            //found it, remove it
            todoDB.splice(i, 1);
            res.status(202); //accepted
            res.send("TODO removed");
        }
    }

    res.status(404);
    res.send("Object with provided ID was not found on DB");
});

// ctrl + c - stop the process on the command line
