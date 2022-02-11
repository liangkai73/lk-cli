<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-08-20 16:41
* Desc: 卡片效果div
*/
 -->
<style lang="scss">
@import '@/styles/var/_handle.scss';
.faas-card-item {
  @include background_color('bg_color1');
  // box-shadow: 0px 2px 40px 0px rgba(16, 27, 79, 0.2);
  box-shadow: 0px 0px 1px 1px #f1f1f1;
  padding: 10px 20px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;

  .card-item-title {
    font-size: 14px;
    font-weight: 700;
    line-height: 30px;
  }
  > p {
    font-size: 12px;
    line-height: 25px;
  }
}
</style>
<template>
  <div class="faas-card-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
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
  // @Prop({ type: number }) demo: number;

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
