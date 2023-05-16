import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import UserInfo from "../views/User/User_info.vue";
import User_camera from "../views/User/User_camera.vue";
import Notice from '../views/Registration/Notice.vue';
import Medical_dept_list from "../views/Registration/Medical_dept_list.vue";
import Dept_sub_plan from "../views/Registration/Dept_sub_plan.vue";
import Doctor_schedule from '../views/Registration/Doctor_schedule.vue';
import Pay from '../views/Registration/Pay.vue';
import Order from '../views/Query/Order.vue';
import Resigtion_info from '../views/Registration/Resigtion_info.vue';
import Evaluate from '../views/Evaluate/Evaluate.vue';
import Evaluate_list from '../views/Evaluate/Evaluate_list.vue';
import EvaluateDetail from '../views/Evaluate/EvaluateDetail.vue';
import Chat from "../views/Chat/Chat.vue";
import Guide from '../views/Guide/Guide.vue';
import Index1 from '../views/Guide/Index1.vue';
import Index2 from '../views/Guide/Index2.vue'; 
import Prescription from '../views/Prescription/Prescription.vue';
import Prescription_list from '../views/Prescription/Prescription_list.vue';
import Record from '../views/Medical_record/Record.vue';
import Record_list from '../views/Medical_record/Record_list.vue';
import Doctor_list from '../views/Chat/Doctor_list.vue';
import Order_list from '../views/Chat/Order_list.vue';
import Inspect_list from '../views/Inspect/Inspect_list.vue';
import Inspect from '../views/Inspect/Inspect.vue';
import Home from '../views/Test/Home.vue';
import MyTest from '../views/Test/MyTest.vue';
import Result from '../views/Test/Result.vue';
import Login from '../views/Login/login.vue';
import Register from '../views/Login/Register.vue'
const routes = [
	{
		path: '/',
		name: 'Mine',
		component: () => import('../views/Mine.vue'),
		meta: { title: '首页' }
	},
	{
		path: "/404",
		name: "NotFound",
		component: () => import("../views/404.vue"),
		meta: { title: '报错' }
	},
	{
		path: "/user_info",
		name: "UserInfo",
		component:UserInfo,
		meta: { title: '实名绑卡' }
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
		meta: { title: '登录' }
	},
	{
		path: "/register",
		name: "Register",
		component:Register
	},
	{
		path: "/user_camera",
		name: "User_camera",
		component: User_camera,
		meta: { title: '人脸识别' }
	},
	{
		path: "/notice",
		name: 'Notice',
		component: Notice,
		meta: { title: '挂号须知' }
	},
	{
		path: "/medical_dept_list",
		name: "Medical_dept_list",
		component: Medical_dept_list,
		meta: { title: '科室列表' }
	},
	{
		path: "/dept_sub_plan",
		name: "Dept_sub_plan",
		component:Dept_sub_plan,
		meta: { title: '出诊计划' }
	},
	{
		path: "/doctor_schedule",
		name: "Doctor_schedule",
		component: Doctor_schedule,
		meta: { title: '出诊时段' }
	},
	{
		path: "/pay",
		name: "Pay",
		component:Pay,
		meta: { title: '在线支付' }
	},
	{
		path: "/evaluate",
		name: "Evaluate",
		component: Evaluate,
		meta: { title: '在线评价' }
	},
	{
		path: '/evaluate_list',
		name: "Evaluate_list",
		component: Evaluate_list,
		meta: {title:'评价列表'}
	}, {
		path: '/evaluateDetail',
		name: 'EvaluateDetail',
		component: EvaluateDetail,
		meta: {title:'评价详情'}
	},
	{
		path: '/chat',
		name: "Chat",
		component: Chat,
		meta: {title:'在线询医'}
	},
	{
		path: '/prescription',
		name: "Prescription",
		component: Prescription,
		meta: { title: '处方详情' }

	},
	{
		path: '/prescription_list',
		name: 'Prescription_list',
		component: Prescription_list,
		meta: {title:'处方详情'}
	},
	{
		path: '/record_list',
		name: 'Record_list',
		component: Record_list,
		meta: {title:'我的病历'}
	},
	{
		path: '/record',
		name: 'Record',
		component: Record,
		meta: {title:'病历详情'}
	},
	{
		path: '/order',
		name: 'Order',
		component: Order,
		meta: {title:'挂号列表'}
	},
	{
		path: "/resigtion_info",
		name: 'Resigtion_info',
		component: Resigtion_info,
		meta: { title: '挂号记录' }
	},
	{
		path: "/guide",
		name: 'Guide',
		component: Guide,
		meta: { title: '智能导诊' }
	},
	{
		path: '/index1',
		name: 'Index1',
		component: Index1,
		meta: { title: '智能导诊' }
	},
	{
		path: '/index2',
		name: 'Index2',
		component: Index2,
		meta: { title: '智能导诊' }
	},
	{
		path: '/doctor_list',
		name: 'Doctor_list',
		component: Doctor_list,
		meta: { title: '在线医生' }
	},
	{
		path: '/order_list',
		name: 'Order_list',
		component: Order_list,
		meta: { title: '聊天列表' }
	},
	{
		path: '/inspect_list',
		name: 'Inspect_list',
		component: Inspect_list,
		meta: { title: '我得报告' }
	},
	{
		path: '/inspect',
		name: 'Inspect',
		component: Inspect,
		meta: { title: '检查报告' }
	},
	{
		path: "/userpatientinfo",
		name: 'UserPatientinfo',
		component: () => import('../views/User/UserPatientinfo.vue'),
		meta: { title: '家庭档案' }
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: { title: '健康测评' }
	},
	{
		path: '/myTest',
		name: 'MyTest',
		component: MyTest,
		meta: { title: '测评题目' }
	},
	{
        path: '/result',
		name: 'Result',
		component: Result,
		meta: { title: '测评结果' }
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: "/404"
	}

]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})
export default router
router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0
	// firefox
	document.documentElement.scrollTop = 0
	next()
})