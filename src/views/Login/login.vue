<template>
  <div class="login-container">
    <el-dialog title="提示" v-model="visible" width="80%">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        label-width="80px"
      >
      <el-form-item label="用户名" prop="nickname"
          ><el-input
            type="text"
            v-model="dataForm.nickname"
            size="medium"
            clearable
        /></el-form-item>
        <el-form-item label="新密码" prop="newPassword"
          ><el-input
            type="password"
            show-password
            v-model="dataForm.newPassword"
            size="medium"
            clearable
        /></el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword"
          ><el-input
            type="password"
            show-password
            v-model="dataForm.confirmPassword"
            size="medium"
            clearable
        /></el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="medium" @click="visible = false">取消</el-button>
          <el-button type="primary" size="medium" @click="dataFormSubmit"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
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
            prefix-icon="Lock"
            type="password"
            tabindex="1"
            show-password
            auto-complete="on"
          />
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click="handleLogin"
          >Login</el-button
        >
      </div>
      <div>
        <label @click="goregister">没有账号?去注册</label>
        <label @click="update">忘记密码</label>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value != this.dataForm.newPassword) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        nickname: "",
        password: "",
      },
      visible: false,
      dataForm: {
        nickname:'',
        newPassword: "",
        confirmPassword: "",
      },
      dataRule: {
        nickname: [
          {
            required: true,
            message: "用户名格式错误",
          },
        ],
        newPassword: [
          {
            required: true,
            pattern: "^[a-zA-Z0-9]{6,20}$",
            message: "密码格式错误",
          },
        ],
        confirmPassword: [
          {
            required: true,
            pattern: "^[a-zA-Z0-9]{6,20}$",
            message: "密码格式错误",
          },
          { validator: validateConfirmPassword, trigger: "blur" },
        ],
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
      },
      loading: false,
      redirect: undefined,
    };
  },

  methods: {
    reset() {
      let dataForm = {
        password: "",
        newPassword: "",
        confirmPassword: "",
      };
      this.dataForm = dataForm;
    },
    update() {
      this.visible = true;
    },
    dataFormSubmit() {
      let that = this;
      that.$refs["dataForm"].validate(function (valid) {
        if (valid) {
          let data = {
            nickname:that.dataForm.nickname,
            newPassword: that.dataForm.newPassword,
          };
          that.$http(
            "/user/updatePassword",
            "post",
            data,
            true,
            function (res) {
              if (res.code == 200 && res.result=="密码修改成功") {
                ElMessage({
                  type: "success",
                  message: res.result,
                });
                that.visible = false;
              } else {
                ElMessage({
                  type: "error",
                  message: "密码修改失败",
                });
              }
            }
          );
        }
      });
    },
    goregister() {
      this.$router.push({ name: "Register" });
    },
    handleLogin() {
      let that = this;
      that.$refs.userForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let data = { ...this.userForm };
          that
            .$http("/user/login", "post", data, false, function (res) {
              if (res.result) {
                that.loading = false;
                ElMessage({
                  showClose: true,
                  message: res.result.result,
                  type: "error",
                });
              } else if (res.code == 200 && !res.result) {
                ElMessage({
                  showClose: true,
                  message: "登录成功",
                  type: "success",
                });
                window.localStorage.setItem("tokens", res.token);
                window.localStorage.setItem("userId", res.userId);
                that.$router.push({ name: "Mine" });
                that.loading = false;
              } else {
                that.loading = false;
                ElMessage({
                  showClose: true,
                  message: res.msg,
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
  background: url("../../assets/login/login.png") no-repeat;
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
  .el-select {
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
label {
  color: #374b68;
  font-size: 15px;
  margin: 10px;
}
label:nth-child(2){
  float: right;
  color: #e52c2c;
  font-size: 13px;
}
</style>