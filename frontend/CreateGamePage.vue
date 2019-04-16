
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
import * as data from './data';

export default {
  name: 'CreateGamePage',
  created: function () {
    data.ensureInited();

    data.getSocket().on('newGame', (msg) => {
      this.$router.push("game/" + msg);
    });
  },
  methods: {
    newParty: function () {
      data.getSocket().emit('newGame');
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
</style>