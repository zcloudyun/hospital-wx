<template>
	<div class="page">
		<div class="price">
			<div class="pri">
				<div class="p">￥{{price}}</div>
			</div>
			<div class="appointment">预约挂号</div>
		</div>
		<div class="content">
			<div class="left">收款方</div>
			<div class="right">e医相伴</div>
		</div>
		<el-button type="primary" size="large" @click="goPay">立即支付</el-button>
	</div>
</template>

<script>
import { ElMessage } from 'element-plus';
	export default {
		data() {
			return {
				price:'',
				outTradeNo:''
			}
		},
		methods: {
			goPay:function(){
				let that=this;
                 ElMessageBox.confirm(
                    '确认支付?',
                    '提示信息',
                    {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                )
                .then(() => {
                   let data={
					    outTradeNo:that.outTradeNo
				    }
					that.$http('/registration/searchPaymentResult','post',data,false,function(res){
				        console.log(res)
						if(res.result){
                            ElMessage({
                                type:'success',
                                message:'付款成功'
                            })
                            that.$router.push({name:'Main'}) 
						}else{
                            ElMessage({
                                type:'warning',
                                message:'付款异常，请联系客服'
                            })
						}
                    })           
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消支付',
                    })
                })
			}
		},
		mounted:function(){
			let that=this;
            let {outTradeNo,price}=that.$route.params;
			that.outTradeNo=outTradeNo
			that.price=price;
		}
	}
</script>

<style lang="less" scoped>
@import '../../style.less';
.page {
	background-color: @bc-12;
	font-family: @ff-1;
	height: 100%;
}
.price{
	height: 150px;
	.pri{
		.p{
			padding: 60px 0px 0px 0px;
			display: block;
			font-size: 40px;
			text-align: center;
		}

	}
	.appointment{
		display: block;
		text-align: center;
		font-size: 14px;
		
	}
}
.content{
	height: 25px;
	background-color:#fff;
	margin-bottom: 20px;
	display: flex;
	font-size: 16px;
	align-items: center;
	padding: 10px 30px;
	.left{
		color: dimgray;
	}
	.right{
		flex: 1;
		text-align: right;
	}
}
.el-button--large{
	padding: 0px 159px;
	height: 50px;
}
</style>
