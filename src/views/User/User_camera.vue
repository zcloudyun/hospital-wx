<template>
  <h3 class="section-title">人脸识别</h3>
  <div class="camera">
    <!--图片展示-->
    <video ref="video" class="img"></video>
    <!--canvas截取流-->
    <canvas ref="canvas" class="img"></canvas>
    <!--确认-->
    <div class="desc">
      <block v-if="mode == 'verificate'">
        <div class="text">请把面部放在圆圈内</div>
        <div class="text">拍摄脸部来确认身份</div>
      </block>
      <block v-if="mode == 'create'">
        <div class="text">请把完整面部放在圆圈内</div>
        <div class="text">拍摄脸部来保存身份识别数据</div>
      </block>
    </div>
    <el-button type="primary" @click="photograph">
      {{ mode == "create" ? "录入面部信息" : "身份核实" }}
    </el-button>
  </div>
</template>   
<script>
export default {
  data() {
    return {
      headImgSrc: "",
      mode: 'verificate',
      photoPath: '',
    };
  },
  methods: {
    // 调用摄像头
    callCamera() {
      // H5调用电脑摄像头API
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((success) => {
          // 摄像头开启成功
          this.$refs["video"].srcObject = success;
          // 实时拍照效果
          this.$refs["video"].play();
        })
        .catch((error) => {
          console.error("摄像头开启失败，请检查摄像头是否可用！");
        });
    },
    // 拍照
    photograph() {
      let that=this
      let ctx = this.$refs["canvas"].getContext("2d");
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs["video"], 0, 0, 300, 200);
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.92);

      // 由字节转换为KB 判断大小
      let str = imgBase64.replace("data:image/jpeg;base64,", "");
      let strLength = str.length;
      let fileLength = parseInt(strLength - (strLength / 8) * 2);
      // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2);
      console.log(size);

      // 上传拍照信息  调用接口上传图片 .........
      let url=null;
      if(that.mode=='create'){
        //创建患者面部模型档案
        url='/face/auth/createFaceModel';
      }else{
        //验证患者面部模型
        url='/face/auth/verifyFaceModel';
      }
      //提交ajax请求，上传照片Bae64字符串
      that.$http(url,'post',{photo:str},true,function(res){
        console.log('提交照片返回的数据',res)
        if(that.mode=='create'){
          if(res.msg=='success'){
            ElMessage({
              message: '模型录入成功',
              type: 'success',
            })
            //跳转到上一页
            that.$router.go(-1);
          }else{
            ElMessage({
              message: '模型录入失败',
              type: 'error',
            })
          }
        }else{
          //判断人脸识别结果
          if(res.result){
            ElMessage({
              message: '面部验证成功',
              type: 'success',
            })
            that.$router.go(-1);
          }else{
            ElMessage({
              message: '面部验证失败',
              type: 'error',
            })
          }
        }
      })
    },
    // 关闭摄像头
    closeCamera() {
      if (!this.$refs["video"].srcObject) {
        this.dialogCamera = false;
        return;
      }
      let stream = this.$refs["video"].srcObject;
      let tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.$refs["video"].srcObject = null;
    },
  },
  mounted: function () {
    let {mode}=this.$route.params
    this.mode=mode;
    this.callCamera();
  },
};
</script>
<style lang="less" scoped>
h3 {
  margin: 0;
  height: 30px;
}
.section-title {
  color: #000;
  text-align: center;
  line-height: 48px;
  width: 100%;
  height: 8%;
  background-color: #cbcccd;
}
.img{
  width: 300px;
  height: 200px;
  border-radius: 107px;
  margin: 1px 37px;
  border: 10px solid rgb(156, 229, 244);
}
.el-button {
  width: 80%;
  height: 44px;  
  margin-left: 40px;
}
.text{
  text-align: center;
  font-size: 12px;
  color: rgb(19, 149, 249);
}
.camera{
  height: 100%;
  width: 100%;
  min-height: 100vh;
  background-image: url('../../assets/face.jpg');
  background-size: 100% 100%;
}
</style>