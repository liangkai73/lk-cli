/*
 * @Description: In User Settings Edit
 * @Author: lanck.XIE
 * @Date: 2019-05-29 14:34:56
 * @LastEditTime: 2019-07-22 16:26:28
 * @LastEditors: Please set LastEditors
 */

export default {
  computedDate,
  getDateStr,
  getDateStrByStr,
  haolongago,
  getEndTimeByMonth,
  getSupplierByCode,
  getChargeType,
  amountShow,
  filterName,
  dateToISOString,
  filterMoney
};
export { };
// 根据传入的毫秒计算出过了过久时间
function haolongago(time: number | string) {
  let gotime: any;
  let h: any,
    m: any,
    s: any = "";
  if (typeof time === "string") {
    gotime = parseInt(time);
    if (isNaN(gotime)) {
      throw Error("需要传入字符串或者数字");
    }
  }
  gotime = (gotime / 1000) | 0;
  if (gotime > 3600) {
    h = gotime / 3600;
    gotime -= h * 3600;
    h += "时";
  }
  if (gotime > 60) {
    m = gotime / 60;
    m += "分";
  }
  s = Math.max(gotime % 60, 0) + "秒";
  return h + m + s;
}

/**
 * @desc: 根据传入的时间戳计算出天数
 * @param: date // new Date(param).getTime()
 * @param: order | Boolean // 规定计算顺序
 */
function computedDate(date: any, order = true): number {
  date = parseFloat(date);
  const nowDate = new Date().getTime();
  let dateDis: any, dayStr: any;
  if (order) {
    dateDis = nowDate - date;
  } else {
    dateDis = date - nowDate;
  }
  if (dateDis > 0) {
    dayStr = parseInt((dateDis / 1000 / 60 / 60 / 24) as any);
  } else {
    dayStr = 0;
  }
  return dayStr;
}
/**
 * @desc: 根据传入的时间戳过滤成日期格式
 * @param: date | any // new Date(param).getTime()
 * @param: type | Number // 类型 0 1 2
 */
function getDateStr(date: any, type = 0): string | undefined {
  let time;
  if (date instanceof Date) {
    time = date;
  } else {
    if (!date || isNaN(date * 1)) {
      return date;
    }
    time = new Date(date * 1);
  }
  const Y = time.getFullYear().toString();
  let M = (time.getMonth() * 1 + 1).toString();
  let D = time.getDate().toString();
  let H = time.getHours().toString();
  let Mi = time.getMinutes().toString();
  let S = time.getSeconds().toString();
  let dateStr;
  if (M.length == 1) {
    M = "0" + M;
  }
  if (D.length == 1) {
    D = "0" + D;
  }
  if (H.length == 1) {
    H = "0" + H;
  }
  if (Mi.length == 1) {
    Mi = "0" + Mi;
  }
  if (S.length == 1) {
    S = "0" + S;
  }
  if (type == 0) {
    dateStr = `${Y}/${M}/${D}`;
  } else if (type == 1) {
    dateStr = `${Y}/${M}/${D} ${H}:${Mi}`;
  } else if (type == 2) {
    dateStr = `${Y}-${M}-${D} ${H}:${Mi}:${S}`;
  } else if (type == 3) {
    dateStr = `${Y}${M}`;
  } else if (type == 4) {
    dateStr = `${Y}-${M}-${D}`;
  } else if (type == 5) {
    dateStr = `${Y}-${M}`;
  } else if (type == 6) {
    dateStr = `${Y}-${M}-${D} ${H}:${Mi}`;
  } else if (type == 7) {
    dateStr = `${H}:${Mi}`;
  } else if (type == 8) {
    dateStr = `${Y}-${M}-${D}T${H}:${Mi}:${S}Z`;
  }

  return dateStr;
}

/***
 * 金额加￥ 两位小数
 * 
 */
function filterMoney(money: number): string {
  const val = money - 0
  if (!isNaN(val)) return '￥' + (money - 0).toFixed(2)
  else return ''
}

/**
 * @desc: 根据传入的字符串过滤成日期格式* @param: str  // 201908050000
 * @param: type | Number // 类型 0 1 2
 */
function getDateStrByStr(date: string, type = 0): any {
  if (!date) return;
  date = date + "";
  let dateStr;
  const Y = date.slice(0, 4);
  const M = date.slice(4, 6);
  const D = date.slice(6, 8);
  if (type == 0) {
    dateStr = `${Y}/${M}/${D}`;
  }
  // else if (type == 1) {
  //     dateStr = `${Y}/${M}/${D} ${H}:${Mi}`
  // }
  else if (type == 2) {
    dateStr = `${Y}-${M}`;
  } else if (type == 3) {
    dateStr = `${Y}${M}`;
  } else if (type == 4) {
    dateStr = `${Y}-${M}`;
  }
  return dateStr;
}

function getEndTimeByMonth(startTime: any, m: any) {
  let endTime = "";
  const start = new Date(startTime);
  let year = start.getFullYear();
  let month = start.getMonth() + 1 + m;
  let day = start.getDate() - 1;
  if (month > 12) {
    year = year + 1;
    month = month % 12;
  }
  if (day === 0) {
    month = month - 1;
    if (month === 2) {
      if (year % 4 === 0 && year % 100 !== 0 && year % 400 === 0) {
        day = 28;
      } else {
        day = 29;
      }
    } else if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      day = 31;
    } else {
      day = 30;
    }
  }

  endTime = `${year}-${month}-${day} 23:59:59`;
  return endTime;
}

/**
 * @desc: 根据传入的云商代码显示云商
 * @param: number | string
 * @return: string
 */

function getSupplierByCode(code: number): string {
  let str = "-";
  const suppliers: any = {
    "10001": "华为私有云",
    "10002": "七牛私有云",
    "20001": "华为公有云",
    "20002": "京东公有云",
    "20003": "阿里公有云",
    "20004": "腾讯公有云",
    "30001": "云市场",
  };
  suppliers[code] && (str = suppliers[code]);

  return str;
}

function getChargeType(type: any): any {
  let str = "-";
  const types: any = {
    "10": "包年包月",
    "20": "按量计费",
    "30": "试用",
  };
  if (types[type]) {
    str = types[type];
  }
  return str;
}

/**
 * @desc: 转化显示金额 | 分 -> 元
 * @param: number
 * @return: number
 */

function amountShow(number: any, type = 0): string {
  let amount = number;
  if (type == 0) {
    amount = amount / 100;
  }
  return amount;
}

// 过滤用户首字母

function filterName(name: string) {
  if (name) {
    return name.slice(0, 1);
  }
  return "未登录哦";
}

// 获取格林时间

function dateToISOString(time: string | number) {
  let str = new Date(time).toISOString();
  const index = str.indexOf(".");
  str = str.slice(0, index);
  return str + "Z";
}
