<template>
  <div class="page">
    <CpnavbarVue title="在线医生" />
    <div class="header-container">
      <div class="dept_sub">
        <div class="text" @click="showDeptSubPickerHandler">{{ deptSub }}</div>
        <el-icon><CaretBottom /></el-icon>
      </div>
      <div class="job">
        <div class="text" @click="showJobPickerHandler">{{ job }}</div>
        <el-icon><CaretBottom /></el-icon>
      </div>
    </div>
    <div class="doctor-container">
      <div class="doctor" v-for="one in doctor">
        <el-avatar :src="one.photo" size="45"></el-avatar>
        <div class="info">
          <div class="row">
            <div class="name">{{ one.name }}</div>
            <div class="job">{{ one.job }}</div>
            <el-button
              class="btn"
              @click="goChat(one.doctorId)"
              >问诊</el-button
            >
          </div>
          <div class="row">
            <div class="remark">{{ one.remark }}</div>
          </div>
          <div class="row">
            <rich-text class="desc">{{ one.description }}</rich-text>
          </div>
        </div>
      </div>
      <div v-if="doctor.length == 0">
        <van-empty
          mode="search"
          icon="http://cdn.uviewui.com/uview/empty/search.png"
          description="没有搜索结果"
        ></van-empty>
      </div>
    </div>
    <van-picker
      v-show="showDeptSubPicker"
      ref="DeptSubPicker"
      :columns="deptSubColumns"
      @confirm="confirmDeptSub"
      @change="changeDeptSub"
      @cancel="cancelDeptSub"
    ></van-picker>

    <van-picker
      v-show="showJobPicker"
      ref="JobPicker"
      :columns="jobColumns"
      @confirm="confirmJob"
      @cancel="cancelJob"
    ></van-picker>
  </div>
</template>

<script>
import { dayjs} from 'element-plus';
import CpnavbarVue from "../../components/Cpnavbar.vue";
export default {
  components: { CpnavbarVue },
  data() {
    return {
      deptSub: "全部诊室",
      showDeptSubPicker: false,
      deptSubColumns: [],
      deptSubColumnData: [],
      outTradeNo:'',
      price:'',
      job: "全部医师",
      showJobPicker: false,
      jobColumns: [
        { text: "全部医师", value: "全部医师" },
        { text: "主任医师", value: "主任医师" },
        { text: "副主任医师", value: "副主任医师" },
        { text: "主治医师", value: "主治医师" },
        { text: "副主治医师", value: "副主治医师" },
      ],
      doctor: [],
    };
  },
  methods: {
    //科室/诊室列表
    loadDeptAndSub: function () {
      let that = this;
      that.$http(
        "/medical/dept/searchDeptAndSub",
        "get",
        {},
        false,
        function (res) {
          console.log("科室/诊室列表数据", res);
          let result = res.result;
          let arr = [];
          for (let one in result) {
            let array = [];
            for (let sub of result[one]) {
              array.push({
                value: sub.subName,
                text: sub.subName,
              });
            }
            arr.push({
              value: one,
              text: one,
              children: array,
            });
          }
          that.deptSubColumns = arr;
          console.log(that.deptSubColumns);
        }
      );
    },
    //上线医生列表
    loadOnlineDoctorList: function () {
      let that = this;
      let data = {
        subName: that.deptSub == "全部诊室" ? null : that.deptSub,
        job: that.job == "全部医师" ? null : that.job,
      };
      that.$http(
        "/isOnline/searchOnlineDoctorList",
        "post",
        data,
        false,
        function (res) {
          console.log("上线医师数据", res);
          let result = res.result;
          for (let one of result) {
            one.photo = `${that.$minioUrl}/${one.photo}`;
            one.price = one.price + "元";
          }
          that.doctor = result;
        }
      );
    },
    //显示科室/诊室picker弹窗
    showDeptSubPickerHandler: function () {
      this.showDeptSubPicker = true;
    },
    changeDeptSub: function (e) {
      console.log(e);
      const {
        columnIndex,
        value,
        values,
        index,
        picker = this.$refs.DeptSubPicker,
      } = e;
      //当第一个值发生变化时，变化第二列对应的选项
      // if(columnIndex===0){
      // 	this.$refs.DeptSubPicker.setColumnValues(1,this.deptSubColumnData[index]);
      // }
    },
    //用户选择诊室之后，查询该诊室的在线医生
    confirmDeptSub: function (e) {
      console.log("点击诊室之后在线医生信息", e);
      this.showDeptSubPicker = false;
      this.deptSub = e.selectedValues[1];
      this.loadOnlineDoctorList();
    },
    //点击弹窗左上角的取消按钮
    cancelDeptSub: function () {
      this.showDeptSubPicker = false;
    },
    //显示Picker弹窗
    showJobPickerHandler: function () {
      this.showJobPicker = true;
    },
    confirmJob: function (e) {
      this.showJobPicker = false;
      this.job = e.selectedValues[0];
      this.loadOnlineDoctorList();
    },
    cancelJob: function () {
      this.showJobPicker = false;
    },
    goChat(doctorId) {
      this.$router.push({
        path:'/chat',
        query:{doctorId}
      })
    }
  },
  mounted: function () {
    this.loadDeptAndSub();
    this.loadOnlineDoctorList();
  },
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
  font-family: @ff-1;
  background-color: @bgc-1;
  height: 100%;
}
.header-container {
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .dept_sub,
  .job,
  .filter {
    display: flex;
    .text {
      font-size: 16px;
      margin-right: 10px;
    }
    .el-icon {
      line-height: 10px;
    }
  }
}
.doctor-container {
  padding: 14px;
  overflow: auto;
  height: 80%;
  .doctor {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .photo {
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }
    .info {
      width: 280px;
      .row {
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 20px;
          font-weight: bold;
          color: @fc-1;
        }
        .job {
          font-size: 18px;
          color: @fc-1;
          margin-top: 4px;
          display: block;
          font-weight: bold;
        }
        .btn {
          margin: 0;
          height: 32px;
          width: 65px;
          font-size: 14px;
          line-height: 28px;
          background-color: @btnc-6;
          color: #fff;
          border-radius: 20px;
          &::after {
            border: none;
          }
          &:active {
            background-color: @btnac-6;
          }
        }
        .remark {
          font-size: 18px;
          color: @fc-1;
          margin-top: 5px;
        }
        .desc {
          font-size: 14px;
          color: @fc-3;
          margin-top: 6px;
          line-height: 1.6;
        }
        .price {
          color: @fc-10;
          font-size: 36px;
          font-weight: bold;
        }
        .minute {
          font-size: 28px;
          color: @fc-3;
        }
        &:last-child {
          margin-top: 10px;
        }
      }
    }
  }
}
.van-picker {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
