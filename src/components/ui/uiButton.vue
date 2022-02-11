<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-08-21 14:02
* Desc: button
*/
 -->

<template>
  <button></button>
</template>

<script lang="ts">
import {
  Component,
  Vue
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

@Component({
  components: {}
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
