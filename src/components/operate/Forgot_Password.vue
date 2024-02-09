<template>
  <div class="register-form">
    <el-header class="header" height="45px">
      <h2 class="title">找回密码</h2>
      <span class="pull-right">
        <router-link class="link" to="/loginForm">继续登录</router-link>
      </span>
    </el-header>
    <div class="form">
      <el-form :model="userForm" status-icon :rules="rules" ref="userFormImpl">
        <el-form-item prop="userAccount">
          <el-input v-model="userForm.userAccount" autocomplete="off" placeholder="请输入邮箱"
            prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <el-input v-model="userForm.checkCode" :disabled="codeRight" autocomplete="off" placeholder="邮箱验证码"
            prefix-icon="el-icon-link"></el-input>
          <el-button plain style="position: absolute;right: 0; width: 40%;top: 0;" v-preventReClick
            @click="sendEmailCode( $event)">发送验证码
          </el-button>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input type="password" auto-complete="new-password" show-password v-model="userForm.passWord"
            autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="checkPassWord">
          <el-input type="password" auto-complete="new-password" show-password v-model="userForm.checkPassWord"
            autocomplete="off" placeholder="请再次输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" v-preventReClick
            @click="submitForm()">找回密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script  setup lang="ts" name="Register_Form">
import { reactive, ref, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
// 引入倒计时
import useCountDown from '@/utils/useCountDown'

// 引入二次axios
import request from '@/api/request'

// 引入工具类
import utils from "@/utils/useTools";


const router = useRouter()

const userFormImpl = ref<FormInstance>()

const countDown = useCountDown()

const http = request

const internalInstance = getCurrentInstance() as any

// 验证码错误信息
let checkCodeErrorMessage = ref(null)
//临时存放发送验证码按钮，方便后面清除按钮上倒计时的定时器
let codeButtonTemp = ref(null)
//验证码图片URL
let checkCodeUrl = ref(null)
//记住我
let rememberMe = ref(false)
//验证码是否正确
let codeRight = ref(true)
//登录表单
let userForm = reactive({
  userAccount: '',
  passWord: '',
  checkCode: '',
  checkPassWord: '',
})


// 邮箱验证自定义规则
const CheckEmail = (rule: any, value: string, callback: Function) => {

  if (value === '') {
    callback(new Error('请输入邮箱'));
  } else {

    if (utils.checkEmail(value)) {
      callback();
    }
    return callback(new Error("请输入正确的邮箱"));
  }

}

// 验证码自定义验证规则
const CheckCode = async (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码'));
  }
  if (checkCodeErrorMessage !== null) {
    callback(new Error(`${checkCodeErrorMessage}`));
  } else {
    callback()
  }
};

// 密码验证自定义规则
const CheckPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (utils.checkPass(value)) {
      callback();
    }
    return callback(new Error("以字母开头，长度在6~18之间，只能包含字母、数字和下划线"));
  }
}

//再次输入密码验证规则
let CheckPass2 = (rule: any, value: any, callback: any) => {

  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== userForm.passWord) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
}

//表单的验证规则
let rules = reactive<FormRules<typeof userForm>>({
  userAccount: [
    { validator: CheckEmail, trigger: 'blur' }
  ],
  checkCode: [
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
  ],
  passWord: [
    { validator: CheckPass, trigger: 'blur' }
  ],
  checkPassWord: [
    { validator: CheckPass2, trigger: 'blur' }
  ],
})

const submitForm = async () => {
  await userFormImpl.value?.validate()
  let res = await http.post("/allow/resetpwd?account=" + userForm.userAccount + "&password=" + userForm.passWord)
  if (res.data.code === 200) {
    debugger;
    //清除发送验证码按钮倒计时的定时器
    countDown.removeItem(codeButtonTemp);
    ElMessage.success({ message: res.data.message, showClose: true, duration: 1500 });
    http.post("/allow/sendHtmlResetPwd?email=" + userForm.userAccount + "&password=" + userForm.passWord);
    router.push('/loginForm');
  } else {
    //验证码已过期，返回code 500
    ElMessage.warning({ message: res.data.message, showClose: true, duration: 1500 });
  }

}


//发送邮件验证码
const sendEmailCode = async( event: { currentTarget: any; }) => {
  codeButtonTemp = event.currentTarget;
  let val = true;
  userFormImpl.value?.validateField('userAccount', (valid) => {
    val = `${valid}` === "";
  })
  if (val) {
    let loading = internalInstance.$loading({ lock: true, text: "验证码发送中", background: "rgba(255,255,255,0.1)" });
    try {
      await http.post("/allow/sendHtmlCode?email=" + userForm.userAccount)
      loading.close();
      codeRight.value = false;
      internalInstance.$countDown.setItem(codeButtonTemp);
      ElMessage.success("验证码发送成功");
    } catch (error:any) {
      checkCodeErrorMessage.value = error.message;
      loading.close();
    }
  }
}


</script>


<style>
.register-form .header {
  position: relative;
  text-align: left;
  border: none;
  padding: 0;
}

.register-form .header .title {
  margin: 0;
}

.register-form .header .pull-right {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 14px;
}

.register-form .header .pull-right .link {
  text-decoration: none;
  cursor: pointer;
  color: #005980;
}

.register-form .form {
  text-align: left;
}

.register-form .form .check-code {
  position: absolute;
  right: 20px;
  cursor: pointer;
}


.register-form .form .submit {
  width: 100%;
}

.register-form .el-form-item {
  margin-bottom: 19px;
}
</style>
