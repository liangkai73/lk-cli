// /*
//  * @Author: lanck.xie
//  * @Date: 2020-08-26 14:20:10
//  * @Last Modified by: lanck.xie
//  * @Last Modified time: 2020-08-26 14:36:39
//  */

// import store from 'store2';

// export default {
//   /**
//       * @desc: 通用命名空间获取一个新的store.
//       */
//   namespace: function (nm: string) { return store.namespace(nm); },

//   /**
//   * @desc: 数据条数.
//   */
//   size: function () { return store.size(); },

//   /**
//   * @desc: 所有的key.
//   */
//   keys: function () { return store.keys(); },

//   /**
//   * @desc: 设置信息.
//   */
//   set: function (key: string, data: any) { return store.set(key, data, true); },
//   /**
//   * @desc: 设置信息.
//   */
//   sessionSet: function (key: string, data: any) { return store.session.set(key, data, true); },

//   /**
//   * @desc: 获取信息.
//   * @param alt: 如果获取不到信息, 使用此数据返回.
//   */
//   get: function (key: string, alt: any = null) { return store.get(key, alt); },
//   /**
//   * @desc: 获取session信息.
//   * @param alt: 如果获取不到信息, 使用此数据返回.
//   */
//   sessionGet: function (key: string, alt: any = null) { return store.session.get(key, alt); },

//   /**
//   * @desc: 移除信息.
//   */
//   remove: function (key: any) { return store.remove(key); },

//   /**
//   * @desc: 清空.
//   */
//   clear: function () { return store.clear(); }
// };
