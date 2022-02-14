<!--
/**
* Copyright (c) 2022 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2022-02-14 10:46
* Desc: 
*/
 -->

<template>
  <div style="padding-top: 120px">
    <p>DEMO:</p>
    <div class="flex_r_s drag_box mt10">
      <div class="flex1">
        <draggable
          v-model="myArray"
          chosenClass="chosen"
          forceFallback="true"
          group="people"
          animation="300"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div class="item" v-for="item in myArray" :key="item.id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="flex1">
        <draggable
          v-model="myArray2"
          chosenClass="chosen"
          forceFallback="true"
          group="people"
          animation="300"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div class="item" v-for="item in myArray2" :key="item.id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <p class="mt40">SOURE:</p>
    <div class="flex_r_s drag_text mt10">
      <div class="flex1">
        <p v-for="item in myArray" :key="item.id">
          {{ item }}
        </p>
      </div>

      <div class="flex1">
        <p v-for="item in myArray2" :key="item.id">
          {{ item }}
        </p>
      </div>
    </div>
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
} from "vue-property-decorator";
import draggable from "vuedraggable";
import { State, Mutation } from "vuex-class";

@Component({
  components: { draggable },
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
  drag = false;
  myArray = [
    { people: "cn", id: 1, name: "no.1" },
    { people: "cn", id: 2, name: "no.2" },
    { people: "cn", id: 3, name: "no.3" },
    { people: "us", id: 4, name: "no.4" },
  ];
  myArray2 = [
    { people: "cn", id: 5, name: "no.5" },
    { people: "cn", id: 6, name: "no.6" },
    { people: "cn", id: 7, name: "no.7" },
    { people: "us", id: 8, name: "no.8" },
  ];
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
  onStart() {
    this.drag = true;
  }
  // 拖拽结束事件
  onEnd() {
    this.drag = false;
  }
  mounted() {}
}
</script>

<style lang="scss" scoped>
.item {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 2px #eee;
  margin-bottom: 10px;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}

.drag_box {
  text-align: center;
  div{
      min-height: 20px;
  }
}
.drag_text {
  background: #eee;
  text-align: center;
  padding: 10px;
}
</style>