// /*
//  * @Author: lanck.xie
//  * @Date: 2020-09-14 14:08:44
//  * @Last Modified by: lanck.xie
//  * @Last Modified time: 2021-07-16 17:58:25
//  * @desc: 网络请求
//  */
// import api from "@/api";
// import config from "@/api/config";
// import func from "@/api/func";
// import _token from "@/api/_token";
// import errHandle from "./_netErrHandle";
// import bpui from 'bpui.js';
// import { Loading } from "element-ui";
// const febs = require("febs");

// const DefaultTimeout = 20 * 1000; // 请求默认超时
// const delayTime = 500; // londing出现的延迟时间

// function showLoading(dom?: any, delay?: number) {
//   if (dom) {
//     bpui.apiWidget.showLoadingTarget(dom)
//   }
//   else {
//     bpui.apiWidget.showLoadingIncrease({ content: '加载中', delay: delay });
//   }
// }

// function hideLoading(dom?: any) {
//   if (dom) {
//     bpui.apiWidget.hideLoadingTarget(dom)
//   } else {
//     bpui.apiWidget.hideLoadingDecrease();
//   }
// }

// /**
//  * @desc: 获取网络请求中的通过headers.
//  * @return: headers对象.
//  */
// function netHeaders(url: any, option: any) {
//   const accessToken = _token._getToken();
//   // 是否需要判断token过期
//   // TODO:  暂时屏蔽token过期
//   // if (url != config.api.login.postLogin) {
//   //   let timer = new Date().getTime();
//   //   if (timer > outTime) {
//   //     window.location.href = '/login';
//   //     return;
//   //   }
//   // }

//   const header = {
//     "Content-Type": "application/json",
//     "X-HTTP-AUTHENTICATE": "1",
//     Authorization: "Bearer " + accessToken,
//   };
//   if (option && option.contentType == "formData") {
//     header["Content-Type"] = "application/x-www-form-urlencoded";
//   }
//   return header;
// }

// /**
//  * @desc: 获取EncodeURIComponent类型url
//  * @param params: url|string  params|object
//  * @return: string
//  */

// function _getEncodeURIComponent(url: string, params: any): string {
//   if (params) {
//     let i = 0;
//     for (const key in params) {
//       if (i == 0) {
//         if (url.indexOf("?") < 0) url += "?";
//         else url += "&";
//       } else {
//         url += "&";
//       }
//       i++;
//       url += key + "=" + encodeURIComponent(params[key]);
//     }
//   }
//   return url;
// }

// /**
//  * @desc: 网络请求.
//  * @param option: option.body 可以传递数据.
//  *                option.preRecv 可以在接收到消息后进行一次处理
//  *                option.notLoading 不触发遮罩层，默认有遮罩层
//  *                option.loadingDom loading遮罩层所处的DOM，默认为body
//  * @return: Promise
//  */
// function net(url: string, option: any) {

//   let loadingTimer: any;

//   // url = config.apiPath + url;
//   const preRecv = (<any>option).preRecv;
//   if (!option.notLoading) {
//     if (option.loadingDom) {
//       loadingTimer = setTimeout(
//         showLoading.bind(null, option.loadingDom),
//         delayTime
//       );
//     }
//     else {
//       showLoading(null, delayTime);
//     }
//   }
//   return febs.net
//     .fetch(
//       process.env.VUE_APP_URL + url,
//       febs.utils.mergeMap(
//         {
//           timeout: DefaultTimeout,
//           // credentials: "include",
//           credentials: null,
//           mode: "cors",
//           headers: netHeaders(url, option),
//         },
//         option
//       )
//     )
//     .then((res: any) => {
//       // netPlagin.hideLoding(timekey);
//       if (preRecv) {
//         return preRecv(res);
//       }
//       return res;
//     })
//     .catch((err: any) => {
//       console.log("netWork is error");
//       throw err;
//     })
//     .finally(() => {
//       if (!option.notLoading) {
//         if (loadingTimer) {
//           clearTimeout(loadingTimer);
//           loadingTimer = null;
//         }

//         hideLoading(option.loadingDom);
//       }
//     });
// }

// /**
//  * @desc: get请求.
//  * @param params: json对象.
//  * @return: Promise
//  */
// function get(url: string, params: any, option?: object, app?: any) {
//   url = _getEncodeURIComponent(url, params);
//   return net(url, febs.utils.mergeMap({ method: "get" }, option))
//     .then((res: any) => res.json())
//     .then((res: any) => {
//       return errHandle.handleErr(app, res); // 返回true表示无错误. 特殊的错误在此处理.
//       // return true;
//       // handleErr中处理了通用错误, 如果此接口错误需要特殊处理, 则需针对返回值进行处理.
//     })
//     .catch((e: any): null => {
//       // febs.controls.loading_hide()
//       throw e;
//     });
// }

// /**
//  * @desc: post请求.
//  * @param params: json对象.
//  * @return: Promise
//  */
// function post(url: string, params: any, option?: any, app?: any) {
//   // febs.controls.loading_show('', 1000) // delay后显示滚动条.
//   let queryOption = {};
//   params = params || {};
//   if (option && option.contentType == "formData") {
//     params = _getEncodeURIComponentForm(params);
//   } else {
//     params = JSON.stringify(params);
//   }
//   // if (option && option._queryHead) {
//   //   url = _getEncodeURIComponent(url, params);
//   // queryOption = febs.utils.mergeMap({ method: 'post' }, option)
//   // } else {
//   queryOption = febs.utils.mergeMap({ body: params, method: "post" }, option);
//   // }
//   return net(url, queryOption)
//     .then((res: any) => res.json())
//     .then((res: any) => {
//       return errHandle.handleErr(app, res); // 返回true表示无错误. 特殊的错误在此处理.
//       // handleErr中处理了通用错误, 如果此接口错误需要特殊处理, 则需针对返回值进行处理.

//       // return true;
//     })
//     .catch((e: any): null => {
//       // febs.controls.loading_hide()
//       throw e;
//     });
// }
// /**
//  * @desc: put请求.
//  * @param params: json对象.
//  * @return: Promise
//  */

// function put(url: string, params: any, option?: any, app?: any) {
//   // febs.controls.loading_show('', 1000) // delay后显示滚动条.
//   let queryOption = {};
//   params = params || {};

//   queryOption = febs.utils.mergeMap(
//     { body: JSON.stringify(params), method: "put" },
//     option
//   );
//   return net(url, queryOption)
//     .then((res: any) => res.json())
//     .then((res: any) => {
//       return errHandle.handleErr(app, res); // 返回true表示无错误. 特殊的错误在此处理.
//       // handleErr中处理了通用错误, 如果此接口错误需要特殊处理, 则需针对返回值进行处理.
//     })
//     .catch((e: any): null => {
//       // febs.controls.loading_hide()
//       throw e;
//     });
// }
// /**
//  * @desc: delete请求.
//  * @param params: json对象.
//  * @return: Promise
//  */
// function deleteFn(url: string, params: any, option?: object, app?: any) {
//   // febs.controls.loading_show('', 1000) // delay后显示滚动条.

//   if (params) {
//     url = _getEncodeURIComponent(url, params);
//     return net(url, febs.utils.mergeMap({ method: "delete" }, option))
//       .then((res: any) => res.json())
//       .then((res: any) => {
//         return errHandle.handleErr(app, res) // 返回true表示无错误. 特殊的错误在此处理.
//         // handleErr中处理了通用错误, 如果此接口错误需要特殊处理, 则需针对返回值进行处理.
//       })
//       .catch((e: any): null => {
//         // febs.controls.loading_hide()
//         throw e;
//       });
//   } else {
//     return net(url, febs.utils.mergeMap({ method: "delete" }, option))
//       .then((res: any) => res.json())
//       .then((res: any) => {
//         // return errHandle.handleErr(app, res) // 返回true表示无错误. 特殊的错误在此处理.
//         // handleErr中处理了通用错误, 如果此接口错误需要特殊处理, 则需针对返回值进行处理.
//       })
//       .catch((e: any): null => {
//         // febs.controls.loading_hide()
//         throw e;
//       });
//   }
// }

// /**
//  * @desc: 获取EncodeURIComponent类型url
//  * @param params: url|string  params|object
//  * @return: string
//  */

// function _getEncodeURIComponentForm(params: any): string {
//   let url = "";
//   if (params) {
//     let i = 0;
//     for (const key in params) {
//       if (i == 0) {
//         url.indexOf("?") < 0 ? "" : (url += "&");
//       } else {
//         url += "&";
//       }
//       i++;
//       url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
//     }
//   }
//   return url;
// }
// function formData2Json(formData: any) {
//   const jsonData: any = {};
//   formData.forEach((value: any, key: any) => (jsonData[key] = value));
//   return jsonData;
// }

// export default {
//   get,
//   post,
//   put,
//   delete: deleteFn,
// };
