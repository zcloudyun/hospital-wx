<template>
  <CpnavbarVue title="就诊评价" />
  <div class="page_pingjia2">
    <div class="zhuti">
      <div class="heti">
        <div class="name" style="font-size: 16px; font-weight: 600">
          e医相伴
        </div>
        <div style="display: flex; margin-top: 15px">
          <div class="miaoshu" style="font-size: 14px">总体评价</div>
          <div class="xx">
            <el-rate
              v-model="rate.totalValue"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
      </div>
    </div>
    <div class="dianping">
      <div style="border-bottom: 1px solid #eee; padding: 12px">
        <div class="score">
          <div class="taidu">就医环境:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score1"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">医生专业技术:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score2"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">医务人员态度:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score3"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">预约便捷能力:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score4"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">诊区导医态度:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score5"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">挂号等候时间:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score6"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">收费等候时间:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score7"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">候诊等候时间:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score8"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">检查等候时间:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score9"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
        <div class="score">
          <div class="taidu">取药等候时间:</div>
          <div style="margin-left: 20px">
            <el-rate
              v-model="rate.score10"
              :texts="['非常不满意', '不满意', '基本满意', '满意', '非常满意']"
              show-text
              clearable
            />
          </div>
        </div>
      </div>
      <div class="kuang">
        <textarea
          class="textarea"
          v-model="rate.evaluateText"
          placeholder="请输入亲的评价"
        >
        </textarea>
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
      <div style="display: flex;width:100%">
        <el-button type="info" plain @click="deleteAllImageHandle"
          >清空图片</el-button
        >
        <el-button type="primary" plain @click="onCommit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"; //引入axios
import CpnavbarVue from "../../components/Cpnavbar.vue";
export default {
  components: { CpnavbarVue },
  data() {
    return {
      fileList: [],
      registrationId: "",
      token: localStorage.getItem("tokens"),
      rate: {
        registrationId: "",
        totalValue: "",
        evaluateText: "",
        score1: "",
        score2: "",
        score3: "",
        score4: "",
        score5: "",
        score6: "",
        score7: "",
        score8: "",
        score9: "",
        score10: "",
      },
    };
  },
  methods: {
    afterRead: function (file) {
      console.log(file);
      let that = this;
      let lists = file;
      let fileListLen = 0;
      if (lists instanceof Array) {
        lists.map((item, index) => {
          that.fileList[index].item = { ...item };
          that.fileList[index].status = "uploading";
          that.fileList[index].message = "上传中";
        });
        let data = new FormData();
        for (let i = 0; i < lists.length; i++) {
        let file = lists[i].file;
        data.append("file", file);
        data.append("registrationId", that.registrationId);
        axios.post(`${that.$baseUrl}/rate_file/uploadImg`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              toekn: that.token,
            },
          })
          .then((res) => {
            console.log(res);
            let filename = res.data.result;
            let item = that.fileList[fileListLen];
            item["status"] = "success";
            item["filename"] = filename;
            item["message"] = "上传成功";
            fileListLen++;
          });
       }
      }else{
        let data = new FormData();
        data.append("file", file.file);
        data.append("registrationId", that.registrationId);
        axios.post(`${that.$baseUrl}/rate_file/uploadImg`, data, {
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
      let filename = event.filename;
      let data = {
        registrationId: that.registrationId,
        filename: filename,
      };
      that.$http("/rate_file/deleteImage", "post", data, true, function (res) {
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
      });
    },
    //清除所有上传照片
    deleteAllImageHandle: function () {
      let that = this;
      ElMessageBox.confirm("确定删除所有上传文件？", "提示信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.$http(
            "/rate_file/deleteImage",
            "post",
            { registrationId: that.registrationId },
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
    onCommit() {
      let that = this;
      if (that.rate.evaluateText != "" && that.rate.totalValue != 0) {
        ElMessageBox.confirm("确认提交评价吗?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let data = { ...that.rate };
            that.$http("/rate/insert", "post", data, true, function (res) {
              if (res.code == 200) {
                ElMessage({
                  type: "success",
                  message: res.msg,
                });
                that.$router.push({
                  path: "/evaluate_list",
                });
              }
            });
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "取消评论",
            });
          });
      } else {
        ElMessage({
          message: "请输入你的评论/总体评价不能为空",
          type: "warning",
        });
      }
    },
  },
  mounted() {
    const { registrationId } = this.$route.query;
    this.rate.registrationId = registrationId;
    this.registrationId = registrationId;
  },
};
</script>

<style lang="scss" scoped>
$abc: #ffffff;
.page_pingjia2 {
  height: 100vh;
  width: 100vw;
  background-color: #f4f4f6;
  .pingjia2 {
    color: $abc;
  }
  .xx {
    margin-left: 5px;
    padding: 5px;
  }
  .taidu {
    font-size: 13px;
  }
  .kuang {
    padding-top: 20px;
    width: 95%;
    padding-left: 10px;
  }
  .dianping {
    margin-top: 8px;
    height: 90vh;
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
.textarea {
  width: 90vw;
  height: 10vh;
  border: 0;
  outline: none;
  font-size: 13px;
  color: black;
}
.el-rate {
  font-size: 14px;
  height: 18px;
}
.el-button {
  margin: 10px;
}

.el-dialog {
  width: 70%;
}
.score {
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
