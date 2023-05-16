<template>
  <div class="login-container">
    <el-form ref="userForm" :model="userForm" :rules="rules" class="login-form">
      <div class="loginBox">
        <div class="title-container">
          <h3 class="title">e医相伴</h3>
        </div>
        <el-form-item prop="nickname">
          <el-input
            ref="nickname"
            v-model="userForm.nickname"
            placeholder="请输入您的账号名"
            name="nickname"
            type="text"
            prefix-icon="UserFilled"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="userForm.password"
            placeholder="请输入您的密码"
            name="password"
            type="password"
            tabindex="1"
            prefix-icon="Lock"
            show-password
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="sex">
          <el-select
            v-model="userForm.sex"
            clearable
            suffix-icon="Male"
            suffix-transition 
            placeholder="请输入你的性别"
          >
            <el-option label="女" value="女" />
            <el-option label="男" value="男" />
          </el-select>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click="handleLogin"
          >注册</el-button
        >
      </div>
      <label @click="goLogin">已有账号?去登录</label>
    </el-form>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Login",
  data() {
    return {
      userForm: {
        nickname: "",
        password: "",
        sex: "",
        code: "",
      },
      rules: {
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        sex: [
          { required: true, message: "请输入性别", trigger: "blur" },
          {
            message: "长度为1个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      redirect: undefined,
    };
  },

  methods: {
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    handleLogin() {
      let that = this;
      that.$refs.userForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.userForm.code = uuidv4(); //直接加在页面的任意位置
          let data = { ...this.userForm };
          that
            .$http("/user/register", "post", data, false, function (res) {
              console.log(res);
              if (res.code == 404) {
                that.loading = false;
                ElMessage({
                  showClose: true,
                  message: "注册失败",
                  type: "error",
                });
              } else if (res.code == 200 && res.result == "注册成功") {
                ElMessage({
                  showClose: true,
                  message: res.result,
                  type: "success",
                });
                that.$router.push({ name: "Login" });
                that.loading = false;
              } else {
                that.loading = false;
                ElMessage({
                  showClose: true,
                  message: res.result,
                  type: "warning",
                });
              }
            })
            .catch(() => {
              that.loading = false;
              ElMessage({
                showClose: true,
                message: "无法连接到服务器",
                type: "error",
              });
            });
        } else {
          that.loading = false;
          return false;
        }
      });
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background: transparent;
  /* background-image: -moz-radial-gradient(); */
  background: url("../../assets/login/register.jpg") no-repeat;
  height: 100%;
  background-size: 100% 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 80%;
    max-width: 100%;
    padding: 200px 35px;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .tips span:first-of-type {
    margin-right: 16px;
  }
  .el-icon {
    padding: 10px 5px;
    color: #889aa4;
    font-size: 20px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .el-input {
    width: 100%;
  }
  .el-select{
    width: 100%;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #0066ff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
.loginBox {
  /* border-radius: 25px; */
  /* background: url(paper.gif); */
  background-position: left top;
  background-repeat: repeat;
  padding: 20px;
  background: #ffffff;
  /* background: transparent; */
}
.el-form-item__error {
  position: absolute;
  margin-left: 30px;
  padding-left: 30px;
}
.el-form-item {
  font-size: 20px;
  margin-bottom: 20px;
}
label{
    color: #374b68;
    font-size: 15px;
}
</style>