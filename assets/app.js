  var config = {
    apiKey: "AIzaSyBfTOOXhJtOSvG4ajq8tn5546fCYYpiPtg",
    authDomain: "trainscheduler-7e22e.firebaseapp.com",
    databaseURL: "https://trainscheduler-7e22e.firebaseio.com",
    projectId: "trainscheduler-7e22e",
    storageBucket: "trainscheduler-7e22e.appspot.com",
    messagingSenderId: "990653913529"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var name = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = moment($("#first-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  var frequency = $("#frequency-input").val().trim();

  console.log(name);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);

  var newTrain = {
      name:  name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
    }

  database.ref().push(newTrain);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");

  return false;

  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  var firebaseName = childSnapshot.val().name;
  var firebaseDestination = childSnapshot.val().destination;
  var firebaseFirstTime = childSnapshot.val().firstTime;
  var firebaseFrequency = childSnapshot.val().frequency;
    
  var diffTime = moment().diff(moment.unix(firebaseFirstTime), "minutes");
  var timeRemainder = moment().diff(moment.unix(firebaseFirstTime), "minutes") % firebaseFrequency ;
  var minutes = firebaseFrequency - timeRemainder;

  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
    
  console.log(minutes);
  console.log(nextTrainArrival);
  console.log(moment().format("hh:mm A"));
  console.log(nextTrainArrival);
  console.log(moment().format("X"));

  $("#train-table > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" 
    + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

  });








