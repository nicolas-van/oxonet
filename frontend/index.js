
// import some polyfill to ensure everything works OK
import "babel-polyfill";

// import bootstrap's javascript part
import 'bootstrap';

import Vue from 'vue';
import App from './App';


new Vue({
  el: '#app',
  render: h => h(App)
});
