<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-08-26 16:12
* Desc: tabs
*/
 -->
<style lang="scss">
@import "@/styles/var/_handle.scss";
.faas-tabs-ul {
  list-style: none;
  width: 100%;
  display: flex;
  align-items: center;
  height: 39px;
  border-bottom: 1px solid #e5e6ec;
  box-sizing: content-box;
  @include font_color("font_color1");
  .faas-tabs-item {
    padding: 0 20px;
    // margin-right: 15px;
    height: 100%;
    cursor: pointer;
    box-sizing: content-box;
    border-bottom: 1px solid;
    border-bottom-color: transparent;
    transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
    .tabs-hidden {
      width: 0;
      visibility: hidden;
    }
    &:hover {
      // @include font_color("font_color1");
    }
  }
  //type card
  .tabs-tabs-card {
    border-left: 1px solid #e5e6ec;
    border-top: 1px solid #e5e6ec;
    margin-right: 0;
    position: relative;
    &:last-child {
      border-right: 1px solid #e5e6ec;
    }
    &:first-child {
      margin-left: 20px;
    }
    &::after {
      content: "";
      width: 100%;
      height: 3px;
      background-color: transparent;
      top: -1px;
      left: 0px;
      position: absolute;
      transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
  .tabs-active[data-type="nomal"] {
    // @include font_color("font_color1");
    color: #1BAAF5;
    border-bottom-color: #1BAAF5;
    .faas-tabs-item:hover {
      color: #1BAAF5 !important ;
    }
  }
  .tabs-active[data-type="card"] {
    @include font_color("font_color1");
    border-bottom-color: #fff;
    &::after {
      content: "";
      width: 100%;
      height: 3px;
      background-color: #1BAAF5;
      top: -1px;
      left: 0px;
      position: absolute;
    }
  }
}
</style>
<template>
  <ul class="faas-tabs-ul">
    <li
      :class="[
        {
          'tabs-active': relValue == item.value,
          'tabs-tabs-card': type == 'card',
        },
      ]"
      :data-type="type == 'card' ? 'card' : 'nomal'"
      :key="index"
      @click="changeValue(item)"
      class="faas-tabs-item flex_r"
      v-for="(item, index) in reldata"
    >
      <span>{{ item[title] || item.title }}</span>
    </li>
  </ul>
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
  @Prop({ type: String, default: "nomal" }) title: string | undefined;
  @Prop({ type: String }) type: string | undefined;
  @Prop({ type: Array }) data: [] | undefined;
  @Prop() value: any;

  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
  get reldata() {
    return this.data;
  }
  get relValue() {
    return this.value;
  }
  set relValue(item) {
    this.$emit("input", item.value);
    this.$emit("handleClick", item);
  }
  changeValue(item: any) {
    this.relValue = item;
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

  mounted() {}
}
</script>
