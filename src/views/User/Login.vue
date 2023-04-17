<template>
  <div class="login-container">
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
          <el-icon size="20"><UserFilled /></el-icon>
          <el-input
            ref="nickname"
            v-model="userForm.nickname"
            placeholder="请输入您的账号名"
            name="nickname"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="sex">
          <el-icon size="20"><Male /></el-icon>
          <el-select
            v-model="userForm.sex"
            clearable
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
          >Login</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  name: "Login",
  data() {
    return {
      userForm: {
        nickname: "",
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
    handleLogin() {
      let that=this
      that.$refs.userForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.userForm.code = uuidv4(); //直接加在页面的任意位置
          let data = { ...this.userForm };
            that.$http("/user/loginOrRegister", 'post',data,false,function(res){
                console.log(res)
              if(res.code==404){
               that.loading = false
               ElMessage({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
                })
             
            }else if(res.code==200){
               ElMessage({
                  showClose: true,
                  message: res.msg,
                  type: 'success',
                })
              window.localStorage.setItem('token', res.token);
              that.$router.push({name: 'Main'})
              that.loading = false
            }else{
              that.loading = false
              ElMessage({
                showClose: true,
                message: res.msg,
                type: 'warning',
              })
            } 
          }).catch(() => {
            that.loading = false;
            ElMessage({
                showClose: true,
                message: '无法连接到服务器',
                type: 'error',
            })
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
  background: url("../../assets/sign_bg.db29b0fb.png") no-repeat;
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
    display: inline-block;
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
  margin-bottom: 10px;
}
</style>