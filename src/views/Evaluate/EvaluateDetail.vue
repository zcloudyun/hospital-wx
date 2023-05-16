<template>
  <CpnavbarVue title="评价详情" />
  <div class="page_pingjia2">
    <div class="zhuti">
      <div class="heti">
        <div class="name" style="font-size: 16px; font-weight: 600">
          e医相伴 
             <span class="time">就诊时间: {{ rate.date }}</span>
        </div>
        <div>
        </div>
        <div style="display: flex; margin-top: 15px">诊室/医生
         <span style="margin-left:10px;font-size:14px"> {{rate.deptSubName}}/{{rate.doctorName}}</span>
        </div>
      </div>
    </div>
    <div class="dianping">
      <div style="border-bottom: 1px solid #eee; padding: 12px">
        <div>评价内容</div>
        <div class="evaluate">
          <div style="margin-bottom: 20px">{{ rate.evaluateText }}</div>
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
        <div class="score">
          <div class="taidu">就医环境:</div>
          <div style="margin-left: 27px">
            <el-rate
              v-model="rate.score1"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">医生专业技术:</div>
          <div>
            <el-rate
              v-model="rate.score2"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">医务人员态度:</div>
          <div>
            <el-rate
              v-model="rate.score3"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">预约便捷能力:</div>
          <div>
            <el-rate
              v-model="rate.score4"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">诊区导医态度:</div>
          <div>
            <el-rate
              v-model="rate.score5"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">挂号等候时间:</div>
          <div>
            <el-rate
              v-model="rate.score6"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">收费等候时间:</div>
          <div>
            <el-rate
              v-model="rate.score7"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">候诊等候时间:</div>
          <div>
            <el-rate
              v-model="rate.score8"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">检查等候时间:</div>
          <div>
            <el-rate
              v-model="rate.score9"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">取药等候时间:</div>
          <div>
            <el-rate
              v-model="rate.score10"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              disabled
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import CpnavbarVue from "../../components/Cpnavbar.vue";
export default {
  components: { CpnavbarVue },
  data() {
    return {
      rateId: "",
      rate: {},
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
    searchByRateId() {
      let that = this;
      let data = { rateId: that.rateId };
      that.$http("/rate/searchByRateId", "post", data, true, function (res) {
        if (res.code == 200) {
          let result = res.result;
          let time = that.slotList[result.slot - 1];
          result.date = `${result.date} ${time}`;
          that.rate = result;
          let img = result.file;
          img.forEach((item) => {
            that.url.push(`${that.$minioUrl}/${item.path}`);
          });
          that.srcList = that.url;
        }
      });
    },
  },
  mounted() {
    const { rateId } = this.$route.query;
    console.log(rateId);
    this.rateId = rateId;
    this.searchByRateId();
  },
};
</script>

<style lang="scss" scoped>
$abc: #ffffff;
.page_pingjia2 {
  height: 100%;
  width: 100%;
  background-color: #f4f4f6;
  .pingjia2 {
    color: $abc;
  }
  .xx {
    margin-left: 5px;
    padding: 5px;
  }
  .taidu {
    font-size: 14px;
  }
  .kuang {
    padding-top: 20px;
    width: 95%;
    padding-left: 10px;
  }
  .time{
    margin: 10px 10px 10px 75px;
    font-size: 12px;
    color: #808080;
  }
  .dianping {
    margin-top: 8px;
    height: 90%;
    width: 100vw;
    background-color: #ffffff;
    position: relative;
  }
  .miaoshu {
    margin-top: 3px;
    display: flex;
    color: #888888;
  }
  .heti {
    margin-left: 15px;
    margin-top: 8px;
  }
  .touxiang {
    margin-top: 8px;
    margin-left: 10px;
  }
  .zhuti {
    display: flex;
    height: 12vh;
    width: 100vw;
    background-color: #ffffff;
  }
}
.el-rate {
  font-size: 14px;
  height: 18px;
  padding: 9px;
}
.score {
  display: flex;
  margin-top: 10px;
}
.evaluate {
  font-size: 14px;
  color: #626161;
  margin: 10px;
  width: 100%;
  height: 20%;
  padding-bottom: 20px;
}
</style>
