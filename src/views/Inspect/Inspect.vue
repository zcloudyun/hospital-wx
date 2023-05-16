<template>
  <div class="page">
    <cpnavbar-vue title="检查报告" />
    <div class="header">
      <div style="display:flex;">
        <span>检查项目</span>
        <span style="font-size:12px;color:#888888;margin-left:110px;">检查时间: {{form.date}}</span>
      </div>
      <div class="title">{{form.name}}</div>
    </div>
    <div class="content">
      <el-form :model="form" label-position="top">
          <el-form-item label="检查结果">
            <el-input
              v-model="form.checkinfo"
              type="textarea"
              readonly="true"
            />
          </el-form-item>
          <el-form-item label="备注">
           <el-input
              v-model="form.remark"
              type="textarea"
              readonly="true"
            />
          </el-form-item>
          <el-form-item label="检查材料">
            <el-image v-for="(one,index) in form.url" :key="index"
              style="width: 100px; height: 100px"
              :src="one"
              :zoom-rate="1.2"
              :preview-src-list="srcList"
              :initial-index="4"
              fit="cover"
            />
          </el-form-item>
        </el-form>
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
      srcList:[],
      form:{
        date:'',
        name:'',
        checkinfo:'',
        remark:'',
        url:[]
      }
    }
  },
  methods: {
    searchByRecord(){
      let that=this;
      let data={recordId:that.recordId}
      that.$http('/inspect_record/searchByRecordId','post',data,true,function(res){
        console.log(res);
        if(res.code==200){
           let result=res.result;
           that.form.checkinfo=result.checkinfo;
           that.form.name=result.name;
           that.form.date=result.date.replace("T"," ");
           that.form.remark=result.remark;
           let img=result.file;
           img.forEach(item=>{
             that.form.url.push(`${that.$minioUrl}/${item.path}`)
           })
           that.srcList=that.form.url;
        }
      })
    },
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