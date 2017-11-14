
// $('.carousel.carousel-slider').carousel({fullWidth: true});
        

 // map logic
 
window.onload = getLocation();
window.onload = initMap (34.063324, -118.448061);

// function to get and set user location. 

var x = document.getElementById("demo");

var latx = "";
var longy = "";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Woops, get a newer browser dude.");
    }
}
function showPosition(position) {
    console.log(" Latitude: " + position.coords.latitude + 
    "<br> Longitude: " + position.coords.longitude); 
    latx = position.coords.latitude;
    longy = position.coords.longitude;
    
}

// Grabbing the results from the User location
var map;
var service;
var mapMarkers;

function initMap(param_lat, param_lng) {

  var pyrmont = new google.maps.LatLng(param_lat, param_lng);

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 14
  });

  var request = {
    location: pyrmont,
    radius: 2500,
    type: ['food'],
    maxPriceLevel: ["2"],
    rankBy: [google.maps.places.RankBy.PROMINENCE]
  };


  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var resultCount = 0;
      for (var i = 0; i < results.length; i++) {
        if (google.maps.geometry.spherical.computeDistanceBetween(results[i].geometry.location, pyrmont) < request.radius) {
          console.log(results[i].vicinity);
          console.log(results[i].geometry.location);
          console.log(results[i].name);
          console.log(results[i].rating);
          console.log(results[i].price_level);
          console.log(results[i].place_id);

          var request2 = {
            placeId: results[i].place_id
          };

          var content = {name: results[i].name};
          var input = request2;
          console.log(request2);         
          service = new google.maps.places.PlacesService(map);
          resultCount++;


          var locationMarker, i;

              marker = new google.maps.Marker({
              position: results[i].geometry.location,
              map: map,
              title: results[i].name + " | Address " + results[i].vicinity + " | Rating " + results[i].rating
            });

              
            // // var content = results[i].name;

            //     marker.addListener("click", function() {
            //       new google.maps.InfoWindow(map, marker)
            // });    

              var infoWindow;
              var openWindow = false;

              marker.addListener("click", function() {
              console.log(this);
              if(openWindow) {
              infoWindow.close()
              infoWindow = new google.maps.InfoWindow({
              content: this.title,
              map: map,
              position: this.position
              });
              }
              else {
              infoWindow = new google.maps.InfoWindow({
              content: this.title,
              map: map,
              position: this.position
              

              });
              openWindow = true;
              }
         
              })

    //           function closeLastOpenedInfoWindow() {
    //           if (lastOpenedInfoWindow) {
    //             lastOpenedInfoWindow.close();
    // }
    // }

        }
          
      }
      if (resultCount == 0) {
        $("#res").prepend("No Results inside search area");
      }
    } else {
      $("#res").prepend("No Results, status " + status);
    }
    }
  }

function toRad(Value) { // Converts numeric degrees to radians
  return Value * Math.PI / 180;
}

    // This is our API key
    // window.onload = getLocation();
    window.onload
    
   
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "lat=" + "34.06" + "&lon=" + "-118.44" + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html("<h6>" + response.name + " Weather Details</h6>");
        $(".temperature").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Temperature (F): " + response.main.temp);
        window.onload

      });
  
 

 // chat logic
  
        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyD3t7H9vCXRhpBBI59kohQqJiPoyWxe5dI",
          authDomain: "cheapchat-56b3b.firebaseapp.com",
          databaseURL: "https://cheapchat-56b3b.firebaseio.com",
          projectId: "cheapchat-56b3b",
          storageBucket: "cheapchat-56b3b.appspot.com",
          messagingSenderId: "640174809456"
        };
        firebase.initializeApp(config);
        var database = firebase.database();
        var chatData = database.ref("/chat");
        var playersRef = database.ref("players");
        var username = "";
        var playersRef = database.ref("players");
      $("#swap-zone").submit(function(e){
        return false;
      })
      // USERNAME LISTENERS
      // Start button - takes username and tries to get user in game
      $("#start").click(function(e) {
        e.preventDefault();
        if ($("#username").val() !== "") {
          username = ($("#username").val());
          getInGame();
        }
      });
      // listener for 'enter' in username input
      $("#username").keypress(function(e) {
        if (e.keyCode === 13 && $("#username").val() !== "") {
          username = ($("#username").val());
          getInGame();
        }
      });
        console.log(username);
      // CHAT LISTENERS
      // Chat send button listener, grabs input and pushes to firebase. (Firebase's push automatically creates a unique key)
      $("#chat-send").click(function(e) {
        e.preventDefault();
        if ($("#chat-input").val() !== "" && $("#username").val() !== "" ) {
          var message = $("#chat-input").val();
          chatData.push({
            name: username,
            message: message,
            time: firebase.database.ServerValue.TIMESTAMP,
          });
          $("#chat-input").val("");
        }
      });
      // Chatbox input listener 
      $("#chat-input").keypress(function(e) {
        if (e.keyCode === 13 && $("#chat-input").val() !== "") {
          var message = $("#chat-input").val();
          chatData.push({
            name: username,
            message: message,
            time: firebase.database.ServerValue.TIMESTAMP,
          });
          $("#chat-input").val("");
        }
      });
      chatData.orderByChild("time").on("child_added", function(snapshot) {
        // If idNum is 0, then its a disconnect message and displays accordingly
        // If not - its a user chat message
        if (snapshot.val().idNum === 0) {
          $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
          + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
        }
        else {
          $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
          + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
        }
        // Keeps div scrolled to bottom on each update.
        $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
      });
      // Function to get in the game
      function getInGame() {
        var chatDataDisc = database.ref("/chat/" + Date.now());
        playerRef = database.ref("/players/");
       
          // On disconnect remove this user's player object
          playerRef.onDisconnect().remove();
          // Send disconnect message to chat with Firebase server generated timestamp and id of '0' to denote system message
          chatDataDisc.onDisconnect().set({
            name: username,
            time: firebase.database.ServerValue.TIMESTAMP,
            
            idNum: 0
          });
          // // Remove name input box and show current player number.
          $("#new-div").html("<h3>Thrilled you're here, " + username + "!");
          $("#username").hide();
          $("#start").hide();
      };
