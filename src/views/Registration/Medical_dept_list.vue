<template>
	<div class="page">
        <Cpnavbar title="选择挂号诊室" />
		<div class="main">
			<div class="left" :style="height">
				<div
					:class="one.id == deptId ? 'item active' : 'item'"
					v-for="one in deptList" :key="one.id"
					@click="clickDeptHandle(one.id)"
				>
					{{ one.name }}
				</div>
			</div>
			<div class="right">
				<div class="item" v-for="one in sub" :key="one.id" @click="clickSubHandle(one.id, one.name)">{{ one.name }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import CpnavbarVue from '../../components/Cpnavbar.vue';
export default {
	components:{CpnavbarVue},
	data() {
		return {
			deptId: null,
			sub: [],
			height: 0,
			deptList: []
		};
	},
	methods: {
		//查询科室列表
		searchMedicalDeptList:function(){
            let that=this
			let data={outpatient:true}
			that.$http('/medical/dept/searchMedicalDeptList','post',data,false,function(res){
                console.log(res)
				that.deptList=res.result
				//取出第一个科室的ID
				that.deptId=that.deptList[0].id
				//根据第一个科室ID查找该科室的诊室列表
				that.searchMedicalDeptSubList(that.deptId)
			})
		},
		//查询诊室列表
		searchMedicalDeptSubList:function(deptId){
            let that=this
			let data={deptId:deptId}
			that.$http('/medical/dept/sub/searchMedicalDeptSubList','post',data,false,function(res){
				that.sub=res.result
			})
		},
		//每个科室的点击事件
		clickDeptHandle:function(deptId){
			this.deptId=deptId
			this.searchMedicalDeptSubList(deptId);
		},
		//点击诊室
		clickSubHandle:function(deptSubId,deptSubName){
			console.log('点击了：',deptSubName)
			this.$router.push({
				path: '/dept_sub_plan',
				query: {deptSubId:deptSubId,deptSubName:deptSubName}
			})
		}
	},
	mounted: function() {
		let that=this
		//获取小程序高的高度
		let height=window.innerHeight;
		//view标签适配的高度=屏幕高度-小程序标题高度-小程序底部导航栏高度
		that.height=`height:{height - 15 - 44}px`
		that.searchMedicalDeptList();
	}
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.page {
	background-color: @bgc-1;
	font-family: @ff-1;
	padding-bottom: 0px;
    h3{
       margin: 0;
       padding: 10px 20px 20px 20px;
       height: 15px;
    }
    .section-title{
        color: #000;
        text-align: center;
    }
}
.main {
	display: flex;
	.left {
		background-color: #fff;
		width: 40%;
		padding: 15px 0;
		margin-right: 12px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		.item {
			line-height: 1.5;
			margin-left: 45px;
			margin-bottom: 25px;
			font-size: 16px;
			border-right: solid 8px #fff;
		}
		.active {
			border-right: solid 8px @bc-17;
		}
	}
	.right {
		background-color: #fff;
		flex-grow: 1;
		padding: 15px 10px 20px 0px;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		.item {
			line-height: 1.5;
			margin-left: 25px;
			font-size: 15px;
			margin-bottom: 14px;
		}
	}
}

</style>
