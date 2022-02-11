<!--
/**
* Copyright (c) 2017 Copyright tj All Rights Reserved.
* Author: xieliangkai
* Date: 2019-07-30 16:51
* Desc: step2组件
* Use:  props:  stepArr :any[] =[{lable:'name',sum:'x'}]  active:number = n
*   lable: 项目名称， sum:有sum 时步骤原点显示sum内容,默认为数组index ，active: 绑定当前显示的步骤默认为 0
*/
 -->

<template>
  <div class="ui-step-box">
    <ul class="ui-step-ul">
      <li :key="index" class="ui-step-li" v-for="(item, index) in stepArr">
        <div
          :class="{
            'step-active': index == active,
            triangle1: index == active,
            triangle2: index != active,
            triangle3: index == active - 1,
          }"
          class="step-li-content"
        >
          <div
            :class="
              index > active
                ? 'step-li-content-index'
                : 'step-li-content-index2'
            "
          >
            <span v-if="index >= active">{{ item.num || index + 1 }}</span>
            <bp-icon name="checked2" v-else></bp-icon>
          </div>
          <span style="padding-left: 10px">{{ item.lable }}</span>
          <bp-icon
            name="right"
            style="float: right; padding-right: 20px"
            v-show="index + 1 < stepArr.length"
          ></bp-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Ref,
  Watch,
  Provide,
  Prop,
} from "vue-property-decorator";

@Component({
  components: {},
})
export default class extends Vue {
  // prop
  @Prop({
    default: () => [],
  })
  readonly stepArr: any[] | undefined;
  @Prop({ default: 0 }) active: number | undefined;
  mounted() {}
}
</script>

<style lang='scss' scoped>
.ui-step-box {
  height: 32px;
  display: inline-block;
  .ui-step-ul {
    height: 100%;
    overflow: hidden;
    // padding-right: 20px;
    .ui-step-li {
      min-width: 200px;
      height: 100%;
      box-sizing: border-box;
      float: left;
      font-size: 14px;
      &:after {
        content: "";
        clear: both;
      }
      .step-li-content {
        height: 100%;
        line-height: 32px;
        color: #333;
        position: relative;
        .step-li-content-index {
          display: inline-block;
          text-align: center;
          width: 32px;
          height: 32px;
          line-height: 32px;
          border-radius: 50%;
          background: #eeeeee;
          color: #000;
          font-weight: 500;
        }
        .step-li-content-index2 {
          display: inline-block;
          text-align: center;
          width: 32px;
          height: 32px;
          line-height: 32px;
          border-radius: 50%;
          background: #0acd7f;
          color: #fff;
          font-weight: 500;
        }
      }
    }
    .step-active {
      // background: rgb(7, 193, 96);
      // color: #fff !important;
    }
    .step-triangle {
      width: 0;
      height: 0;
    }
  }
}
</style>
