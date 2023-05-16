<template>
  <div class="page">
    <cpnavbar-vue title="病历详情" />
    <div class="header">
      <div style="display:flex;">
        <span>科室 / 医生</span>
        <span style="font-size:12px;color:#888888;margin-left:150px;">就诊时间: {{dataList.createTime}}</span>
      </div>
      <div class="title">{{dataList.deptSubName}} / {{dataList.doctorName}}
        <span style="font-size:12px;margin-left:40px">保险类型：{{dataList.insurance_type}}</span>
      </div>
    </div>
    <div class="content">
      <div class="btn">
          <el-button @click="onDetail(dataList.registionId)">
          <el-icon><Document /></el-icon>
          查看处方详情
        </el-button>
      </div>
      <div class="history">疾病史
        <div class="text">{{dataList.diseaseHistory}}</div>
      </div>
      <div class="check">检查结果
        <div class="text">{{dataList.checkinfo}}</div>
      </div>
      <div class="check">病情详情
        <div class="text">{{dataList.description}}</div>
      </div>
      <div class="remark">嘱托
        <div class="text">{{dataList.remark}}</div>
      </div>
      <div class="result">诊断结果
        <div class="text">{{dataList.diagnosis}}</div>
      </div>
      <div style="font-size:12px;color:#888888">本信息仅供参考，以医生签名病历为准。</div>
    </div>
  </div>
</template>
<script>
import CpnavbarVue from '../../components/Cpnavbar.vue'
export default {
  components:{CpnavbarVue},
  data(){
    return{
      recordId:'',
      dataList:{}
    }
  },
  methods: {
    searchByRecord(){
      let that=this;
      let data={recordId:that.recordId}
      that.$http('/medical/record/searchByRecordId','post',data,true,function(res){
        if(res.code==200){
           that.dataList=res.result;
        }
      })
    },
    onDetail(registrationId){
      this.$router.push({
        path:'/prescription',
        query:{registrationId:registrationId}
      })
    }
  },
  mounted(){
    const {recordId}=this.$route.query;
    this.recordId=recordId;
    this.searchByRecord();
  }
}
</script>
<style lang="scss" scoped>
.page{
  width: 100%;
  height: 100%;
  .header{
    width: 100%;
    background-color: #ffffff;
    height: 10%;
    padding: 10px;
    border: 1px solid #eee;
    .title{
      font-size: 15px;
      color: #888888;
      margin-top: 10px;
    }
  }
  .content{
    margin-top: 10px;
    padding: 10px;
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    .btn{
      width: 20px;
      margin-left:210px;
    } 
    .history{
      height: 15%;
      margin-top: 10px;
      border-bottom: 1px solid #eee;
    }
    .check{
      margin-top: 10px;
      height: 15%;
      border-bottom: 1px solid #eee;
    }
    .remark{
      margin-top: 10px;
      height: 15%;
      border-bottom: 1px solid #eee;
    }
    .result{
      margin-top: 10px;
      height: 15%;
      border-bottom: 1px solid #eee;
    }
  }
}
.text{
  font-size:13px;
  margin:10px;
  color: #046a83;
}
</style>