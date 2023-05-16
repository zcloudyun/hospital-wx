import {
	createRouter,
	createWebHashHistory
}
from 'vue-router'
import Main from "../views/main.vue"
import NotFound from "../views/404.vue"
import UserInfo from '../views/User/User_info.vue'
import Login from '../views/User/Login.vue'
// import Index from '../views/Index.vue'
import User_camera from "../views/User/User_camera.vue"
import Notice from '../views/Registration/Notice.vue'
import Medical_dept_list from "../views/Registration/Medical_dept_list.vue"
import Dept_sub_plan from '../views/Registration/Dept_sub_plan.vue'
import Doctor_schedule from '../views/Registration/Doctor_schedule.vue'
import Pay from '../views/Registration/Pay.vue'
import Prescription from '../views/Registration/Prescription.vue'
import Resigtion_info from '../views/Registration/Resigtion_info.vue'
import UserPatientinfo from '../views/User/UserPatientinfo.vue'
import Guide from '../views/Guide/Guide.vue'
import Index1 from '../views/Guide/Index1.vue'
import Index2 from '../views/Guide/Index2.vue'
const routes = [
	{
		path: '/',
		name: 'Main',
		component: Main,
		meta: { title: '首页' }
	},
	{
		path: "/404",
		name: "NotFound",
		component: NotFound,
		meta: { title: '报错' }
	},
	{
		path: "/userinfo",
		name: "UserInfo",
		component: UserInfo,
		meta: { title: '实名绑卡' }
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
		meta: { title: '登录' }
	},
	{
		path: "/usercamera/:mode",
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
		path: "/dept_sub_plan/:deptSubId/:deptSubName",
		name: "Dept_sub_plan",
		component: Dept_sub_plan,
		meta: { title: '出诊计划' }
	},
	{
		path: "/doctor_schedule/:deptSubId/:doctorId/:date",
		name: "Doctor_schedule",
		component: Doctor_schedule,
		meta: { title: '出诊时段' }
	},
	{
		path: "/pay/:outTradeNo/:price",
		name: "Pay",
		component: Pay,
		meta: { title: '在线支付'}
	},
	{
		path: '/prescription',
		name: "Prescription",
		component: Prescription,
		meta: { title: '处方详情'}
		
	},
	{
		path: "/resigtion_info",
		name: Resigtion_info,
		component: Resigtion_info,
		meta: { title: '挂号记录'}
	},
	{
		path: "/guide",
		name: Guide,
		component: Guide,
		meta: { title: '智能导诊'}
	},
	{
		path: '/index1',
		name: Index1,
		component: Index1,
		meta: { title: '智能导诊'}
	},
	{
		path: '/index2',
		name: Index2,
		component: Index2,
		meta: { title: '智能导诊'}
	},
	{
		path: "/userpatientinfo",
		name: UserPatientinfo,
		component: UserPatientinfo,
		meta: { title: '家庭档案' }
	},
	// {
	// 	path: "/index",
	// 	name: "Index",
	// 	component: Index
	// },
	{
		path: '/:pathMatch(.*)*',
		redirect: "/404"
	},
	
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})
export default router
