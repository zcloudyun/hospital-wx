<template>
  <div id="doctor">
    <div id="doc_main">
      <el-row>
        <el-col :span="4" class="menu">
          <!-- <div class="menu"> -->
          <el-row class="tac">
            <el-col :span="18" :offset="6">
              <el-menu
                class="el-menu-vertical-demo"
                background-color="rgba(0,0,0,0)"
                text-color="#797979"
                active-text-color="#ffd04b"
                :router="true"
                :default-active="defaultActive"
              >
                <!-- 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
                <!-- 当前激活的菜单选项是当前的路径，保证刷新的时候激活样式不掉 -->
                <el-menu-item index="/userinfo">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">实名绑卡</span>
                </el-menu-item>
                <el-menu-item index="/notice">
                  <i class="el-icon-s-order"></i>
                  <span slot="title">预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/usercamera">
                  <i class="el-icon-s-ticket"></i>
                  <span slot="title">人脸识别</span>
                </el-menu-item>
                <el-menu-item index="/userpatientinfo">
                  <i class="el-icon-document"></i>
                  <span slot="title">家庭档案</span>
                </el-menu-item>
                <el-menu-item index="/prescription">
                  <i class="el-icon-document"></i>
                  <span slot="title">电子处方</span>
                </el-menu-item>
                <el-menu-item index="/resigtion_info">
                  <i class="el-icon-edit-outline"></i>
                  <span slot="title">挂号记录</span>
                </el-menu-item>
                <el-menu-item index="/doctor/counsel">
                  <i class="el-icon-question"></i>
                  <span slot="title">就诊咨询</span>
                </el-menu-item>
                <el-menu-item index="/doctor/counsel">
                  <i class="el-icon-question"></i>
                  <span slot="title">就诊评价</span>
                </el-menu-item>
                <el-menu-item index="/doctor/personal">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="/guide">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">智能导诊</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
          <!-- </div> -->
        </el-col>
        <!-- 定义医生功能模块左侧菜单部分 -->

        <el-col :span="20" class="content">
          <!-- <div> -->
          <router-view></router-view>
          <!-- </div> -->
        </el-col>
        <!-- 右侧展示内容，根据菜单的点击进行路由跳转 -->
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    
  },
  computed: {
    defaultActive() {
      let pathArr = this.$route.path.split("/");
      let activePath = "/" + pathArr[1] + "/" + pathArr[2];
      return activePath;
    },

    //控制element-ui navmenu组件的default-active属性，因为这里有子路由，所以如果只是简单的定义 :default-active="$route.path",那么在子路由状态下如果刷新的话就会丢失激活的状态，我们使用一个计算属性 保证在子路由状态下刷新也有激活状态
  },
};
</script>
<style lang="scss" scoped>
#doctor {
  width: 100%;
  height: 100%;
  min-height: 800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  #doc_main {
    width: 100%;
    //  height: 90%;
    background: #f2f0db;
    flex: 1;
  }

  .el-row {
    height: 100%;
  }
  .menu {
    height: 100%;
    background: rgba($color: #fdfdfe, $alpha: 0.7);
    position: relative;

    .menu_tit {
      height: 120px;
      font-size: 26px;
      color: #88e8dd;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 2px solid #88e8dd;
    }
    .user {
      display: flex;
      width: 100%;
      height: 120px;
      border-top: 2px solid #797979;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 0px;
      em {
        margin-left: 14px;
      }
    }
  }
  .content {
    padding: 35px 50px;
    box-sizing: border-box;
    height: 100%;
    > div {
      height: 100%;
    }
  }
  #doc_bot {
    height: 60px;
    width: 100%;
    .exit {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      em {
        margin-left: 17px;
      }
    }
    .setup {
      display: flex;
      justify-content: space-evenly;
      margin-top: 10px;
    }
  }
}
</style>
<style lang="scss">
.el-menu-item.is-active {
  color: #16dcb8 !important;
}
</style>
