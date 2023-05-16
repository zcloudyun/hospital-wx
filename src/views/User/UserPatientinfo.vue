<template>
  <div class="patient-page">
    <CpnavbarVue :title="家庭档案" />
    <!-- 头部选择提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div class="patient-item" v-for="item in patientList" :key="item.id" @click="selectedPatient(item)"
        :class="{ selected: patientId === item.id }">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div @click="showPopup(item)" class="icon">
          <cp-icon name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" v-if="patientList.length < 6" @click="showPopup()">
        <el-icon><Plus /></el-icon>
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 患者选择下一步 -->
    <div class="patient-next" v-if="patientId">
      <van-button type="primary" round block v-if="isChange" @click="next">下一步</van-button>
    </div>
    <!-- 侧边栏 -->
    <van-popup v-model:show="show" position="right">
      <cp-nav-bar :title="patient.id ? '编辑患者' : '添加患者'" right-text="保存" @click-right="submit" :back="closeDialog">
      </cp-nav-bar>
      <!-- 表单 -->
      <van-form autocomplete="off">
        <van-field v-model="patient.name" label="真实姓名" placeholder="请输入真实姓名" />
        <van-field v-model="patient.idCard" label="身份证号" placeholder="请输入身份证号" />
        <van-field label="性别">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn :options="options" v-model="gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button type="danger" text="删除" @click="remove"></van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>
<script>
import { computed } from 'vue'
import CpnavbarVue from '../../components/Cpnavbar.vue'
export default{
    components:{CpnavbarVue},
    data(){
        return{
           patientList : [],
           options : [
                { label: '男', value: 1 },
                { label: '女', value: 0 }
           ],
           gender :1,
           // 准备默认值
           patient: {
                name: '',
                idCard: '',
                gender: 1,
                defaultFlag: 0
            },
        }
    }
}
</script>

<style lang='scss' scoped>
.patient-page {
  padding: 46px 0 80px;
}

.patient-change {
  padding: 15px;
  >h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  >p {
    color: #6f6f6f;
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}

.patient-list {
  padding: 15px;
}

.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f6f7f9;
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid #f6f7f9;
  transition: all 0.3s;
  overflow: hidden;

  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    span {
      color: #c3c3c5;
      margin-right: 20px;
      line-height: 30px;

      &.name {
        font-size: 16px;
        color: #121826;
        width: 80px;
        margin-right: 0;
      }

      &.id {
        color: #3c3e42;
        width: 180px;
      }
    }
  }

  .icon {
    color: #848484;
    width: 20px;
    text-align: center;
  }

  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: #16c2a3;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.selected {
    border-color: #16c2a3;
    background-color: #eaf8f6;

    .icon {
      color: #16c2a3;
    }
  }
}

.patient-add {
  background-color: #f6f7f9;
  color: #16c2a3;
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;

  .cp-icon {
    font-size: 24px;
  }
}

.patient-tip {
  color: #848484;
  padding: 12px 0;
}

.patient-page {
  padding: 46px 0 80px;

  ::v-deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}
.el-input__wrapper {
    width: 92%;
}
</style>
