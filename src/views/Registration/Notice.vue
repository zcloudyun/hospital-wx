<template>
  <div class="page">
    <div class="title">就诊须知</div>
    <div class="desc">发布单位：重庆市e医相伴医院</div>
    <img :src="bannerUrl" mode="widthFix" class="banner" />
    <div class="content">
      <h3>1.就诊提醒：</h3>
      <p>
        按照重庆市新冠肺炎疫情防控指挥部要求，重庆市涉疫区域人员（健康码黄码、封控区、管控区及隔离的人员）请先与重庆市医政部门联系安排就诊医院，确需到我院就诊的，再由重庆市医政部门安排转运。来自非中高风险地区、重点管控和重点关注地区的门诊就诊患者提供72小时核酸检测结果就诊，我院门诊严格执行实名预约挂号就诊制度，就诊患者请携带本人有效身份证件（身份证、医保卡等）。
      </p>
      <h3>2.温馨提示：</h3>
      <p>
        目前门诊就诊患者较多，一位患者只能一位陪同，请陪同人员完成预检筛查。并出示身份证等有效证件配合流调人员的工作，必要时做好行程轨迹查询，确保安全就诊。谢谢您的配合！
      </p>
    </div>
    <div class="operate">
      <el-button size="large" type="primary" @click="acceptHandle"
        >我已知晓</el-button
      >
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      bannerUrl: `${this.$minioUrl}/patient-wx/page/registration/notice/banner.jpg`,
    };
  },
  methods: {
    acceptHandle: function () {
      let that = this;
      //检查用户是否登陆
      let token = window.localStorage.getItem("token");
      console.log(token);
      if (token == null || token.length == 0) {
        ElMessage({
          message: "请先登录",
          type: "warning",
        });
        that.$router.push({ name: "Login" });
      }
      else{
        //检查用户是否创建就诊卡
        that.$http("/user/info/card/hasUserInfoCard", "get", {}, false, function (res) {
              let result = res.result;
              if (result) {
                that.$router.push({name:'Medical_dept_list'})
              } else {
                ElMessage({
                  showClose: true,
                  message: "请先创建就诊卡",
                  type: "error",
                });
                setTimeout(function () {
                  that.$router.push({name:'Main'})
                }, 2000);
              }
            }
        );
      }
      
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
  background-color: #fff;
  font-family: @ff-1;
  padding-top: 20px;
  padding-bottom: 100px;
}
.title {
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  background-color: @bgc-22;
  color: #fff;
  padding: 15px 45px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  border-top: 2px solid rgba(255, 255, 255, 0.4);
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
  border-right: 2px solid rgba(255, 255, 255, 0.4);
}
.desc {
  display: block;
  font-size: 16px;
  color: @fc-3;
  margin: 0 45px 20px 45px;
}
.banner {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}

.operate {
  margin: 30px 0;
  .el-button {
    width: 98%;
  }
}
.content {
  h3 {
    color: #444444;
    margin: 30px 45px 0 45px;
    line-height: 1.8;
  }
  p {
    color: #444444;
    margin: 10px 45px 10px 45px;
    line-height: 1.8;
  }
}
</style>
