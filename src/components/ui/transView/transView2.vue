<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-12-17 14:14
* Desc: 控制概览 item 
*/
 -->
 <style lang="scss" scoped>
.view-Item2 {
  display: inline-block;
  padding: 0 20px 20px 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  // transition: 0.5s all ease;
  .view-Item2-inner {
    width: 100%;
    height: 100%;
    background: forestgreen;
    cursor: pointer;
  }
  .view-remove-item {
    width: 30px;
    height: 30px;
    background: #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    z-index: 100;
    position: absolute;
    top: -15px;
    right: 6px;
    cursor: pointer;
  }
}
</style>

<template>
  <transition
    @after-enter="afterEnter"
    @after-leave="afterLeave"
    name="fade"
  >
    <div
      :draggable="true"
      :id="vId"
      :style="itemStyle"
      class="view-Item2"
      v-show="visible"
    >
      <div
        @click="remove"
        class="view-remove-item"
      >X</div>
      <div class="view-Item2-inner">{{name}}</div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

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
  @Prop({ type: String }) name: string | undefined;

  //
  // data.
  // @Provide() demo:number = 1;
  visible = false;

  //
  // computed.
  // get demo() { return xxxx; }
  get itemStyle() {
    return {
      width: '600px',
      height: '300px',
    };
  }
  get vId() {
    return 'box' + (this as any)._uid;
  }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {
    console.log(this);
  }
  remove() {
    this.$emit('close');
  }
  afterLeave() {
    this.$emit('closed');
  }
  afterEnter() {}
}
</script>
