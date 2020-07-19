<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggIeMnue(item)"
        >
          {{ item.txt }}
        </li>
      </ul>

      <!--表单组件-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        size="medium"
        class="login-from"
      >
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item prop="checkPass" class="item-from">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.checkPass" autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item
          prop="checkPass2"
          class="item-from"
          v-show="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.checkPass2"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                :disabled="codeButton.status"
                @click="getSms()"
              >
                {{ codeButton.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="item-from">
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
          >
            {{ model === "login" ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
      <!--表单组件-->
    </div>
  </div>
</template>

<script>
//从vue3x @vue/composition-api引入
import { reactive, ref, onMounted } from "@vue/composition-api";
//sha1加密
import sha1 from "js-sha1";
// import { GetSms, Register, Login } from "@/api/login";
import {
  stripscript,
  validatePassword,
  vaildateEmail,
  validateCode
} from "@/utils/validate";
export default {
  name: "login",
  setup(props, {root, refs}) {
    /*************************************************
     * ElementUi表单 验证方法
     */

    //验证邮箱
    let checkUsername = (rule, value, callback) => {
      if (value === "") {
        // alert(11)
        callback(new Error("请输入用户名!"));
      } else if (vaildateEmail(value)) {
        callback(new Error("邮箱格式错误!"));
      } else {
        callback();
      }
    };
    //验证密码
    let checkPassword = (rule, value, callback) => {
      ruleForm.checkPass = stripscript(value);
      value = ruleForm.checkPass;
      if (value === "") {
        callback(new Error("请输入密码!"));
      } else if (validatePassword(value)) {
        callback(new Error("密码必须包含大小写字母、特殊字符的8-18位字符"));
      } else {
        callback();
      }
    };
    //验证重复密码
    let checkPassword2 = (rule, value, callback) => {
      //v-show下 值为login时 直接跳过重复验证控制表单提交
      if (model.value === "login") {
        callback();
      }
      ruleForm.checkPass2 = stripscript(value);
      value = ruleForm.checkPass2;
      if (value === "") {
        callback(new Error("请再次输入密!"));
      } else if (value != ruleForm.checkPass) {
        callback(new Error("重复密码不正确!"));
      } else {
        callback();
      }
    };
    //验证6位验证码
    let checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码!"));
      } else if (validateCode(value)) {
        return callback(new Error("验证码错误!"));
      } else {
        callback();
      }
    };

    /*************************************************
     * 声明data数据
     */

    //data数据 自定义函数 生命周期
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    //模块值
    const model = ref("login");
    //登录按钮状态
    const loginButtonStatus = ref(true);
    //验证码按钮状态
    const codeButton = reactive({
      status: false,
      text: "获取验证码"
    });
    const timer = ref(null);
    //表单数据
    const ruleForm = reactive({
      username: "",
      checkPass: "",
      checkPass2: "",
      code: ""
    });
    //表单验证数据
    const rules = reactive({
      username: [{ validator: checkUsername, trigger: "blur" }],
      checkPass: [{ validator: checkPassword, trigger: "blur" }],
      checkPass2: [{ validator: checkPassword2, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });

    /*************************************************
     * 声明函数
     */

    /**
     * 切换登录，注册模板
     */
    const toggIeMnue = data => {
      //清除上一个class current
      menuTab.forEach(elem => {
        elem.current = false;
      });
      //高光
      data.current = true;
      //修改模板值
      model.value = data.type;
      // codeButton.text = "获取验证码";
      //切换模板，清除表单数据
      resetFormData();
      //切换模板,清除定时器
      clearCountDown();
    };

    /**
     * 获取验证码
     */
    const getSms = () => {
      //提示邮箱不能为空
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空!");
        return false;
      }
      if (vaildateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误,请重新输入!");
        return false;
      }
      //修改验证码按钮状态
      codeButton.status = true;
      codeButton.text = "发送中";
      //调用定时器,倒计时
      countDown(11);
      //传入参数
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      //在vuex requestData.js请求接或者  GetSms(requestData)
      root.$store.dispatch("getSms/getSms", requestData).then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //启用登陆或注册按钮
          loginButtonStatus.value = false;
          // console.log(response);
        }).catch(error => {
          //bug 邮箱不存在会报错 验证码按钮禁用
          console.log(error);
          console.log(error.resCode);
          if (error.resCode == 1002) {
            clearCountDown();
          }
        });
    };

    /**
     * 表单提交方法
     */
    const submitForm = formName => {
      refs[formName].validate(valid => {
        //表单验证通过
        if (valid) {
          model.value == "login" ? login() : register();
        } else {
          console.log("error submit!!");
          updataCodeButton({
            status: false,
            text: "再次获取"
          });
          loginButtonStatus.value = true;
          return false;
        }
      });
    };
    /**
     * 登录方法
     */
    const login = () => {
      let loginData = {
        username: ruleForm.username,
        // password: ruleForm.checkPass,
        password: sha1(ruleForm.checkPass),
        code: ruleForm.code
      };
      //在vuex login.js调用登录接口 或者Login(loginData)
      root.$store.dispatch("login/login", loginData).then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          console.log(response);
          //执行成功后清除定时器
          clearCountDown();
          //跳转页面
          root.$router.push({
            name: "Layout"
          });
        }).catch(error => {
          root.$message.success({ message: error.message });
          console.log(error);
          //执行失败清除定时器
          clearCountDown();
        });
    };
    /**
     * 注册方法
     */
    const register = () => {
      //注册需要的参数
      let registerData = {
        username: ruleForm.username,
        // password: ruleForm.checkPass,
        password: sha1(ruleForm.checkPass),
        code: ruleForm.code,
        module: "/register/"
      };
      //在vuex register.js调用注册接口 或者 Register(registerData)
      root.$store.dispatch("register/register", registerData).then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //执行成功后清除定时器切换模块
          clearCountDown();
          toggIeMnue(menuTab[0]);
          console.log(data);
        }).catch(error => {
          console.log(error);
          //执行失败后清除定时器切换模块
          clearCountDown();
        });
    };

    /***************************************************
     * 封装方法
     */
    /**
     * 清除表单数据
     */
    const resetFormData = () => {
      // this.$refs[formName].resetFields(); //2.0
      refs["loginForm"].resetFields(); //3.0
    };

    /**
     * 更新验证码按钮状态
     */
    const updataCodeButton = params => {
      codeButton.status = params.status;
      codeButton.text = params.text;
    };
    /**
     * 定时器 倒计时
     */
    const countDown = number => {
      //遗留bug 60和0不见
      //判断定时器是否存在
      if (timer.value) {
        clearInterval(timer.value);
      }
      //setTimeout :clearTimeout(变量)只执行一次
      //setInterval :clearInterval(变量)不断执行
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === -1) {
          clearInterval(timer.value);
          //调用更新验证码按钮状态
          updataCodeButton({
            status: false,
            text: "再次获取"
          });
        } else {
          //改变按钮值
          codeButton.text = `再次获取(${time}s)`;
        }
        console.log(time);
      }, 1000);
    };

    /**
     * 清除定时器
     *  */
    const clearCountDown = () => {
      //调用更新验证码按钮状态
      updataCodeButton({
        status: false,
        text: "获取验证码"
      });
      //还原登陆注册按钮默认状态
      loginButtonStatus.value = true;
      //清除倒计时
      clearInterval(timer.value);
    };

    /*************************************************
     * 生命周期
     */
    //挂载完成后
    onMounted(() => {});
    return {
      menuTab,
      ruleForm,
      model,
      loginButtonStatus,
      codeButton,
      rules,
      toggIeMnue,
      submitForm,
      getSms
    };
  }
};
</script>

<style lang="scss" scoped>
// $--color-primary: teal;
#login {
  background-color: #344a5f;
  text-align: center;
  height: 100vh;
  color: #ffffff;
  display: flex;
}
.login-wrap {
  width: 330px;
  margin: auto;
  align-self: center;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    border-radius: 2px;
    font-size: 14px;
    //鼠标指针变手势
    cursor: pointer;
  }
}
.current {
  background-color: rgba(0, 0, 0, 0.1);
}
//表单style
.login-from {
  // align-self: left;
  margin-top: 29px;
  label {
    display: block;
    text-align: left;
    margin-bottom: 3px;
  }
  .item-from {
    margin-bottom: 13px;
    .block {
      display: block;
      width: 100%;
    }
    .login-btn {
      margin-top: 19px;
    }
  }
}
</style>
