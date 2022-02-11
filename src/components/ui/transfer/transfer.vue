<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-10-13 15:53
* Desc: 转场动画  for body
*/
 -->
<style lang="scss" scoped>
.ui-transfer-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
.ui-transfer-bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  background: #fff;
  animation: transferAnimate cubic-bezier(0.165, 0.84, 0.44, 1) 2.5s;
  opacity: 0;
}
.ui-transfer-title {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 400px;
  height: 40px;
  text-align: center;
  display: inline-block;
  animation: titleAnimate cubic-bezier(0.075, 0.82, 0.165, 1) 2.5s;
  opacity: 0;
  z-index: 10001;
}
[data-theme="light"] .ui-transfer-bg {
  background: #fff;
}
[data-theme="light"] .ui-transfer-title {
  color: #000;
}
[data-theme="dark"] .ui-transfer-bg {
  background: #212121;
}
[data-theme="dark"] .ui-transfer-title {
  color: #fff;
}
@keyframes transferAnimate {
  0% {
    transform: translateX(100vw);
    opacity: 0;
  }
  25% {
    transform: translateX(0);
    opacity: 1;
  }
  75% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100vw);
    opacity: 0;
  }
}
@keyframes titleAnimate {
  25% {
    transform: translateX(50px);
    opacity: 0;
  }
  40% {
    transform: translateX(0);
    opacity: 1;
  }
  60% {
    transform: translateX(0);
    opacity: 1;
  }
  75% {
    transform: translateX(-50px);
    opacity: 0;
  }
}
</style>
<template>
  <div class="ui-transfer-container">
    <div class="ui-transfer-bg"></div>
    <h1 class="ui-transfer-title">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({
  components: {},
})
export default class extends Vue {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;

  //
  // Prop
  @Prop({ type: String, default: "Welcome To Originforest! " }) title?: string;

  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {}
}
</script>
