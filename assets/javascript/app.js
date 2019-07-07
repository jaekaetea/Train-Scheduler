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
    var first = moment($("#first-input").val().trim(), "HH:mm").format("X"); 
    var frequency = $("#rate-input").val().trim();

    if ((name != "") && (destination != "") && (first >= 0) && (first <= 1562562000) && (frequency > 0)) {
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

    } else {
        alert("Invalid input; Please Try Again.");
    }
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

    var f = first; 
    var randomFormat = "X";
    var convertedTime = moment(f, randomFormat);

    var firstTimeConverted = convertedTime.format("HH:mm");
    console.log("HEYYY " + firstTimeConverted);
    firstTimeConverted = moment(convertedTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("Minutes till train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm A");
    console.log("Arrival Time: " + nextTrain);

    //Name, Destination, Frequency, Next Arrival, minutes
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );

    $("#trainTable > tbody").append(newRow);
});