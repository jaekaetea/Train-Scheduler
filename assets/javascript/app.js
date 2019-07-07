// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA5zunvQ_8tAzUCUsmPAshhb0GEMb4P6_s",
    authDomain: "train-scheduler-e7fe5.firebaseapp.com",
    databaseURL: "https://train-scheduler-e7fe5.firebaseio.com",
    projectId: "train-scheduler-e7fe5",
    storageBucket: "train-scheduler-e7fe5.appspot.com",
    messagingSenderId: "497523452806",
    appId: "1:497523452806:web:318d7a116cbae91a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#addTrain").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var first = $("#first-input").val().trim();
    var frequency = $("#rate-input").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        first: first,
        frequency: frequency 
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#rate-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var first = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    console.log(name);
    console.log(destination);
    console.log(first);
    console.log(frequency);

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(first),
    );

    $("#trainTable > tbody").append(newRow);
});