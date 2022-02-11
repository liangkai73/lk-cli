<!--
/**
* Copyright (c) 2017 Copyright tj All Rights Reserved.
* Author: xieliangkai
* Date: 2019-07-30 16:51
* Desc: step组件（兼容ie9）
* Use:  props:  stepArr :any[] =[{lable:'name',sum:'x'}]  active:number = n
*   lable: 项目名称， sum:有sum 时步骤原点显示sum内容,默认为数组index ，active: 绑定当前显示的步骤默认为 0
*/
 -->

<template>
  <div class="ui-step-box">
    <ul class="ui-step-ul">
      <li
        :key="index"
        class="ui-step-li"
        v-for="(item,index) in stepArr"
      >
        <div
          :class="{'step-active':index ==active,'triangle1':index ==active,'triangle2':index != active,'triangle3':index == (active-1)}"
          class="step-li-content"
        >
          <span
            :class="{'step-li-content-index':index ==active,'step-li-content-index2':index !=active}"
          >{{item.num||index+1}}</span>
          <span style="padding-left:30px;">{{item.lable}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch, Provide, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  // prop
  @Prop({
    default: () => [],
  })
  readonly stepArr: any[]|undefined;
  @Prop({ default: 0 }) active: number|undefined;
  mounted() {}
}
</script>

<style lang='scss' scoped>
.ui-step-box {
  height: 40px;
  display: inline-block;
  .ui-step-ul {
    height: 100%;
    border: 1px solid #dddddd;
    overflow: hidden;
    // padding-right: 20px;
    .ui-step-li {
      min-width: 200px;
      height: 100%;
      box-sizing: border-box;
      float: left;
      font-size: 18px;
      &:after {
        content: '';
        clear: both;
      }
      .step-li-content {
        text-align: center;
        height: 100%;
        line-height: 40px;
        color: #000;
        position: relative;
        padding: 0 30px;
        .step-li-content-index {
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          border-radius: 50%;
          background: #fff;
          color: rgb(7, 193, 96);
        }
        .step-li-content-index2 {
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          border-radius: 50%;
          background: #000;
          color: #fff;
        }
      }
    }
    .step-active {
      background: rgb(7, 193, 96); 
      color: #fff !important;
    }
    .step-triangle {
      width: 0;
      height: 0;
      border: 18px solid #fff;
      border-left: 25px solid rgb(7, 193, 96);
    }
    .triangle1 {
      &:after {
        display: inline-block;
        content: '';
        width: 28px;
        height: 28px;
        background: rgb(7, 193, 96);
        position: absolute;
        transform: rotate(45deg);
        right: -14px;
        top: 6px;
        z-index: 10;
      }
    }
    .triangle2 {
      &:after {
        display: inline-block;
        content: '';
        width: 28px;
        height: 28px;
        background: #fff;
        position: absolute;
        transform: rotate(45deg);
        right: -15px;
        top: 6px;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        border-left: none;
        border-bottom: none;
        z-index: 10;
      }
    }
    .triangle3 {
      &:after {
        border: none;
      }
    }
  }
}
</style>
