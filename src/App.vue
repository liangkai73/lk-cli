<template>
  <div id="app">
    <div class="app_inner">
      <span>APP_MENUE: </span>
      <router-link to="/draggable">draggable</router-link> <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  background: #eee;
  min-height: 100vh;
  box-sizing: border-box;
}
.app_inner {
  padding: 20px;
  min-height: calc(100vh - 40px);
  background: #fff;
}
</style>
