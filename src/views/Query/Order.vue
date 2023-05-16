<template>
  <div class="page_order">
    <CpnavbarVue title="我的订单" />
    <div class="nav">
      <van-tabs active="curNow" sticky @change="sectionChange">
        <van-tab v-for="(one, index) in list" :key="index" :title="one">
        </van-tab>
      </van-tabs>
    </div>
    <div class="order_card">
      <div class="card" v-for="(item, index) in orderList" :key="index">
        <div class="card_top">
          <div style="width: 68%" class="font14">
            门诊科室：{{ item.deptSubName }}
          </div>
          <div class="font14" style="color: #25a785">
            {{
              item.paymentStatus == 1
                ? "未付款"
                : item.paymentStatus == 2
                ? "已付款"
                : item.paymentStatus == 3
                ? "已退款"
                : "已过期"
            }}---
          </div>
          <div class="font14" style="color: #25a785">
            {{
              item.status == 1
                ? "未就诊"
                : "已就诊"
            }}
          </div>
        </div>
        <div class="card_medium">
          <img :src="item.imgUrl" class="card_img" />
          <div class="med_right">
            <div class="font16 fontbold med_right1">{{ item.doctorName }}</div>
            <div class="font12 med_right2">预约时间：{{ item.time }}</div>
            <div class="med_right3">
              <div class="font12">实付：</div>
              <div class="font12 col_red">￥</div>
              <div class="font16 col_red">{{ item.price }}</div>
            </div>
          </div>
        </div>
        <div class="card_btm">
          <el-button
            style="margin-left: 10px"
            :class="item.evaluate == 1 &&  item.status == 2? 'btn' : ''"
            shape="circle"
            :disabled="item.evaluate !== 1"
            @click="onEvaluate(item.registrationId)"
            >{{ item.evaluate == 1 ? "未评价" : "已评价" }}</el-button
          >
          <el-button
            style="margin-left: 10px"
            :class="item.status == 2? 'btn' : ''"
            shape="circle"
            :disabled="item.status !== 2"
            @click="onRecord(item.recordId)"
            >病历</el-button
          >
          <el-button
            style="margin-left: 10px"
            :class="item.status == 2? 'btn' : ''"
            shape="circle"
            :disabled="item.status !== 2"
            @click="onPrescription(item.registrationId)"
            >处方</el-button
          >
          <el-button
            :class="
              item.status == 2 || item.paymentStatus != 2 ? 'gay' : 'btm1'
            "
            shape="circle"
            @click="onCancel(item.registrationId)"
            :disabled="item.status == 2 || item.paymentStatus != 2"
            >取消订单</el-button
          >
          <el-button
            :class="endTime || item.paymentStatus != 1 ? 'gay1' : 'btm2'"
            shape="circle"
            v-if="item.paymentStatus != 2"
            @click="onPay(item)"
            :disabled="endTime || item.paymentStatus != 1"
            >立即付款</el-button
          >
          <el-button
            class="btm2"
            shape="circle"
            v-if="item.paymentStatus == 2 && item.status == 2"
            @click="onDetail(item.registrationId)"
            >查看详情</el-button
          >
          <el-button
            class="red"
            shape="circle"
            v-if="item.paymentStatus == 2 && item.status == 1"
            disabled
            >按时就诊</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CpnavbarVue from "../../components/Cpnavbar.vue";
export default {
  components: { CpnavbarVue },
  data() {
    return {
      json: {
        1: "08:00:00",
        2: "08:30:00",
        3: "09:00:00",
        4: "09:30:00",
        5: "10:00:00",
        6: "10:30:00",
        7: "11:00:00",
        8: "11:30:00",
        9: "13:00:00",
        10: "13:30:00",
        11: "14:00:00",
        12: "14:30:00",
        13: "15:00:00",
        14: "15:30:00",
        15: "16:00:00",
        16: "16:30:00",
      },
      orderList: [],
      list: ["全部", "未支付", "已支付", "已取消"],
      curNow: 0,
      entTime: false,
      img: `${this.$minioUrl}/patient-wx/page/mine/service-icon-15.png`,
    };
  },
  methods: {
    searchByUserId() {
      let that = this;
      let data = {
        paymentStatus: that.curNow,
      };
      that.$http(
        "/registration/searchByUserId",
        "post",
        data,
        true,
        function (res) {
          if (res.code == 200) {
            that.orderList = res.result;
            for (let one in that.orderList) {
              //付款状态：1.未付款，2.已付款，3.已退款，4.已过期
              that.orderList[one].time =
                that.orderList[one].date +
                " " +
                that.json[that.orderList[one].slot];
              that.orderList[one].imgUrl = `${that.$minioUrl}${
                that.orderList[one].photo
              }?random=${Math.random()}`;
            }
          }
        }
      );
    },
    sectionChange(event) {
      this.curNow = event;
      this.searchByUserId();
    },
    //去评价
    onEvaluate(registrationId){
      this.$router.push({
        path:'/evaluate',
        query:{registrationId:registrationId}
      })
    },
    //病历
    onRecord(recordId){
      this.$router.push({
			path:'/record',
			query:{recordId:recordId}
		  })
    },
    //电子处方
    onPrescription(registrationId){
      this.$router.push({
        path:'/prescription',
        query:{registrationId:registrationId}
      })
    },
    //时间比较
    checkEndTime(date) {
      var today = new Date();
      var end = new Date(date.replace("-", "/").replace("-", "/"));
      if (end < today) {
        //是否过期
        return true;
      }
      return false;
    },
    //去支付
    onPay(item) {
      let that = this;
      that.entTime = this.checkEndTime(item.time);
      if (that.entTime) {
        ElMessage({
          type: "error",
          message: "就诊时间已过",
        });
      } else {
        const {
          workPlanId,
          scheduleId,
          date,
          doctorId,
          deptSubId,
          price,
          slot,
        } = item;
        let data = {
          workPlanId: workPlanId,
          scheduleId: scheduleId,
          date: date,
          doctorId: doctorId,
          deptSubId: deptSubId,
          amount: price,
          slot: slot,
        };
        that
          .$http(
            "/registration/registerMedicalAppointment",
            "post",
            data,
            false,
            function (res) {
              console.log("挂号返回的数据", res);
              let price = res.amount;
              console.log("挂号的价钱", price);
              //如果响应体是空的，说明挂号失败
              if (!res.hasOwnProperty("outTradeNo")) {
                ElMessage({
                  type: "error",
                  message: "该时段挂号失败",
                });
                /*
                重新加载医生和出诊时段信息
                挂号失败是有可能该时段刚刚过期，所以刷新页面之后，该时段会变成灰色，禁止挂号
              */
                that.searchDoctorInfoById();
                that.searchDoctorWorkPlanSchedule();
              } else {
                let outTradeNo = res.outTradeNo;
                //弹出微信支付界面
                that.$router.push({
                  path: "/pay",
                  query: { outTradeNo: outTradeNo, price: price },
                });
              }
            }
          )
          .catch(() => {
            ElMessage({
              type: "info",
              message: "取消挂号",
            });
          });
      }
    },
    //取消订单
    onCancel(registrationId) {
      let that = this;
      let data = { registrationId };
      that.$http(
        "/registration/updateByRegistrationId",
        "post",
        data,
        true,
        function (res) {
          if (res.code) {
            ElMessage({
              showClose: true,
              message: "订单取消成功",
              type: "success",
            });
            this.searchByUserId();
          }
        }
      );
    },
    //查看详情
    onDetail(registrationId) {
      this.$router.push({
        path: "/resigtion_info",
        query: { registrationId },
      });
    },
  },
  mounted() {
    this.searchByUserId();
  },
};
</script>

<style lang="scss" scoped>
.page_order {
  width: 100vw;
  min-height: 100vh;
  .nav {
    width: 100%;
  }
  .col_red {
    color: red;
  }
  .font12 {
    font-size: 12px;
  }
  .font14 {
    font-size: 14px;
  }
  .font16 {
    font-size: 16px;
  }
  .order_card {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .card {
      width: 92%;
      height: 15%;
      margin-top: 20px;
      border-radius: 10px;
      background-color: white;
      box-shadow: 1px 1px 5px #d5d5d5;
      .card_top {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #eee;
      }
      .card_medium {
        width: 95%;
        height: 80px;
        display: flex;
        align-items: center;
        padding-top: 15px;
        padding-left: 15px;
        .card_img {
          height: 100%;
          border-radius: 10px;
        }
        .med_right {
          height: 100%;
          margin-left: 20px;

          .med_right1 {
            margin-bottom: 10px;
          }

          .med_right2 {
            color: #909090;
            margin-bottom: 10px;
          }

          .med_right3 {
            display: flex;
            align-items: center;
          }
        }
      }

      .card_btm {
        display: flex;
        height: 50px;
        width: 100%;
        align-items: center;

        .btm1 {
          height: 30px;
          background-color: #ffffff;
          color: #25a785;
          border: #25a785 1px solid;
          margin-left: 10px;
        }
        .gay {
          height: 30px;
          background-color: #ffffff;
          color: #a7aead;
          border: #b5b9b8 1px solid;
          margin-left: 10px;
        }
        .red {
          height: 30px;
          background-color: #f15b5b;
          color: white;
          margin-left: 10px;
        }
        .gay1 {
          height: 30px;
          background-color: #ede2e2;
          color: white;
          margin-left: 10px;
        }
        .btm2 {
          height: 30px;
          background-color: #25a785;
          color: white;
          margin-left: 10px;
        }
      }
    }
  }
}
.btn {
  background-color: #25a785;
  color: white;
}
.van-tabs__nav {
  background: #eee;
}
.el-button {
  padding: 5px 3px;
  border-radius: 20px;
  margin: 0px;
}
</style>
