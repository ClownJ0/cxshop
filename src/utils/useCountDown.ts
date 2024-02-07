//按钮60s倒计时
const useCountDown = (obj: any, timer: any):{setItem:Function,removeItem:Function} => {
  let map = new Map();
  return {
    setItem(obj: any, timer: any) {
      timer = timer || 60;  //倒计时60s    默认60秒，也可自定义传值
      obj.disabled = true;               //按钮变为不可用
      let auth_timer = setInterval(() => {  //定时器设置每秒递减
        map.set(obj, auth_timer);
        timer--;        //递减时间
        obj.innerHTML = timer + ' 秒后重发';
        if (timer <= 0) {
          obj.disabled = false;    //60s时间结束 按钮可用
          clearInterval(auth_timer)
          map.delete(obj)
          obj.innerHTML = '发送验证码';
        }
      }, 1000)
    },
    removeItem(obj: any) {
      if (obj) {
        let auth_timer = map.get(obj);
        clearInterval(auth_timer);
        obj.innerHTML = '发送验证码';
        obj.disabled = false;
      }
    }
  }
}

export default useCountDown;
