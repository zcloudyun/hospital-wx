<template>
	<div>
		<div class="top-container">
			<div class="info">
			</div>
		</div>
		<div class="navigator-container">
			<el-row :gutter="20">
				<el-col name="实名登记">
					<div class="navigator-icon"><div class="navigator-icon-1" /></div>
					<div class="title">实名登记</div>
				</el-col>
				<el-col name="我的医生">
					<div class="navigator-icon"><div class="navigator-icon-2" /></div>
					<div class="title">我的医生</div>
				</el-col>
				<el-col name="检查报告">
					<div class="navigator-icon"><div class="navigator-icon-3" /></div>
					<div class="title">检查报告</div>
				</el-col>
				<el-col name="电子处方">
					<div class="navigator-icon"><div class="navigator-icon-4" /></div>
					<div class="title">电子处方</div>
				</el-col>
			</el-row>
		</div>
		<div class="publicity-container"><image :src="publicityBannerUrl" mode="widthFix" class="banner" /></div>
		<div class="mine-container">
			<div class="title-row">
				<div class="title">我的问诊</div>
				<el-icon label="更多" labelPos="left" size="15" name="arrow-right"></el-icon>
			</div>
			<div class="content">
				<el-grid :border="false" @click="navigatorHandle" col="5">
					<el-grid-item name="待支付">
						<image :src="img['mine-icon-1']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">待支付</div>
					</el-grid-item>
					<el-grid-item name="问诊记录">
						<image :src="img['mine-icon-2']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">问诊记录</div>
					</el-grid-item>
					<el-grid-item name="药品清单">
						<image :src="img['mine-icon-3']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">药品清单</div>
					</el-grid-item>
					<el-grid-item name="挂号记录">
						<image :src="img['mine-icon-4']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">挂号记录</div>
					</el-grid-item>
					<el-grid-item name="在线续方">
						<image :src="img['mine-icon-5']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">在线续方</div>
					</el-grid-item>
				</el-grid>
				<image :src="otherBannerUrl" mode="widthFix" class="banner"></image>
			</div>
		</div>
		<div class="ad-container"><image :src="adBannerUrl[0]" mode="widthFix" class="banner" /></div>
		<div class="service-container">
			<div class="title-row">
				<div class="title">医疗服务</div>
				<el-icon label="更多" labelPos="left" size="15" name="arrow-right"></el-icon>
			</div>
			<div class="content">
				<el-grid :border="false" @click="navigatorHandle" col="5">
					<el-grid-item name="挂号就诊">
						<image :src="img['service-icon-1']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">挂号就诊</div>
					</el-grid-item>
					<el-grid-item name="预约陪诊">
						<image :src="img['service-icon-2']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">预约陪诊</div>
					</el-grid-item>
					<el-grid-item name="核酸检测">
						<image :src="img['service-icon-3']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">核酸检测</div>
					</el-grid-item>
					<el-grid-item name="疫苗预约">
						<image :src="img['service-icon-4']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">疫苗预约</div>
					</el-grid-item>
					<el-grid-item name="护工服务">
						<image :src="img['service-icon-5']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">护工服务</div>
					</el-grid-item>
					<el-grid-item name="视频问诊">
						<image :src="img['service-icon-6']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">视频问诊</div>
					</el-grid-item>
					<el-grid-item name="电子发票">
						<image :src="img['service-icon-7']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">电子发票</div>
					</el-grid-item>
					<el-grid-item name="打印服务">
						<image :src="img['service-icon-8']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">打印服务</div>
					</el-grid-item>
					<el-grid-item name="住院押金">
						<image :src="img['service-icon-9']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">住院押金</div>
					</el-grid-item>
					<el-grid-item name="住院清单">
						<image :src="img['service-icon-10']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">住院清单</div>
					</el-grid-item>
					<el-grid-item name="线上导诊">
						<image :src="img['service-icon-11']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">线上导诊</div>
					</el-grid-item>
					<el-grid-item name="中药代煎">
						<image :src="img['service-icon-12']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">中药代煎</div>
					</el-grid-item>
					<el-grid-item name="体检预约">
						<image :src="img['service-icon-13']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">体检预约</div>
					</el-grid-item>
					<el-grid-item name="停车缴费">
						<image :src="img['service-icon-14']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">停车缴费</div>
					</el-grid-item>
					<el-grid-item name="疾病百科">
						<image :src="img['service-icon-15']" mode="widthFix" class="navigator-icon"></image>
						<div class="title">疾病百科</div>
					</el-grid-item>
				</el-grid>
			</div>
		</div>
		<div class="ad-container"><image :src="adBannerUrl[1]" mode="widthFix" class="banner" /></div>
		<el-toast ref="uToast" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			img: {
				'mine-icon-1': `${this.$minioUrl}/page/mine/mine-icon-1.png`,
				'mine-icon-2': `${this.$minioUrl}/page/mine/mine-icon-2.png`,
				'mine-icon-3': `${this.$minioUrl}/page/mine/mine-icon-3.png`,
				'mine-icon-4': `${this.$minioUrl}/page/mine/mine-icon-4.png`,
				'mine-icon-5': `${this.$minioUrl}/page/mine/mine-icon-5.png`,
				'navigator-icon-1':`${this.$minioUrl}/page/mine/navigator-icon-1.png`,
				'navigator-icon-2':`${this.$minioUrl}/page/mine/navigator-icon-2.png`,
				'navigator-icon-3':`${this.$minioUrl}/page/mine/navigator-icon-3.png`,
				'navigator-icon-4':`${this.$minioUrl}/page/mine/navigator-icon-4.png`,
				'service-icon-1': `${this.$minioUrl}/page/mine/service-icon-1.png`,
				'service-icon-2': `${this.$minioUrl}/page/mine/service-icon-2.png`,
				'service-icon-3': `${this.$minioUrl}/page/mine/service-icon-3.png`,
				'service-icon-4': `${this.$minioUrl}/page/mine/service-icon-4.png`,
				'service-icon-5': `${this.$minioUrl}/page/mine/service-icon-5.png`,
				'service-icon-6': `${this.$minioUrl}/page/mine/service-icon-6.png`,
				'service-icon-7': `${this.$minioUrl}/page/mine/service-icon-7.png`,
				'service-icon-8': `${this.$minioUrl}/page/mine/service-icon-8.png`,
				'service-icon-9': `${this.$minioUrl}/page/mine/service-icon-9.png`,
				'service-icon-10': `${this.$minioUrl}/page/mine/service-icon-10.png`,
				'service-icon-11': `${this.$minioUrl}/page/mine/service-icon-11.png`,
				'service-icon-12': `${this.$minioUrl}/page/mine/service-icon-12.png`,
				'service-icon-13': `${this.$minioUrl}/page/mine/service-icon-13.png`,
				'service-icon-14': `${this.$minioUrl}/page/mine/service-icon-14.png`,
				'service-icon-15': `${this.$minioUrl}/page/mine/service-icon-15.png`
			},
			flag: 'logout',
			code: null,
			user: {
				username: '神思者',
				photo: null,
				tel: null
			},
			bannerUrl: `${this.$minioUrl}/banner/banner-5.jpg`,
			publicityBannerUrl: `${this.$minioUrl}/banner/banner-2.jpg`,
			otherBannerUrl: `${this.$minioUrl}/banner/banner-1.jpg`,
			adBannerUrl: [`${this.$minioUrl}/banner/banner-8.jpg`, `${this.$minioUrl}/banner/banner-5.jpg`]
		};
	},
	methods: {
		
		
	},
};
</script>

<style lang="less">
@import "../../style.less";
page {
	background-color: @bc-12;
	font-family: @ff-1;
	padding-bottom: 10px;
}
.top-container {
	padding: 45px 40px 120px 40px;
	background-color: @bgc-10;
	display: flex;
	.info {
		flex-grow: 1;
		margin-left: 25px;
		.operate,
		.username {
			display: block;
			font-size: 38px;
			font-weight: bold;
			color: #fff;
			margin-bottom: 5px;
		}
		.remark,
		.tel {
			display: block;
			font-size: 26px;
			color: #fff;
			letter-spacing: 1px;
		}
	}
}
.navigator-container {
	background-color: #fff;
	margin: -95px 35px 0px 35px;
	padding: 30px 20px;
	box-sizing: border-box;
	border-radius: 15px;
	.navigator-icon {
		position: relative;
		overflow: initial;
		margin-top: 10px;
		&::before {
			display: block;
			content: '';
			width: 108px;
			height: 108px;
			background-color: @bc-13;
			border-radius: 25px;
			transform: rotate(10deg);
			position: absolute;
			top: -5px;
			left: -5px;
			z-index: 0;
		}
	}
	.navigator-icon-base {
		width: 100px;
		height: 100px;
		background-repeat: no-repeat;
		border-radius: 25px;
		margin-bottom: 15px;
		position: relative;
		z-index: 10;
		background-color: @bgc-18;
	}
	.navigator-icon-1 {
		.navigator-icon-base;
		background-image: url('@{baseUrl}/page/mine/navigator-icon-1.png');
		background-size: 80px 80px;
		background-position: 12px 14px;
	}
	.navigator-icon-2 {
		.navigator-icon-base;
		background-image: url('@{baseUrl}/page/mine/navigator-icon-2.png');
		background-size: 75px 75px;
		background-position: 15px 15px;
	}
	.navigator-icon-3 {
		.navigator-icon-base;
		background-image: url('@{baseUrl}/page/mine/navigator-icon-3.png');
		background-size: 72px 72px;
		background-position: 15px 15px;
	}
	.navigator-icon-4 {
		.navigator-icon-base;
		background-image: url('@{baseUrl}/page/mine/navigator-icon-4.png');
		background-size: 72px 72px;
		background-position: 15px 15px;
	}
	.title {
		font-size: 26px;
		color: @fc-1;
		margin-top: 5px;
	}
}
.publicity-container {
	display: flex;
	background-color: #fff;
	margin: 30px 35px 30px 35px;
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
	margin: 30px 35px 30px 35px;
	padding: 30px 10px 15px 10px;
	border-radius: 15px;
	.title-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30px;
		padding: 0 30px;
		.title {
			color: @fc-1;
			font-weight: bold;
			font-size: 36px;
			display: flex;
		}
	}
	.content {
		.navigator-icon {
			width: 82px;
			height: 82px;
			display: block;
			margin-left: auto;
			margin-right: auto;
		}
		.title {
			font-size: 26px;
			color: @fc-1;
			margin-top: 15px;
			margin-bottom: 30px;
			display: block;
			text-align: center;
		}
	}
	.banner {
		width: 630px;
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
	}
}

</style>
