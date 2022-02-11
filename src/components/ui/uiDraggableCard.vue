<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: huangxinping
* Date: 2020-09-16 17:51
* Desc: 
*/
 -->

<template>
  <div
    class="draggable-card"
    :class="layout"
    @dragstart="dragstart"
    @dragenter="dragenter"
    @dragend="dragend"
  >
    <div class="draggable-actions">
      <a
        href="javascript:;"
        class="action"
        :class="item.key"
        @click="handleActions(item)"
        v-for="(item,index) in actions"
        :key="index"
      >{{item.name}}</a>
      <a href="javascript:;" class="action">拖动</a>
    </div>
    <div class="draggable-card-header">
      <h3 class="title">{{title}}</h3>
      <p class="description">{{description}}</p>
    </div>
    <div class="draggable-card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    layout: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "标题",
    },
    description: {
      type: String,
      default: "描述",
    },
    actions: {
      type: Array,
      default: () => {
        return [
          // {
          //   name: "设置警报",
          //   key: "setAlarm",
          // },
          {
            name: "大图",
            key: "enlarge",
          },
        ];
      },
    },
  },
  methods: {
    dragstart() {
      this.$emit("handleDragstart");
    },
    dragenter() {
      this.$emit("handleDragenter");
    },
    dragend() {
      this.$emit("handleDragend");
    },
    handleActions(item) {
      this.$emit("handleActions", item);
    },
  },
};
</script>

<style lang="scss" scope>
.draggable-card {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  box-shadow: 0px 2px 40px 0px rgba(16, 27, 79, 0.2);
  padding: 26px 0px 0px 0px;
  .draggable-card-header {
    user-select: none;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #747576;
    padding: 0 24px;
    .title {
      font-size: 18px;
      
      font-weight: 500;
      color: #000000;
      height: 22px;
      line-height: 22px;
    }
  }
  .draggable-card-content {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
  }
  .draggable-actions {
    user-select: none;
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    .action {
      display: inline-block;
      padding: 10px 16px;
      min-width: 42px;
      color: #fff;
      background: #0acd7f;
      margin-left: 16px;
      &:last-child {
        cursor: move;
      }
    }
  }
  &:hover {
    // border: 1px solid #0acd7f;
    .draggable-actions {
      display: block;
    }
  }
}
</style>
