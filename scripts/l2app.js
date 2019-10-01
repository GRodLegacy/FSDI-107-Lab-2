// create a global variable with your name on it and create a hello function that receives a parameter and prints it on the console


var name = 'Victor Gonzalez Rodriguez';
var todoList = []; // <- store the todo elements
var serverURL = 'http://127.0.0.1:8080'; //"localhost:8080" is the same thing. They both mean "my PC"


//create a hello function that receives a parameter and prints it on the console
function hello(text) {
    console.log(text);
}

function init2(){ 
    var lbl = $('#lblTodo');
    lbl.innerText = "jQuery Rules?";

    $('#btnSave').click(saveTodo);

    getDataFromServer();
}

function saveTodo(){
    var txt = $('#txtTodo');
    console.log(txt);
    var todoText = txt.val();
    console.log(todoText);

    if( todoText.length < 1) {
        //no text
        txt.addClass('error');
    } else {
        //ALL GOOD
        // remove error
        txt.removeClass ('error');
        // save the todo item
        //todoList.push(todoText);
        // clean the field
        txt.val('');
        // display a new todo on the screen
        //displayTodo(todoText);

        sendToServer(todoText);
        
    }

    // else, remove the error class,
    // save the todo text
}
function sendToServer(text) {
    var todoItem = {
        text: text,
        user: 'Victor',
        staus: 0 // 0 = new

    };

    // create the AJAX post request
    console.log('Started server communication');

    $.ajax({
        url: serverURL + "/API/todo",
        type: "POST",
        data: JSON.stringify(todoItem),
        contentType: "application/json",
        success: function (res) {
            console.log("Server response: ", res);
            todoList.push(res); //save the obj that server sent
            displayTodo(res.text, res.id);
        },
        error: function (error) {
            console.error("***ERROR", error);
        }
    });

}

function getDataFromServer() {
    // AJAX GET
    // the response should be an array with the objects
    // save the response into todoList
    /**
     * Loop over the array
     * get the text from each object on the array
     * send the text to the displayTodo function
     */

    $.ajax ({
        url: serverURL + "/API/todo",
        type: "GET",
        success: function (res) {
            console.log("Server response: ", res);

            for (var i=0; i< res.length; i++) {
                var item = res[i];
                if (item.user == "Victor Gonzalez Rodriguez") {
                    todoList.push(item);

                    //decide where to display the todo
                    if (item.status && item.status == 1) {
                        displayDone(item.text, item.id);
                    }
                    else {
                        displayTodo(item.text, item.id);
                    }
                }
            }
        },
        error: function (error) {
            console.log("***Error:(", error);
        }
    });


}

function displayTodo(simpleText) {
    // get the ul
    var ul = $('#todoList');
    // create an li element
    var li = "<li id='" + id + "' class='list-group-item'>" + simpleText + " <button class='btn btn-sm btn-info btn-done' onclick=markDone(" + id + ");> Done! </button> </li>";
    //add the li to the ul
    ul.append(li);

}

function displayDone(simpleText, id) {
    //get the ul
    var ul = $("#doneList");
    //create an li element
    var li = "<li id='" + id + "' class='list-group-item done-item'> " + simpleText + " <button class='btn btn-sm btn-danger btn-done' onclick=deleteTodo(" + id + ");> Delete </button> </li>";
    // add the li to the ul
    ul.append(li);
}

function markDone(id) {
    console.log("done:", id);
    // find the object with the id
    var theItem;
    for (var i=0; i < todoList.length; i++) {
        if(todoList[i].id == id) {
            //found it
            theItem = todoList[i];
            break; //break the for
        }
    }



    theItem.status = 1; //DONE

    //create the LI on the done list
    displayDone(theItem.text, theItem.id); //create an LI under

    //remove the LI from the todo list
    $("#" + theItem.id).remove(); //remove the LI from the UL )

    //notify the server
    $.ajax({
        url: serverURL + "/API/todo",
        type: "PUT",
        data: JSON.stringify(theItem),
        contentType: "application/json",
        success: function (res) {
            console.log("Server says: ", res);
        },
        error: function (error) {
            console.error("Error", error);
        }
    });


}

function deleteTodo(id) {
    console.log("Removing: " + id);

    // find the todo on the todoList array [this code is on the markDone function]
    // find the object with the id
    var theItem;
    for (var i=0; i < todoList.length; i++) {
        if(todoList[i].id == id) {
            //found it
            theItem = todoList[i];
            break; //break the for
        }
    }

    // create a delete request and send the todo
    $.ajax({
        url: serverURL + "/API/todo",
        type: "DELETE",
        data: JSON.stringify(theItem),
        contentType: "application/json",
        success: function (res) {
            console.log("Server says: ", res);
        },
        error: function (error) {
            console.error("Error", error);
        }
    });


    // remove the li from the DOM
    $("#" + theItem.id).remove(); //remove the LI from the UL )
}





// when the browser finishes loading stuff
// please exec such function (init)

window.onload = init2;

/* BASICS
variables
scope of a variable
function and parameters

loops(for)
conditional (if statement)
objects (object constructor & object literal)

DOM manipulation (creating and accessing DOM elements)
*/