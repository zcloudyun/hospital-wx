<template>
  <div class="page">
    <div class="main">
      <div class="hospital">e医相伴医院</div>
      <div class="title">电子处方笺</div>
      <div class="qrcode">
        <div class="qr-code" ref="qrCodeUrl"></div>
      </div>
      <div class="info-container">
        <div class="row">
          <div class="txt">姓名：{{ patient.name }}</div>
          <div class="txt">性别：{{ patient.sex }}</div>
          <div class="txt">年龄：{{ patient.age }}岁</div>
        </div>
        <div class="row">
          <div class="txt">诊室：{{ deptSub }}</div>
        </div>
        <div class="row">
          <div class="txt">临床诊断：{{ diagnosis }}</div>
        </div>
      </div>
      <div class="rp-container">
        <div class="rp-title">Rp:</div>
        <div class="rp" v-for="(one,index) of rpList" :key="one">
          <div class="row">
            <div class="name txt">{{index+1}}. {{ one.medicine_name }}</div>
            <div class="num txt">×{{ 1 }}</div>
          </div>
          <div class="row">
            <div class="spec txt">{{ one.scale }}</div>
          </div>
          <div class="row">
            <div class="method txt">{{ one.use }}</div>
          </div>
        </div>
      </div>
      <div class="responsible-person">
        <div>
          <div class="person">处方医师：{{ doctorName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//二维码
import QRCode from 'qrcodejs2-fix';
export default {
  data() {
    return {
      uuid: "",
      patient: {
        name: null,
        sex: null,
        age: null,
      },
      deptSub: null,
      diagnosis: null,
      rpList: [],
      doctor: null,
    };
  },
  methods: {
    /* 创建二维码 */
    creatQrCode() {
      new QRCode(this.$refs.qrCodeUrl, {
        text: 'https://blog.csdn.net/AdminGuan', // 二维码的内容
        width: 150,
        height: 150,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    //发起Ajax请求加载电子处方数据
    onLoad() {
      let that=this;
      // let registrationId=options.registrationId;
      let data={
        registrationId:26
      }
      that.$http('/prescription/searchPrescriptionById','post',data,true,function(res){
        if(res.code==200){
          let result=res.result;
          that.uuid=result.uuid;
          that.patient.name=result.patientName;
          that.patient.age=result.patientAge;
          that.patient.sex=result.patientSex;
          that.deptSub=result.deptSubName;
          that.diagnosis=result.diagnosis;
          that.rpList=result.rp;
          that.doctorName=result.doctorName;
        }
        
      })
    }
  },
  mounted: function () {
    this.creatQrCode(); // 创建二维码
    this.onLoad();
  },
  
}
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
  background-color: #cccccc;
  font-family: @ff-1;
  padding: 10px 0 40px 0;
}
.main {
  background-color: #fff;
  margin: 0px 7px 0 7px;
  border-radius: 15px;
  position: relative;
  padding: 0px 50px;
  &::before {
    content: "";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: @bgc-26;
    position: absolute;
    top: 300px;
    left: -20px;
  }
  &::after {
    content: "";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: @bgc-26;
    position: absolute;
    top: 300px;
    right: -20px;
  }
}

.hospital {
  font-size: 30px;
  // font-weight: bold;
  color: @fc-1;
  text-align: center;
  padding: 27px 0 20px 0px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: @fc-1;
  text-align: center;
  padding: 0px 0 20px 0px;
}

.qrcode {
  margin-left: 55px;
  margin-bottom: 30px;
  width: 172px;
  height: 140px;
}

.info-container {
  .row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid @bc-19;
    .txt {
      color: @fc-1;
      font-weight: bold;
      line-height: 3;
    }
  }
}
.qrcode {
  display: inline-block;
  img {
    width: 132px;
    height: 132px;
    background-color: #fff; //设置白色背景色
    padding: 6px; // 利用padding的特性，挤出白边
    box-sizing: border-box;
  }
}
.rp-container {
  padding: 50px 0;
  .rp-title {
    font-size: 20px;
    font-weight: bold;
    color: @fc-1;
  }
  .rp {
    padding: 20px 0;
    border-bottom: 1px dashed @bc-5;
    .row {
      display: flex;
      justify-content: space-between;
      line-height: 2.2;
      .name {
        color: @fc-1;
        font-weight: bold;
      }
    }
  }
}
.responsible-person {
  padding-bottom: 40px;
  .person {
    color: @fc-1;
    line-height: 2.5;
    font-weight: bold;
  }
}

</style>
