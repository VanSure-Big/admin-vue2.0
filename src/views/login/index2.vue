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
        ref="ruleForm"
        size="medium"
        class="login-from"
      >
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkPass" class="item-from">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="checkPass2"
          class="item-from"
          v-if="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.checkPass2"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15"
              ><el-input v-model.number="ruleForm.code"></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button type="success" class="block"
                >获取验证码</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>

        <el-form-item class="item-from">
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
      <!--表单组件-->
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validatePassword,
  vaildateEmail,
  validateCode
} from "@/utils/validate";
export default {
  name: "login",
  data() {
    //表单数据
    //验证邮箱
    var checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (vaildateEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    //验证密码
    var checkPassword = (rule, value, callback) => {
      console.log(stripscript(value));
      this.ruleForm.checkPass = stripscript(value);
      value = this.ruleForm.checkPass;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePassword(value)) {
        callback(new Error("密码必须包含大小写字母、特殊字符的8-18位字符"));
      } else {
        callback();
      }
    };
    //验证重复密码
    var checkPassword2 = (rule, value, callback) => {
      console.log(stripscript(value));
      this.ruleForm.checkPass2 = stripscript(value);
      value = this.ruleForm.checkPass2;
      if (value === "") {
        callback(new Error("再次输入密码"));
      } else if (value != this.ruleForm.checkPass) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证6位验证码
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (validateCode(value)) {
        return callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      //模块值
      model: "",
      //表单数据
      ruleForm: {
        username: "",
        checkPass: "",
        checkPass2: "",
        code: ""
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        checkPass: [{ validator: checkPassword, trigger: "blur" }],
        checkPass2: [{ validator: checkPassword2, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    toggIeMnue(data) {
      console.log(data);

      //清除上一个class current
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      //修改模板值
      this.model = data.type;
    },
    //表单方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$--color-primary: teal;
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
