<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-09-08 11:33
* Desc: 分页 
* 属性： page-size 每页显示条目 默认10 ；total 总条目数 默认200
* 属性： current-page 当前页数 默认1  ; pagerCount 页码按钮的数量，当总页数超过该值时会折叠 默认5:
* event current-change currentPage 改变时会触发 
*/
 -->
 <style lang="scss" scoped>
.bp-pagination {

  $paginSize: 28px;

  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 400;
  .bp-pagination-ul {
    list-style: none;
    display: flex;
    li {
      width: $paginSize;
      height: $paginSize;
      line-height: $paginSize;
      text-align: center;
      background: transparent;
      vertical-align: top;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      box-sizing: border-box;
      margin: 0 0;
    }
    .activePage {
      width: $paginSize;
      height: $paginSize;
      background: #1baaf5;
      color: #fff;
    }
  }
  .btn-prev {
    background-size: $paginSize / 2;
    background-color: #fff;
    cursor: pointer;
    margin-right: 10px;
    color: #808080;
    padding: 0;
    height: $paginSize;
    width: $paginSize;
    background: #eee;
    border-radius: 0;
  }
  .btn-next {
    background-size: $paginSize / 2;
    background-color: #fff;
    cursor: pointer;
    margin-left: 10px;
    color: #808080;
    padding: 0;
    height: $paginSize;
    width: $paginSize;
    background: #eee;
    border-radius: 0;
  }
  .pageSize-select {
    margin-left: 20px;
    width: 100px;
    height: $paginSize;
    cursor: pointer;
    background-color: #eeeeee;
    border: none;
    outline: none;
  }
}
</style>

<template>
  <div class="bp-pagination">
    <slot></slot>
    <span style="flex: 1"></span>
    <button
      :disabled="relCurrentPage == 1"
      @click="handleChangeCurrent(relCurrentPage - 1)"
      class="btn-prev"
    >
      &lt;
    </button>
    <ul class="bp-pagination-ul">
      <li @click="handleChangeCurrent(1)" v-show="showPreMore">1</li>
      <li
        @click="
          handleChangeCurrent(relCurrentPage - Math.ceil(relPagerCount / 2))
        "
        v-show="showPreMore && relPageTotal > 5"
      >
        ...
      </li>
      <li
        :class="[
          {
            activePage: _showPageNum(index + 1) == relCurrentPage,
          },
        ]"
        :key="index"
        @click="handleChangeCurrent(_showPageNum(index + 1))"
        v-for="(item, index) in relPagerCount"
      >
        {{ _showPageNum(index + 1) }}
      </li>
      <li
        @click="
          handleChangeCurrent(relCurrentPage + Math.ceil(relPagerCount / 2))
        "
        v-show="showNextMore && relPageTotal > 5"
      >
        ...
      </li>
      <li
        @click="handleChangeCurrent(relPageTotal)"
        v-show="showNextMore && relPageTotal != 5"
      >
        {{ relPageTotal }}
      </li>
    </ul>
    <button
      :disabled="relCurrentPage == relPageTotal"
      @click="handleChangeCurrent(relCurrentPage + 1)"
      class="btn-next"
    >
      &gt;
    </button>
    <select
      class="pageSize-select"
      @change="changePageSize"
      v-model="relPageSize"
    >
      <option :value="10">10条/页</option>
      <option :value="20">20条/页</option>
      <option :value="30">30条/页</option>
      <option :value="40">40条/页</option>
      <option :value="50">50条/页</option>
    </select>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  PropSync,
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
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }
  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;
  //
  // Prop
  @Prop({ type: Number, default: 200 }) total!: number;
  @Prop({ type: Number, default: 1 }) value!: number;
  @Prop({ type: Number, default: 5 }) pagerCount!: number;
  @PropSync("pageSize", { type: Number, default: 10 }) relPageSize!: number;

  //
  // data.
  // @Provide() demo:number = 1;
  // total = 105;

  //
  // computed.
  get relPageTotal(): number {
    let n = Math.ceil(this.total / this.relPageSize);
    return n || 0;
  }
  get relPagerCount(): number {
    if (this.relPageTotal < 5) {
      return this.relPageTotal;
    } else {
      return this.pagerCount;
    }
  }
  get relCurrentPage() {
    if (this.value > 0 && Math.ceil(this.value) == this.value) {
      return this.value;
    } else {
      console.error("value 应为不小于0的整数");
      return 1;
    }
  }
  get showPreMore() {
    if (this.relPageTotal <= 5) {
      return false;
    }
    return !(this.relCurrentPage <= Math.ceil(this.pagerCount / 2) + 1);
  }
  get showNextMore() {
    return !(
      this.relCurrentPage + Math.ceil(this.pagerCount / 2) >=
      this.relPageTotal
    );
  }

  set relCurrentPage(val) {
    this.$emit("input", val);
    this.$emit("current-change", val);
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
  handleChangeCurrent(n = this.relCurrentPage) {
    if (n <= 0) {
      return;
    }
    this.relCurrentPage = n;
  }
  //
  _showPageNum(index: number): number {
    let nowPage: number;

    // 第一页
    if (!this.showPreMore) {
      nowPage = index;
    }
    // 末页
    else if (!this.showNextMore) {
      nowPage = this.relPageTotal - this.pagerCount + index;
    } else {
      let limit: number = index - 3;

      nowPage = this.relCurrentPage + limit;
    }
    return nowPage;
  }

  changePageSize(e: any) {
    let n = this.relCurrentPage;
    let old;
    // console.log(sumN);
    let oldPageSize = this.relPageSize;
    let sumN = oldPageSize * n;

    let newPageSize = e.target.value * 1;
    let newN = Math.ceil(sumN / newPageSize);
    if (n == 1 && oldPageSize > newPageSize) {
      // 等于第一页的情况
      this.relCurrentPage = 1;
      return;
    } else if (newN > Math.ceil(this.total / newPageSize)) {
      // debugger 大于最高页码数
      this.relCurrentPage = Math.ceil(Math.ceil(this.total / newPageSize) / 2);
      return;
    } else {
      this.relCurrentPage = newN;
    }
  }

  mounted() {
    this.relCurrentPage = this.value;
  }
}
</script>
