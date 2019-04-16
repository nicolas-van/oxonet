
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
    data.ensureInited();
    console.log(`entered game ${this.$route.params.id}`);
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