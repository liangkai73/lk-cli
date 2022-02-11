
import {
  Vue,
  Prop,
  Component
} from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  //
  // Prop
  @Prop({ type: Boolean }) value: boolean | undefined;

  //
  // computed.
  get relVisible() {
    return this.value;
  }
  set relVisible(val) {
    this.$emit('input', val);
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {}
}