<template>
  <div class="wrapper">
    <div class="content">
      <h1>OXONet</h1>
      <p class="text-center">
        <button class="btn btn-primary" v-on:click="newParty">New Party</button>
      </p>
    </div>
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
  .wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .content {

  }
</style>