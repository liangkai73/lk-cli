<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-08-21 11:02
* Desc:  注释模块样式
*/
 -->
<style lang="scss" scoped>
.faas-note-item {
  font-size: 12px;
  line-height: inherit;
  padding: 15px 20px;
  vertical-align: middle;
  border-width: 0;
  border-radius: 0;
  position: relative;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  .note-item-title {
    font-weight: bold;
  }
}
</style>
<template>
  <div
    :style="{
    'color':color,
    'background':bgcolor
  }"
    class="faas-note-item flex_r"
  >
    <bp-icon
      name="info"
      style="margin-right:15px;font-size:18px"
      v-show="aboutIcon"
    ></bp-icon>
    <div class="flex1">
      <slot></slot>
    </div>
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
  @Prop({ type: String, default: '#0046b9' }) color: string | undefined;
  @Prop({ type: String, default: '#d5e7ff' }) bgcolor: string | undefined;
  @Prop({ type: Boolean, default: true }) aboutIcon: boolean | undefined;

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
