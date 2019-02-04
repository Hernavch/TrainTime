// Initialize Firebase
var config = {
  apiKey: "AIzaSyDsCAuYHEXck1AlyiHhxxCS9ndoTsAYYGU",
  authDomain: "trainwork-435d4.firebaseapp.com",
  databaseURL: "https://trainwork-435d4.firebaseio.com",
  projectId: "trainwork-435d4",
  storageBucket: "",
  messagingSenderId: "809778036018"
};
firebase.initializeApp(config);

var database= firebase.database();

console.log(database);

$("#submit").on("click", function(){
  event.preventDefault();
  var name=$("#name").val();
  var destination=$("#destination").val();
  var traintime=$("#trainTime").val();
  var frequency=$("#frequency").val();

  console.log("my first", name, destination, traintime, frequency);

  database.ref().push({
    name:name,
    destination:destination,
    traintime:traintime,
    frequency:frequency
  });
       
});

database.ref().on("child_added", function(snapshot){
  console.log(snapshot.val());

       var now= moment();
       var usertraintime= moment(snapshot.val().traintime, "HH:mm");
      //  console.log("this moment=", moment());
       console.log("usertraintime=", usertraintime.format("HH:mm"));

       var diffbtwn = now.diff(usertraintime,'minute');
       console.log("This is the difference",diffbtwn);

       var tFrequency=snapshot.val().frequency;

       var remainder= diffbtwn % tFrequency;
       console.log(remainder);

      
       var minTillTrain = tFrequency - remainder;
       console.log("minutes", minTillTrain);

       var timeTill= now.add(minTillTrain, 'minutes');
       var arrivalTime= moment(timeTill).format("HH:mm")
       console.log(arrivalTime);

      //  var nextArrival = moment().add(diffbtwn, "minutes");
      //  console.log(moment(nextArrival).format("HH:mm"));



  $("#dataTable").append(" \
         <tr> \
             <td>" + snapshot.val().name + "</td> \
             <td>" + snapshot.val().destination + "</td> \
             <td>" + snapshot.val().frequency + "</td> \
             <td>" + arrivalTime + "</td> \
             <td>" + minTillTrain + "</td> \
              </tr>");

              

     });

// var now= moment();
// var usertraintime= moment(traintime, "HH:mm");
// console.log("this moment=", moment());
// console.log("usertraintime=", usertraintime.format("HH:mm"), traintime);