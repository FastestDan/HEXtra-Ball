"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/mapHub").build();

var ballId = "h11";

const gridAr = [['h11', 'h12', 'h13', 'h14'], ['h21', 'h22', 'h23'], ['h31', 'h32', 'h33', 'h34'], ['h41', 'h42', 'h43']];

const buttons = document.getElementsByTagName("a")

//Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;


//connection.on("ReceiveMessage", function (user, message) {
    //var li = document.createElement("li");
    //document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    //li.textContent = `${user}: ${message}`;
//});

connection.on("GetGons", function (prevId, nowId, prevGon, nowGon) {

    var pg = document.createElement("h2");
    pg.className = "val";
    document.getElementById(prevId).getElementsByClassName("val")[0].replaceWith(pg);
    pg.textContent = nowGon;
    var ng = document.createElement("h2");
    ng.className = "val";
    document.getElementById(nowId).getElementsByClassName("val")[0].replaceWith(ng);
    ng.textContent = prevGon;
    ballId = nowId;
});

connection.start();

//connection.start().then(function () {
    //document.getElementById("sendButton").disabled = false;

//}).catch(function (err) {
    //return console.error(err.toString());
//});

//document.getElementById("sendButton").addEventListener("click", function (event) {
    //var user = document.getElementById("userInput").value;
    //var message = document.getElementById("messageInput").value;
    //connection.invoke("SendMessage", user, message).catch(function (err) {
    //    return console.error(err.toString());
    //});
    //messageInput.value = '';
    //messageInput.focus();
    //event.preventDefault();
//});


for (let button of buttons) {
    button.addEventListener("click", function (event) {
        if (event.target.id != ballId) {
            var prevField = document.getElementById(ballId).getElementsByClassName("val")[0];
            var nowField = document.getElementById(event.target.id).getElementsByClassName("val")[0];
            var message = prevField.textContent + " is in " + event.target.id;
            //connection.invoke("SendMessage", 'HEX', message).catch(function (err) {
                //return console.error(err.toString());
            //});
            connection.invoke("SendGons", ballId, event.target.id, prevField.textContent, nowField.textContent).catch(function (err) {
                return console.error(err.toString());
            });
            //ballId = event.target.id;
        }
        event.preventDefault();
    });
}