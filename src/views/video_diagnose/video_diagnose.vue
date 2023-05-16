<template>
  <div class="main">
    <div class="sidebar">
      <div id="localVideo">
        <div >
          <img src="../assets/trtc/camera.png" class="camera" />
          <p>本地摄像头画面</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dayjs} from 'element-plus';
export default {
  data() {
    return {
      trtcConfig: {
        sdkAppID: this.$tencent.trtc.appid,
        userID: null, // 用户唯一标识符
        userSig: null,
        template: "grid", // 画面排版模式
      },
      roomId: null,
      expectEnd: null,
    };
  },
  methods: {},
  mounted() {
    let that = this;
    const { roomId, userId, userSig, expectEnd } = that.$route.query;
	that.roomId=roomId;
	that.trtcConfig.userID=userId;
	that.trtcConfig.userSig=userSig;
	that.expectEnd=expectEnd;
    // 查找视图层的TRTC标签
    let trtcRoomContext = that.selectComponent("#localVideo");
    //创建定时器，用于问诊结束的时候自动关闭TRTC视频通讯
    let timer = setInterval(function () {
      let now = new Date().getTime();
      let expectEnd = dayjs(that.expectEnd).valueOf();
      //判断是不是到了结束时间
      if (now >= expectEnd) {
        //结束TRTC通讯
        that.trtcRoomContext
          .exitRoom()
          .then(() => {
            console.log("退出问诊");
          })
          .catch((res) => {
            console.error("退出问诊失败", res);
          });
		  //销毁定时器
		  clearInterval(timer);
      }
    },1000);
	that.$nextTick(()=>{
		that.trtcRoomContext.enterRoom({roomId:that.roomId}).then(()=>{
			console.log("成功进入问诊室");
		}).catch(res=>{
			console.error("进入问诊室失败:",res);
		})
	})
	//获取TRTC事件常量合集
	let EVENT=trtcRoomContext.EVENT;
	//如果找到视图层TRTC标签
	if(trtcRoomContext){
		//监听是否进入TRTC的ROOM
		trtcRoomContext.on(EVENT.LOCAL_JOIN,event=>{
			//把本地音视频视频流向远端推送
			trtcRoomContext.publishLoacalVideo();
			trtcRoomContext.publishLoacalAudio();
		})
		//监听远端推送来的视频流
		trtcRoomContext.on(EVENT.REMOTE_CIDEO_ADD,event=>{
           let userID=event.data.userID;
		   let streamType=event.data.streamType;
		   //订阅远端推送来的音频流
		   trtcRoomContext.subscribeRemoteVideo({userID:userID,streamType:streamType})
		})
		//监听远端推送来的音频流
		trtcRoomContext.on(EVENT.REMOTE_AUDIO_ADD,event=>{
			let userID=event.data.userID;
			//订阅远端的音频流
			trtcRoomContext.subscribeRemoteAudio({userID:userID})
		})
	}
	//把初始好的TRTC对象保存在模型层
	that.trtcRoomContext=trtcRoomContext;
  },
  
};
</script>

<style lang="less" scoped>

</style>
