import transferCom from "./transfer.vue";
import Vue from "vue";

const transferConstructor = Vue.extend(transferCom);
let instance: any = null;

export const transfer = (options?: any) => {
  // if (instance) {
  //   return;
  // }
  instance = new transferConstructor({
    propsData: {
      ...options,
    },
  });
  instance.vm = instance.$mount();
  setTimeout(() => {
    document.body.removeChild(instance.$el);
    instance = null;
  }, 2500);
  // 触发autoenter
  document.body.appendChild(instance.$el);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("转场动画结束");
    }, 500);
  });
};
