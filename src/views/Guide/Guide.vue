<template>
  <div class="page">
    <!-- <CpnavbarVue title="智能导诊"/> -->
    <div class="guide">
    <!--头-->
    <header class="mui-bar mui-bar-nav">
      <!--选项-->
      <div class="option">
        <!--身体部位-->
        <div class="bodyParts" @click="bodyParts" ref="bodyParts">
          身体部位
        </div>
        <!--列表-->
        <div id="examList" class="examList" @click="examList" ref="examList">
          列表
        </div>
      </div>
    </header>
    <!--当系统检测到在header头下第一次检测到mui-content时，会默认45左右间隔距离-->
    <div id="content" class="mui-content" ref="content">
      <!--sex-->
      <div class="sex" ref="sex">
        <div id="man" class="man" ref="man" @click="man">男</div>
        <div id="woman" class="woman" ref="woman" @click="woman">女</div>
      </div>
      <!--age-->
      <div class="age" ref="age">
        <div id="child" class="child" ref="child" @click="child">儿童</div>
        <div id="adult" class="adult" ref="adult" @click="adult">成人</div>
      </div>
      <!--人体图片-->
      <div class="picture">
        <img
          id="imaPic"
          :src="person"
          style="margin-left: 3%; margin-right: 10%; position: absolute"
          ref="imaPic"
        />
        <!--头部-->
        <div id="head" class="head" ref="head" @click="head"></div>
        <!--颈部-->
        <div id="neck" class="neck" ref="neck" @click="neck"></div>
        <!--胸部-->
        <div id="bosom" class="bosom" ref="bosom" @click="bosom"></div>
        <!--腹部-->
        <div id="belly" class="belly" ref="belly" @click="belly"></div>
        <!--上肢左-->
        <div class="upperLimbLeft" ref="upperLimbLeft" @click="upperLimbLeft"></div>
        <!--上肢右-->
        <div class="upperLimbRight" ref="upperLimbRight" @click="upperLimbRight"></div>
        <!--生殖器-->
        <div class="genitals" ref="genitals" @click="genitals"></div>
        <!--下肢-->
        <div class="lowerLimbs" ref="lowerLimbs" @click="lowerLimbs"></div>
      </div>
      <div class="zhuanshen" ref="zhuanshen" @click="zhuanshen">
        <img class="zhuanshen" :src="zhuanshenImg" width="10%" height="7%" />
      </div>
    </div>
    <div class="mui-content" style="display: none" ref="content1">
      <div>
        <div class="mui-content">
          <div class="mui-row">
            <div ref="lie1" class="mui-col-sm-6 mui-col-xs-12">
                <li class="mui-table-view-cell" v-for="(one,index) in arra" :key="index">
                    <p @click="onClickP(index)" class="mui-navigate-right">{{one}}</p>
                </li>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--整体-->
    <div class="main" ref="main" style="display =block;">
      <!--左侧半透明-->
      <div class="leftMain" ref="meng" @click="meng">
        <img class="ima" :src="right" width="20%" height="5%" />
      </div>
      <!--右侧列表选项-->
      <div class="rightMain">
        <div class="zhengZhuang">
          <p style="color: #007afc" ref="buwei">部位</p>
        </div>
        <div style="width: 100%; height: 1px; background: gray"></div>
        <div class="mui-content">
          <div class="mui-row">
            <div  class="mui-col-sm-6 mui-col-xs-12" ref="lie">
                <li class="mui-table-view-cell" v-for="(one,i) in ary" :key="i">
                    <a class='mui-navigate-right' @click="onLink(y,i,isSex,isAge)">{{one}}</a>
                </li>
            </div>
          </div>
        </div>
      </div>
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
      person: `${this.$minioUrl}/patient-wx/Guide/man.png`,
      right: `${this.$minioUrl}/patient-wx/Guide/right.png`,
      zhuanshenImg: `${this.$minioUrl}/patient-wx/Guide/zhuanshen.png`,
      isSex: 1, //1男，2女
      isAge: 1, //1小孩 2 成人
      isZhuan: 1, //1为正面，2为反面
      ary:[],
      y:'',
      wH: window.innerHeight > 0 ? window.innerHeight: document.documentElement.clientHeight,
      array: [
        ["腮腺肿大", "头晕", "耳痛", "语言障碍", "头痛", "面部疼痛"],
        ["甲状腺肿大", "吞咽困难", "咽喉疼痛", "颈部疼痛或僵硬"],
        ["咳痰","肩部疼痛","喘鸣","咳嗽","心悸","咯血","呼吸困难","胸痛",],
        ["腰痛"],
        ["食欲异常","打嗝","腹痛","呕血与黑硬","腹部肿胀","腹泻","胃肠胀气","反酸","恶心呕吐",],
        ["早泄", "阳痿"],
        ["手腕疼痛"],
        ["膝关节疼痛", "踝部肿胀", "髋关节疼痛"],
        ["红肿", "指甲问题"],
        ["红斑","皮疹","脱发","皮肤瘙痒","皮肤损伤","皮肤变色与色素痣","鳞屑","脓疱疹","皮肤溃疡","皮肤肿块",],
        ["口臭","嘴唇紫钳","牙齿异常","鼻塞流涕","眼睛红","眼睛干涩","牙痛","视力下降","眼球突出","眼痛",
          "白瞳症","嘴疼","听力下降","耳鸣","眼屎多","流泪","流鼻血",],
        ["多汗症","黄疸","水肿","疲劳","血压高","周身疼痛","低血压","出血倾向","感觉不适","消瘦","肥胖",
          "震颤和抽搐","婴儿夜惊","失眠","思维和感觉混乱","不育","焦虑","神经衰弱","抑郁","发热","晕厥",
        ],
      ],
      arra: ["头部","颈部","胸部","背部","腹部","生殖器","上肢","下肢","四肢","皮肤","耳眼口鼻", "其他"],
    };
  },
  mounted: function () {
    //动态设置content高度
    this.wH = document.body.scrollHeight;
    this.$refs.content.style.width = "100%";
    this.$refs.content1.style.width = "100%";
    this.$refs.content.style.height = this.wH + "px";
    this.$refs.main.style.width = "100%";
    this.$refs.main.style.height = this.wH + "px";
    this.$refs.main.style.display = "none";
    this.$refs.main.style.right = -window.innerWidth + "px";
    this.$refs.main.style.display = "none";
  },
  methods: {
    //身体部位
    bodyParts: function () {
      this.$refs.bodyParts.style.background = "#007AFC";
      this.$refs.bodyParts.style.color = "white";
      this.$refs.examList.style.background = "#AAAAAA";
      this.$refs.examList.style.color = "black";
      this.$refs.content.style.display = "";
      this.$refs.content1.style.display = "none";
      this.wH = document.body.scrollHeight;
      this.$refs.main.style.height = this.wH + "px";
    },
    //列表
    examList: function () {
      this.$refs.examList.style.background = "#007AFC";
      this.$refs.examList.style.color = "white";
      this.$refs.bodyParts.style.background = "#AAAAAA";
      this.$refs.bodyParts.style.color = "black";
      this.$refs.content1.style.display = "";
      this.$refs.content.style.display = "none";
      this.forVa();
    },
    forVa: function () { 
      this.wH = document.body.scrollHeight;
      this.$refs.content1.style.height = this.wH + "px";
    },
    forValues: function (ary, str, y) {
      this.wH = document.body.scrollHeight;
      this.$refs.main.style.height = this.wH + "px";
      this.$refs.main.style.display = "";
      this.$refs.lie.style.height = this.wH - 44 + "px";
      this.$refs.lie.style.overflow = "scroll";
      this.$refs.buwei.innerHTML = str;
      this.ary=ary;
      this.y=y;
      setTimeout(function () {
        document.body.scrollTop = 0;
      }, 300);
    },
    meng: function () {
      let that = this;
      this.$refs.main.style.right = -window.innerWidth + "px";
      setTimeout(function () {
        that.$refs.main.style.display = "none";
        that.$refs.main.style.right = "0px";
      }, 100);
    },
    mainStyle:function(){
      this.$refs.main.style.display = "block";
      this.$refs.main.style.right = "0px";
    },
    //头部
    head: function () {
      this.mainStyle();
      let array=this.array[0]
      this.forValues(array, "头部", 1);
    },
    //颈
    neck: function () {
      this.mainStyle();
      let array=this.array[1];
      this.forValues(array, "颈部", 2);
    },
    //胸部
    bosom: function () {
      this.mainStyle();
      if (this.isZhuan == 1) {
        let array=[]
        if (this.isAge == 1 && this.isSex == 2) {
          array = ["咳痰","乳房肿块","肩部疼痛","喘鸣","乳房疼痛","咳嗽","心悸","咯血","呼吸困难","胸痛"];
          this.array[2]=array;
        } 
        else {
          array = ["咳痰","肩部疼痛","喘鸣","咳嗽","心悸","咯血","呼吸困难","胸痛"];
          this.array[2]=array;
        }
        this.forValues(array, "胸部", 3);
      } else if (this.isZhuan == 2) {
        let array=this.array[3];
        this.forValues(array, "背部", 4);
      }
    },
    //腹部
    belly: function () {
      this.mainStyle();
      if (this.isZhuan == 1) {
        let array=this.array[4];
        if (this.isAge == 1 && this.isSex == 2) {
          array = ["食欲异常","打嗝","腹痛","呕血与黑硬","痛经","腹部肿胀","腹泻","胃肠胀气","反酸","恶心呕吐",];
        } else {
          array = ["食欲异常","打嗝", "腹痛","呕血与黑硬","腹部肿胀","腹泻", "胃肠胀气","反酸","恶心呕吐",];
        }

        this.forValues(array, "腹部", 5);
      } else if (this.isZhuan == 2) {
        let array=this.array[3];
        this.forValues(array, "背部", 4);
      }
    },
    //左上肢
    upperLimbLeft: function () {
      this.mainStyle();
      let array=this.array[6];
      this.forValues(array, "左上肢", 7);
    },
    //右上肢
    upperLimbRight: function () {
      this.mainStyle();
      let array=this.array[6];
      this.forValues(array, "右上肢", 7);
    },
    //生殖器
    genitals: function () {
      this.mainStyle();
      if (this.isZhuan == 1) {
        let array=this.array[5];
        if (this.isAge == 2) {
          array =[];
          this.forValues(array, "生殖器", 6);
        } 
        else if (this.isAge == 1) {
          if (this.isSex == 1) {
            this.forValues(array, "生殖器", 6);
          } else if (this.isSex == 2) {
            array = ["月经过多", "白带异常", "月经不调", "闭经", "阴道出血"];
            this.forValues(array, "生殖器", 6);
          }
        }
      }
    },
    //下肢
    lowerLimbs: function () {
      this.mainStyle();
      let array=this.array[7];
      this.forValues(array, "下肢", 8);
    },
    man: function () {
      let that = this;
      that.$refs.man.style.background = "#007AFC";
      that.$refs.man.style.color = "white";
      that.$refs.woman.style.background = "none";
      that.$refs.woman.style.color = "black";
      that.isSex = 1;
      if (that.isAge == 1) {
        //     //动态改变div的位置
        that.$refs.head.style.top = "3%";
        that.$refs.head.style.height = "12%";
        that.$refs.head.style.width = "16%";
        that.$refs.head.style.marginLeft = "43%";
        that.$refs.neck.style.top = "15%";
        that.$refs.neck.style.height = "5%";
        that.$refs.bosom.style.top = "20%";
        that.$refs.bosom.style.height = "8%";
        that.$refs.belly.style.top = "33%";
        that.$refs.belly.style.height = "10%";
        that.$refs.upperLimbLeft.style.top = "20%";
        that.$refs.upperLimbLeft.style.height = "37%";
        that.$refs.upperLimbRight.style.top = "20%";
        that.$refs.upperLimbRight.style.height = "37%";
        that.$refs.genitals.style.top = "43.5%";
        that.$refs.genitals.style.height = "10%";
        that.$refs.lowerLimbs.style.top = "54%";
        that.$refs.lowerLimbs.style.height = "43%";
        if (that.isZhuan == 1) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/man.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        } else if (that.isZhuan == 2) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/manZ.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        }
      } else if (that.isAge == 2) {
        //动态改变div的位置
        that.$refs.head.style.top = "4%";
        that.$refs.head.style.height = "22.5%";
        that.$refs.head.style.width = "31%";
        that.$refs.head.style.marginLeft = "33%";
        that.$refs.neck.style.top = "27%";
        that.$refs.neck.style.height = "6.5%";
        that.$refs.bosom.style.top = "34%";
        that.$refs.bosom.style.height = "8.5%";
        that.$refs.belly.style.top = "46%";
        that.$refs.belly.style.height = "9%";
        that.$refs.upperLimbLeft.style.top = "32%";
        that.$refs.upperLimbLeft.style.height = "32%";
        that.$refs.upperLimbRight.style.top = "32%";
        that.$refs.upperLimbRight.style.height = "32%";
        that.$refs.genitals.style.top = "55%";
        that.$refs.genitals.style.height = "9.5%";
        that.$refs.lowerLimbs.style.top = "65%";
        that.$refs.lowerLimbs.style.height = "31%";
        if (that.isZhuan == 1) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/boy.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        } else if (that.isZhuan == 2) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/boyZ.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        }
      }
    },
    woman: function () {
      let that = this;
      that.$refs.woman.style.background = "#007AFC";
      that.$refs.woman.style.color = "white";
      that.$refs.man.style.background = "none";
      that.$refs.man.style.color = "black";
      that.isSex = 2;
      if (that.isAge == 1) {
        //动态改变div的位置
        that.$refs.head.style.top = "2%";
        that.$refs.head.style.height = "12%";
        that.$refs.head.style.width = "16%";
        that.$refs.head.style.marginLeft = "43%";
        that.$refs.neck.style.top = "14%";
        that.$refs.neck.style.height = "5%";
        that.$refs.bosom.style.top = "21%";
        that.$refs.bosom.style.height = "8.5%";
        that.$refs.belly.style.top = "34%";
        that.$refs.belly.style.height = "7.5%";
        that.$refs.upperLimbLeft.style.top = "20%";
        that.$refs.upperLimbLeft.style.height = "32%";
        that.$refs.upperLimbRight.style.top = "20%";
        that.$refs.upperLimbRight.style.height = "32%";
        that.$refs.genitals.style.top = "42%";
        that.$refs.genitals.style.height = "7%";
        that.$refs.lowerLimbs.style.top = "49.5%";
        that.$refs.lowerLimbs.style.height = "47%";
        if (that.isZhuan == 1) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/woman.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        } else if (that.isZhuan == 2) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/womanZ.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        }
      } else if (that.isAge == 2) {
        //动态改变div的位置
        that.$refs.head.style.top = "4%";
        that.$refs.head.style.height = "22.5%";
        that.$refs.head.style.width = "31%";
        that.$refs.head.style.marginLeft = "33%";
        that.$refs.neck.style.top = "27%";
        that.$refs.neck.style.height = "6.5%";
        that.$refs.bosom.style.top = "34%";
        that.$refs.bosom.style.height = "8.5%";
        that.$refs.belly.style.top = "46%";
        that.$refs.belly.style.height = "9%";
        that.$refs.upperLimbLeft.style.top = "32%";
        that.$refs.upperLimbLeft.style.height = "32%";
        that.$refs.upperLimbRight.style.top = "32%";
        that.$refs.upperLimbRight.style.height = "32%";
        that.$refs.genitals.style.top = "55%";
        that.$refs.genitals.style.height = "9.5%";
        that.$refs.lowerLimbs.style.top = "65%";
        that.$refs.lowerLimbs.style.height = "31%";
        if (that.isZhuan == 1) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/girl.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        } else if (that.isZhuan == 2) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/girlZ.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        }
      }
    },
    child: function () {
      let that = this;
      that.$refs.child.style.background = "#007AFC";
      that.$refs.child.style.color = "white";
      //动态改变div的位置
      that.$refs.head.style.top = "4%";
      that.$refs.head.style.height = "22.5%";
      that.$refs.head.style.width = "31%";
      that.$refs.head.style.marginLeft = "33%";
      that.$refs.neck.style.top = "27%";
      that.$refs.neck.style.height = "6.5%";
      that.$refs.bosom.style.top = "34%";
      that.$refs.bosom.style.height = "8.5%";
      that.$refs.belly.style.top = "46%";
      that.$refs.belly.style.height = "9%";
      that.$refs.upperLimbLeft.style.top = "32%";
      that.$refs.upperLimbLeft.style.height = "32%";
      that.$refs.upperLimbRight.style.top = "32%";
      that.$refs.upperLimbRight.style.top = "32%";
      that.$refs.upperLimbRight.style.height = "32%";
      that.$refs.genitals.style.top = "55%";
      that.$refs.genitals.style.height = "9.5%";
      that.$refs.lowerLimbs.style.top = "65%";
      that.$refs.lowerLimbs.style.height = "31%";

      that.$refs.adult.style.background = "none";
      that.$refs.adult.style.color = "black";
      that.isAge = 2;
      if (that.isSex == 1) {
        if (that.isZhuan == 1) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/boy.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        } else if (that.isZhuan == 2) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/boyZ.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        }
      } else if (that.isSex == 2) {
        if (that.isZhuan == 1) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/girl.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        } else if (that.isZhuan == 2) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/girlZ.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        }
      }
    },
    adult: function () {
      let that = this;
      that.$refs.adult.style.background = "#007AFC";
      that.$refs.adult.style.color = "white";
      //动态改变div的位置
      that.$refs.head.style.top = "3%";
      that.$refs.head.style.height = "12%";
      that.$refs.head.style.width = "16%";
      that.$refs.head.style.marginLeft = "43%";
      that.$refs.neck.style.top = "15%";
      that.$refs.neck.style.height = "5%";
      that.$refs.bosom.style.top = "20%";
      that.$refs.bosom.style.height = "8%";
      that.$refs.belly.style.top = "33%";
      that.$refs.belly.style.height = "10%";
      that.$refs.upperLimbLeft.style.top = "20%";
      that.$refs.upperLimbLeft.style.height = "37%";
      that.$refs.upperLimbRight.style.top = "20%";
      that.$refs.upperLimbRight.style.height = "37%";
      that.$refs.genitals.style.top = "43.5%";
      that.$refs.genitals.style.height = "10%";
      that.$refs.lowerLimbs.style.top = "54%";
      that.$refs.lowerLimbs.style.height = "43%";

      that.$refs.child.style.background = "none";
      that.$refs.child.style.color = "black";
      that.isAge = 1;
      if (that.isSex == 1) {
        if (that.isZhuan == 1) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/man.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        } else if (that.isZhuan == 2) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/manZ.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        }
      } else if (that.isSex == 2) {
        if (that.isZhuan == 1) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/woman.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        } else if (that.isZhuan == 2) {
          that.$refs.imaPic.style.opacity = "0.1";
          setTimeout(function () {
            that.person = `${that.$minioUrl}/patient-wx/Guide/womanZ.png`;
            that.$refs.imaPic.style.opacity = "1";
          }, 100);
        }
      }
    },
    //转身更改图片
    zhuanshen: function () {
      let that = this;
      if (that.isSex == 1 && that.isAge == 1 && that.isZhuan == 1) {
        //男，成人，正面
        that.isZhuan = 2;
        that.$refs.imaPic.style.animation = "1.2s linear 1 xunzhuan";
        that.$refs.imaPic.style.opacity = "0";
        setTimeout(function () {
          that.person = `${that.$minioUrl}/patient-wx/Guide/manZ.png`;
          that.$refs.imaPic.style.opacity = "1";
          that.$refs.imaPic.style.animation = "";
        }, 200);
      } else if (that.isSex == 1 && that.isAge == 1 && that.isZhuan == 2) {
        //男，成人，反面
        that.isZhuan = 1;
        that.$refs.imaPic.style.animation = "1.2s linear 1 xunzhuan";
        that.$refs.imaPic.style.opacity = "0";
        setTimeout(function () {
          that.person = `${that.$minioUrl}/patient-wx/Guide/man.png`;
          that.$refs.imaPic.style.opacity = "1";
          that.$refs.imaPic.style.animation = "";
        }, 200);
      } else if (that.isSex == 1 && that.isAge == 2 && that.isZhuan == 1) {
        //男，儿童，正面
        that.isZhuan = 2;
        that.$refs.imaPic.style.animation = "1.2s linear 1 xunzhuan";
        that.$refs.imaPic.style.opacity = "0.1";
        setTimeout(function () {
          that.person = `${that.$minioUrl}/patient-wx/Guide/boyZ.png`;
          that.$refs.imaPic.style.opacity = "1";
          that.$refs.imaPic.style.animation = "";
        }, 200);
      } else if (that.isSex == 1 && that.isAge == 2 && that.isZhuan == 2) {
        //男，儿童，反面
        that.isZhuan = 1;
        that.$refs.imaPic.style.animation = "1.2s linear 1 xunzhuan";
        that.$refs.imaPic.style.opacity = "0.1";
        setTimeout(function () {
          that.person = `${that.$minioUrl}/patient-wx/Guide/boy.png`;
          that.$refs.imaPic.style.opacity = "1";
          that.$refs.imaPic.style.animation = "";
        }, 200);
      } else if (that.isSex == 2 && that.isAge == 1 && that.isZhuan == 1) {
        //女，成人，正面
        that.isZhuan = 2;
        that.$refs.imaPic.style.animation = "1.2s linear 1 xunzhuan";
        that.$refs.imaPic.style.opacity = "0.1";
        setTimeout(function () {
          that.person = `${that.$minioUrl}/patient-wx/Guide/womanZ.png`;
          that.$refs.imaPic.style.opacity = "1";
          that.$refs.imaPic.style.animation = "";
        }, 200);
      } else if (that.isSex == 2 && that.isAge == 1 && that.isZhuan == 2) {
        //女，成人，反面
        that.isZhuan = 1;
        that.$refs.imaPic.style.animation = "1.2s linear 1 xunzhuan";
        that.$refs.imaPic.style.opacity = "0.1";
        setTimeout(function () {
          that.person = `${that.$minioUrl}/patient-wx/Guide/woman.png`;
          that.$refs.imaPic.style.opacity = "1";
          that.$refs.imaPic.style.animation = "";
        }, 200);
      } else if (that.isSex == 2 && that.isAge == 2 && that.isZhuan == 1) {
        //女，儿童，正面
        that.isZhuan = 2;
        that.$refs.imaPic.style.animation = "1.2s linear 1 xunzhuan";
        that.$refs.imaPic.style.opacity = "0.1";
        setTimeout(function () {
          that.person = `${that.$minioUrl}/patient-wx/Guide/girlZ.png`;
          that.$refs.imaPic.style.opacity = "1";
          that.$refs.imaPic.style.animation = "";
        }, 200);
      } else if (that.isSex == 2 && that.isAge == 2 && that.isZhuan == 2) {
        //女，儿童，反面
        that.isZhuan = 1;
        that.$refs.imaPic.style.animation = "1.2s linear 1 xunzhuan";
        that.$refs.imaPic.style.opacity = "0.1";
        setTimeout(function () {
          that.person = `${that.$minioUrl}/patient-wx/Guide/girl.png`;
          that.$refs.imaPic.style.opacity = "1";
          that.$refs.imaPic.style.animation = "";
        }, 200);
      }
    },
    onClickP: function (va) {
      this.mainStyle();
      let array=this.array;
      if (va == 5) {
        array[va] = "";
      } else if (va == 2) {
        array[va] = ["咳痰","肩部疼痛","喘鸣","咳嗽","心悸","咯血","呼吸困难","胸痛",];
      } 
      else if (va == 4) {
        array[4] = ["食欲异常","打嗝","腹痛","呕血与黑硬","腹部肿胀","腹泻","胃肠胀气","反酸","恶心呕吐",];
      }
      this.forValues(array[va], this.arra[va], va + 1);
    },
    onLink(y,i,isSex,isAge){
        this.$router.push({
            path: '/index1',
            query:{y:y,i:i,isSex:isSex,isAge:isAge}
        })
    }
  },
};
</script>
<style scoped lang="less">
@import "./css/exam.css";
@import "./css/option.css";
@import "./css/style.css";
@import "./css/mui.min.css";
.page{
  width: 100%;
  height: 100%;
}
#imaPic {
  width: 100%;
  height: 100%;
}
.mui-navigate-right:after{
    right: 15px;
    content: '>';
}
</style>