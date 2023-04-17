<template>
	<div class="page">
		<div class="top-container" v-if="flag">
			<img :src="img.logo" mode="widthFix" class="logo">
			<div class="title">e医相伴医院</div>
			<div class="qrcode-container">
				<div class="qrcode"><div class="qr-code" ref="qrCodeUrl"></div></div>
				<div>就诊请出示二维码</div>
			</div>
			<div class="step-container">
				<div class="step">
					<div class="icon-1"></div>
					<div class="txt">门诊台取号</div>
				</div>
				<div class="line"></div>
				<div class="step">
					<div class="icon-2"></div>
					<div class="txt">排队候诊</div>
				</div>
				<div class="line"></div>
				<div class="step">
					<div class="icon-3"></div>
					<text class="txt">出示二维码</text>
				</div>
			</div>
		</div>
		<div class="registration-container">
			<div class="title"><div>挂号信息</div></div>
			<div class="registration">
                <el-descriptions
                    class="margin-top"
                    title=""
                    :column="1"
                    :size="small"
                    border
                >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                           <OfficeBuilding />
                        </el-icon>
                        就诊科室
                        </div>
                    </template>
                    {{subDeptName}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <Avatar />
                        </el-icon>
                        就诊医生
                        </div>
                    </template>
                    {{doctorName}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>
                        挂号类型
                        </div>
                    </template>
                    {{type}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <location />
                        </el-icon>
                        门诊位置
                        </div>
                    </template>
                    {{location}}
                    <el-tag size="small">School</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <Timer />
                        </el-icon>
                        就诊时间
                        </div>
                    </template>
                    {{datetime}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <user />
                        </el-icon>
                        挂号人
                        </div>
                    </template>
                    {{patientName}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <Money />
                        </el-icon>
                        挂号费
                        </div>
                    </template>
                    {{amount}}
                </el-descriptions-item>
                </el-descriptions>
			</div>
		</div>
        <!-- <div>
            <div v-if="prescriptionId!=null" title="电子处方" :border="false" 
					:value="prescriptionId" isLink:url="`/registration/prescription/prescription?registrationId=${id}`"></div>
        </div> -->
	</div>
</template>

<script>
import dayjs from 'dayjs';
import QRCode from 'qrcodejs2-fix';
export default {
	data() {
		return {
			img: {
				logo: `${this.$minioUrl}/patient-wx/page/registration/registration_info/logo.png`
			},
			id: null,
			outTradeNo: null,
			patientName: '',
			subDeptName: '',
			doctorName: '',
			location: '',
			date: '',
			slot: '',
			job: '',
			type: '',
			paymentStatus: null,
			datetime: '',
			amount: '',
			prescriptionId:null,
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
			flag: true
		};
	},
	methods: {
    /* 创建二维码 */
    creatQrCode() {
      new QRCode(this.$refs.qrCodeUrl, {
        text: 'https://blog.csdn.net/AdminGuan', // 二维码的内容 
        width: 150,
        height: 150,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  },
  mounted: function () {
    this.creatQrCode(); // 创建二维码
  },
	// mounted: function() {
	// 	let that=this;
    //     let {id}=this.$route.params;
	// 	that.id=id;
	// 	let data={id:id}
		// that.ajax(that.api.searchRegistrationInfo,'post',data,function(res){
		// 	let data=res.data;
		// 	that.outTradeNo=data.outTradeNo;
		// 	that.patientName=data.patientName;
		// 	that.subDeptName=data.subDeptName;
		// 	that.doctorName=data.doctorName;
		// 	that.location=data.location;
		// 	that.job=data.job;
		// 	if(['主任医师','副主任医师'].includes(that.job)){
		// 		that.type='专家号';
		// 	}else{
		// 		that.type='普通号';
		// 	}
		// 	that.date=data.date;
		// 	that.slot=data.slot;
		// 	that.datetime=data.date+' '+that.json[data.slot];
		// 	that.amount=data.amount+'元';
		// 	that.paymentStatus=data.paymentStatus;
		// 	let today=dayjs().format('YYYY-MM-DD');
		// 	if(today ==that.date && that.paymentStatus==2){
		// 		that.flag=true;
		// 	}else{
		// 		that.flag=false;
		// 	}
		// 	if(data.hasOwnProperty('prescriptionId')){
		// 		that.prescriptionId=data.prescriptionId;
		// 	}
		// },false);
	// },
};
</script>

<style lang="less" scoped>
@import '../../style.less';
.page {
	background-color: @bc-12;
	font-family: @ff-1;
	padding-top: 20px;
}
.top-container {
	background-color: #fff;
	border-radius: 15px;
	margin: 0 15px;
	padding: 0px 15px 5px 15px;
	.logo {
		width: 150px;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	.title {
		display: block;
		font-size: 30px;
		text-align: center;
		font-weight: bold;
		color: @fc-1;
	}
	.qrcode-container {
		text-align: center;
		.qrcode {
			width: 140px;
			margin-left: auto;
			margin-right: auto;
			margin-top: 60px;
		}
		.txt {
			display: block;
			font-style: 26px;
			color: @fc-1;
			margin-top: 20px;
		}
	}
}
.step-container {
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	margin-bottom: 20px;
	margin-left: 17px;
	margin-right: 17px;
	.step {
		width: 100px;
		text-align: center;
		flex-grow: 0;
		.icon {
			width: 70px;
			height: 70px;
			border-radius: 35px;
			background-color: #f0f0f0;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 10px;
		}
		.icon-1 {
			.icon;
			background-image: url('@{baseUrl}/page/registration/registration_info/icon-1.png');
			background-size: 40px;
			background-repeat: no-repeat;
			background-position: 14px 14px;
			
		}
		.icon-2 {
			.icon;
			background-image: url('@{baseUrl}/page/registration/registration_info/icon-2.png');
			background-size: 40px;
			background-repeat: no-repeat;
			background-position: 18px 17px;
		}
		.icon-3 {
			.icon;
			background-image: url('@{baseUrl}/page/registration/registration_info/icon-3.png');
			background-size: 40px;
			background-repeat: no-repeat;
			background-position: 15px 16px;
		}
		.txt{
			display: block;
			color: @fc-3;
			font-size: 12px;
		}
	}
	.line{
		height: 0;
		flex-grow: 1;
		border-top: 1px solid @bc-2;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 50px;
	}
}
.registration-container{
	background-color: #fff;
	border-radius: 15px;
	margin-top: 10px;
	margin-left: 17px;
	margin-right: 17px;
	.title{
		border-bottom: 1px solid @bc-2;
		padding: 30px 0 0px 0;
		display: flex;
		margin-bottom: 10px;
		&::before{
			display: block;
			content: "";
			width: 12px;
			height: 35px;
			background-color: @bgc-10;
			margin-right: 30px;
			margin-top: 5px;
		}
		text{
			font-size: 30px;
			font-weight: bold;
			color: @fc-1;
			
		}
	}
	.registration{
		padding-bottom: 20px;
	}
}
.cell-item{
    font-size: 12px;
}
</style>
