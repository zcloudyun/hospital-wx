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
const routes = [
	{
		path: '/',
		name: 'Main',
		component: Main,
	},
	{
		path: "/404",
		name: "NotFound",
		component: NotFound
	},
	{
		path: "/userinfo",
		name: "UserInfo",
		component: UserInfo
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
	{
		path: "/usercamera/:mode",
		name: "User_camera",
		component: User_camera
	},
	{
		path: "/notice",
		name: 'Notice',
		component:Notice
	},
	{
		path: "/medical_dept_list",
		name: "Medical_dept_list",
		component:Medical_dept_list
	},
	{
		path: "/dept_sub_plan/:deptSubId/:deptSubName",
		name: "Dept_sub_plan",
		component: Dept_sub_plan
	},
	{
		path: "/doctor_schedule/:deptSubId/:doctorId/:date",
		name: "Doctor_schedule",
		component: Doctor_schedule
	},
	{
		path: "/pay/:outTradeNo/:price",
		name: "Pay",
		component: Pay
	},
	{
		path: '/prescription',
		name: "Prescription",
		component:Prescription
	},
	{
		path: "/resigtion_info",
		name: Resigtion_info,
		component:Resigtion_info
	},
	// {
	// 	path: "/index",
	// 	name: "Index",
	// 	component: Index
	// },
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
