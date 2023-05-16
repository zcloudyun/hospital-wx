<template>
    <div class="page">
		<div class="navigator-container">
			<van-grid :border="false" col="4">
				<van-grid-item name="实名登记" to="/user_info">
					<div class="navigator-icon"><div class="navigator-icon-1" /></div>
					<div class="title">实名绑卡</div>
				</van-grid-item>
				<van-grid-item name="智能导诊" to="/guide">
					<div class="navigator-icon"><div class="navigator-icon-2" /></div>
					<div class="title">智能导诊</div>
				</van-grid-item>
				<van-grid-item name="检查报告" to="/record_list">
					<div class="navigator-icon"><div class="navigator-icon-3" /></div>
					<div class="title">我的病历</div>
				</van-grid-item>
				<van-grid-item name="电子处方" to="/prescription_list">
					<div class="navigator-icon"><div class="navigator-icon-4" /></div>
					<div class="title">我的处方</div>
				</van-grid-item>
			</van-grid>
		</div>
		<div class="mine-container">
			<div class="title-row">
				<div class="title">我的问诊</div>
				<u-icon label="更多" labelPos="left" size="15" name="arrow-right"></u-icon>
			</div>
			<div class="content">
				<van-grid :border="false" col="5">
					<van-grid-item name="预约挂号" to="/notice">
						<img :src="img['service-icon-1']" mode="widthFix" class="navigator-icon">
						<div class="title">预约挂号</div>
					</van-grid-item>
					<van-grid-item name="我的挂号" to="/order">
						<img :src="img['service-icon-3']" mode="widthFix" class="navigator-icon">
						<div class="title">我的订单</div>
					</van-grid-item>
					<van-grid-item name="检查报告" to="/inspect_list">
						<img :src="img['service-icon-7']" mode="widthFix" class="navigator-icon">
						<div class="title">检查报告</div>
					</van-grid-item>
					<van-grid-item name="在线询医" to="/order_list">
						<img :src="img['service-icon-11']" mode="widthFix" class="navigator-icon">
						<div class="title">在线询医</div>
					</van-grid-item>
				</van-grid>
				<img :src="otherBannerUrl" mode="widthFix" class="banner">
			</div>
		</div>
		<div class="ad-container">
            <van-swipe :autoplay="3000" indicator-color="white" loop>
                <van-swipe-item v-for="one in adBannerUrl" :key="one">
                    <img :src="one" class="banner"/>
                </van-swipe-item>
            </van-swipe>
        </div>
		<div class="service-container">
			<div class="title-row">
				<div class="title">医疗服务</div>
				<u-icon label="更多" labelPos="left" size="15" name="arrow-right"></u-icon>
			</div>
			<div class="content">
				<van-grid :border="false" col="5">
					<van-grid-item name="在线评价" to="/evaluate_list">
						<img :src="img['service-icon-2']" mode="widthFix" class="navigator-icon">
						<div class="title">评价列表</div>
					</van-grid-item>
					<van-grid-item name="健康自测" to="/home">
						<img :src="img['service-icon-15']" mode="widthFix" class="navigator-icon">
						<div class="title">健康自测</div>
					</van-grid-item>
				</van-grid>
			</div>
		</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            img: {
				'mine-icon-1': `${this.$minioUrl}/patient-wx/page/mine/mine-icon-1.png`,
				'mine-icon-2': `${this.$minioUrl}/patient-wx/page/mine/mine-icon-2.png`,
				'mine-icon-3': `${this.$minioUrl}/patient-wx/page/mine/mine-icon-3.png`,
				'mine-icon-4': `${this.$minioUrl}/patient-wx/page/mine/mine-icon-4.png`,
				'mine-icon-5': `${this.$minioUrl}/patient-wx/page/mine/mine-icon-5.png`,
				'navigator-icon-1':`${this.$minioUrl}/patient-wx/page/mine/navigator-icon-1.png`,
				'navigator-icon-2':`${this.$minioUrl}/patient-wx/page/mine/navigator-icon-2.png`,
				'navigator-icon-3':`${this.$minioUrl}/patient-wx/page/mine/navigator-icon-3.png`,
				'navigator-icon-4':`${this.$minioUrl}/patient-wx/page/mine/navigator-icon-4.png`,
				'service-icon-1': `${this.$minioUrl}/patient-wx/page/mine/service-icon-1.png`,
				'service-icon-2': `${this.$minioUrl}/patient-wx/page/mine/service-icon-2.png`,
				'service-icon-3': `${this.$minioUrl}/patient-wx/page/mine/service-icon-3.png`,
				'service-icon-4': `${this.$minioUrl}/patient-wx/page/mine/service-icon-4.png`,
				'service-icon-5': `${this.$minioUrl}/patient-wx/page/mine/service-icon-5.png`,
				'service-icon-6': `${this.$minioUrl}/patient-wx/page/mine/service-icon-6.png`,
				'service-icon-7': `${this.$minioUrl}/patient-wx/page/mine/service-icon-7.png`,
				'service-icon-8': `${this.$minioUrl}/patient-wx/page/mine/service-icon-8.png`,
				'service-icon-9': `${this.$minioUrl}/patient-wx/page/mine/service-icon-9.png`,
				'service-icon-10': `${this.$minioUrl}/patient-wx/page/mine/service-icon-10.png`,
				'service-icon-11': `${this.$minioUrl}/patient-wx/page/mine/service-icon-11.png`,
				'service-icon-12': `${this.$minioUrl}/patient-wx/page/mine/service-icon-12.png`,
				'service-icon-13': `${this.$minioUrl}/patient-wx/page/mine/service-icon-13.png`,
				'service-icon-14': `${this.$minioUrl}/patient-wx/page/mine/service-icon-14.png`,
				'service-icon-15': `${this.$minioUrl}/patient-wx/page/mine/service-icon-15.png`
			},
			otherBannerUrl: `${this.$minioUrl}/patient-wx/banner/banner-2.jpg`,
			adBannerUrl: [
            `${this.$minioUrl}/patient-wx/banner/banner-3.jpg`,
            `${this.$minioUrl}/patient-wx/banner/banner-6.jpg`,
            `${this.$minioUrl}/patient-wx/banner/banner-7.jpg`, 
            `${this.$minioUrl}/patient-wx/banner/banner-8.jpg`]
        }
    },
	// created(){
	// 	let that=this;
	// 	that.$options.sockets.onopen=function(res){
	// 		console.log(res);
	// 	 	//发送心跳检测，避免超时后服务端切断连接
	// 		setInterval(function(){
	// 	 		that.$socket.sendObj({
	// 	 			opt:'ping'
	// 	 		})
	// 	 	},10*1000)
	// 	}
	// }
}
</script>
<style lang="less" scoped>
@import "../style.less";
.page {
	background-color: @bc-12;
	font-family: @ff-1;
	padding-bottom: 10px;
}
.navigator-container {
	background-color: #fff;
	padding: 22px 4px;
    margin: 0px 10px 10px 10px;
	box-sizing: border-box;
	border-radius: 15px;
	.navigator-icon {
		position: relative;
		overflow: initial;
		margin-top: 10px;
		&::before {
			display: block;
			content: '';
			width: 58px;
			height: 58px;
			background-color: @bc-13;
			border-radius: 15px;
			transform: rotate(10deg);
			position: absolute;
			top: -5px;
			left: -5px;
			z-index: 0;
		}
	}
	.navigator-icon-base {
		width: 50px;
		height: 50px;
		background-repeat: no-repeat;
		border-radius: 15px;
		margin-bottom: 15px;
		position: relative;
		z-index: 10;
		background-color: @bgc-18;
	}
	.navigator-icon-1 {
		.navigator-icon-base;
		background-image: url('@{baseUrl}/page/mine/navigator-icon-1.png');
		background-size: 40px 40px;
		background-position: 6px 6px;
	}
	.navigator-icon-2 {
		.navigator-icon-base;
		background-image: url('@{baseUrl}/page/mine/navigator-icon-2.png');
		background-size: 40px 40px;
		background-position: 6px 5px;
	}
	.navigator-icon-3 {
		.navigator-icon-base;
		background-image: url('@{baseUrl}/page/mine/navigator-icon-3.png');
		background-size: 40px 40px;
		background-position: 6px 5px;
	}
	.navigator-icon-4 {
		.navigator-icon-base;
		background-image: url('@{baseUrl}/page/mine/navigator-icon-4.png');
		background-size: 40px 40px;
		background-position: 6px 5px;
	}
	.title {
		font-size: 12px;
		color: @fc-1;
		margin-top: 5px;
	}
}
.publicity-container {
	display: flex;
	background-color: #fff;
	margin: 20px 20px 20px 20px;
	padding: 30px 10px;
	border-radius: 15px;
	.banner {
		width: 100%;
		display: block;
	}
}
.mine-container,
.service-container,
.settings-container {
	background-color: #fff;
	margin: 20px 20px 20px 20px;
	padding: 16px 10px 5px 10px;
	border-radius: 15px;
	.title-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		padding: 0 10px;
		.title {
			color: @fc-1;
			font-weight: bold;
			font-size: 15px;
			display: flex;
		}
	}
	.content {
		.navigator-icon {
			width: 52px;
			height: 52px;
			display: block;
			margin-left: auto;
			margin-right: auto;
		}
		.title {
			font-size: 12px;
			color: @fc-1;
			margin-top: 15px;
			display: block;
			div-align: center;
		}
	}
	.banner {
		width: 100%;
		height: auto;
		display: block;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 30px;
	}
}
.ad-container {
	margin: 10px 35px 30px 35px;
	.banner {
		width: 100%;
		display: block;
		border-radius: 15px;
        .van-swipe{
          widows: 100%;
        }
	}
}

</style>