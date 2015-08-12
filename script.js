
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com

var CLIENT_ID = '231446828709-rern8mev478lpdd0pddn6ers73pnnulh.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar"];


/**
 * Check if current user has authorized this application.
 */
 
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES,
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadCalendarApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);

  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
   fill();
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': '7tb1s3h4qj4dt8tab7msg7vq9g@group.calendar.google.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;
    appendPre('Upcoming events:');
    console.log(events.length);
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }

  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}



//LOGIN STUFF

function onchangeFunc(){

  var e = document.getElementById("ddlViewBy");
  var strUser = e.options[e.selectedIndex].text;

  console.log(strUser);


}

function loginButtonClick(){
  var e = document.getElementById("ddlViewBy");
  var strUser = e.options[e.selectedIndex].text;
  if(strUser == "Select"){
    return;
  }
  localStorage.setItem('user', strUser);
  location.href = "http://localhost:8000/index.html"
}
/*
var currentUser;
function setCurrentUser(strUser){
  currentUser = strUser;
}

function getCurrentUser(){
  return currentUser;
}
*/

function fill(){
  console.log("hi");
  var currentUser = localStorage.getItem('user');
  localStorage.removeItem('user');

  document.getElementById('helloMessage').innerHTML = currentUser;
}