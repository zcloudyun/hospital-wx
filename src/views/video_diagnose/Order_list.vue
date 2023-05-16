<template>
	<div class="page">
        <CpnavbarVue title="视频问诊订单列表"/>
		<div class="banner" @click="registerHandle">
			<img :src="doctorImg" mode="widthFix">
			<div>
				<div class="row-1">
					<span class="title">视频问诊</span>
					<span class="remark">接诊快</span>
				</div>
				<div class="row-2"><div class="btn">立即挂号</div></div>
				<div class="row-3">查找名医，远程诊断，预约挂号，不再等待</div>
			</div>
		</div>
		<div class="order" v-for="one of list" :key="one">
			<div class="row">
				<div @longtap="copyOutTradeNoHandle(one.outTradeNo)">
					<u-icon
						:label="`订单编号：${one.outTradeNoShort}`"
						color="#a0a0a0"
						labelColor="#a0a0a0"
						size="20"
						name="order"
					></u-icon>
				</div>
				<div v-if="one.paymentStatus != 3">
					<span
						class="status blue"
						v-if="one.status == '进入问诊室'"
						@tap="enterHandle(one.id, one.expectStart, one.expectEnd,one.doctorId)"
					>
						进入问诊室
					</span>
					<span
						class="status"
						v-if="one.status != '进入问诊室'"
						@tap="enterHandle(one.id, one.expectStart, one.expectEnd, one.doctorId)"
					>
						{{ one.status }}
					</span>
				</div>
			</div>
			<div class="row">
				<div>
					<span class="doctor-name">{{ one.doctorName }}</span>
					<span class="job">（{{ one.job }}）</span>
				</div>
				<div>
					<span class="unit">￥</span>
					<span class="amount">{{ one.amount }}</span>
				</div>
			</div>
			<div class="row">
				<u-icon
					:label="`${one.subName}（${one.expectStartShort} ~ ${one.expectEndShort}）`"
					color="#555"
					labelColor="#555"
					size="18"
					name="server-fill"
				></u-icon>
			</div>
			<div class="row">
				<div class="create-time">
					<u-icon
						:label="one.createTime"
						color="#a0a0a0"
						labelColor="#a0a0a0"
						size="20"
						name="calendar-fill"
						top="0"
					></u-icon>
				</div>
				<div class="btn green" v-if="one.paymentStatus == 1">未付款</div>
				<div class="btn orange" v-if="one.paymentStatus == 2">已付款</div>
				<div class="btn gray" v-if="one.paymentStatus == 3">已关闭</div>
			</div>
		</div>
		<div v-if="list.length == 0">
			<van-empty mode="order" description="没有问诊挂号记录" icon="http://cdn.uviewui.com/uview/empty/order.png"></van-empty>
		</div>
	</div>
</template>

<script>
import { dayjs} from 'element-plus';
import CpnavbarVue from '../../components/Cpnavbar.vue';
export default {
    components:{CpnavbarVue},
	data() {
		return {
			doctorImg: `${this.$minioUrl}/patient-wx/pic/pic-2.png`,
			page: 1,
			length: 50,
			list: [],
			isLastPage: false
		};
	},
	methods: {
		registerHandle:function(){
			this.$router.push({
				path:'/doctor_list'
			})
		}
	},
	
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
	font-family: @ff-1;
	background-color: @bgc-1;
    width: 100%;
    height: 100%;
}
.banner {
	height: 20%;
	background-color: @bgc-18;
	overflow: hidden;
	display: flex;
	img {
		flex-grow: 0;
		height: auto;
		margin-top: 20px;
		margin-left: 10px;
		margin-right: 5px;
	}
	.row-1{
		margin-top: 10px;
		.title{
			font-size: 26px;
			color: #fff;
			font-weight: bold;
		}
		.remark{
			background-color: @bgc-24;
			font-size: 13px;
			color: @fc-2;
			padding: 4px 8px;
			border-radius: 20px;
			margin-left: 6px;
			vertical-align: 10px;
		}
	}
	.row-2{
		margin-top: 10px;
		.btn{
			color: #fff;
			background-color: @bgc-16;
			width: 93px;
			padding: 5px 0;
			text-align: center;
			border-radius: 10px;
		}
	}
	.row-3{
		margin-top: 10px;
		font-size: 12px;
		color: #fff;
	}
}
.order {
	background-color: #fff;
	margin-top: 25px;
	padding: 35px 0;
	.row {
		display: flex;
		justify-content: space-between;
		&:nth-child(1) {
			border-bottom: 1px solid @bc-4;
			padding: 0 35px 20px 35px;
		}
		&:nth-child(2) {
			padding: 20px 35px 0 35px;
		}
		&:nth-child(3) {
			padding: 10px 35px 0 35px;
		}
		&:nth-child(4) {
			padding: 10px 35px 0 35px;
		}
		.status {
			color: @fc-3;
			font-size: 24px;
		}
		.doctor-name {
			font-size: 38px;
			font-weight: bold;
			color: @fc-2;
		}
		.job {
			font-size: 24px;
			color: @fc-2;
		}
		.sub-name {
			font-size: 30px;
			color: @fc-2;
		}
		.unit {
			font-size: 22px;
			font-weight: bold;
			color: @fc-2;
		}
		.amount {
			font-size: 42px;
			font-weight: bold;
			color: @fc-2;
		}
		.create-time {
			margin-top: 10px;
			margin-left: -3px;
		}
		.btn {
			color: #fff;
			width: 120px;
			font-size: 28px;
			margin: 0;
			padding: 0 0;
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
		.gray {
			background-color: @btnc-8;
		}
		.orange {
			background-color: @btnc-9;
		}
		.blue{
			color: @fc-4;
		}
	}
}

</style>
