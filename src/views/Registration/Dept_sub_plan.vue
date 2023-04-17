<template>
	<div class="page">
		<div class="date-container">
			<div class="item" v-for="one in dateList">
				<div class="day">{{ one.day }}</div>
				<div :class="one.date == date ? 'selector active' : 'selector'" @click="clickDataHandle(one.date)">
					<div class="date">{{ one.dateOfMonth }}</div>
					<div :class="one.status == '无号' ? 'status gray' : 'status'">{{ one.status }}</div>
				</div>
			</div>
		</div>
		<div class="doctor" v-for="one in doctorList">
			<el-avatar :src="one.photo" size="50"></el-avatar>
			<div class="info">
				<div class="row">
					<div class="name">{{ one.name }}</div>
					<div class="job">({{ one.job }})</div>
					<button class="btn" @click="clickBtnHandle(one.id, date)">挂号</button>
				</div>
				<div class="row">
					<div class="num">总量:{{ one.maximum }}</div>
					<div class="price">￥{{ one.price }}</div>
				</div>
				<div class="row">
					<div class="desc">{{ one.description }}</div>
				</div>
			</div>
		</div>
		<el-empty
			v-if="showEmpty"
			mode="list"
			text="无医生出诊记录"
			icon="http://cdn.uviewui.com/uview/empty/order.png"
		></el-empty>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
export default {
	data() {
		return {
			deptSubId: null,
			showEmpty: false,
			date: dayjs().format('YYYY-MM-DD'),
			dateList: [],
			doctorList: []
		};
	},
	methods: {
		//查询医生出诊时间
		searchCanRegisterInDateRange:function(deptSubId){
            let that=this;
			let startDate=dayjs().format('YYYY-MM-DD')
			let endDate=dayjs().add(6,'day').format('YYYY-MM-DD')
			let data={
				deptSubId:deptSubId,
				startDate:startDate,
				endDate:endDate
			}
			that.$http('/registration/searchCanRegisterInDateRange','post',data,false,function(res){
				console.log('接收到的出诊时段',res)
				let result=res.result
				//定义工具数组
				let array=['日','一','二','三','四','五','六']
				for(let one of result){
					//把星期几的阿拉伯数字转为汉字数字
					let day=array[dayjs(one.date).day()];
					one.day=day
					one.dateOfMonth=dayjs(one.date).date();
				}
				that.dateList=result
			})
		},
		//查询出诊医生详细信息
		searchDeptSubDoctorPlanInDay:function(){
            let that=this;
			let data={
				deptSubId:that.deptSubId,
				date:that.date
			}
			that.$http('/registration/searchDeptSubDoctorPlanInDay','post',data,false,function(res){
				console.log('接收到的医生出诊数据',res)
				let result=res.result
				//把头像相当于路径合成绝对路径
				for(let one of result){
					one.photo=`${that.$minioUrl}/${one.photo}`
				}
				that.doctorList=result
                console.log(that.doctorList)
				if(result.length==0){
					that.showEmpty=true
				}else{
					that.showEmpty=false
				}
			})
		},
		//点击日期切换
		clickDataHandle:function(date){
			let that=this
			that.date=date
			that.searchDeptSubDoctorPlanInDay()
		},
		//挂号按钮
		clickBtnHandle:function(id, date){
			//检查用户在当天有没有挂过该科室的号
		    let that=this
			let data={
				deptSubId:that.deptSubId,
				date:that.date
			}
			that.$http('/registration/checkRegisterCondition','post',data,false,function(res){
				console.log('点击挂号按钮返回的数据',res)
				let result=res.result
				if(result=='已经达到当前挂号上限'){
					ElMessage({
						icon:'none',
						title:'每天只能挂号3次，您已达到当日上限'
					})
				}else if(result=='已经挂过该诊室的号'){
					ElMessage({
						icon:'none',
						title:'您已经挂过该诊室的号了，不可重复挂号'
					})
				}
                else if(result=='不存在面部模型'){
                    ElMessageBox.confirm(
                        '挂号需要人脸识别验证身份，你还没有录入面部信息，是否立即采集面部信息?',
                        '提示信息',
                        {
                            confirmButtonText: '录入',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }
                    ).then(() => {
                        //跳转到面部采集页面，录入面部信息
                        that.$router.push({
                            name:'User_camera',
                            params:{mode:'create'}
                        })
                    }).catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '录入失败',
                        })
                    })
				}else if(result=='当日没有人脸验证记录'){
                    ElMessageBox.confirm(
                        '每天第一次挂号之前，需要核验面部信息，以便确保是本人挂号?',
                        '提示信息',
                        {
                            confirmButtonText: '验证',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }
                    ).then(() => {
                        //跳转到面部采集页面，录入面部信息
                        that.$router.push({
                            name:'User_camera',
                            params:{mode:'verificate'}
                        })
                    }).catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '验证失败',
                        })
                    })
				}
				//满足挂号条件
				else{
					console.log('跳转挂号页面')
					that.$router.push({
						name:'Doctor_schedule',
						params:{deptSubId:that.deptSubId,doctorId:id,date:date}
					})
				}
			})
		}
	},
    mounted:function(){
        let that=this
        let {deptSubId,deptSubName}=that.$route.params
        that.deptSubId=deptSubId
        that.searchCanRegisterInDateRange(deptSubId)
		that.searchDeptSubDoctorPlanInDay()
    }
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
	background-color: @bgc-12;
    height: 100%;
	font-family: @ff-1;
	padding-top: 15px;
	padding-bottom: 0px;
}
.date-container {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	.item {
		.day {
			display: block;
			font-size: 20px;
			color: @fc-3;
			text-align: center;
			margin-bottom: 10px;
		}
		.selector {
			padding: 10px 15px;
			border-radius: 10px;
			.date {
				display: block;
				font-size: 20px;
				text-align: center;
				color: @fc-1;
			}
			.status {
				display: block;
				font-size: 12px;
				text-align: center;
				color: @fc-21;
			}
			.gray{
				color: @fc-11;
			}
		}
		.active {
			background-color: @bgc-7;
			.date {
				color: #fff;
			}
			.status {
				color: #fff;
			}
		}
	}
}

.doctor {
	background-color: #fff;
	margin: 0 7px 20px 7px;
	border-radius: 15px;
	box-sizing: border-box;
	padding: 27px 14px;
	display: flex;
	.info {
		width: 80%;
		margin-left: 10px;
		.row {
			display: flex;
			position: relative;
			.name {
				font-size: 19px;
				font-weight: bold;
				color: @fc-1;
                margin-right: 5px;
			}
			.job {
				font-size: 16px;
				color: @fc-1;
				margin-top: 6px;
				display: block;
			}
			.btn {
				margin: 0;
				height: 36px;
				font-size: 12px;
				line-height: 17px;
				background-color: @btnc-6;
				color: #fff;
				border-radius: 20px;
				position: absolute;
                width: 60px;
				right: 0px;
				&::after {
					border: none;
				}
				&:active {
					background-color: @btnac-6;
				}
			}
			.num {
				display: block;
				background-color: @bgc-7;
				font-size: 12px;
				color: #fff;
				line-height: 3;
				padding: 2px 5px;
				border-radius: 10px;
				margin-top: 10px;
				margin-right: 10px;
			}
			.price {
				display: block;
				background-color: @bgc-15;
				font-size: 12px;
				color: #fff;
				line-height: 3;
				padding: 4px 6px 0 6px;
				border-radius: 10px;
				margin-top: 10px;
			}
			.desc {
				font-size: 14px;
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
.el-empty{
    width: 100%;
    height: 50%;
}
.el-message-box__btns button:nth-child(2) {
    margin-left: 0px;
}
</style>
