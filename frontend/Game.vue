
<template>
  <div class="wrapper">
    <div v-if="waiting">
      Waiting for other player to join, copy-paste and send the current URL to invite someone.
    </div>
    <div v-else>
      Yop
    </div>
  </div>
</template>

<script>
import * as data from './data';

export default {
  name: 'Game',
  data: function() {
    return {
      waiting: true,
    };
  },
  created: function () {
    this.gameId = this.$route.params.id;
    data.ensureInited();
    console.log(`entering game ${this.gameId}`);
    data.getSocket().emit("enterGame", this.gameId);

    this.gameStateHandler = (gameState) => {
      this.gameState = gameState;
      console.log("received game state", this.gameState);
      this.waiting = ! (this.gameState.players[0] && this.gameState.players[1]);
    };

    data.getSocket().on("gameState", this.gameStateHandler);
  },
  destroyed: function () {
    data.getSocket().emit("exitGame");
    data.getSocket().off("gameState", this.gateStateHandler);
  },
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