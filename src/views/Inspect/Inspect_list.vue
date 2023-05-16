<template>
   <CpnavbarVue title="我的报告" />
	<div class="page_liebiao1">
		<div class="yonghu" v-for="(item,index) in inspectList" :key="index" @click="onDetail(item.id)">
            <div class="shijian">检查时间：<span style="margin-left:10px">{{item.date}}</span></div>
			<div class="pingfen" style="display: flex;">
			    <div style="font-size:14px">检查项目：{{item.hitName}}</div> 
                <div class="btn" ><el-icon><ArrowRight /></el-icon></div>
			</div>
			<div style="margin-left:10px;font-size:14px;">检查患者：<span style="margin-left:10px">{{item.patientName}}</span></div>
		</div>
	</div>
</template>
<script>
import CpnavbarVue from '../../components/Cpnavbar.vue'
export default {
    components:{CpnavbarVue},
    data() {
        return {
            inspectList: {},
        }
    },
    methods: {
		onDetail(recordId){
          this.$router.push({
			path:'/inspect',
			query:{recordId:recordId}
		  })
		},
        searchByUserIdRateAll(){
			let that=this;
		    that.$http("/inspect_record/searchRecordAll",'post',{},true,function(res){
                console.log(res)
				if(res.code==200){
                    let result=res.result;
                    result.forEach((element,index) => {
                       let date=element.date.replace("T"," ")
                       result[index].date=date;
                    });
                   that.inspectList=result;
				}
			})
		}
    },
	mounted() {
		this.searchByUserIdRateAll();
	},
}
</script>

<style lang="scss" scoped>
	.page_liebiao1 {
		width: 100%;
		height: 100%;
		background-color: #e8e8e8;
		padding-top: 1px;

		.tupian {
			margin-top: 15px;
			margin-left: 10px;
		}

		.shijian {
			font-size: 12px;
			margin-right:10px;
			margin-top: 10px;
            text-align: right;
			color: #808080;
		}

		.pingfen {
			margin-top: 10px;
			width: 100%;
            margin-left:10px;
			font-size: 14px;
		}

		.biaoqian {
			margin-top: 5px;
			padding-left: 5px;
			width: 40%;
		}

		.name {
			margin-top: 10px;
			padding-left: 10px;
            margin-right: auto;
		}

		.yonghu {
			width: 93vw;
			height: 18vh;
			background-color: #ffffff;
			border-radius: 10px;
			padding: 10px;
			margin-left: 4px;
			margin-top: 10px;

		}

		.yonghu1 {
			width: 93vw;
			height: 40vh;
			background-color: #ffffff;
			border-radius: 10px;
			margin-top: 10px;
			padding-left: 19px;
			margin-left: 3.5px;
		}
	}
	.btn{
		margin-left:130px;
		.el-icon{
		  font-size: 20px;
          
	    }
	}
	.text{
		margin-top: 5px;
		margin-left: 10px;
		color:rgb(156, 150, 150);
		font-size:14px;
	}
	.el-rate__text{
      margin-left: 10px;
	  margin-right: 20px;
	}
</style>
