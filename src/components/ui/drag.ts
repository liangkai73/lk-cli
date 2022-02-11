export class lk_drag {
  constructor(dom: object | any[]) {
    if (dom instanceof Array) {
      this.$els = dom;
      this.$elType = "arr";
    } else {
      this.$el = dom;
    }

    this.dragInitFn();
  }
  $el: any = undefined; // drag实例el
  $els: any[] = []; // drag实例arr
  $elType = "obj"; // 数据源格式
  $parent: any = undefined; // drag父容器el
  dragStartCb: any = () => { }; // 开始拖动回调
  dragEndCb: any = () => { }; // 开始拖动回调

  dragOverCb: any = (option: { action: string; el: any; tragetEl: any }) => {
    console.log("元素覆盖临界");
    console.log(option);
  }; // 元素覆盖时发生

  _transitionOptions = {
    // tanstion动画配置参数
    useTransfrom: true,
    transitionTimingFunction: "linear",
    transitionDuration: "0.2s",
    transitionProperty: "transform",
  };

  //  初始化
  dragInitFn() {
    // 判断数据类型
    if (this.$elType == "obj") {
      const el = this.$el;
      // 获取元素相对父盒子定位
      this._initTransfromFn(el).$drag = this;
      // 绑定监听事件
      this._addEventListeners(el);
    } else if (this.$elType == "arr") {
      const length = this.$els.length - 1;
      for (let i = length; i >= 0; i--) {
        this._initTransfromFn(this.$els[i]).$drag = this;
        // 绑定监听事件
        this._addEventListeners(this.$els[i], this.$els);
      }
    }

    return this;
  }
  //    释放
  dragDestory() { }

  //  初始dom位移
  _initTransfromFn(el: any) {
    if (el.style.transform) {
      return el;
    }
    //  获取元素相对父盒子定位
    const offsetX = el.offsetLeft;
    const offsetY = el.offsetTop;
    // 修改定位类型
    el.style.position = "absolute";
    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    // el.style.transitionProperty = this._transitionOptions.transitionProperty;
    // el.style.transitionTimingFunction = this._transitionOptions.transitionTimingFunction;
    // el.style.transitionDuration = this._transitionOptions.transitionDuration;

    return el;
  }
  //   位移方法
  _translate(el: any, x: any, y: any) {
    const defaultOptions = this._transitionOptions;
    //  defaultOptions = Object.assign(defaultOptions, options);

    if (defaultOptions.useTransfrom) {
      el.style.transform = `translate(${x}px,${y}px)`;
    } else {
      el.style.left = x;
      el.style.top = y;
    }
  }
  // 绑定监听事件
  _addEventListeners(el: any, els?: any) {
    let canDrag = false;
    //  获取元素相对父盒子定位
    let offsetX = el.offsetLeft;
    let offsetY = el.offsetTop;
    let startX = 0;
    let startY = 0;
    // 记录动作
    const action: any = {
      raw: "nomove", // left | right
      col: "nomove", // up |down
      AnimastionX: 0,
      AnimastionY: 0,
    };
    // 记录高度
    const offsetHight = el.offsetHeight;
    // 动画帧容器
    let AnimationFrame: any = null;
    const tragetDom: any = null;
    // mouseOver&&mouseDown , dragStart()
    el.addEventListener(
      "xx",
      (e: any) => {
        // 位移开关
        e.stopPropagation();
        canDrag = true;
        // 定位权重增加
        el.style.zIndex = 10000;
        // 初始位移判断
        if (el.style.transform) {
          const sNum = el.style.transform.indexOf("(") + 1;
          const eNum = el.style.transform.indexOf(")") + 1;
          let str: any = el.style.transform.slice(sNum, eNum);
          str = str.split(",");
          offsetX = parseFloat(str[0]);
          offsetY = parseFloat(str[1]);
        } else {
          offsetX = el.offsetLeft;
          offsetY = el.offsetTop;
        }

        startX = e.layerX;
        startY = e.layerY;
        // 开始方向感知
        // requestAnimationFrame(()=>{

        // })
        let AnimastionX = startX;
        let AnimastionY = startY;
        AnimationFrame = setInterval(() => {
          const newX = action.AnimastionX;
          const newY = action.AnimastionY;
          // 方向判定- 横向
          if (newX - AnimastionX > 0) {
            action.raw = "right";
          } else if (newX - AnimastionX < 0) {
            action.raw = "left";
          }
          // 方向判定- 纵向
          if (newY - AnimastionY > 0) {
            action.col = "down";
          } else if (newY - AnimastionY < 0) {
            action.col = "up";
          }

          AnimastionX = newX;
          AnimastionY = newY;
          console.log(action.raw, action.col);
        }, 100);
        // 开始拖动事件
        this._dragStart(el);
        // 添加事件--------
        // mouseMove
        const onmouseMoveFn = (e: any) => {
          e.stopPropagation();
          if (canDrag) {
            const x = e.layerX;
            const y = e.layerY;
            const moveX = x - startX;
            const moveY = y - startY;
            const transX = moveX + offsetX;
            const transY = moveY + offsetY;
            this._translate(el, transX, transY);
            // 判断方向位移
            action.AnimastionX = x;
            action.AnimastionY = y;

            // 抛出over事件
            if (action.col == "up" && el.previousSibling) {
              const tragetEl = el.previousSibling;
              const preTrans = this._getElTranform(tragetEl);
              if (transY - preTrans.y <= 0) {
                const option = {
                  action: "up",
                  el,
                  tragetEl,
                };
                this._dragOver(option);
              }
            }
            if (action.col == "down" && el.nextSibling) {
              const tragetEl = el.nextSibling;
              const preTrans = this._getElTranform(tragetEl);
              if (transY - preTrans.y >= 0) {
                console.log("down");
                const option = {
                  action: "down",
                  el,
                  tragetEl,
                };
                this._dragOver(option);
              }
            }
          }
        };
        // mouseUp
        const onmouseUpFn = (e: any) => {
          e.stopPropagation();
          canDrag = false;
          el.style.zIndex = 1;
          // 拖动结束Cb
          this._dragEnd(el);
          // 事件注销
          el.removeEventListener("mousemove", onmouseMoveFn);
          el.removeEventListener("mouseout", onmouseOutFn);
        };
        // mouseOut
        const onmouseOutFn = (e: any) => {
          e.stopPropagation();
          canDrag = false;
          el.style.zIndex = 1;
          // 拖动结束Cb
          this._dragEnd(el);
          // 反向判断结束
          clearInterval(AnimationFrame);
          // 事件注销
          el.removeEventListener("mousemove", onmouseMoveFn);
          el.removeEventListener("mouseup", onmouseUpFn);
        };

        el.addEventListener("mousemove", onmouseMoveFn, false);
        el.addEventListener("mouseup", onmouseUpFn, { once: true });
        el.addEventListener("mouseout", onmouseOutFn, { once: true });
      },
      false
    );


    el.addEventListener('dragstart', (e: any) => {
      // 不包含自己的$el
      const $els = els.filter(($el: any) => {
        return $el != el;
      });
      // 位移开关
      e.stopPropagation();
      canDrag = true;
      // 定位权重增加
      el.style.zIndex = 10000;
      // 初始位移判断
      if (el.style.transform) {
        const sNum = el.style.transform.indexOf("(") + 1;
        const eNum = el.style.transform.indexOf(")") + 1;
        let str: any = el.style.transform.slice(sNum, eNum);
        str = str.split(",");
        offsetX = parseFloat(str[0]);
        offsetY = parseFloat(str[1]);
      } else {
        offsetX = el.offsetLeft;
        offsetY = el.offsetTop;
      }

      startX = e.layerX;
      startY = e.layerY;
      // 开始方向感知
      // requestAnimationFrame(()=>{

      // })
      const AnimastionX = startX;
      const AnimastionY = startY;
      action.AnimastionX = startX;
      action.AnimastionY = startY;
      //  dragIndfn
      const dargIng = (e: any) => {
        const AnimastionX = action.AnimastionX;
        const AnimastionY = action.AnimastionY;
        const newX = e.layerX;
        const newY = e.layerY;
        // 方向判定- 横向
        if (newX - AnimastionX > 0) {
          action.raw = "right";
          const offsetRight = newX - startX;
          if (offsetRight > Math.abs(newY - startY) && offsetRight > (el.clientWidth / 2)) {
            console.log("changeRight");
            this._dragOver({ action: 'right', el: el, tragetEl: el.nextSibling });
          }

        } else if (newX - AnimastionX < 0) {
          action.raw = "left";
          const offsetLeft = startX - newX;
          if (offsetLeft > Math.abs(newY - startY) && offsetLeft > (el.clientWidth / 2)) {
            console.log("changeLeft");
          }

        }
        // 方向判定- 纵向
        if (newY - AnimastionY > 0) {
          action.col = "down";
          const offsetDown = newY - startY;
          if (offsetDown > Math.abs(newX - startX) && offsetDown > (el.offsetHeight)) {

            console.log("changeDown");
            // console.dir(tragetDom);
          }
        } else if (newY - AnimastionY < 0) {
          action.col = "up";
          const offsetUp = startY - newY;
          if (offsetUp > Math.abs(newX - startX) && offsetUp > (el.offsetHeight)) {
            console.log("changeUp");
            // console.dir(tragetDom);
          }
        }

        action.AnimastionX = newX;
        action.AnimastionY = newY;
        // console.log(action.raw, action.col);

      };
      // dragend
      const dargEndFn = (e: any) => {
        console.log('dragEnd');
        console.dir(e.target);
        // e.stopPropagation();
        canDrag = false;
        el.style.zIndex = 1;
        // 拖动结束Cb
        this._dragEnd(el);
        // 反向判断结束
        // clearInterval(AnimationFrame);
        el.removeEventListener('dragend', dargEndFn, false);
        el.removeEventListener('drag', dargIng, false);
        // 事件注销
        $els.forEach(($el: any) => {
          // $el.removeEventListener("drag", dargIng);
          $el.removeEventListener('dragover', drageOverFn, false);
          // $el.removeEventListener('dragenter', drageEnterFn, false);
          // $el.removeEventListener('drop', dropFn, false);
        });

      };
      // drageOver 
      const drageOverFn = function (e: any) {
        // tragetDom = this;

        // console.dir(e.dataTransfer.getData('tragetDom'));

        // let overX = e.layerX;
        // let overY = e.layerY;
        // let offsetX = el.clientWidth * 1.5;  // 自身一半宽度做判断条件
        // // 变换动作判定 - right
        // if (overX > offsetX) {
        //   console.log('changeRifht');

        // }

        // console.log(overX, overY);


        // 阻止默认动作以启用drop

      };
      // drageenter
      const drageEnterFn = (e: any) => {
        // 阻止默认动作以启用drop
        e.preventDefault();
        console.log(e.target);
        // 当可拖动的元素进入可放置的目标时高亮目标节点
        // e.target.style.background = "purple";
      };
      // dropFn
      const dropFn = (e: any) => {
        e.preventDefault();
        console.log("drop");
      };

      // 添加事件
      el.removeEventListener('dragend', dargEndFn, false);
      el.removeEventListener('drag', dargIng, false);
      el.addEventListener('dragend', dargEndFn, false);
      el.addEventListener('drag', dargIng, false);
      $els.forEach(($el: any) => {
        // $el.removeEventListener("dragend", dargEndFn);
        $el.removeEventListener('dragover', drageOverFn, false);
        // $el.removeEventListener('dragenter', drageEnterFn, false);
        // $el.removeEventListener('drop', dropFn, false);



        $el.addEventListener('dragover', drageOverFn, false);
        // $el.addEventListener('dragenter', drageEnterFn, false);
        // $el.addEventListener('drop', dropFn, false);
      });

    });
  }
  // 外部传入dragStart()
  dragStart(fn: any) {
    this.dragStartCb = fn;
  }
  // 拖动开始
  _dragStart(el: any) {
    // 执行回调
    this.dragStartCb(el);
  }

  // 外部传入dragEnd())
  dragEnd(fn: any) {
    this.dragEndCb = fn;
  }
  // 拖动结束
  _dragEnd(el: any) {
    // 执行回调
    this.dragEndCb(el);
  }
  // 外部传入拖动覆盖元素Cb
  dragOver(fn: any) {
    this.dragOverCb = fn;
  }
  // 拖动覆盖元素Cb
  _dragOver(option: any) {
    this.dragOverCb(option);
  }
  // 获取元素transform值
  _getElTranform(el: any) {
    if (el.style.transform) {
      const sNum = el.style.transform.indexOf("(") + 1;
      const eNum = el.style.transform.indexOf(")") + 1;
      let str: any = el.style.transform.slice(sNum, eNum);
      str = str.split(",");
      const x = parseFloat(str[0]);
      const y = parseFloat(str[1]);
      return {
        x,
        y,
      };
    } else {
      console.error("目标元素无transform属性");
      return {
        x: NaN,
        y: NaN,
      };
    }
  }
}
