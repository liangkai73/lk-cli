/*
 * @Author: lanck.xie 
 * @Date: 2020-09-10 14:45:05 
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2020-09-25 11:19:26
 * toast组件 拓展
 * use: this.$toast({
 *    content  !: string,
 *    type     ?: string ('success'||'error'||'info'||'alert'||'notification'   default = 'info') 
 *    autoClose?: timer (default = 3000)
 * })
 */

import toastComponent from "./func-toast";
import vue from "vue";

const toastConstructor = vue.extend(toastComponent);

const instances: any[] = [];

let seed = 0;

// 移除实例方法
const removeInstance = (instance: any) => {

  const len = instances.length;
  const index = instances.findIndex((item) => {
    return item.id == instance.id;
  });

  instances.splice(index, 1);

  if (len <= 1) return;

  const removeHeight = instance.vm.height;

  for (let i = index; i < (len - 1); i++) {
    const height = parseInt(instances[i].offsetHeight) - removeHeight - 16;
    instances[i].offsetHeight = height;
  }

};

// toast 方法
export const toast = (options: any): Promise<unknown> => {
  const { autoClose, ...rest } = options;
  const instance: any = new toastConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  });

  const id = `toast_${seed++}`;


  instance.id = id;
  instance.vm = instance.$mount();
  // 触发autoenter
  instance.vm.visible = true;
  document.body.appendChild(instance.$el);
  // 高度计算
  let offsetHeight = 0;

  instances.forEach(item => {
    offsetHeight += item.$el.offsetHeight + 16;
  });
  offsetHeight += 16;
  instances.push(instance);

  instance.offsetHeight = offsetHeight;

  // 监听动画消失事件
  instance.$on('closed', async () => {
    removeInstance(instance);
    instance.vm.$destroy();
    document.body.removeChild(instance.vm.$el);
    return Promise.resolve(instance);
  });

  const afterClosedFn = new Promise((resolve, reject) => {
    instance.$on('closed', () => {
      resolve(instance);
    });
  });

  // 监听点击删除事件
  instance.$on('close', () => {
    instance.visible = false;
  });

  return afterClosedFn;
};