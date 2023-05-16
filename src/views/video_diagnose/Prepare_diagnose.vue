<template>
  <div class="page">
    <CpnavbarVue title="候诊室" />
    <div class="main-container">
      <div class="countdown">
        <van-count-down
          :time="time"
          format="yyyy-MM-dd HH:mm:ss"
          autoStart
          @change="onChange"
        >
          <div class="time">
            <span class="desc">距离问诊{{ startOrEnd }}</span>
            <span :class="startOrEnd == '结束' ? 'minute red' : 'minute'">{{
              timeData.minutes
            }}</span>
            <span class="unit">分</span>
            <span :class="startOrEnd == '结束' ? 'second red' : 'second'">{{
              timeData.seconds
            }}</span>
            <span class="unit">秒</span>
          </div>
        </van-count-down>
      </div>
      <div class="title">请上传诊断材料</div>
      <div class="files">
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          @delete="deleteImage"
          multiple
          :max-size="2 * 1024 * 1024"
          :max-count="20"
          :previewFullImage="true"
        ></van-uploader>
      </div>
      <div class="operate">
        <div class="btn red" @click="deleteAllImageHandle">清空诊断材料</div>
        <div :class="enableBtn ? 'btn green' : 'btn gray'" @click="enterHandle">
          进入问诊室
        </div>
      </div>
    </div>
    <div class="desc-container">
      <div class="title">视频问诊说明</div>
      <div class="desc">
        <span class="num">1.</span>
        <span>
          在视频问诊之前以先上传相关的诊断材料照片，但是最多不能超过20张照片，而且每张照片不能超过2M体积。
        </span>
      </div>
      <div class="desc">
        <span class="num">2.</span>
        <span>
          视频问诊开始的时候，您可以点击【进入问诊室】按钮开始视频问诊。在视频问诊开始之前，请耐心等待。
        </span>
      </div>
      <div class="desc">
        <span class="num">3.</span>
        <span>
          建议您的手机连接WIFI网络，以保证最佳问诊质量。在问诊期间不要随便走动，避免网络信号波动，影响问诊音视频质量。
        </span>
      </div>
      <div class="desc">
        <span class="num">4.</span>
        <span>
          视频问诊仅作为初步诊断，存在误诊几率，不能以此当做准确诊断。建议您结合线下门诊的诊断结果及时就医。
        </span>
      </div>
      <div class="desc">
        <span class="num">5.</span>
        <span>
          如果遇到医疗系统技术故障或者其他不可抗力因素，无法进行视频问诊。请拨打【800-12388】客户热线，联系客服人员予以解决或者退款。
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { dayjs} from 'element-plus';
import CpnavbarVue from "../../components/Cpnavbar.vue";
import axios from "axios";
export default {
  components: { CpnavbarVue },
  data() {
    return {
      token: localStorage.getItem("tokens"),
      videoDiagnoseId: null,
      expectStart: null,
      expectEnd: null,
      //查询医生上线缓存中的RoomId需要使用doctorId
      doctorId: null,
      startOrEnd: "开始",
      enableBtn: false,
      //倒计时的时间对象
      time: null,
      timeData: {},
      //文件列表
      fileList: [],
    };
  },
  methods: {
    afterRead: function (file) {
      let that = this;
      //如果倒计时结束后者问诊已经开始就不能上传照片了
      // if(that.time<=0 && that.startOrEnd=='结束'){
      // 	return;
      // }
      let lists = file;
      let fileListLen = 0;
      lists.map((item, index) => {
        that.fileList[index].item = { ...item };
        that.fileList[index].status = "uploading";
        that.fileList[index].message = "上传中";

        console.log(this.fileList);
      });
      let data = new FormData();
      for (let i = 0; i < lists.length; i++) {
        let file = lists[i].file;
        data.append("file", file);
        data.append("videoDiagnoseId", that.videoDiagnoseId);
        axios
          .post(`${that.$baseUrl}/video_diagnose/uploadImg`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              toekn: that.token,
            },
          })
          .then((res) => {
            let filename = res.data.result;
            let item = that.fileList[fileListLen];
            item["status"] = "success";
            item["filename"] = filename;
            item["message"] = "上传成功";
            fileListLen++;
          });
      }
    },
    deleteImage: function (event) {
      let that = this;
      //倒计时结束或者问诊开始，则无法删除照片
      //   if(that.time<=0 || that.startOrEnd=='结束'){
      // 	return;
      //   }
      let filename = event.filename;
      let data = {
        videoDiagnoseId: that.videoDiagnoseId,
        filename: filename,
      };
      that.$http(
        "/video_diagnose/deleteImage",
        "post",
        data,
        true,
        function (res) {
          if (res.code == 200) {
            ElMessage({
              message: "删除成功",
              type: "success",
            });
          } else {
            ElMessage({
              message: "删除失败",
              type: "error",
            });
          }
        }
      );
    },
    //清除所有上传照片
    deleteAllImageHandle: function () {
      let that = this;
      //倒计时结束或者问诊开始，则无法删除照片
      //   if(that.time<=0 || that.startOrEnd=='结束'){
      // 	return;
      //   }
      ElMessageBox.confirm("确定删除所有上传文件？", "提示信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.$http(
            "/video_diagnose/deleteImage",
            "post",
            { videoDiagnoseId: this.videoDiagnoseId },
            true,
            function (res) {
              if (res.code == 200) {
                ElMessage({
                  type: "success",
                  message: "图片删除成功",
                });
                that.fileList.length = 0;
              } else {
                ElMessage({
                  type: "error",
                  message: "图片删除失败",
                });
              }
            }
          );
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "图片删除失败",
          });
        });
    },
    //实现倒计时功能
    onChange: function (e) {
      //当前倒计时的分钟数字
      let minutes = e.minutes;
      //当前倒计时的秒钟数字
      let seconds = e.seconds;
      if (minutes == 0 && seconds == 0) {
        //如果到了问诊开始时间
        if (this.startOrEnd == "开始") {
          this.startOrEnd = "结束";
          this.enableBtn = true;
          this.time = dayjs(this.expectEnd).valueOf() - new Date().getTime();
          ElMessage({
            type: "info",
            message: "请进入问诊室",
            duration: 2000,
          });
        } /*
				可能在问诊中，患者手机突然没电了，重新进入候诊页面，可能视频问诊已经过了结束时间，所以不能进入视频问诊界面
			*/ else {
          //不允许点击按钮进入问诊页面
          this.enableBtn = false;
          ElMessage({
            type: "none",
            message: "问诊已结束",
            duration: 2000,
          });
        }
      }
      //e.minutes = minutes < 10 ? "0" + minutes : minutes;
      //e.seconds = seconds < 10 ? "0" + seconds : seconds;
      if (minutes < 10) {
        e.minutes = "0" + minutes;
      }
      if (seconds < 10) {
        e.seconds = "0" + seconds;
      }
      this.timeData = e;
    },
    enterHandle: function () {
      console.log(1)
      let that = this;
      if (!that.enableBtn) {
        return;
      }
      let data = {
        doctorId: that.doctorId,
      };
      //查询RoomId
      that.$http(
        "/video_diagnose/searchRoomId",
        "post",
        data,
        true,
        function (res) {
          let roomId = res.result;
          if (roomId != null) {
            //查询TRTC的相关数据
            that.$http(
              "/video_diagnose/searchUserSig",
              "get",
              null,
              true,
              function (res) {
                let userId = res.userId;
                let userSig = res.userSig;
                that.$router.push({
                  path: "/video_diagnose",
                  query: {
                    roomId: roomId,
                    userId: userId,
                    userSig: userSig,
                    expectEnd: that.expectEnd,
                  },
                });
              }
            );
          }
        }
      );
    },
  },
  mounted: function () {
    let that = this;
    const { videoDiagnoseId, expectStart, expectEnd, doctorId } =
      this.$route.query;
    that.videoDiagnoseId = videoDiagnoseId;
    that.expectStart = expectStart;
    that.expectEnd = expectEnd;
    that.doctorId = doctorId;

    //计算开始时间与当前时间的时间差（时间戳毫秒时间）
    let time = dayjs(that.expectStart).valueOf() - new Date().getTime();
    //开始时间晚于当前时间
    if (time > 0) {
      that.startOrEnd = "开始";
      that.enableBtn = false;
    } else {
      time = dayjs(that.expectEnd).valueOf - new Date().getTime();
      that.startOrEnd = "结束";
      that.enableBtn = true;
    }
    //把时间差保存到模型层上
    that.time = time;

    let data = {
      videoDiagnoseId: that.videoDiagnoseId,
    };
    that.$http(
      "/video_diagnose/searchImageByVideoDiagnoseId",
      "post",
      data,
      true,
      function (res) {
        let result = res.result;
        for (let one of result) {
          that.fileList.push({
            filename: one.filename,
            thumb: `${that.$minioUrl}/${one.path}`,
            url: `${that.$minioUrl}/${one.path}`,
            type: "image",
          });
        }
      }
    );
  },
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
  font-family: @ff-1;
  background-color: @bgc-1;
  padding: 0px;
  width: 100%;
  height: 100%;
}
.main-container {
  border-bottom: 1px solid #eee;
  .countdown {
    .time {
      display: flex;
      padding: 30px 7px;
      border-bottom: solid 20px @bc-1;
      .desc {
        font-weight: bold;
        color: @fc-2;
        font-size: 23px;
        margin-top: 20px;
        margin-right: 15px;
        align-content: center;
      }
      .minute,
      .second {
        display: block;
        background-color: @bgc-25;
        padding: 15px 10px;
        color: #fff;
        line-height: 1;
        font-size: 13px;
        border-radius: 10px;
        font-weight: bold;
      }
      .unit {
        font-size: 23px;
        margin-left: 15px;
        margin-right: 15px;
        font-weight: bold;
        color: @fc-2;
        margin-top: 20px;
      }
      .red {
        background-color: #f56c6c;
      }
    }
  }
  .title {
    font-size: 23px;
    font-weight: bold;
    color: @fc-2;
    padding: 20px;
  }
  .files {
    padding: 0 40px;
  }
  .operate {
    display: flex;
    margin-top: 30px;
    padding: 0 20px;
    .btn {
      flex-grow: 1;
      color: #fff;
      font-size: 20px;
      margin: 0;
      padding: 5px 0;
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
    .red {
      margin-right: 30px;
      background-color: @btnc-3;
      &:active {
        background-color: @btnac-3;
      }
    }
    .gray {
      background-color: @btnc-8;
    }
  }
}
.desc-container {
  padding: 0 25px;
  margin-top: 60px;
  background-color: #ffffff;
  .title {
    font-size: 20px;
    font-weight: bold;
    color: @fc-2;
    padding: 15px;
  }
  .desc {
    display: flex;
    margin-top: 10px;
    .num {
      margin-right: 10px;
    }
    span {
      font-size: 14px;
      color: @fc-3;
      line-height: 1.7;
    }
  }
}
</style>
