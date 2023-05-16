<template>
  <div class="page">
    <CpnavbarVue :title="title" />
    <div class="progress-box">
      <div>测评进度</div>
      <van-progress :percentage="test.process" stroke-width="9"/>
      <div>{{ test.testIndex + 1 }}/{{ test.testLength }}</div>
    </div>
    <!-- 题目 -->
    <div class="question">{{ test.testNow.topic }}</div>
    <!-- 单选题 -->
    <div class="topic-view">
      <div class="topic-Title">
        <div></div>
        <div>单选题</div>
      </div>
      <div
        class="totic"
        hover-class="hover-style"
        hover-stay-time="300"
        @click="switchQuestion(item.score)"
        v-for="item in test.testNow.options"
        :key="item.son_id"
      >
        {{ item.title }}
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
      title: "",
      test: {
        testData: [], //总数据
        testIndex: 0, //当前题目下标
        testNow: {}, //当前题目
        process: 0, //当前题目进度
        testLength: 0, //总题目数量
        score: [], //题目分数
        testTypes: 0, //测试类型
      },
    };
  },
  methods: {
    getData(type) {
      let that = this;
      //抑郁症测试题目
      that.$http(
        "/health_question/searchByType",
        "post",
        { type },
        true,
        function (res) {
          let data = res.result;
          that.test.testData = data;
          that.test.testNow = data[0];
          that.test.testLength = data.length;
          that.test.process = Math.round(100 / data.length) * 1;
        }
      );
    },
    //获取选中的题目
    switchQuestion(score) {
      ++this.test.testIndex;
      if (this.test.testIndex >= this.test.testLength) {
        --this.test.testIndex;
        this.test.score.push(score);
        let totalScore = this.test.score.reduce((pre, item) => {
          pre += item;
          return pre;
        }, 0);
        this.$router.push({
          path: "/result",
          query: { totalScore: totalScore, type: this.test.testTypes + 1 },
        });
      } else {
        this.test.score.push(score);
        this.test.testNow = this.test.testData[this.test.testIndex];
        this.test.process =
          Math.round(100 / this.test.testData.length) * (this.test.testIndex + 1);
      }
    },
  },
  mounted() {
    let that = this;
    const { health_id, title } = that.$route.query;
    that.getData(health_id);
    that.title = title;
    that.test.testTypes = health_id - 1;
  },
};
</script>
<style lang="scss" scoped>
.page {
  background: linear-gradient(to bottom, #d6e8ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}

.progress-box {
  display: flex;
  align-items: center;
  padding: 20px;
  .van-progress {
    flex: 1;
    padding: 0 40px;
    border-radius:40px;
    color:"#cce3ff";
    margin: 5px;
  }
}

.question {
  padding: 20px 20px;
  margin: 20px 20px;
  background-color: #ffffff;
  border-radius: 10px;
}

.topic-view {
  background-color: #f3f8ff;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: #d6e8ff 0px 0px 23px 5px;
}

.topic-Title {
  display: flex;
  align-items: center;
}

.topic-Title text:nth-child(1) {
  width: 8px;
  height: 27px;
  background-color: #0d7cff;
  display: block;
  margin-right: 10px;
}

.totic {
  background: #ffffff;
  margin: 10px 0;
  padding: 20px 10px;
  border-radius: 10px;
}

.hover-style {
  background-color: #ebf4ff;
  color: #298cff;
}
</style>