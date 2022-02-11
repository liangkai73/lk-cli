import component from "./toast.vue";
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
export default class extends component {

  offsetHeight = 0;
  autoClose = 3000;
  timer: any;
  height = 0;
  visible = false;


  get style() {
    return {
      'position': 'fixed',
      'top': this.offsetHeight + 'px',
      'left': "50%",
      'z-index': '2004'
    };
  }
  // 清除计时器
  beforeDestroy() {
    this.clearTimer();
  }
  mounted() {
    this.createTimer();
  }
  // 自动隐藏
  createTimer() {
    this.timer = setTimeout(() => {
      (this as any).visible = false;
    }, this.autoClose);
  }
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  afterEnter() {
    this.height = (this.$el as any).offsetHeight;
  }
}