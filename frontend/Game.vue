
<template>
  <div class="wrapper">
    <div class="content">
      Game
    </div>
  </div>
</template>

<script>
import * as data from './data';

export default {
  name: 'Game',
  created: function () {
    this.gameId = this.$route.params.id;
    data.ensureInited();
    console.log(`entering game ${this.gameId}`);
    data.getSocket().emit("enterGame", this.gameId);

    this.gameStateHandler = (gameState) => {
      console.log("game state", gameState);
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