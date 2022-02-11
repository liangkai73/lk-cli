<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-09-09 15:54
* Desc: toast 组件
*/
 -->
<style lang="scss">
@keyframes mainDown1 {
  0% {
    transform: translateY(-40px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.ui-toast-row {
  padding: 0 20px;
  display: flex;
  justify-content: center;
  width: 368px;
  height: 48px;
  overflow: hidden;
  align-items: center;
  font-size: 14px;
  color: #fff;
  background: #ccc;
  margin-left: -184px;
  box-shadow: 0px 18px 18px 0px rgba(10, 31, 68, 0.12), 0px 0px 1px 0px rgba(10, 31, 68, 0.1);
  border-radius: 4px;
  transition: top 0.3s linear;
  animation: mainDown1 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  .ui-toast-icon {
    // display: inline-block;
    font-size: 18px;
    margin-right: 10px;
  }
  .ui-toast-content {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .ui-toast-close {
    display: flex;
    align-items: center;
    height: 100%;
    font-weight: 500;
    align-self: start;
    font-size: 16px;
    color: #fff;
    float: right;
    cursor: pointer;
  }
  &[date-type='info'] {
    background-color: #0c66ff;
    .ui-toast-icon {
      color: #fff;
    }
  }
  &[date-type='error'] {
    background-color: #f03d3d;
    .ui-toast-icon {
      color: #fff;
    }
  }
  &[date-type='success'] {
    background-color: #0bb07b;
  }
  &[date-type='alert'] {
    background-color: #ffad0d;
    color: #0a1f44;
    .ui-toast-icon {
      color: #0a1f44;
    }
    .ui-toast-close {
      color: #0a1f44;
    }
  }
  &[date-type='notification'] {
    background-color: #0a1f44;
    .ui-toast-icon {
      color: #ffad0d;
    }
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
      :date-type="type"
      :style="style"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
      class="ui-toast-row"
      v-show="visible"
    >
      <bp-icon
        class="ui-toast-icon"
        name="checked"
        v-show="type=='success'"
      ></bp-icon>
      <bp-icon
        class="ui-toast-icon"
        name="info"
        v-show="type=='error'||type=='info'"
      ></bp-icon>
      <bp-icon
        class="ui-toast-icon"
        name="alert"
        v-show="type=='alert'||type=='notification'"
      ></bp-icon>
      <span class="ui-toast-content">{{content || 'tste'}}</span>
      <span style="flex:1"></span>
      <a
        @click="handleClose"
        class="ui-toast-close"
      >x</a>
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
  visible = false;

  //
  // Prop
  @Prop({ type: String || Number, required: true }) content!: string | number;
  @Prop({ type: String, default: 'info' }) type?: string;

  //
  // data.
  // @Provide() demo:number = 1;
  //
  // computed.
  get style() {
    return {};
  }
  // 'success'||'error'||'info'||'alert'||'notification'
  iconName() {
    let names = {
      success: 'chose',
      error: 'info',
      info: 'info',
      alert: 'alert',
      notification: 'alert',
    };
    let name = 'notification';
    for (let key in names) {
      if (key == this.type) {
        name = this.type;
      }
    }
    return name;
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
  handleClose(e: any) {
    e.preventDefault();
    // this.visible = false;
    this.$emit('close');
  }
  clearTimer() {}
  createTimer() {}
  afterLeave() {
    this.$emit('closed');
  }
  afterEnter() {}
}
</script>
