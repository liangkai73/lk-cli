import { toast } from "./function";

export default (Vue: any) => {
  Vue.prototype.$toast = toast;
};