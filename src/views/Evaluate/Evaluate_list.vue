<template>
  <CpnavbarVue title="我的评价" />
  <div class="page_liebiao1">
    <div
      class="yonghu"
      v-for="(item, index) in rateList"
      :key="index"
      @click="onDetail(item.id)"
    >
      <div style="display: flex">
        <div class="name">{{ item.nickname }}</div>
        <div class="shijian">
          就诊时间:<span style="margin-left: 10px">{{ item.date }}</span>
        </div>
      </div>
      <div style="margin:10px 0px">
        <span class="name">{{ item.deptSubName }}</span>  /
        <span class="name">{{ item.doctorName }}</span>
      </div>
      <div class="pingfen" style="display: flex">
        <el-rate
          disabled
          size="18"
          v-model="item.totalValue"
          :texts="['1.0', '2.0', '3.0', '4.0', '5.0']"
          show-text
        />
        <div class="btn">
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="text">{{ item.evaluateText }}</div>
      <div>
        <el-image
          v-for="(one, index) in url"
          :key="index"
          style="
            width: 100px;
            height: 100px;
            border: 1px solid #eee;
            margin: 5px;
          "
          :src="one"
          :zoom-rate="1.2"
          :preview-src-list="srcList"
          :initial-index="4"
          fit="cover"
        />
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
      rateList: {},
      url: [],
      srcList: [],
      slotList: [
        "08:00~08:30",
        "08:30~09:00",
        "09:00~09:30",
        "09:30~10:00",
        "10:00~10:30",
        "10:30~11:00",
        "11:00~11:30",
        "11:30~12:00",
        "13:00~13:30",
        "13:30~14:00",
        "14:00~14:30",
        "14:30~15:00",
        "15:00~15:30",
        "15:30~16:00",
        "16:00~16:30",
        "16:30~17:00",
      ],
    };
  },
  methods: {
    onDetail(rateId) {
      this.$router.push({
        path: "/evaluateDetail",
        query: { rateId: rateId },
      });
    },
    onAdd(id) {
      let that = this;
      let data = { rateId: id };
      that.$http("/rate/addLikes", "post", data, true, function (res) {
        console.log(res);
        that.searchByUserIdRateAll();
      });
    },
    searchByUserIdRateAll() {
      let that = this;
      that.$http(
        "/rate/searchByUserIdRateAll",
        "post",
        {},
        true,
        function (res) {
          if (res.code == 200) {
            let result = res.result;
            let data = result;
            data.forEach((element, index) => {
              let time = that.slotList[element.slot - 1];
              data[index].date = `${element.date} ${time}`;
            });
            that.rateList = data;
            result.forEach((element) => {
              element.file.forEach((one) => {
                that.url.push(`${that.$minioUrl}/${one.path}`);
              });
            });
            that.srcList = that.url;
          }
        }
      );
    },
  },
  mounted() {
    this.searchByUserIdRateAll();
  },
};
</script>

<style lang="scss" scoped>
.page_liebiao1 {
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
  padding-top: 1px;

  .tupian {
    margin-top: 15px;
    margin-left: 10px;
  }

  .shijian {
    font-size: 10px;
    margin-right: 10px;
    margin-top: 10px;
    color: #808080;
  }

  .pingfen {
    margin-top: 10px;
    width: 100%;
    padding-left: 5px;
  }

  .biaoqian {
    margin-top: 5px;
    padding-left: 5px;
    width: 40%;
  }

  .name {
    margin-top: 10px;
    padding-left: 10px;
    margin-right: auto;
  }

  .yonghu {
    width: 93vw;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    margin-left: 4px;
    margin-top: 10px;
  }

  .yonghu1 {
    width: 93vw;
    background-color: #ffffff;
    border-radius: 10px;
    margin-top: 10px;
    padding-left: 19px;
    margin-left: 3.5px;
  }
}
.btn {
  margin-left: 182px;
  .el-icon {
    font-size: 20px;
  }
}
.text {
  margin-top: 5px;
  margin-left: 10px;
  color: rgb(156, 150, 150);
  font-size: 14px;
}
.el-rate__text {
  margin-left: 10px;
  margin-right: 20px;
}
</style>
