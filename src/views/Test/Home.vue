<template>
 <div class="page">
   <!-- 健康自测 -->
  <cpnavbar title="健康自测"/>
  <!-- 第一排测试 -->
  <div class="self-test">
    <div
      class="sele-test-top sele-test-flex sele-test-one sele-test-back"
      v-for="(item, index) in selftest"
      :key="index"
      @click="getTest(item.health_id, item.name)"
    >
      <div class="sele-test-div">
        <div class="top-title">{{ item?.name }}</div>
        <div class="top-lable">{{ item?.describe }}</div>
        <div class="top-people">
          <div class="top-num">{{ item?.number_of_people }}</div>
          <div class="top-min top-lable">
            人测过 / {{ item?.question }}题 / {{ item?.minute }}分钟
          </div>
        </div>
      </div>
      <img class="top-img" mode="widthFix" :src="item?.image" />
    </div>
  </div>
 </div>
</template>
<script>
export default {
  data() {
    return {
      selftest: [],
    };
  },
  methods: {
    getHomeData() {
      let that=this;
      that.$http('/health/searchAll','get',{},true,function(res){
        that.selftest=res.result;
      })
    },
    getTest(health_id, name) {
      this.$router.push({
        path: "/myTest",
        query: {  title: name,health_id },
      });
    },
  },
  mounted(){
    this.getHomeData();
  }
};
</script>
<style scoped>
.page {
  background: linear-gradient(to bottom, #d6e8ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}

.online-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 10px 10px 10px;
  font-weight: bold;
}

/* 健康自测 */
.self-test {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.sele-test-top {
  display: flex;
  justify-content: space-between;
}

.sele-test-flex {
  width: calc(50% - 10px * 2);
  margin: 10px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  height: 152px;
}

.sele-test-one {
  width: 100%;
}

.sele-test-back {
  background-color: #ffffff;
  box-shadow: #f7f7f7 0px 0px 20px 10px;
}

.top-lable {
  color: #a6abb0;
  padding-left: 10px;
}

.top-img {
  width: 46%;
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
}

.bottom-img {
  width: 135px !important;
}

.self-test text {
  display: block;
}

.sele-test-view {
  position: absolute;
  left: 20px;
  top: 35px;
}

.top-people {
  display: flex;
  align-items: baseline;
  padding-top: 10px;
}

.top-title {
  padding: 10px;
  font-size: 20px;
}

.top-num {
  font-size: 20px;
  padding-left: 10px;
}

.top-min {
  font-size: 15px;
}

.prohibit {
  pointer-events: none;
}
</style>