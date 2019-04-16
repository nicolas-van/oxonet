
// import some polyfill to ensure everything works OK
import "babel-polyfill";

// import bootstrap's javascript part
import 'bootstrap';

import io from 'socket.io-client';

import $ from 'jquery';

/*
  Put the JavaScript code you want below.
*/

console.log("Hey look in your browser console. It works!");


var socket = io();
$('form').submit(function(e){
  e.preventDefault(); // prevents page reloading
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});