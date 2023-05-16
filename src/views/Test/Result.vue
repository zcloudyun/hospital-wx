<template>
  <div class="page">
    <CpnavbarVue title="测评结果" />
    <div class="back-color">
      <div class="result-top">
        <div>结果分析</div>
        <div>本测试及结果由AI得出,仅供参考,不能作为诊断及诊疗的依据</div>
      </div>
      <div class="result-desc">
        <div>{{ scope }}:{{ result }}</div>
        <div>{{ suggest }}</div>
        <div class="bold" v-if="recommed.length > 0">AI为你推荐以下科室</div>
        <div class="recommend" v-for="(item, index) in recommed" :key="index">
          <label>
            <span class="bold">{{ item.dept_name }}</span>
            <span class="Hosp">{{ item.hospital }}</span>
          </label>
          <label class="regi" @click="regiSter">去挂号</label>
        </div>
      </div>
      <div class="scale">
        <div class="bold">
          量表评级标准:
          <el-button plain="true" @click="canCel">再测一次</el-button>
        </div>
        <div v-for="(item, index) in scale" :key="index" class="sca">
          {{ item.scale }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CpnavbarVue from "../../components/Cpnavbar.vue";
export default {
  components: {
    CpnavbarVue,
  },
  data() {
    return {
      data: {
        scope: "",
        result: "",
        suggest: "",
        recommed: [],
        scale: [],
      },
    };
  },
  methods: {
    //再测一次
    canCel() {
      this.$router.go(-1);
    },
    //去挂号
    regiSter() {
      this.$router.push({ name: "Notice" });
    },
    getData(totalScore, type) {
      let that = this;
      let data = {
        totalScore: totalScore,
        health_id: type,
      };
      that.$http(
        "/health_result/searchByType",
        "post",
        data,
        false,
        function (res) {
          console.log(res);
          let data = res.result;
          that.scope = data.scope;
          that.result = data.result;
          that.recommed = data.recommed;
          that.suggest = data.suggest;
          that.scale = data.scale;
        }
      );
    },
  },
  created() {
    let that = this;
    let { totalScore, type } = that.$route.query;
    that.getData(totalScore, type);
  },
};
</script>
  
<style lang="scss" scoped>
.page {
  background: #f0f5f9;
  height: 100%;
}

.back-color {
  height: 100%;
  background: -webkit-linear-gradient(
    top,
    #d6e8ff 30%,
    #f2f7fb 55%,
    #f0f5f9 90%
  );
  overflow: auto;
}

.result-top {
  display: flex;
  flex-direction: column;
  padding: 14px;
}

.result-top text:nth-child(1) {
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 20px;
}

.result-desc {
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0px 20px;
  padding: 20px;
}
.scale {
  background: #dbebf6;
  padding: 10px;
  margin: 10px 20px;
  border-radius: 10px;
  .bold {
    font-size: 18px;
    padding: 5px;
    .el-button {
      margin-left: 80px;
    }
  }
  .sca {
    font-size: 16px;
    padding: 5px 10px;
    color: #704848;
  }
}
.result-desc div {
  margin-bottom: 20px;
  line-height: 1.5;
}

.result-desc div:nth-child(1) {
  font-size: 28px;
  font-weight: bold;
  color: #0d7cff;
}

.result-desc div:nth-child(2) {
  color: #0d7cff;
}

.recommend {
  background-color: #f4f7fa;
  border-radius: 10px;
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
}
.bold {
  font-weight: bold;
  display: block;
}
.Hosp {
  color: #bac5cc;
}

.regi {
  align-self: center;
  background-color: #0176ff;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
}

.exceed {
  height: 300px;
  background: #f0f5f9;
}
</style>