<template>
	<div class="page">
		<div class="doctor">
			<el-avatar size="50" :src="photo"></el-avatar>
			<div class="info">
				<div class="row">
					<div class="name">{{ name }}</div>
					<div class="job">（{{ job }}）</div>
				</div>
				<div class="row">
					<div class="remark">{{ remark }}</div>
				</div>
				<div class="row">
					<div class="desc">{{ description }}</div>
				</div>
			</div>
		</div>
		<div class="schedule-container">
			<div>
				<div class="title">选择挂号时间</div>
				<div>
					<div v-for="one in schedule" :key="one.slot">
						<div
							:class="one.style"
							@click="clickScheduleHandler(one.workPlanId, one.scheduleId, one.slot)"
						>
							{{ one.range }}
						</div>
					</div>
				</div>
			</div>
			<el-button type="primary" size="large" @click="submitHandler">挂号费{{ price }}元，去支付</el-button>
		</div>
		<ol class='notice-list'>
			<li class='notice-item'>挂号平台提供次日起七天的预约服务，用户可预约中医院的大部分科室次日起至七天的就诊号源。</li>
			<li class='notice-item'>因为医生工作繁忙，可能更改或者取消预约时间，届时会第一时间通知您，请留意短信通知。</li>
			<li class='notice-item'>如果您在就诊当天不能前往医院取号就诊，请提前通过挂号平台取消预约，否则会因造成号源的浪费，请您谅解。</li>
		</ol>
	</div>
</template>

<script>
import { dayjs,ElMessage } from 'element-plus';
// import isBetween from 'dayjs/plugin/isBetween'
// dayjs.extend(isBetween);
export default {
	data() {
		return {
			workPlanId: null,
			scheduleId: null,
			date: '',
			deptSubId: null,
			doctorId: null,
			name: '',
			photo: '',
			job: '',
			remark: '',
			description: '',
			price: '',
			slot: null,
			json: {
				'1': '08:00',
				'2': '08:30',
				'3': '09:00',
				'4': '09:30',
				'5': '10:00',
				'6': '10:30',
				'7': '11:00',
				'8': '11:30',
				'9': '13:00',
				'10': '13:30',
				'11': '14:00',
				'12': '14:30',
				'13': '15:00',
				'14': '15:30',
				'15': '16:00',
				'16': '16:30'
			},
			schedule: [],
		};
	},
	methods: {
		searchDoctorInfoById:function(){
			let that=this;
			let data={id:that.doctorId};
			that.$http('/doctor/searchDoctorInfoById','post',data,false,function(res){
				console.log('出诊医生信息',res);
				that.name=res.name;
				that.photo=`${that.$minioUrl}/${res.photo}`;
				that.job=res.job;
				that.remark=res.remark;
				that.description=res.description;
				that.price=res.price;
			})
		},
		searchDoctorWorkPlanSchedule:function(){
			let that=this;
			let data={
				date:that.date,
				doctorId:that.doctorId
			}
			that.$http('/registration/searchDoctorWorkPlanSchedule','post',data,false,function(res){
				console.log('医生出诊时段',res);
				let result=res.result;
				let schedule=[];
				let now=dayjs();
				let date=now.format("YYYY-MM-DD");
				console.log(date)
				let i=1
				for(let one in that.json){
					let rangeStart=dayjs(`${date} ${that.json[one]}`);
					let item=result.find(function(element){
						return element.slot + ''==one;
					});
					let style=null;
					console.log(that.date)
					//如果挂今天的时段，如果该出诊时段已经过期，就使用禁用的css样式
					if(that.date==date && now.isAfter(rangeStart)){
						console.log(1);
						style='item disable';
					}
					//如果该时段医生不出诊
					else if(item ==undefined){
						style='item disable';
					}
					//如果该时段挂号人数已达到最大值
					else if(item.num ==item.maximum){
						style='item disable';
					}
					//可以挂号
					else{
						style='item';
					}
					schedule.push({
						workPlanId:item !=undefined?item.workPlanId:null,
						scheduleId:item!=undefined?item.scheduleId:null,
						slot:one,
						range:that.json[one],
						style:style
					})	
				}
				that.schedule=schedule;
			})
		},
		//选中某个时间段
		clickScheduleHandler:function(workPlanId,scheduleId,slot){
			let that=this;
			that.workPlanId=workPlanId;
			that.scheduleId=scheduleId;
			for(let one of that.schedule){
				if(one.style == 'item disable'){
					// that.slot=null;
					continue;
				}
				one.style='item';
				if(one.slot==slot){
					one.style='item active';
					that.slot=slot;
				}
			}
		},
		submitHandler:function(){
			let that=this;
			if(that.slot==null){
				ElMessage({
					type:'error',
					message:'请选择预约时间'
				})
				return;
			}
			ElMessageBox.confirm(
				'确认付款挂号?',
				'提示信息',
				{
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				let data={
					workPlanId:that.workPlanId,
					scheduleId:that.scheduleId,
					date:that.date,
					doctorId:that.doctorId,
					deptSubId:that.deptSubId,
					amount:that.price,
					slot:that.slot
				}
				that.$http('/registration/registerMedicalAppointment','post',data,false,function(res){
					console.log("挂号返回的数据",res);
					let price=res.amount;
					console.log("挂号的价钱",price)
					//如果响应体是空的，说明挂号失败
					if(!res.hasOwnProperty('outTradeNo')){
						ElMessage({
							type:'error',
							message:'该时段挂号失败'
						});
						/*
							重新加载医生和出诊时段信息
							挂号失败是有可能该时段刚刚过期，所以刷新页面之后，该时段会变成灰色，禁止挂号
						*/
					    that.searchDoctorInfoById();
						that.searchDoctorWorkPlanSchedule();
					}else{
						let outTradeNo=res.outTradeNo
						//弹出微信支付界面
						that.$router.push({
							path:'/pay',
							query:{outTradeNo:outTradeNo,price:price}
						})
					}
				});
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '取消挂号',
				})
			})	
		}
	},
	mounted: function() {
		let that=this;
		let {date,doctorId,deptSubId}=that.$route.query;
		that.date=date;
		that.doctorId=doctorId;
		that.deptSubId=deptSubId;
		that.searchDoctorInfoById();
		that.searchDoctorWorkPlanSchedule();
	}
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
	background-color: @bgc-1;
	font-family: @ff-1;
	padding-top: 2px;
	height: 100%;
	padding-bottom: 20px;
}
.doctor {
	background-color: #fff;
	margin: 0 7px 10px 7px;
	border-radius: 15px;
	box-sizing: border-box;
	padding: 22px 15px;
	display: flex;
	.info {
		width: 80%;
		margin-left: 10px;
		.row {
			display: flex;
			position: relative;
			.name {
				font-size: 16px;
				font-weight: bold;
				color: @fc-1;
				margin-right: 5px;
			}
			.job {
				font-size: 14px;
				color: @fc-1;
				margin-top: 6px;
				display: block;
			}
			.remark {
				font-size: 13px;
				color: @fc-1;
				margin-top: 5px;
			}
			.desc {
				font-size: 12px;
				color: @fc-3;
				margin-top: 6px;
				line-height: 1.6;
			}

			&:nth-of-type(2) {
				justify-content: start;
			}
		}
	}
}

.schedule-container {
	background-color: #fff;
	border-radius: 15px;
	padding: 0 10px;
	height: 77%;
	.title {
		font-size: 25px;
		color: @fc-1;
		font-weight: bold;
		display: block;
		text-align: center;
		border-radius: 10px;
		background-color: rgb(141, 196, 235);
		margin-bottom: 15px;
	}
	.item {
		line-height: 20px;
		background-color: @bgc-19;
		border-radius: 27px;
		padding: 5px 17px;
		font-size: 16px;
		margin: 15px 6px;
		color: @fc-8;
		float: left;
		display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 10px;

	}
	.active {
		color: #fff;
		background-color: @bgc-21;
	}
	.disable {
		background-color: @bgc-20;
		color: @fc-17;
	}
	.notice-list {
		margin-top: 30px;
		margin-bottom: 40px;
		margin-left: 0;
		height: 100px;
		background-color: rgb(243, 230, 230);
		padding-left: 40px;
		.notice-item {
			color: @fc-3;
			font-size: 12px;
			line-height: 1.7;
			margin-bottom: 20px;
		}
	}
}
.el-button--large{
	margin: 30px 80px;
}
</style>
