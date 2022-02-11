import Vue from 'vue';
import transView1 from './transView1.vue';
import transView2 from './transView2.vue';


const transView1Constructor = Vue.extend(transView1);
const transView2Constructor = Vue.extend(transView2);

export class TransView {
  constructor(el: any, options: any) {
    this.$pEl = el;
    this.options = options;
    this.init(el, options);
  }
  instances: any[] = []; // 实例数组
  $pEl: any   // 挂载目标元素
  options: any    // 数据源
  seed = 0;
  //  初始化方法
  init = (el: any, options: any) => {
    let instance: any;
    if (Array.isArray(options)) {
      options.forEach((option: any) => {
        const { type, ...rest } = option;
        if (type == 1) {
          instance = new transView1Constructor({
            propsData: {
              ...rest
            }
          });
        }
        else if (type == 2) {
          instance = new transView2Constructor({
            propsData: {
              ...rest
            }
          });
        } else {
          return;
        }

        const id = `view_${this.seed++}`;
        instance.id = id;
        instance.vm = instance.$mount();
        // vm accpectEven
        this._vmBandEven(instance);
        this.instances.push(instance);

      });
    } else {
      const { type, ...rest } = options;
      if (type == 1) {
        instance = new transView1Constructor({
          propsData: {
            ...rest
          }
        });
      }
      else if (type == 2) {
        instance = new transView2Constructor({
          propsData: {
            ...rest
          }
        });
      } else {
        return;
      }
      const id = `view_${this.seed++}`;
      instance.id = id;
      instance.vm = instance.$mount();
      // vm accpectEven
      this._vmBandEven(instance);
      this.instances.push(instance);
    }
    // 渲染页面   
    this._renderPage();
    window.onresize = () => {
      this._renderPage(false);
    };
    return this;
  }
  //  增加实例
  addChild(options: any) {
    let instance: any;
    const temInstances = [];
    if (Array.isArray(options)) {
      options.forEach((option: any) => {
        const { type, ...rest } = option;
        if (type == 1) {
          instance = new transView1Constructor({
            propsData: {
              ...rest
            }
          });

        }
        else if (type == 2) {
          instance = new transView2Constructor({
            propsData: {
              ...rest
            }
          });

        } else {
          return;
        }

        const id = `view_${this.seed++}`;
        instance.id = id;
        instance.vm = instance.$mount();
        // vm accpectEven
        this._vmBandEven(instance);
        temInstances.push(instance);
      });
    } else {
      const { type, ...rest } = options;
      if (type == 1) {
        instance = new transView1Constructor({
          propsData: {
            ...rest
          }
        });
      }
      else if (type == 2) {
        instance = new transView2Constructor({
          propsData: {
            ...rest
          }
        });
      } else {
        return;
      }
      const id = `view_${this.seed++}`;
      instance.id = id;
      instance.vm = instance.$mount();
      // vm accpectEven
      this._vmBandEven(instance);
      temInstances.push(instance);
    }

    this.instances.forEach((vm: any) => {
      const $el = vm.$el;
      this.$pEl.removeChild($el);
    });

    this.instances = [...this.instances, ...temInstances];
    this._renderPage();
    return this;
  }
  // 删除实例
  _removeInstance = (instance: any) => {
    const len = this.instances.length;
    const index = this.instances.findIndex((item) => {
      return item.id == instance.id;
    });
    this.instances.splice(index, 1);
    const pWidth = this.$pEl.clientWidth;
    const $startEl = instance.$el;
    const sNum = $startEl.style.transform.indexOf("(") + 1;
    const eNum = $startEl.style.transform.indexOf(")") + 1;
    let str: any = $startEl.style.transform.slice(sNum, eNum);
    str = str.split(",");
    const x = parseFloat(str[0]);
    const y = parseFloat(str[1]);
    let transX = x;
    let transY = y;
    const len2 = this.instances.length;
    for (let i = index; i < len2; i++) {
      const $el = this.instances[i].$el;
      const width = parseFloat($el.style.width);
      const height = parseFloat($el.style.height);
      if (transX + width < pWidth) {
        $el.style.transform = `translate(${transX}px, ${transY}px)`;
        transX += width;
      } else {
        transX = 0;
        transY += height;
        $el.style.transform = `translate(${transX}px, ${transY}px)`;
        transX += width;
      }
    }


  }
  //  页面渲染
  _renderPage = (isLayout = true) => {
    const pWidth = this.$pEl.clientWidth;
    if (this.instances.length == 0) {
      return;
    }
    let transX = 0;
    let transY = 0;
    for (let i = 0; i < this.instances.length; i++) {
      const $el = this.instances[i].$el;
      const width = parseFloat($el.style.width);
      const height = parseFloat($el.style.height);
      if (transX + width < pWidth) {
        $el.style.transform = `translate(${transX}px, ${transY}px)`;
        transX += width;
      } else {
        transX = 0;
        transY += height;
        $el.style.transform = `translate(${transX}px, ${transY}px)`;
        transX += width;
      }
      this.instances[i].visible = true;
      if (isLayout) {
        this.$pEl.appendChild($el);
      }

    }
  }

  // vm 绑定事件
  _vmBandEven = (instance: any) => {
    // 监听动画消失事件
    instance.$on('closed', async () => {
      this._removeInstance(instance);
      instance.vm.$destroy();
      this.$pEl.removeChild(instance.vm.$el);
    });
    // 监听点击删除事件
    instance.$on('close', () => {
      instance.visible = false;
    });

  }

}
