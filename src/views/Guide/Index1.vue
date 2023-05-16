<template>
  <div class="index1">
    <ul ref="uli" class="chat-thread">
      <li ref="zz">部位/症狀</li>
      <li>
        <div>
          <p ref="wen">不舒服了是吧？</p>
          <div class="btn">
            <button name="btnYes" ref="btnYes" @click="btnYes()" class="liBtn">
              是
            </button>
            <button name="btnNo" ref="btnNo" @click="btnNo()" class="liBtn" :disabled="isViliable">
              否
            </button>
          </div>
        </div>
      </li>
      <li v-for="(one,index) in messList" :key="index" >
        <div>
          <p ref="wen" :style="index%2==0?'color:black':''">{{one}}</p>
          <div class="btn" v-if="index%2 !==0">
            <button name="btnYes" ref="btnYes" @click="btnYes()" class="liBtn">
              是
            </button>
            <button name="btnNo" ref="btnNo" @click="btnNo()" class="liBtn" v-if="isNo==1 || index!==messList.length-1">
              否
            </button>
            <button name="btnNo" ref="btnNo" @click="btnNo()" class="liBtn" v-if="isNo==2 && index==messList.length-1" style="display:none">
              否
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 1,
      noList:[],
      messList:[],
      isNo:1,
      isViliable:false
    };
  },
  mounted() {
    this.getQuery();
  },
  methods: {
    getQuery: function () {
      const { y, i, isSex, isAge } = this.$route.query;
      const zz = this.$refs.zz;
      const wen = this.$refs.wen;
      const yes = document.getElementsByName("btnYes");
      const no = document.getElementsByName("btnNo");
      if (y != null && y != "") {
        if (y == 1) {
          if (i == 0) {
            zz.innerHTML = "头部，腮腺肿大";
            wen.innerHTML =
              "是否伴有发热，皮肤潮红、局部水肿，有压痛，按压腺体有脓液流入口腔，腺体肿大可伴有暂时性面瘫？";
          } else if (i == 1) {
            zz.innerHTML = "头部，头晕";
            wen.innerHTML =
              "是否伴有四肢无力，部分身体麻木，视觉模糊，语言困难？";
          } else if (i == 2) {
            zz.innerHTML = "头部，耳痛";
            wen.innerHTML = "最近是否感冒？";
          } else if (i == 3) {
            zz.innerHTML = "头部，语言障碍";
            wen.innerHTML = "是否伴有先天的听力障碍？";
            this.isNo=2;
          } else if (i == 4) {
            zz.innerHTML = "头部，头痛";
            wen.innerHTML = "是否有药物或酒精摄入史？";
          } else if (i == 5) {
            zz.innerHTML = "头部，面部疼痛";
            wen.innerHTML = "是否面部出现水疱样皮疹？";
          }
        } 
        else if (y == 2) {
          if (i == 0) {
            zz.innerHTML = "颈部，甲状腺肿大";
            wen.innerHTML =
              "发生于青春发育期、妊娠期或哺乳期，甲状腺轻度或中度肿大，表面光滑，质地柔软，甲状腺功能检查正常？";
          } else if (i == 1) {
            zz.innerHTML = "颈部，吞咽困难";
            wen.innerHTML = "是否有咽喉疼痛？是否有感冒症状？";
          } else if (i == 2) {
            zz.innerHTML = "颈部，咽喉疼痛";
            wen.innerHTML = "是否伴有头痛、咳嗽、全身疼痛或发热？";
          } else if (i == 3) {
            zz.innerHTML = "颈部，颈部疼痛或僵硬";
            wen.innerHTML = "是否一觉醒来后发觉颈部疼痛或僵硬？";
          }
        } 
        else if (y == 3) {
          if (isSex == 2 && isAge == 1) {
            if (i == 0) {
              zz.innerHTML = "胸部，咳痰";
              wen.innerHTML =
                "是否反复发作、呼吸困难、喘鸣音、伴胸闷、烦躁不安？";
            } else if (i == 1) {
              zz.innerHTML = "胸部，乳房肿块";
              wen.innerHTML =
                "是否双侧乳房都有许多小包块。较小，而且容易移动？";
            } else if (i == 2) {
              zz.innerHTML = "胸部，肩部疼痛";
              wen.innerHTML =
                "疼痛是否伴有胸痛、颈部或手臂疼痛或针刺感，甚至呼吸短促、眩晕、大汗？";
            } else if (i == 3) {
              zz.innerHTML = "胸部，喘鸣";
              wen.innerHTML =
                "是否在吸进了冷空气、粉尘、烟雾、花粉等之后而发作？";
            } else if (i == 4) {
              zz.innerHTML = "胸部，乳房疼痛";
              wen.innerHTML = "是否在怀孕期间？";
            } else if (i == 5) {
              zz.innerHTML = "胸部，咳嗽";
              wen.innerHTML = "是否吸入了刺激性气体或烟雾？";
            } else if (i == 6) {
              zz.innerHTML = "胸部，心悸";
              wen.innerHTML = "最近是否感觉精神压力很大？";
            } else if (i == 7) {
              zz.innerHTML = "胸部，咯血";
              wen.innerHTML = "是否伴有胸痛、咳嗽、发热？";
            } else if (i == 8) {
              zz.innerHTML = "胸部，呼吸困难";
              wen.innerHTML = "平时是否就有呼吸短促，不管咳嗽与否都会出现？";
            } else if (i == 9) {
              zz.innerHTML = "胸部，胸痛";
              wen.innerHTML =
                "是否是压榨性疼痛或者感觉胸部被撕裂一样的疼痛，可放射至颈、肩或臂？";
            }
          } else {
            if (i == 0) {
              zz.innerHTML = "胸部，咳痰";
              wen.innerHTML =
                "是否反复发作、呼吸困难、喘鸣音、伴胸闷、烦躁不安？";
            } else if (i == 1) {
              zz.innerHTML = "胸部，肩部疼痛";
              wen.innerHTML =
                "疼痛是否伴有胸痛、颈部或手臂疼痛或针刺感，甚至呼吸短促、眩晕、大汗？";
            } else if (i == 2) {
              zz.innerHTML = "胸部，喘鸣";
              wen.innerHTML =
                "是否在吸进了冷空气、粉尘、烟雾、花粉等之后而发作？";
            } else if (i == 3) {
              zz.innerHTML = "胸部，咳嗽";
              wen.innerHTML = "是否吸入了刺激性气体或烟雾？";
            } else if (i == 4) {
              zz.innerHTML = "胸部，心悸";
              wen.innerHTML = "最近是否感觉精神压力很大？";
            } else if (i == 5) {
              zz.innerHTML = "胸部，咯血";
              wen.innerHTML = "是否伴有胸痛、咳嗽、发热？";
            } else if (i == 6) {
              zz.innerHTML = "胸部，呼吸困难";
              wen.innerHTML = "平时是否就有呼吸短促，不管咳嗽与否都会出现？";
            } else if (i == 7) {
              zz.innerHTML = "胸部，胸痛";
              wen.innerHTML =
                "是否是压榨性疼痛或者感觉胸部被撕裂一样的疼痛，可放射至颈、肩或臂？";
            }
          }
        } 
        else if (y == 4) {
          if (i == 0) {
            zz.innerHTML = "背部，腰痛";
            wen.innerHTML =
              "是否有腰部损伤史或在搬举重物后出现腰骶部疼痛，并向下肢后侧放射，弯腰、屈髋伸膝疼痛加剧，伴有麻木感？";
          }
        } else if (y == 5) {
          if (isSex == 2 && isAge == 1) {
            if (i == 0) {
              zz.innerHTML = "腹部，食欲异常";
              wen.innerHTML = "是否烦渴多饮、多食、多尿、消瘦及乏力？";
            } else if (i == 1) {
              zz.innerHTML = "腹部，打嗝";
              wen.innerHTML = "是否服用药物？";
            } else if (i == 2) {
              zz.innerHTML = "腹部，腹痛";
              wen.innerHTML = "是否是急性发作？";
            } else if (i == 3) {
              zz.innerHTML = "腹部，呕血与黑硬";
              wen.innerHTML =
                "是否有胃十二指肠胃溃疡病史，突然疼痛加剧，呕血后疼痛缓解？";
            } else if (i == 4) {
              zz.innerHTML = "腹部，痛经";
              wen.innerHTML = "您是否有月经淋漓不净或月经紊乱？";
              this.isNo=2;
            } else if (i == 5) {
              zz.innerHTML = "腹部，腹部肿胀";
              wen.innerHTML = "腹部是否在24小时内肿胀起来的？";
            } else if (i == 6) {
              zz.innerHTML = "腹部，腹泻";
              wen.innerHTML = "腹泻与便秘是否反复交替出现，或伴有腹胀？";
            } else if (i == 7) {
              zz.innerHTML = "腹部，胃肠胀气";
              wen.innerHTML = "是否吃饭快、大口吞咽，并饮过多碳酸饮料？";
            } else if (i == 8) {
              zz.innerHTML = "腹部，反酸";
              wen.innerHTML = "是否伴有烧心、胸痛、吞咽困难等症状？";
            } else if (i == 9) {
              zz.innerHTML = "腹部，恶心呕吐";
              wen.innerHTML = "是否为婴幼儿？";
            }
          } else {
            if (i == 0) {
              zz.innerHTML = "腹部，食欲异常";
              wen.innerHTML = "是否烦渴多饮、多食、多尿、消瘦及乏力？";
            } else if (i == 1) {
              zz.innerHTML = "腹部，打嗝";
              wen.innerHTML = "是否服用药物？";
            } else if (i == 2) {
              zz.innerHTML = "腹部，腹痛";
              wen.innerHTML = "是否是急性发作？";
            } else if (i == 3) {
              zz.innerHTML = "腹部，呕血与黑硬";
              wen.innerHTML =
                "是否有胃十二指肠胃溃疡病史，突然疼痛加剧，呕血后疼痛缓解？";
            } else if (i == 4) {
              zz.innerHTML = "腹部，腹部肿胀";
              wen.innerHTML = "腹部是否在24小时内肿胀起来的？";
            } else if (i == 5) {
              zz.innerHTML = "腹部，腹泻";
              wen.innerHTML = "腹泻与便秘是否反复交替出现，或伴有腹胀？";
            } else if (i == 6) {
              zz.innerHTML = "腹部，胃肠胀气";
              wen.innerHTML = "是否吃饭快、大口吞咽，并饮过多碳酸饮料？";
            } else if (i == 7) {
              zz.innerHTML = "腹部，反酸";
              wen.innerHTML = "是否伴有烧心、胸痛、吞咽困难等症状？";
            } else if (i == 8) {
              zz.innerHTML = "腹部，恶心呕吐";
              wen.innerHTML = "是否为婴幼儿？";
            }
          }
        } else if (y == 6) {
          if (isAge == 1) {
            //成人
            if (isSex == 1) {
              //男
              if (i == 0) {
                zz.innerHTML = "生殖器，早泄";
                wen.innerHTML = "性交时是否害怕被人发现而匆匆行事？";
              } else if (i == 1) {
                zz.innerHTML = "生殖器，阳痿";
                wen.innerHTML = "是否在第一次或前几次性交时偶尔出现？";
              }
            } else if (isSex == 2) {
              //女
              if (i == 0) {
                zz.innerHTML = "生殖器，月经过多";
                wen.innerHTML = "是否刚生完孩子？";
              } else if (i == 1) {
                zz.innerHTML = "生殖器，白带异常";
                wen.innerHTML = "是否正在服用雌性激素类药物、避孕药物？";
              } else if (i == 2) {
                zz.innerHTML = "生殖器，月经不调";
                wen.innerHTML =
                  "月经是否比平常推迟了一个星期，而且在这之前有过性交？";
              } else if (i == 3) {
                zz.innerHTML = "生殖器，闭经";
                wen.innerHTML =
                  "幼年时是否曾患肺结核或其他部位结核，第二性征正常，有时出现周期性下腹胀痛？";
              } else if (i == 4) {
                zz.innerHTML = "生殖器，阴道出血";
                wen.innerHTML = "是否有外伤史，伴有外阴血肿？";
              }
            }
          } else if (isAge == 2) {
            //小孩
          }
        } else if (y == 7) {
          if (i == 0) {
            zz.innerHTML = "上肢，手腕疼痛";
            wen.innerHTML = "疼痛是否在手部或腕部受伤后出现？";
          }
        } else if (y == 8) {
          if (i == 0) {
            zz.innerHTML = "下肢，膝关节疼痛";
            wen.innerHTML = "是否有血友病或镰刀状细胞性贫血？";
          } else if (i == 1) {
            zz.innerHTML = "下肢，踝部肿胀";
            wen.innerHTML = "疼痛是否在下肢受到打击或受到损伤后出现的？";
          } else if (i == 2) {
            zz.innerHTML = "下肢，髋关节疼痛";
            wen.innerHTML = "疼痛是否在受到撞击或打击、摔跤后出现？";
            this.isNo=2;
          }
        } else if (y == 9) {
          //					alert("四肢");
          if (i == 0) {
            zz.innerHTML = "四肢（红肿）";
            wen.innerHTML = "是否被蚊虫叮咬过？";
          } else if (i == 1) {
            zz.innerHTML = "四肢（指甲问题）";
            wen.innerHTML = "指甲周围皮肤是否伴有红肿，鳞状脱落，指甲有凹陷？";
          }
        } else if (y == 10) {
          //					alert("皮肤");
          if (i == 0) {
            zz.innerHTML = "皮肤（红斑）";
            wen.innerHTML =
              "是否经常暴露在低温下，出现红肿，遇热痒，可有水疱及溃疡？";
          } else if (i == 1) {
            zz.innerHTML = "皮肤（皮疹）";
            wen.innerHTML = "是否伴有发热，是否是小孩？";
          } else if (i == 2) {
            zz.innerHTML = "皮肤（脱发）";
            wen.innerHTML = "头发是否整体变稀？";
          } else if (i == 3) {
            zz.innerHTML = "皮肤（皮肤瘙痒）";
            wen.innerHTML =
              "是否多发生于老年人洗澡过勤，室内温度高及干燥时加重？";
          } else if (i == 4) {
            zz.innerHTML = "皮肤（皮肤损伤）";
            wen.innerHTML = "皮肤表面是否有渗出物，黄色，黄绿色或咖喱色？";
          } else if (i == 5) {
            zz.innerHTML = "皮肤（皮肤变色）";
            wen.innerHTML = "皮肤是否经常暴露在强烈阳光下？";
          } else if (i == 6) {
            zz.innerHTML = "皮肤（鳞屑）";
            wen.innerHTML =
              "是否颜面，手足或全身弥漫性红肿，肿胀消退后出现脱屑，手足部呈破手套或破袜套样脱落没头发，指甲亦可见脱落？";
          } else if (i == 7) {
            zz.innerHTML = "皮肤（脓疱疹）";
            wen.innerHTML =
              "是否发生在新生儿，疱疹破溃后形成红色糜烂面，伴有发热，体温可达39°C以上？";
          } else if (i == 8) {
            zz.innerHTML = "皮肤（皮肤溃疡）";
            wen.innerHTML =
              "是否患有糖尿病，在腿部或脚部发生外伤后出现，伤口经久不愈而形成糜烂溃疡，无痛？";
          } else if (i == 9) {
            zz.innerHTML = "皮肤（皮肤肿块）";
            wen.innerHTML =
              "肿块是否呈黄豆大小，可移动，无压痛，头部及躯干较多？";
          }
        } else if (y == 11) {
          //					alert("耳鼻");
          if (i == 0) {
            zz.innerHTML = "耳眼（口臭）";
            wen.innerHTML = "是否吃过大蒜，洋葱或是在过去24小时内喝过酒？";
          } else if (i == 1) {
            zz.innerHTML = "眼（嘴唇）";
            wen.innerHTML = "是否伴有呼吸苦难，忤状指（趾）？";
          } else if (i == 2) {
            zz.innerHTML = "眼（牙齿）";
            wen.innerHTML =
              "牙齿表面是否有深浅大小不相同的带状或点状凹陷缺损？";
          } else if (i == 3) {
            zz.innerHTML = "眼（鼻塞）";
            wen.innerHTML = "鼻塞，流涕，打喷嚏，流清鼻涕，甚至发热，身痛？";
          } else if (i == 4) {
            zz.innerHTML = "眼（眼睛红）";
            wen.innerHTML =
              "春秋季流行，是否双眼有异物感,疼痛，畏光，流泪，有水行或粘性分泌物，结膜充血，水肿，耳前淋巴结肿大？";
          } else if (i == 5) {
            zz.innerHTML = "眼（干涩）";
            wen.innerHTML = "是否长期使用某种眼药水？";
          } else if (i == 6) {
            zz.innerHTML = "眼（牙痛）";
            wen.innerHTML =
              "牙痛是否是突然出现，伴有发热，牙龈肿胀或颈部肿胀？";
          } else if (i == 7) {
            zz.innerHTML = "眼（视力下降）";
            wen.innerHTML = "最近是否头部受过外伤？";
          } else if (i == 8) {
            zz.innerHTML = "眼（眼球突出）";
            wen.innerHTML = "是否高度近视？";
          } else if (i == 9) {
            zz.innerHTML = "眼（眼痛）";
            wen.innerHTML =
              "是否伴有视力下降，眼球转动时有牵引性疼痛，压迫眼球有明显球后疼痛？";
            this.isNo=2;
          } else if (i == 10) {
            zz.innerHTML = "眼（白瞳症）";
            wen.innerHTML =
              "是否为早产儿，且体重低于1500g，出生后10-14天内接受到浓度氧治疗？";
          } else if (i == 11) {
            zz.innerHTML = "眼（嘴痛）";
            wen.innerHTML =
              "上唇部及周围是否疼痛，是否发热，并在疼痛处出现红色小包？";
          } else if (i == 12) {
            zz.innerHTML = "眼（听力下降）";
            wen.innerHTML = "耳朵里是否进入异物或过多耳垢堆积？";
          } else if (i == 13) {
            zz.innerHTML = "眼（耳鸣）";
            wen.innerHTML = "是否在噪音很大的环境带过而且听力收到影响？";
          } else if (i == 14) {
            zz.innerHTML = "眼（眼屎多）";
            wen.innerHTML =
              "是否伴有眼脸下垂，一侧面部变得的软弱无力，耳朵痛？";
          } else if (i == 15) {
            zz.innerHTML = "眼（流泪）";
            wen.innerHTML =
              "是否伴有红眼，眼分泌物多，有异物，眼内烧灼疼痛等？";
          } else if (i == 16) {
            zz.innerHTML = "眼（流鼻血）";
            wen.innerHTML =
              "有无外伤史（鼻面部外伤，用力控鼻，剧烈地打喷嚏等）？";
          }
        } else if (y == 12) {
          //					alert("其他");
          if (i == 0) {
            zz.innerHTML = "其他（多汗症）";
            wen.innerHTML = "体重是否超重，且活动量大就大量出汗？";
          } else if (i == 1) {
            zz.innerHTML = "其他（黄疸）";
            wen.innerHTML = "是否出生后2-3天出现黄疸，7-10天消瘦？";
          } else if (i == 2) {
            zz.innerHTML = "其他（水肿）";
            wen.innerHTML =
              "水肿发生前是否消瘦，体重减轻，并且水肿是从下肢开始蔓延全身？";
          } else if (i == 3) {
            zz.innerHTML = "其他（疲劳）";
            wen.innerHTML = "是否超重？";
          } else if (i == 4) {
            zz.innerHTML = "其他（高血压）";
            wen.innerHTML =
              "是否居住海拔较低地区的人进住海拔3500m以上的高原地区后出现的血压升高，且伴有食欲不振，恶心，呕吐，腹胀，烦躁不安，眩晕，健忘？";
          } else if (i == 5) {
            zz.innerHTML = "其他（周身疼痛）";
            wen.innerHTML =
              "是否以大关节游走行肿痛为主，伴有咽痛，发热，多汗，扁桃皮炎，心脏炎和慢性咽炎？";
            this.isNo=2;
          } else if (i == 6) {
            zz.innerHTML = "其他（低血压）";
            wen.innerHTML = "是否有高血压病史，且正在服用降压药？";
          } else if (i == 7) {
            zz.innerHTML = "其他（出血倾向）";
            wen.innerHTML =
              "得病急骤，四肢皮肤，粘膜出现散在或密集的紫癜，瘀斑，牙龈出血？";
            this.isNo=2;
          } else if (i == 8) {
            zz.innerHTML = "其他（感觉不适）";
            wen.innerHTML = "是否常吸烟，饮酒，喝咖啡或服用某些药物？";
          } else if (i == 9) {
            zz.innerHTML = "其他（消瘦）";
            wen.innerHTML = "是否食欲正常，最近立体活动较多？";
          } else if (i == 10) {
            zz.innerHTML = "其他（肥胖）";
            wen.innerHTML = "最近是否戒烟了？";
          } else if (i == 11) {
            zz.innerHTML = "其他（震颤）";
            wen.innerHTML = "是否身体的极小范围（例如眼脸），出现短暂性抽动？";
            this.isNo=2;
          } else if (i == 12) {
            zz.innerHTML = "其他（婴儿夜惊）";
            wen.innerHTML = "孩子是否还不到6个星期大?";
          } else if (i == 13) {
            zz.innerHTML = "其他（失眠）";
            wen.innerHTML = "晚餐是否吃的很饱或喝了很多酒？";
          } else if (i == 14) {
            zz.innerHTML = "其他（思维）";
            wen.innerHTML = "是否服了娱乐性药物？";
            this.isNo=2;
          } else if (i == 15) {
            zz.innerHTML = "其他（不育）";
            wen.innerHTML = "是否得过性病？";
          } else if (i == 16) {
            zz.innerHTML = "其他（焦虑）";
            wen.innerHTML = "最近是否压力较大?";
          } else if (i == 17) {
            zz.innerHTML = "其他（神经衰弱）";
            wen.innerHTML = "是否头部有外伤后出现？";
          } else if (i == 18) {
            zz.innerHTML = "其他（抑郁）";
            wen.innerHTML = "是否为女性？";
          } else if (i == 19) {
            zz.innerHTML = "其他（发热）";
            wen.innerHTML = "近期是否服用了某些药物？";
          } else if (i == 20) {
            zz.innerHTML = "其他（晕厥）";
            wen.innerHTML = "是否伴有头晕，好像天旋地转？";
          }
        }
      } else {
        wen.innerHTML = "出现异常";
        yes[0].disabled = "disabled";
        no[0].disabled = "disabled";
      }
    },
    insetHl: function (mess) {
      this.index++;
      this.messList.push(mess);
      setTimeout(function () {
        document.body.scrollTop = document.body.scrollHeight;
      }, 300);
    },
    btnYes: function () {
      let that=this;
      const {y,i,isSex,isAge}=this.$route.query
      var yes = document.getElementsByName("btnYes");
      var no = document.getElementsByName("btnNo");
      yes[yes.length - 1].innerHTML = "页面跳转中...";
      yes[yes.length - 1].disabled = "disabled";
      no[no.length - 1].disabled = "disabled";
      setTimeout(function () {
        that.$router.push({
            path:'Index2',
            query:{y,i,isSex,isAge,index:that.index}
        })
        document.body.scrollTop = document.body.scrollHeight;
      }, 300);
    },
    btnNo: function () {
      var yes = document.getElementsByName("btnYes");
      var no = document.getElementsByName("btnNo");
      yes[yes.length - 1].disabled = "disabled";
      no[no.length - 1].disabled = "disabled";
      const { y, i, isSex, isAge } = this.$route.query;
      this.isViliable=true;
      this.messList.push("否")
      var mess = "不舒服了是吧啊？";
      if (y == 1) {
        if (i == 0) {
          if (this.index == 1) {
            mess =
              "是否按压腺体有脓液流入口腔，腺体肿大可伴有暂时性面瘫？是否发生在中老年，在耳垂后下方，圆形或椭圆形，表面光滑，少有结节，质地软，有弹性，时大时小？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是否发生在中年以上，单侧腮腺内无痛性肿块，生长缓慢，无自觉症状，呈结节状，周界清楚，有一定的活动度？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 1) {
          if (this.index == 1) {
            mess = "是否脸色苍白，指甲色淡？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否有外伤史？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 2) {
          if (this.index == 1) {
            mess = "是否伴有牙齿疼痛？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "抽拉耳垂时是否疼痛？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "是否伴有头痛和喷射性呕吐？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 4) {
            mess = "耳中是否会流出青黄色的分泌物？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 3) {
          if(this.index==1){
            mess="是否由局限性脑或周围神经病变所致?"
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 4) {
          if (this.index == 1) {
            mess = "是否伴有发热？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "头痛有无撞击或受过伤？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "脸部附近是否感到电击般疼痛？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 4) {
            mess = "是否头部一侧跳痛？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 5) {
            mess = "是否伴有头晕、恶心、呕吐？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 6) {
            mess = "脖子、肩部肌肉是否酸痛？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 7) {
            mess = "是否头部以头前部为中心，并伴有眼睛、鼻子的异常？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 8) {
            mess = "是否一侧头痛，并伴有耳鸣、头晕、牙痛、吃硬东西后加重？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 9) {
            mess = "是否头部闷痛，且有加重倾向？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 5) {
          if (this.index == 1) {
            mess = "臉部附近是否感到电击般疼痛？";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
      } else if (y == 2) {
        if (i == 0) {
          if (this.index == 1) {
            mess =
              "甲状腺轻度肿大，出现结节，质软，无自觉症状，甲状腺功能正常？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "结节是否较硬，并伴有局部疼痛，并常向耳后、后头顶部放射？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "是否伴有眼球突出、心悸、胸闷、怕热、多汗、食欲亢进、消瘦、甲状腺肿大等症状和体征？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 4) {
            mess = "甲状腺是否一侧肿大，与周围正常组织分界清楚，无疼痛和压痛？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 5) {
            mess =
              "甲状腺出现硬性无痛性肿块，表面不平，生长速度较快，形态不规则，活动度差，后起出现声音、吞咽困难、呼吸困难等压迫症状？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 1) {
          if (this.index == 1) {
            mess = "是否有时感到胸骨后面疼痛，且弯腰时加重？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否老自我感觉是在喉咙里不往下走，但能够正常吞咽？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 2) {
          if (this.index == 1) {
            mess = "颈部是否肿胀、触痛或发热？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否伴有耳前腮区疼痛、肿胀或发热？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "是否大量饮酒，抽烟厉害或者曾置身处于烟雾弥漫的环境中？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 4) {
            mess = "是否伴有喉咙沙哑，甚至完全说不出话？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 5) {
            mess = "是否伴有咽痒、恶心、干呕？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 3) {
          if (this.index == 1) {
            mess = "是否有严重的头痛、恶心或意识模糊？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是否经常保持一个不舒服的姿势，不能低头或偏头，症状持续不缓解？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "转动颈部时，是否听到咯吱咯吱的声音，或者觉得头部和上肢麻木、针刺感？";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
      } else if (y == 3) {
        //胸
        if (isSex == 2 && isAge == 1) {
          if (i == 0) {
            if (this.index == 1) {
              mess = "是否伴低热，盗汗，食欲下降，消瘦？";
              this.insetHl(mess);
              this.isNo=1;
            }else if (this.index == 2) {
              mess =
                "是否有长期吸烟史，伴刺激性咳嗽，血痰，胸痛或进行性加重的呼吸困难？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 1) {
            if (this.index == 1) {
              mess = "是否在沒有哺乳的情況下一侧乳头出现分泌物？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 2) {
            if (this.index == 1) {
              mess = "疼痛是否在剧烈运动或用力搬运工作后出现？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "疼痛是否最近加重，甚至影响睡眠？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否已经超过40岁了？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 4) {
              mess = "颈部，手部或者背部是否有麻木或针刺感？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 3) {
            if (this.index == 1) {
              mess = "是否有支气管炎病史，长期咳嗽？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否感到严重呼吸困难？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 4) {
            if (this.index == 1) {
              mess = "是否正在服用某种药物？";
              this.insetHl(mess);
              this.isNo=1;
            } 
            else if (this.index == 2) {
              mess = "是否为干咳没有痰，且伴有嗓子干痒，恶心，干呕？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否伴有发热，嗓子红肿，疼痛？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 4) {
              mess = "是否伴有呼吸急促或哮鸣音，且遇冷空气后加重？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 5) {
              mess = "是否伴有呼吸困难，发热，咳嗽或呼吸气时胸痛？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 5) {
            if (this.index == 1) {
              mess = "最近是否刚刚生完孩子？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 6) {
            if (this.index == 1) {
              mess = "是否正在服用某种药物？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否喝了大量茶，可乐，咖啡，或者大量吸烟？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否多食，伴有心慌，烦躁，出汗多，消瘦？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 7) {
            if (this.index == 1) {
              mess = "是否伴有午后或夜间低热，咳嗽，消瘦，盗汗？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否咳脓血痰？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "幼年时是否就有咯血病史，且反复发作？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 4) {
              mess = "是否患有慢性呼吸道疾病，伴有咳嗽，吐黄脓痰，或大量咯血？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 5) {
              mess = "是否大量咳粉红色泡沫样血痰？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 8) {
            if (this.index == 1) {
              mess = "呼吸是否伴有喘鸣？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 9) {
            if (this.index == 1) {
              mess = "是否有胸闷，透不过气的情况？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否在吞咽了鱼刺之类的异物，且疼痛在吞咽时加重？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess =
                "是否伴有胸部皮肤的灼热伤感，而且疼痛处皮肤有水疱，疼痛随呼吸运动加重？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 4) {
              mess = "最近是否严重咳嗽或胸部受伤，手术，且疼痛局限于一侧？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 5) {
              mess = "是否发生在进食后，且以前同样出现过?";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 6) {
              mess = "是否疼痛位于胸部中央且弯腰或卧时会加重？";
              this.insetHl(mess);
              this.isNo=2;
            }
          }
        } else {
          if (i == 0) {
            if (this.index == 1) {
              mess = "是否伴低热，盗汗，食欲下降，消瘦？";
              this.insetHl(mess);
              this.isNo=1;
            }else if (this.index == 2) {
              mess =
                "是否有长期吸烟史，伴刺激性咳嗽，血痰，胸痛或进行性加重的呼吸困难？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 1) {
            if (this.index == 1) {
              mess = "疼痛是否在剧烈运动或用力搬运工作后出现？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "疼痛是否最近加重，甚至影响睡眠？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否已经超过40岁了？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 4) {
              mess = "颈部，手部或者背部是否有麻木或针刺感？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 2) {
            if (this.index == 1) {
              mess = "是否有支气管炎病史，长期咳嗽？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否感到严重呼吸困难？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 3) {
            if (this.index == 1) {
              mess = "是否正在服用某种药物？";
              this.insetHl(mess);
              this.isNo=1;
            } 
            else if (this.index == 2) {
              mess = "是否为干咳没有痰，且伴有嗓子干痒，恶心，干呕？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否伴有发热，嗓子红肿，疼痛？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 4) {
              mess = "是否伴有呼吸急促或哮鸣音，且遇冷空气后加重？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 5) {
              mess = "是否伴有呼吸困难，发热，咳嗽或呼吸气时胸痛？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 4) {
            if (this.index == 1) {
              mess = "是否正在服用某种药物？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否喝了大量茶，可乐，咖啡，或者大量吸烟？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否多食，伴有心慌，烦躁，出汗多，消瘦？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 5) {
            if (this.index == 1) {
              mess = "是否伴有午后或夜间低热，咳嗽，消瘦，盗汗？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否咳脓血痰？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "幼年时是否就有咯血病史，且反复发作？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 4) {
              mess = "是否患有慢性呼吸道疾病，伴有咳嗽，吐黄脓痰，或大量咯血？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 5) {
              mess = "是否大量咳粉红色泡沫样血痰？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 6) {
            if (this.index == 1) {
              mess = "呼吸是否伴有喘鸣？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 7) {
            if (this.index == 1) {
              mess = "是否有胸闷，透不过气的情况？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否在吞咽了鱼刺之类的异物，且疼痛在吞咽时加重？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess =
                "是否伴有胸部皮肤的灼热伤感，而且疼痛处皮肤有水疱，疼痛随呼吸运动加重？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 4) {
              mess = "最近是否严重咳嗽或胸部受伤，手术，且疼痛局限于一侧？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 5) {
              mess = "是否发生在进食后，且以前同样出现过?";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 6) {
              mess = "是否疼痛位于胸部中央且弯腰或卧时会加重？";
              this.insetHl(mess);
              this.isNo=2;
            }
          }
        }
      } else if (y == 4) {
        //背
        if (i == 0) {
          if (this.index == 1) {
            mess = "疼痛是否突然发生伴有发热？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "疼痛是否从腰部向下放射至膀胱区，外阴部及大腿内侧，有时伴有大汗，恶心呕吐?";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
      } else if (y == 5) {
        //腹部
        if (isSex == 2 && isAge == 1) {
          if (i == 0) {
            if (this.index == 1) {
              mess = "是否多食，伴有心慌，烦躁，出汗多，消瘦？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "食欲是否减退？";
              this.insetHl(mess);
              this.isNo=2
            }
          } else if (i == 1) {
            if (this.index == 1) {
              mess = "是否在精神紧张或焦虑的时候出现？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否在饱餐，饮大量碳酸饮料或吸入冷空气后出现？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否伴有泛酸，烧心，恶心，呕吐等？";
              this.insetHl(mess);  
              this.isNo=2;
            }
          } else if (i == 2) {
            if (this.index == 1) {
              mess = "腹痛是否在弯腰或者躺下时出现或加剧？";
              this.insetHl(mess);
              this.isNo=1;
            }else if(this.index==2){
              mess="是否脐周或中上腹疼痛，伴有恶心、呕吐，随着病情发展，疼痛转移或集中在右下腹？"
              this.insetHl(mess);
              this.isNo=1;
            }
            else if (this.index == 3) {
              mess = "疼痛在上腹部，在刚刚吃完饭或者饭后几个小时后出现?";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 3) {
            if (this.index == 1) {
              mess =
                "近来是否服用激素，阿司匹林抗炎药物等，突发呕血，大便呈柏油样？";
              this.insetHl(mess);
            } else if (this.index == 2) {
              mess =
                "是否有较严重的肝病史，突然发生呕血，颜色鲜红，并伴有黑便？";
              this.insetHl(mess);
            } else if (this.index == 3) {
              mess = "是否伴有慢性胃病史，反复出现黑便？";
              this.insetHl(mess);
              
            }
          } else if (i == 4) {
          } else if (i == 5) {
            if (this.index == 1) {
              mess = "右上腹是腹胀痛，或伴有皮肤和眼睛发黄？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否有便秘，可在下腹部摸到条形状硬块？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否为育龄女性？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 6) {
            if (this.index == 1) {
              mess = "是否伴有腹痛，午后低热，乏力，消瘦？";
              this.insetHl(mess);
            } else if (this.index == 2) {
              mess = "是否腹泻了很久了，而且大便很臭，呈油状？";
              this.insetHl(mess);
            } else if (this.index == 3) {
              mess = "是否是急性发作？";
              this.insetHl(mess);
              
            }
          } else if (i == 7) {
            if (this.index == 1) {
              mess = "是否大便很臭，带有未消化食物？";
              this.insetHl(mess);
            } else if (this.index == 2) {
              mess = "是否经常出现腹泻与便秘两种症状交替？";
              this.insetHl(mess);
            } else if (this.index == 3) {
              mess = "是否伴有腹痛？";
              this.insetHl(mess);
              
            }
          } else if (i == 8) {
            if (this.index == 1) {
              mess = "是否在吸烟，饮酒，摄入油腻食物后偶然发生？";
              this.insetHl(mess);
            } else if (this.index == 2) {
              mess =
                "是否有吃一点就饱，上腹部有饱胀感，恶心，厌食，甚至出现体重减轻等症状？";
              this.insetHl(mess);
            } else if (this.index == 3) {
              mess = "是否伴有打嗝，恶心，上腹部隐痛？";
              this.insetHl(mess);
              
            }
          } else if (i == 9) {
            if (this.index == 1) {
              mess = "伴有胸部疼痛？";
              this.insetHl(mess);
            } else if (this.index == 2) {
              mess = "是否伴有腹痛？";
              this.insetHl(mess);
              
            }
          }
        } else {
          if (i == 0) {
            if (this.index == 1) {
              mess = "是否多食，伴有心慌，烦躁，出汗多，消瘦？";
              this.insetHl(mess);
              this.isNo=1
              
            } else if (this.index == 2) {
              mess = "食欲是否减退？";
              this.insetHl(mess);
              this.isNo=2
            }
          } else if (i == 1) {
            if (this.index == 1) {
              mess = "是否在精神紧张或焦虑的时候出现？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否在饱餐，饮大量碳酸饮料或吸入冷空气后出现？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否伴有泛酸，烧心，恶心，呕吐等？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 2) {
            if (this.index == 1) {
              mess = "腹痛是否在弯腰或者躺下时出现或加剧？";
              this.insetHl(mess);
              this.isNo=1;
            } else if(this.index==2){
              mess="是否脐周或中上腹疼痛，伴有恶心、呕吐，随着病情发展，疼痛转移或集中在右下腹？"
              this.insetHl(mess);
              this.isNo=1;
            }else if (this.index == 3) {
              mess = "疼痛在上腹部，在刚刚吃完饭或者饭后几个小时后出现?";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 3) {
            if (this.index == 1) {
              mess =
                "近来是否服用激素，阿司匹林抗炎药物等，突发呕血，大便呈柏油样？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess =
                "是否有较严重的肝病史，突然发生呕血，颜色鲜红，并伴有黑便？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否伴有慢性胃病史，反复出现黑便？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 4) {
            if (this.index == 1) {
              mess = "右上腹是腹胀痛，或伴有皮肤和眼睛发黄？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否有便秘，可在下腹部摸到条形状硬块？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否为育龄女性？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 5) {
            if (this.index == 1) {
              mess = "是否伴有腹痛，午后低热，乏力，消瘦？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否腹泻了很久了，而且大便很臭，呈油状？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否是急性发作？";
              this.insetHl(mess);
              this.isNo=2;
            }
          } else if (i == 6) {
            if (this.index == 1) {
              mess = "是否大便很臭，带有未消化食物？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否经常出现腹泻与便秘两种症状交替？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否伴有腹痛？";
              this.insetHl(mess);
              this.isNo=2;
              
            }
          } else if (i == 7) {
            if (this.index == 1) {
              mess = "是否在吸烟，饮酒，摄入油腻食物后偶然发生？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess =
                "是否有吃一点就饱，上腹部有饱胀感，恶心，厌食，甚至出现体重减轻等症状？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 3) {
              mess = "是否伴有打嗝，恶心，上腹部隐痛？";
              this.insetHl(mess);
              this.isNo=2;
              
            }
          } else if (i == 8) {
            if (this.index == 1) {
              mess = "伴有胸部疼痛？";
              this.insetHl(mess);
              this.isNo=1;
            } else if (this.index == 2) {
              mess = "是否伴有腹痛？";
              this.insetHl(mess);
              this.isNo=2;
            }
          }
        }
      } else if (y == 6) {
        //生殖器
        if (isAge == 1) {
          //成人
          if (isSex == 1) {
            //男
            if (i == 0) {
              if (this.index == 1) {
                mess = "是否经常自慰，且快速射精？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 2) {
                mess = "性生活中是否担心伴侣不能满足？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 3) {
                mess =
                  "是否伴有尿频，尿排不尽感。尿道不适。灼热，或精液中可含又少量血液（血精）？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 4) {
                mess = "是否包皮过长或者包茎？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 5) {
                mess = "早泄是否出现在第一次性生活中？";
                this.insetHl(mess);
                this.isNo=2;
              }
            } else if (i == 1) {
              if (this.index == 1) {
                mess = "是否正在服药？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 2) {
                mess = "早晨醒来阴茎是否有勃起？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 3) {
                mess = "生殖器是否受到严重创伤？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 4) {
                mess = "是否与配偶性生活正常，而在婚外性生活中出现勃起困难？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 5) {
                mess = "是否对配偶或者异性没有，很少有性欲？";
                this.insetHl(mess);
                this.isNo=2;
              }
            }
          } else if (isSex == 2) {
            //女
            if (i == 0) {
              if (this.index == 1) {
                mess = "是否伴有发热和阴道分泌物异常增多？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 2) {
                mess = "月经是否推迟一周以上，而且在这之前有过性生活？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 3) {
                mess = "是否只有一次或两次月经没来？";
                this.insetHl(mess);
                this.isNo=2;
              }
            } else if (i == 1) {
              if (this.index == 1) {
                mess =
                  "白带增多并伴外阴瘙痒，白带呈灰黄色、泡沫状稀薄液体，或呈脓性，有腥臭，甚至混有血液？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 2) {
                mess =
                  "白带是否增多，且呈乳白色粘液状，有时为淡黄色、脓性或血性？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 3) {
                mess = "是否在放置宫内节育器后出现白带中带血？";
                this.insetHl(mess);
                this.isNo=2;
              }
            } else if (i == 2) {
              if (this.index == 1) {
                mess =
                  "最近是否有下列情况：饮食改变；健康状况改变；生活方式和工作改变；精神压力大？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 2) {
                mess = "是否从来没有来过月经？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 3) {
                mess = "是否只有一次或两次月经没来？";
                this.insetHl(mess);
                this.isNo=2;
              }
            } else if (i == 3) {
              if (this.index == 1) {
                mess = "是否已怀孕或正在哺乳？";
                this.insetHl(mess);
                this.isNo=2;
              }
            } else if (i == 4) {
              if (this.index == 1) {
                mess = "是否已经怀孕，出血伴有剧烈的腹痛？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 2) {
                mess = "是否放置了子宫节育环？";
                this.insetHl(mess);
                this.isNo=1;
              } else if (this.index == 3) {
                mess = "是否正在服用避孕药物？";
                this.insetHl(mess);
                this.isNo=2;
              }
            }
          }
        } else if (isAge == 2) {
          //儿童
        }
      } else if (y == 7) {
        //上肢
        if (i == 0) {
          if (this.index == 1) {
            mess = "是否仅仅一侧手指，手腕，肘部肿胀变红";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
      } else if (y == 8) {
        //下肢
        if (i == 0) {
          if (this.index == 1) {
            mess = "疼痛是否在高强的体力劳动或者比赛后出现？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "膝关节是否受外伤？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 1) {
          if (this.index == 1) {
            mess = "是否感到一侧或双侧踝关节疼痛？";
            this.insetHl(mess);
            this.isNo=2;
          }
        }else if(i==2){
            if(this.index==1){
              mess="髋部外侧、大腿上部或臀部外侧的髋关节是否疼痛"
              this.insetHl(mess);
              this.isNo=2;
            }
          }
      } else if (y == 9) {
        //四肢
        if (i == 0) {
          if (this.index == 1) {
            mess = "局部是否长暴露低温下，预热痒，或出现溃疡？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否被高温烫伤？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "局部是否受过外伤？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 1) {
          if (this.index == 1) {
            mess = "指甲变形、色变到灰褐色、暗黄色、趾甲变厚而难剪，但甲面变得很薄、很脆；有怪味，会痛？";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
      } else if (y == 10) {
        //皮肤
        if (i == 0) {
          if (this.index == 1) {
            mess = "是否伴有发热？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 1) {
          if (this.index == 1) {
            mess = "皮疹是否是红色，脱皮的斑块？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否突然出现皮疹，伴瘙痒？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "是否更换了化妆品，衣服，收拾，服用某些药物，或接触了刺激性皮肤物质等？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 2) {
          if (this.index == 1) {
            mess = "儿童先出现白色或灰白色的圆形斑点，刺痒，局部毛发脱落？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是否伴有甲状腺功能减退，甲状腺功能亢进，垂体前叶功能减退症等？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 3) {
          if (this.index == 1) {
            mess = "是否被蚊虫咬过？";
            this.insetHl(mess);
           this.isNo=2;
          }
        } else if (i == 4) {
          if (this.index == 1) {
            mess =
              "局部表皮损伤后是否露出红色湿润面，肠胃水泡破裂或皮肤浸渍后表皮脱落所致，愈合后一般不留瘢迹？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是否在皮肤损伤或手术上后愈合后出现局部皮肤隆起，色红质硬的肿块？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "皮肤表面是否有裂痕，常见于足后跟手指，手掌，口角，肛周等处，伴疼痛或出血？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 5) {
          if (this.index == 1) {
            mess = "是否服用避孕药或已经怀孕？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 6) {
          if (this.index == 1) {
            mess =
              "是否好发于面部，初起为淡红色，表面干燥，附有灰白色糖状鳞屑，对称分布，数月可自行消退，但可复发？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否好发于躯干和四肢近端的玫瑰色斑块，其上有糖状鳞屑？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "是否出现大小不等的丘疹，表面覆盖着银白色鳞屑，多发于头皮，四肢及背部？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 7) {
          if (this.index == 1) {
            mess =
              "是否好发于下肢，脓疱破溃后形成溃疡，自觉疼痛，发热，附近淋巴结肿大，愈后留有瘢迹？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 8) {
          if (this.index == 1) {
            mess = "是否为长期卧床的衰弱病人，在受压部位发生的溃疡？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 9) {
          if (this.index == 1) {
            mess = "最近几天是否打过疫苗或服用药物？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "肿块是否出现在面部，呈褐色，易破溃留有瘢迹？";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
      } else if (y == 11) {
        if(i==0){
          if (this.index == 1) {
            mess = "是否有蛀牙或者口腔溃疡？";
            this.insetHl(mess);
            this.isNo=1;
          }else if(this.index==2){
            mess="是否患有鼻窦炎、扁桃体等疾病？";
            this.insetHl(mess);
            this.isNo=1;
          }else if(this.index==3){
            mess="是否感觉口腔干燥？";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
        //耳鼻眼
        else if (i == 1) {
          if (this.index == 1) {
            mess = "是否吸烟？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "舌头或口腔内是否肿痛？";
            this.insetHl(mess);
           this.isNo=2;
          }
        } else if (i == 2) {
          if (this.index == 1) {
            mess = "是否伴有下肢水肿，呼吸困难，心率加快或不齐？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否手脚紫甘，遇冷加剧，手心多汗，指尖发冷？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "是否伴有咳嗽，痰多，呼吸困难？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 3) {
          if (this.index == 1) {
            mess =
              "颜色有黄变成暗棕或灰色，且在婴幼儿时期，是否服用四环素药物？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "出生时或出生后不久下颌就有牙齿萌出？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "牙齿表面是否出现黄褐色斑块？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 4) {
          if (this.index == 1) {
            mess = "鼻腔干燥有脓痂，呼出气体有腥味？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "眼睛发痒，往往突然打喷嚏，流鼻涕，但无发热，身痛等症状？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "鼻塞为间接性，白天天热或运动后减轻，夜间，寒冷或入座后加重，侧卧时下侧鼻塞较重？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 5) {
          if (this.index == 1) {
            mess =
              "眼脸内侧或外侧是否出现异状胬肉（比如鸟翼），表面平行，尖端向中间攀移，血管充血？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是否伴眼痛，畏光流泪，视力减退，瞳孔缩小，对光反射迟钝等症状？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 6) {
          if (this.index == 1) {
            mess = "是否带有隐形眼镜？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否为怀孕期，哺乳期或口服避孕药的妇女？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "是否处于更年期，且伴有眼干，口烂，萎缩性舌炎，口腔黏膜糜烂，灼痛及刺激痛等？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 7) {
          if (this.index == 1) {
            mess = "是否遇到冷，热，酸，甜刺激时疼痛？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否伴有下颚疼痛，张嘴是听到咯咯的声音，并感到疼痛？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "是否补过牙，且在咀嚼或撕咬的时候感到很痛？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 8) {
          if (this.index == 1) {
            mess = "是否突然有一只眼睛看不见，几分钟后恢复正常？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否视物模糊，看不清东西，在强光下更严重？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 9) {
          if (this.index == 1) {
            mess =
              "是否出现单侧眼脸红肿，下垂，并伴有疼痛，复视及眼球运动障碍？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是否伴有高热，眼睛和结膜高度充血，水肿，眼脸部皮肤红肿，压痛？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 10) {
           if (this.index == 1) {
             mess = "最近是否压力大、焦虑、情绪激动？";
             this.insetHl(mess);
             this.isNo=1;
          }else if(this.index==2){
            mess = "是否感染、创伤、手术？";
             this.insetHl(mess);
             this.isNo=2;
          }
        } else if (i == 11) {
          if (this.index == 1) {
            mess = "是否为新生儿（不足满月），且眼内流出脓性分泌物？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是的在遇到光线时瞳孔区出现黄色或白色反光，视力丧失，或出现斜视，瞳孔发白？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "是否出生后数月出现双眼瞳仁发白，视力下降？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 12) {
          if (this.index == 1) {
            mess = "最近是否更换化妆品，并且口唇周围红肿？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "口腔内或舌头上是否出现白色小点或者黏膜缺损？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "是否为小孩，口腔内或舌头上是否出现乳黄色的膜，而且容易刮掉？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 13) {
          if (this.index == 1) {
            mess = "是否从出生听力就异常？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否听到巨大响声后出现听力减退？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "耳部是否受过外伤？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 14) {
          if (this.index == 1) {
            mess = "脑部或者耳部是否受到打击之后出现的耳鸣？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "眩晕突然出现而且很严重，且伴有恶心，呕吐？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess =
              "是否感到眩晕，失去平衡，伴有麻木，四肢移动困难，语言困难，视力模糊，意识模糊？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 15) {
          if (this.index == 1) {
            mess = "眼睛上是否有很痛的肿粒？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "眼睛是否发红，发痒且疼痛？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 16) {
          if (this.index == 1) {
            mess = "是否有异物感，眼睛红，畏光，睁不开眼睛，疼痛，结膜水肿？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否伴有眼睛剧烈瘙痒，怕光，有异物感，睫毛常被分泌物粘连?";
            this.insetHl(mess);
            this.isNo=2;
          }
        } 
        else if (i == 17) 
        {
          if (this.index == 1) {
            mess = "小儿，一侧鼻出血伴鼻塞，流出带臭味的血脓性分泌物？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "育龄女性，每月规律性鼻出血，无其他显示不适？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "嗓子肿痛，小便偏黄，大便秘结？";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
      }
       else if (y == 12) {
        //其他
        if (i == 0) {
          if (this.index == 1) {
            mess = "体温是否超过38度？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 1) {
          if (this.index == 1) {
            mess = "是否伴有上腹痛，呕吐，发热？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 2) {
          if (this.index == 1) {
            mess = "是否伴有多次，多尿及肌无力或周期性瘫痪表现？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是否已经怀孕，在妊娠20周后至产后24小时内出现高血压，或蛋白尿？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 3) {
          if (this.index == 1) {
            mess = "是否连续几周努力工作，很少休息？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否易口渴，多尿，视力下降，体重下降？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 4) {
          if (this.index == 1) {
            mess =
              "是否伴有向心性肥胖，满月脸，多毛，皮肤紫纹，血糖增高等特征？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 5) {
          //周身疼痛
          if(this.index==1){
            mess="是否疲惫、失眠、焦虑？"
            this.insetHl(mess);
            this.isNo=1;
          }else if(this.index==2){
            mess="骨头和关节是否疼痛？"
            this.insetHl(mess);
            this.isNo=1;
          }else if(this.index==3){
            mess="脊柱、骨盆和肢体关节是否疼痛?"
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 6) {
          if (this.index == 1) {
            mess =
              "是否发生在从平卧位转变为直立位，或长时间站立时，体质瘦弱的女性，可伴有头晕或晕厥，无器质性疾病或者营养不良？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess =
              "是否晨起出现低血压，站立式头晕眼花，腿软乏力，一过性黑瞳，晕眩或昏厥？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 7) {
          //出血倾向
          if(this.index==1){
            mess="是否服用药物？"
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 8) {
          if (this.index == 1) {
            mess = "体温是否超过38度？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 9) {
          if (this.index == 1) {
            mess = "是否为婴幼儿？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "体重明显下降，但仍觉自己很胖，不想吃东西？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "是否感觉大便增多，颜色变浅，有时呈泡沫或油脂状？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 10) {
          if (this.index == 1) {
            mess = "是否正在服药？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否和季节改变有关？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "最近是否有精神压力？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 11) 
        {
           if (this.index == 1) {
            mess = "是否服用药物？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否情绪激动、焦虑、紧张？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } 
        else if (i == 12) {
          if (this.index == 1) {
            mess = "孩子体温是否超过38度？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "孩子是不是把被子踢掉了？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "孩子是否喂奶后重新安静入睡？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 13) {
          if (this.index == 1) {
            mess = "是否晚上喝了很多咖啡，可乐或茶？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否长期服用某种药物？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 3) {
            mess = "是否随眠地点及休息时间发生改变，或跨越时区产生时差？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 14) 
        {
          if (this.index == 1) {
            mess = "是否长期睡眠不足？";
            this.insetHl(mess);
            this.isNo=1;
          }else if(this.index==2){
            mess = "是否感觉压力大、紧张？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } 
        else if (i == 15) {
          if (this.index == 1) {
            mess = "是否出现睾丸疼痛，肿胀，或睾丸较正常人偏小？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 16) {
          if (this.index == 1) {
            mess = "焦虑是否在戒烟，戒酒或停止服用安眠药之后出现?";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "最近体重是否减轻或同时伴有眼球突出？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 17) {
          if (this.index == 1) {
            mess = "是否伴有消瘦，皮肤弹性差，头发干黄易脱落？";
            this.insetHl(mess);
            this.isNo=1;
          } else if (this.index == 2) {
            mess = "是否最近工作过于繁忙或生活压力过大，严重影响正常休息？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 18) {
          if (this.index == 1) {
            mess = "最近是否刚经历了一些不顺心的事？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 19) {
          if (this.index == 1) {
            mess = "是否打喷嚏，流鼻涕，眼酸等？";
            this.insetHl(mess);
            this.isNo=2;
          }
        } else if (i == 20) {
          if (this.index == 1) {
            mess = "是否进行剧烈运动，晕厥前感觉喘不过气？";
            this.insetHl(mess);
            this.isNo=2;
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "./css/style.css";
@import "./css/mui.min.css";

</style>