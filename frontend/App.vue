<template>
  <div class="container">
    <h1>OXONet</h1>
    <button v-on:click="newParty">New Party</button>
  </div>
</template>

<script>

import io from 'socket.io-client';

export default {
  name: 'App',
  created: function () {
    this.socket = io();

    this.socket.on('newGame', (msg) => {
      console.log("newGame response", msg);
    });
  },
  methods: {
    newParty: function () {
      this.socket.emit('newGame');
    }
  }
};


</script>

<style scoped>
  .container {
    width: 600px;
    margin: 50px auto;
    text-align: center;
  }
</style>