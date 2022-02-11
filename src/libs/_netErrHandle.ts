/*
 * @Author: lanck.xie
 * @Date: 2020-09-21 11:39:33
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2022-02-11 15:06:31
 * @desc: errhandle for net
 */


/**
 * @desc: 处理api错误.
 * @param err_msg: 使用err_msg来代替服务器的错误消息.
 * @return: data; 如果正确将返回data, 否则返回null.
 */

function handleErr(app: any, data: any, err_msg: any = null) {
  // if (!handleErrInCatch(app, data, err_msg)) throw new PromiseAbort(data)
  const $vue = (window as any).$vue;

  // common
  switch (data.code) {
    case "LOGIN_004": {
      $vue.$toast({
        type: "error",
        content: "账号密码错误,请重试",
      });
      return;
    }
    case "LOGIN_101": {
      // token过期
      return;
    }
    case "LOGIN_001": {
      // 未登录认证
      return;
    }
  }

  if (data.desc) {
    $vue && $vue.$toast({ content: data.desc });
  }

  // debugger;
  // token faile
  if (data.err && data.err != "OK") {
    if (
      data.err_msg == "Token已失效" ||
      data.err_msg == "Token校验失败" ||
      data.err_msg == "Token格式错误"
    ) {
      throw data;
    } else {
      $vue && $vue.$toast({ type: "error", content: data.err_msg });
    }

    throw data;
  }

  return data.data || data;
}

export default {
  handleErr, // 错误处理
};
