<template>
  <div class="page">
    <div class="top-container">
        <Cpnavbar title="添加就诊卡信息"/>
      <div class="step-container">
        <div class="icon-1">
          <i slot="right" class="img" size="18" :name="img['top-icon-1']"></i>
          <div class="desc">个人基本信息</div>
        </div>
        <div class="line"></div>
        <div class="icon-2">
          <i slot="right" size="18" :name="img['top-icon-2']"></i>
          <div class="desc">疾病史与医保</div>
        </div>
        <div class="line"></div>
        <div class="icon-3">
          <i slot="right" size="18" :name="img['top-icon-3']"></i>
          <label class="desc">创建就诊卡</label>
        </div>
      </div>
    </div>
    <div class="info-1-container" v-if="showInfoPanel == 1">
      <label class="title">填写个人基本信息</label>
      <label class="desc"
        >填写如下信息，以帮助医生了解您的身体基本情况，方便问诊开药</label
      >
      <el-form
        labelPosition="top"
        :model="dataForm"
        :rules="rules"
        ref="form1"
        labelWidth="110"
        :labelStyle="labelStyle"
      >
        <el-form-item
          label="本人姓名"
          prop="name"
          borderBottom
          ref="name"
          leftIcon="account"
          :leftIconStyle="iconStyle"
          required
        >
          <el-input
            v-model="dataForm.name"
            border="none"
            placeholder="输入姓名"
          />
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
          borderBottom
          ref="sex"
          leftIcon="file-text"
          :leftIconStyle="iconStyle"
          required
        >
          <el-select
            v-model="dataForm.sex"
            clearable
            placeholder="请选择性别"
            prop="sex"
            ref="sex"
            @click="showSex = true"
          >
            <el-option label="女" value="女"></el-option>
            <el-option label="男" value="男"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="身份证号"
          prop="pid"
          borderBottom
          ref="sex"
          leftIcon="file-text"
          :leftIconStyle="iconStyle"
          required
        >
          <el-input
            v-model="dataForm.pid"
            border="none"
            placeholder="输入身份证号码"
          />
          <div class="ocr"></div>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="tel"
          borderBottom
          ref="tel"
          leftIcon="phone"
          :leftIconStyle="iconStyle"
          required
        >
          <el-input
            v-model="dataForm.tel"
            border="none"
            placeholder="输入手机号码"
          />
        </el-form-item>
        <el-form-item
          label="出生日期"
          prop="birthday"
          borderBottom
          ref="birthday"
          @click="showDatetime = true"
          leftIcon="calendar"
          :leftIconStyle="iconStyle"
        >
          <el-date-picker
            v-model="dataForm.birthday"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择出生日期"
          ></el-date-picker>
          <i slot="right" name="arrow-right"></i>
        </el-form-item>
      </el-form>
      <div class="operate">
        <el-button type="primary" color="#2074fd" @click="nextHandle"
          >下一步</el-button
        >
      </div>
    </div>
    <div class="info-2-container" v-if="showInfoPanel == 2">
      <label class="title">填写疾病史与医保信息</label>
      <label class="desc"
        >填写如下信息，以帮助医生了解您的身体基本情况，方便问诊开药</label
      >
      <div class="label">
        <el-icon color="#2074fd" size="20"><WarningFilled /></el-icon>
        <div class="txt">您是否患有或者患过以下疾病</div>
      </div>
      <div class="illness-tabs">
        <div
          class="tab"
          v-for="one in illnessList " :key="one"
          :class="dataForm.medicalHistory.includes(one) ? 'tab active' : 'tab'"
          @click="illnessHandle(one)"
        >
          {{ one }}
        </div>
      </div>
      <div class="label">
        <el-icon color="#2074fd" size="20"><WarningFilled /></el-icon>
        <div class="txt">请选择您自己的医保类型</div>
      </div>
      <div class="insurance-tabs">
        <div
          v-for="one in insuranceTypeList" :key="one"
          :class="dataForm.insuranceType == one ? 'tab active' : 'tab'"
          @click="insuranceTypeHandle(one)"
        >
          {{ one }}
        </div>
      </div>
      <div class="operate">
        <el-button type="primary" color="#2074fd" @click="submitHandle"
          >提交信息</el-button
        >
      </div>
    </div>
    <img :src="bannerUrl" mode="widthFix" class="banner" />
  </div>
</template>

<script>
import { dayjs} from 'element-plus';
import { ElMessage } from "element-plus";
import CpnavbarVue from '../../components/Cpnavbar.vue';
export default {
  components:{CpnavbarVue},
  data() {
    return {
      img: {
        "icon-1": `${this.$minioUrl}/patient-wx/page/user/fill_user_info/icon-1.png`,
        "top-icon-1": `${this.$minioUrl}/patient-wx/page/user/fill_user_info/top-icon-1.png`,
        "top-icon-2": `${this.$minioUrl}/patient-wx/page/user/fill_user_info/top-icon-2.png`,
        "top-icon-3": `${this.$minioUrl}/patient-wx/page/user/fill_user_info/top-icon-3.png`,
      },
      flag: "insert",
      showInfoPanel: 1,
      labelStyle: {
        color: "#2074fd",
        "font-weight": "bold",
      },
      iconStyle: {
        color: "#0764FD",
        "font-size": "34px",
        "margin-top": "3px",
      },
      illnessList: [
        "高血压",
        "糖尿病",
        "心脏病",
        "脑梗",
        "脑出血",
        "脑中风",
        "白血病",
        "癫痫",
        "肾病",
        "其他",
        "无",
      ],
      insuranceTypeList: [
        "社会基本医疗保险",
        "商业医疗保险",
        "新型农村合作医疗",
        "大病统筹",
        "公费医疗",
        "城镇居民医疗保险",
        "其他",
        "无",
      ],
      validate: true,
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: ["change", "blur"],
          },
          {
            type: "string",
            pattern: "^[\\u4e00-\\u9fa5]{2,15}$",
            required: true,
            message: "姓名不正确",
            trigger: ["blur", "change"],
          },
        ],
        sex: {
          type: "string",
          max: 1,
          required: true,
          message: "请选择男或女",
          trigger: ["blur", "change"],
        },
        pid: [
          {
            required: true,
            message: "请输入身份证号码",
            trigger: ["change", "blur"],
          },
          {
            type: "string",
            pattern:
              "^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
            required: true,
            message: "身份证号码不正确",
            trigger: ["blur", "change"],
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: ["change", "blur"],
          },
          {
            type: "string",
            pattern: "^1[0-9]{10}$",
            required: true,
            message: "手机号码不正确",
            trigger: ["blur", "change"],
          },
        ],
        birthday: {
          type: "string",
          required: true,
          message: "请选择出生日期",
          trigger: ["blur", "change"],
        },
      },
      dataForm: {
        id: null,
        name: null,
        sex: null,
        pid: null,
        tel: null,
        birthday: null,
        medicalHistory: ["无"],
        insuranceType: "无",
      },
      bannerUrl: `${this.$minioUrl}/patient-wx/banner/banner-4.jpg`,
    };
  },
  mounted:function(){
    this.searchUserInfoCard();
  },
  methods: {
    validateFieldHandle: function (ref, errors) {
      if (errors.length > 0) {
        ref.validate = false;
      }
    },
    searchUserInfoCard:function(){
        let that=this
      that.$http('/user/info/card/searchUserInfoCard','get',{},true,function(res){
        console.log('后台返回的数据查看是否存在就诊卡信息',res)
        if(res.msg=='没有查询到数据')
        {
          that.flag='insert';
          return;
        }
        that.flag='update';
        that.dataForm.id=res.id;
        that.dataForm.name=res.name;
        that.dataForm.sex=res.sex;
        that.dataForm.pid=res.pid;
        that.dataForm.tel=res.tel;
        that.dataForm.birthday=res.birthday
        that.dataForm.medicalHistory=res.medicalHistory
        that.dataForm.insuranceType=res.insuranceType
      },false)
    },
    //切换到疾病与医保
    nextHandle: function () {
      let that = this;
      that.validate = true;
        that.$refs.form1.validateField("name", function (errors) {
          that.validateFieldHandle(that, errors);
        });
        that.$refs.form1.validateField("pid", function (errors) {
          that.validateFieldHandle(that, errors);
        });
        that.$refs.form1.validateField("tel", function (errors) {
          that.validateFieldHandle(that, errors);
        });
        that.$refs.form1.validateField("sex", function (errors) {
          that.validateFieldHandle(that, errors);
        });
        that.$refs.form1.validateField("birthday", function (errors) {
          that.validateFieldHandle(that, errors);
        });
      //以上验证是异步的，所以需要定时器预估时间
      setTimeout(function () {
        if (!that.validate) {
          return;
        }
        that.showInfoPanel = 2;
      }, 500);
    },
    //疾病的勾选
    illnessHandle: function (name) {
      let that = this;
      let medicalHistory = that.dataForm.medicalHistory;
      //如果数组中包含了点击的这个疾病，就要取消选中
      if (medicalHistory.includes(name)) {
        //从数组中获取该疾病以外的疾病，相当于把该疾病剔除
        medicalHistory = medicalHistory.filter(function (one) {
          if (one != name) {
            return one;
          }
        });
        //如果数组里面没有疾病，就添加“无”这个元素
        if (medicalHistory.length == 0) {
          medicalHistory.push("无");
        }
      }
      //如果数组中没有这个疾病，说明要选中这个疾病
      else {
        //如果疾病名字不是'无'
        if (name != "无") {
          //如果数组中的“无”去掉，添加具体疾病
          medicalHistory = medicalHistory.filter(function (one) {
            if (one != "无") {
              return one;
            }
          });
          medicalHistory.push(name);
        }
        //如果选中疾病是"无"
        else {
          //把数组中所有疾病去掉，添加“无”
          medicalHistory.length = 0;
          medicalHistory.push("无");
        }
      }
      that.dataForm.medicalHistory = medicalHistory;
    },
    insuranceTypeHandle: function (name) {
      this.dataForm.insuranceType = name;
    },
    submitHandle: function () {
      let that = this;
      ElMessageBox.confirm(`${that.flag=="insert"?"确定创建就诊卡?":"确定更新就诊信息?"}`)
     .then((res) => {
            let data = {...that.dataForm};
            let url = (that.flag == "insert")? '/user/info/card/insert': '/user/info/card/update';
            console.log(url)
            that.$http(url, "post", data,false, function (res) {
              console.log("添加/更新就诊卡结果：", res);
              ElMessage({
                    showClose: true,
                    message: that.flag == "insert" ? "就诊卡创建成功" : "就诊卡更新成功",
                    type: 'success',
              })
              that.$router.push({name:"Mine"})
           })
    }).catch(() => {
        ElMessage({
            showClose: true,
            message: '添加/更新就诊卡失败',
            type: 'error',
        })
    })},
  }
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
  background-color: @bc-12;
  font-family: @ff-1;
  padding-bottom: 55px;
}
.top-container {
  background-color: @bgc-10;
  height: 320px;
  box-sizing: border-box;
  .section-title{
    padding-bottom: 10px;
    color: #000;
    text-align: center;
  }
  .step-container {
    display: flex; 
    justify-content: space-between;
    padding: 15px;
    .icon {
      background-color: rgba(255, 255, 255, 0.85);
      width: 60px;
      height: 50px;
      border-radius: 10px;
      position: relative;
      text-align: center;
      line-height: 50px;
      background-repeat: no-repeat;
    }
    .icon-1 {
      .icon;
      background-image: url("@{baseUrl}/page/user/fill_user_info/top-icon-1.png");
      background-size: 40px;
      background-position: 10px 5px;
      background-repeat: no-repeat;
    }
    .icon-2 {
      .icon;
      background-image: url("@{baseUrl}/page/user/fill_user_info/top-icon-2.png");
      background-size: 40px;
      background-position: 10px 5px;
      background-repeat: no-repeat;
    }
    .icon-3 {
      .icon;
      background-image: url("@{baseUrl}/page/user/fill_user_info/top-icon-3.png");
      background-size: 40px;
      background-position:10px 5px;
      background-repeat: no-repeat;
    }
    .desc {
      display: block;
      font-size: 12px;
      color: #fff;
    //   text-align: center;
      width: 120%;
      position: absolute;
      // left: -40px;
      top: 50px;
      // background-color: red;
    }
    .line {
      flex-grow: 1;
      height: 0;
      border-top: 1px solid @bc-2;
      margin-top: 50px;
      margin-left: 30px;
      margin-right: 30px;
    }
  }
}
.info-container {
  margin: -150px 35px 0px 35px;
  background-color: #fff;
  border-radius: 15px;
  padding: 30px 40px 50px 40px;
  .title {
    display: block;
    color: @fc-1;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .desc {
    display: block;
    color: @fc-3;
    font-size: 13px;
    margin-bottom: 10px;
  }
  .operate {
    margin-top: 50px;
    width: 80%;
  }
}
.info-1-container {
  .info-container;
  .ocr {
    width: 26px;
    position: absolute;
    right: 80px;
    z-index: 999;
    margin-top: -10px;
  }
}
.info-2-container {
  .info-container;
  .label {
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    .txt {
      color: #2074fd;
      font-weight: bold;
      font-size: 14px;
      margin-left: 2px;
    }
  }
  .illness-tabs {
    display: flex;
    flex-wrap: wrap;
    .tab {
      background-color: #fcf6e6;
      color: #f1ba30;
      padding: 20px 7px;
      margin-right: 8px;
      margin-bottom: 13px;
      font-size: 12px;
      border-radius: 10px;
      min-width: 22px;
      text-align: center;
    }
    .active {
      background-color: #f1ba30;
      color: #fff;
    }
  }
  .insurance-tabs {
    display: flex;
    flex-wrap: wrap;
    .tab {
      background-color: #e2f8f0;
      color: #28ca98;
      padding: 15px 6px;
      margin-right: 8px;
      margin-bottom: 20px;
      font-size: 12px;
      border-radius: 10px;
      min-width: 20px;
      text-align: center;
    }
    .active {
      background-color: #28ca98;
      color: #fff;
    }
  }
}
.banner {
  display: block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  width: 80%;
}
.el-input__wrapper {
  width: 92%;
}
.el-select {
  width: 105%;
}
.el-button {
  width: 125%;
  height: 44px;
}
.el-message-box__btns button:nth-child(2) {
    margin-left: 0px;
}
</style>
