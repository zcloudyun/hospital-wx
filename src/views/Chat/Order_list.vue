<template>
  <div class="page">
    <CpnavbarVue title="询医列表" />
    <div class="banner" @click="registerHandle">
      <img :src="doctorImg" mode="widthFix" />
      <div>
        <div class="row-1">
          <span class="title">在线询医</span>
          <span class="remark">就诊快</span>
        </div>
        <div class="row-2"><div class="btn">立即聊天</div></div>
        <div class="row-3">查找名医，在线问诊，方便快捷，不再等待</div>
      </div>
    </div>
    <div class="order" v-for="one of list" :key="one.id">
      <div class="row" @click="goChat(one.doctorId,one.name)">
        <div>
          <span class="doctor-name">{{ one.name }}</span>
          <span class="job">（{{ one.job }}）</span>
        </div>
      </div>
      <div class="row">
        <div style="display: flex">
          <div class="left"><el-avatar :src="one.imgUrl" /></div>
          <div class="right">
            <div class="email">邮箱: {{ one.email }}</div>
            <div class="tel">电话: {{ one.tel }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.length == 0">
      <van-empty
        mode="order"
        description="没有寻医记录"
        icon="http://cdn.uviewui.com/uview/empty/order.png"
      ></van-empty>
    </div>
  </div>
</template>

<script>
import { dayjs} from 'element-plus';
import CpnavbarVue from "../../components/Cpnavbar.vue";
export default {
  components: { CpnavbarVue },
  data() {
    return {
      doctorImg: `${this.$minioUrl}/patient-wx/pic/pic-2.png`,
      page: 1,
      length: 50,
      list: [],
      isLastPage: false,
    };
  },
  methods: {
    registerHandle: function () {
      this.$router.push({
        path: "/doctor_list",
      });
    },
	goChat(userId,name) {
      this.$router.push({
        path:'/chat',
        query:{userId,name}
      })
    }
  },
  mounted() {
    let that = this;
    that.$http("/message/talk/list", "get", {}, true, function (res) {
      that.list = res.talkList;
      res.talkList.forEach((element, index) => {
        that.list[index].imgUrl = `${that.$minioUrl}/${element.photo}`;
      });
    });
  },
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
  font-family: @ff-1;
  background-color: @bgc-1;
  width: 100%;
  height: 100%;
}
.banner {
  height: 20%;
  background-color: @bgc-18;
  overflow: hidden;
  display: flex;
  img {
    flex-grow: 0;
    height: auto;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .row-1 {
    margin-top: 10px;
    .title {
      font-size: 26px;
      color: #fff;
      font-weight: bold;
    }
    .remark {
      background-color: @bgc-24;
      font-size: 13px;
      color: @fc-2;
      padding: 4px 8px;
      border-radius: 20px;
      margin-left: 6px;
      vertical-align: 10px;
    }
  }
  .row-2 {
    margin-top: 10px;
    .btn {
      color: #fff;
      background-color: @bgc-16;
      width: 93px;
      padding: 5px 0;
      text-align: center;
      border-radius: 10px;
    }
  }
  .row-3 {
    margin-top: 10px;
    font-size: 12px;
    color: #fff;
  }
}
.order {
  background-color: #fff;
  margin: 15px 9px;
  padding: 8px 0;
  border-radius: 28px;
  .row {
    display: flex;
    justify-content: space-between;
    &:nth-child(1) {
      border-bottom: 1px solid @bc-4;
      padding: 0 5px 20px 25px;
    }
    &:nth-child(2) {
        padding: 13px 5px 0 20px
    }
    &:nth-child(3) {
      padding: 10px 5px 0 25px;
    }
    &:nth-child(4) {
      padding: 10px 5px 0 25px;
    }
    .status {
      color: @fc-3;
      font-size: 24px;
    }
    .doctor-name {
      font-size: 18px;
      font-weight: bold;
      color: @fc-2;
    }
    .job {
      font-size: 14px;
      color: @fc-2;
    }
    .sub-name {
      font-size: 30px;
      color: @fc-2;
    }
    .unit {
      font-size: 22px;
      font-weight: bold;
      color: @fc-2;
    }
    .amount {
      font-size: 42px;
      font-weight: bold;
      color: @fc-2;
    }
    .create-time {
      margin-top: 10px;
      margin-left: -3px;
    }
    .btn {
      color: #fff;
      width: 120px;
      font-size: 28px;
      margin: 0;
      padding: 0 0;
      line-height: 2;
      text-align: center;
      border-radius: 10px;
    }
    .green {
      background-color: @btnc-7;
      &:active {
        background-color: @btnac-7;
      }
    }
    .gray {
      background-color: @btnc-8;
    }
    .orange {
      background-color: @btnc-9;
    }
    .blue {
      color: @fc-4;
    }
  }
}
.left {
  margin: 10px 0px;
}
.right {
  margin: 10px;
}
</style>
