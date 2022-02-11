<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-08-24 15:46
* Desc: 悬浮侧边栏
   props: v-model: Boolean ; title :string = '标题'
*/
 -->
<style lang="scss" scoped>
@import '@/styles/var/_handle.scss';

.of-drawer-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1900;
}
.drawer-modal {
  background: rgba(0, 0, 0, 0.5);
}

.of-drawer-input {
  width: 100px;
  // visibility: hidden;
}
.of-drawer {
  height: calc(100vh);
  position: absolute;
  top: 0px;
  background: #fff;
  z-index: 2006;
  transition: right 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
}
.of-drawer-open {
  .of-drawer {
    right: 0;
  }
}
.of-drawer-head {
  height: 50px;
  width: 100%;
  // border-top: 1px solid #ddd;
  // border-bottom: 1px solid #ddd;
  @include border_top_color('border1');
  @include border_bottom_color('border1');

  padding: 10px 20px;
  .of-drawer-head-title {
    color: #000;
    font-size: 16px;
  }
}
.of-drawer-body {
  width: 100%;
  height: calc(100% - 50px);
  padding: 0;
}
</style>
<template>
  <!-- modal -->
  <div
    :style="offsetObj"
    @click="clickModalToClose"
    class="of-drawer-container"
    :class="[
      {
        'drawer-modal': noModal === false,
      },
    ]"
    v-if="relVal"
  >
    <div
      :class="[
        {
          'of-drawer-open': drawerShow,
        },
      ]"
      class="of-drawer-box"
    >
      <!-- inner -->
      <div class="of-drawer flex_c" v-on:click.stop :style="offsetInner">
        <div class="of-drawer-head flex_r" v-show="title.length > 0">
          <span class="of-drawer-head-title">{{ title }}</span>
          <span class="flex1"></span>
          <bp-icon
            class="cur_P"
            name="close3"
            style="font-size: 16px"
            @click="close"
          ></bp-icon>
        </div>
        <slot name="header"></slot>
        <div class="of-drawer-body flex1">
          <slot></slot>
        </div>
      </div>
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
  @Prop({ type: String, default: "" }) title: string | undefined;
  @Prop({ type: Boolean, default: false }) value!: boolean;
  @Prop({ type: Number, default: 0 }) top?: number;
  @Prop({ type: Number, default: 300 }) width?: number;
  @Prop({ type: Boolean, default: false }) noModal!: boolean;
  @Prop({ type: Boolean, default: true }) closeOnClickModal!: boolean;

  //
  // data.
  // @Provide() demo:number = 1;

  drawerShow = false;

  //
  // computed.
  get relVal() {
    if (this.value) {
      setTimeout(() => {
        this.drawerShow = true;
      }, 50);
    }
    return this.value;
  }

  set relVal(val) {
    this.$emit("input", val);
    this.$emit("handleClose", val);
    return;
  }

  get offsetObj() {
    let top = this.top;
    return {
      top: this.top + "px",
      height: `calc(100vh - ${this.top}px)`,
    };
  }
  get offsetInner() {
    let width = this.width;
    return {
      width: width + "px",
      right: "-" + (this.drawerShow ? "0" : width) + "px",
    };
  }
  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }
  clickModalToClose() {
    if (this.closeOnClickModal) {
      this.close();
    }
  }

  //
  // lifecycle hook.
  close() {
    this.drawerShow = false;
    setTimeout(() => {
      this.relVal = false;
    }, 500);
  }
  constructor() {
    super();
  }

  mounted() {}
}
</script>
