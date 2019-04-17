
<template>
  <div class="wrapper">
    <div v-if="waiting">
      Waiting for other player to join, copy-paste and send the current URL to invite someone.
    </div>
    <div v-else>
      <div>
        You are player {{ me + 1 }}
      </div>
      <div>
        Player {{ gameState.playing + 1 }} to play
      </div>
      <div>
        <table>
          <tr v-for="row in board">
            <td v-for="case_ in row.lst" class="text-center" v-on:click="play"
              :data-x="case_.x" :data-y="case_.y">
              <span v-if="case_.value === 0">
                O
              </span>
              <span v-if="case_.value === 1">
                X
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div v-if="gameState.ended">
        <p class="mt-3">Game has ended</p>
        <p v-if="gameState.won === 0">Player 1 won</p>
        <p v-if="gameState.won === 1">Player 2 won</p>
        <p v-if="gameState.won === null">No player won</p>
        <p><button v-on:click="reset">Reset game</button></p>
      </div>
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
      this.myId = data.getSocket().id;
      this.me = this.gameState.players[0] === this.myId ? 0 : 1;
      this.board = this.gameState.board.map((lst, x) => {
        return {
          key: x,
          lst: lst.map((el, y) => {
            return {key: y, x: x, y: y, value: el};
          }),
        };
      });
      console.log("current board", this.board);
    };

    data.getSocket().on("gameState", this.gameStateHandler);
  },
  destroyed: function () {
    data.getSocket().emit("exitGame");
    data.getSocket().off("gameState", this.gateStateHandler);
  },
  methods: {
    play: function(event) {
      data.getSocket().emit("play", [event.target.dataset.x, event.target.dataset.y]);
    },
    reset: function() {
      data.getSocket().emit("reset");
    },
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
td {
  width: 50px;
  height: 50px;
  border: 1px solid white;
  cursor: pointer;
}
</style>