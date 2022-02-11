import { transfer } from "./function";

export default (Vue: any) => {
  Vue.prototype.$transfer = transfer;
};