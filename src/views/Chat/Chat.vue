<template>
	<div class="page">
    <cpnavbar title="我的好友"/>
		<div class="content" >
			<div class="msg-list infinite-list" style="overflow: auto">
				<div class="row">
					<!-- 用户消息 -->
					<div v-for="item in msgList" :key="item.id">
						<!-- 自己发出的消息 -->
						<div class="my" v-if="item.senderId==userId">
							<!-- 左-消息 -->
							<div class="left">
								<!-- 文字消息 -->
								<div class="bubble">
									<span>{{item.content}}</span>
								</div>
							</div>
							<!-- 右-头像 -->
							<div class="right">
								<img @click="toUserInfo" src="../../assets/imgs/right.jpg">
							</div>
						</div>
						<!-- 别人发出的消息 -->
						<div class="other" v-else>
							<!-- 左-头像 -->
							<div class="left">
								<img src="../../assets/imgs/left.jpg">
							</div>
							<!-- 右-用户名称-时间-消息 -->
							<div class="right">
								<div class="username">
									<div class="name">{{name}}</div>
									<div class="time">{{formatTime(item.createTime)}}</div>
								</div>
								<!-- 文字消息 -->
								<div class="bubble">
									<rich-text>{{item.content}}</rich-text>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 底部输入栏 -->
		<div class="input-box">
			<div class="textbox">
				<div class="text-mode">
					<el-input auto-height="true" v-model="textMsg"/>
				</div>
			</div>
			<!-- #endif -->
			<div class="send"><div class="btn" @click="sendText">发送</div></div>
		</div>
	</div>
</template>
<script>
import Cpnavbar from '../../components/Cpnavbar.vue';
import {formatTime} from '../../utils/formDate'
export default {
  components: { Cpnavbar },
	data() {
		return {
			formatTime:formatTime,
			key: '0',
			userId: localStorage.getItem("userId"),
			doctorId:'3',
			websock: null,
			name:'',
			//文字消息
			textMsg: '',
			//消息列表
			isHistoryLoading: false,
			scrollAnimation: false,
			scrollTop: 0,
			scrollTodiv: '',
			msgList: [],
			msgImgList: [],
			myuid: 0,
			isVoice: false,
			voiceTis: '按住 说话',
			recordTis: '手指上滑 取消发送',
			recording: false,
			willStop: false,
			initPoint: {
				identifier: 0,
				Y: 0
			},
			recordTimer: null,
			recordLength: 0,

			//播放语音相关参数
			// AUDIO: uni.createInnerAudioContext(),
			playMsgid: null,
			VoiceTimer: null,
			// 抽屉参数
			popupLayerClass: '',
			// more参数
			hideMore: true,
			//表情定义
			hideEmoji: true,
			emojiList: '',
			onlineEmoji: '',
			//红包相关参数
			windowsState: '',
			redenvelopeData: {
				rid: null, //红包ID
				from: null,
				face: null,
				blessing: null,
				money: null
			},
			taskUserInfo: {
				userName: '',
				headImg: ''
			},
			isGroup: false
		};
	},

	created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
	methods: {
		//发送消息
	  sendText(){
       console.log('点击发送:', this.textMsg);
	   const message = {
			senderId: this.userId,
			receiverId: this.doctorId,
			content: this.textMsg,
	   }
	    this.websocketsend(JSON.stringify(message));
		this.textMsg=''
	  },
      initWebSocket(){ //初始化weosocket
        const wsuri = `ws://47.108.146.141:8095/hospital-api/chat?token=${this.userId}`;
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        let actions = {"test":"12345"};
        // this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        const redata = JSON.parse(e.data);
		console.log('接收到数据: ', redata);

		this.msgList.push(redata)

      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
    },
	mounted(){
		let {userId,name}=this.$route.query;
        this.doctorId=userId;
		this.name=name;
	}
};
</script>
<style lang="scss" scoped>
@import './style.scss';
.el-input__inner {
    border: 0;
  }
</style>
