import {ElMessage} from "element-plus"

// 工具类
const tools={
  /**
   * 根据出生日期获取年龄
   * @param strBirthday：指的是出生日期，格式为"1990-01-01"
   */
  getAge(strBirthday: string){
    if(!strBirthday) return 0
    let returnAge,
      strBirthdayArr=strBirthday.split("-"),
      birthYear = strBirthdayArr[0],
      birthMonth = strBirthdayArr[1],
      birthDay = strBirthdayArr[2],
      d = new Date(),
      nowYear = d.getFullYear(),
      nowMonth = d.getMonth() + 1,
      nowDay = d.getDate();
    if(`${nowYear}` === birthYear){
      returnAge = 0;//同年 则为0周岁
    }
    else{
      let ageDiff = nowYear - parseInt(birthYear) ; //年之差
      if(ageDiff > 0){
        if(nowMonth === parseInt(birthMonth)) {
          let dayDiff = nowDay - parseInt(birthDay);//日之差
          if(dayDiff < 0) {
            returnAge = ageDiff - 1;
          }else {
            returnAge = ageDiff;
          }
        }else {
          let monthDiff = nowMonth - parseInt(birthMonth);//月之差
          if(monthDiff < 0) {
            returnAge = ageDiff - 1;
          }
          else {
            returnAge = ageDiff;
          }
        }
      }else {
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge;//返回周岁年龄
  },

  //uuid
  getUUID() {
    let s = [];
    let hexDigits = "0123456789abcdefghigk";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
  },

  //身份证验证规则
  checkID(value: string){
    let pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(value);
  },

  //邮箱验证规则
  checkEmail(value: string){
    let pattern = /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
    return pattern.test(value);
  },

  //手机号验证规则
  checkPhone(value: string){
    let pattern = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    return pattern.test(value);
  },

  //密码验证规则
  checkPass(value: string){
    let pattern = /(^[a-zA-Z]\w{5,17}$)/;   //以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    return pattern.test(value);
  },

  //金钱验证
  checkMoney(value: string){
    let pattern = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/;
    return pattern.test(value);
  },

  //判断是否为空字符串或undefined
  isEmpty(obj: string | null){
    return typeof obj == "undefined" || obj == null || obj === "";
  },

  //字符串重复函数
  repeat(src: string | undefined, n: number) {
    return (new Array(n + 1)).join(src);
  },

  //只能上传 jpg、png 5M以内的图片
  beforePictureUpload(file: { type: string; size: number; }) {
    const isJPG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    const isBMP = file.type === 'image/bmp';
    const isWEBP = file.type === 'image/webp';
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!(isJPG || isPNG || isGIF || isBMP || isWEBP)) {
      ElMessage.error('上传图片只能是 JPG/PNG/GIF/BMP/WEBP 格式!');
    }
    if (!isLt5M) {
      ElMessage.error('上传图片大小不能超过 5MB!');
    }
    return (isJPG || isPNG || isGIF || isBMP || isWEBP)  && isLt5M;
  },


  //获取当前时间
  getNowFormatDate() {
    let date = new Date();
    let seperator = "-";
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let strDate = date.getDate().toString();
    if (parseInt(month) >= 1 && parseInt(month) <= 9) {
     month= "0" + month;
    }
    if (parseInt(strDate) >= 0 && parseInt(strDate) <= 9) {
      strDate = "0" + `${strDate}`;
    }
    return year + seperator + month + seperator + strDate;
  },

  //获取随机整数
  getRandomInteger(min: number,max: number){
    return parseInt(`${ Math.random() * (max - min + 1) + min }`,10);
  },

  //获取随机整数
  hideMiddle(val: { toString: () => any; }) {
    if(!val) return ''
    let str = val.toString();
    if(str.length>10){
      let s = tools.repeat('*',str.length-7);
      return str.substr(0,3)+s+str.substr(str.length-4,str.split('').length);
    }
    return str.substr(0,3)+'****'+str.substr(7,str.split('').length);
  },

  //深拷贝
  deepCope(obj: any){
    return JSON.parse(JSON.stringify(obj));
  }

}

export default tools;
