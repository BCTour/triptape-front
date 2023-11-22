import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AttractionMainView from "@/views/AttractionMainView.vue";
import TapeMainView from "@/views/TapeMainView.vue";
import UserMainView from "@/views/UserMainView.vue";
import { useAuthStore } from '@/stores/auth.js';

// const modalRouter = ([
// 	{
// 		path: "/attraction/selectAttraction",
// 		name: "selectAttraction",
// 		component: () => import("@/views/attraction/SelectAttractionView.vue")
// 	},
// 	{
// 		path: "/attraction/createAttraction",
// 		name: "createAttraction",
// 		component: () => import("@/views/attraction/CreateAttractionView.vue")
// 	},
// ])

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: MainView
		},
		{
			path: '/attraction',
			name: "attractionMain",
			component: AttractionMainView,
			children: [
				{
					path: "/attraction/map",
					name: "attractionMap",
					component: () => import("@/views/attraction/AttractionMapView.vue")
				},
				{
					path: "/attraction/detail/:id",
					name: "attractionDetail",
					component: () => import("@/views/attraction/AttractionDetailView.vue")
				},
				{
					path: '/attraction/regist',
					name: "registAttraction",
					component: () => import("@/views/attraction/RegistAttractionView.vue"),
				}
			]
		},
		{
			path: '/tape',
			name: "tapeMain",
			component: TapeMainView,
			children: [
				{
					path: '/tape',
					name: "tapeList",
					component: () => import("@/views/tape/TapeListView.vue")
				},
				{
					path: '/tape/detail/:id',
					name: "tapeDetail",
					component: () => import("@/views/tape/TapeDetailView.vue")
				},
				{
					path: '/tape/detail/contained/:id',
					name: 'attractionContainedTape',
					component: () => import("@/views/attraction/AttractionContainedTapeView.vue")
				},
				{
					path: '/tape/create',
					name: 'createTape',
					component: () => import("@/views/tape/CreateTapeView.vue"),
					beforeEnter: (to, from) => {
						if (!useAuthStore().isLogined) {
							alert("로그인 후 이용가능합니다.");
							return { name: 'login' }
						}
					}
				},
				{
					path: '/tape/modify/:id',
					name: 'modifyTape',
					component: () => import("@/views/tape/ModifyTapeView.vue")
				}
			]
		},
		{
			path: '/user',
			name: "user",
			component: UserMainView,
			children: [
				{
					path: '/user/login',
					name: "login",
					component: () => import("@/views/user/LoginView.vue")
				},
				{
					path: '/user/regist',
					name: 'registUser',
					component: () => import("@/views/user/UserRegistView.vue")
				},
				{
					path: '/user/find-password',
					name: 'findPassword',
					component: () => import("@/views/user/FindPasswordView.vue")
				},
				{
					path: '/user/detail',
					name: 'userInfo',
					component: () => import("@/views/user/UserInfoView.vue"),
					beforeEnter: (to, from) => {
						if (!useAuthStore().isLogined) {
							alert("로그인 후 이용가능합니다.");
							return { name: 'login' }
						}
					}
				},
			]
		},
		{
			path: `/admin`,
			name: "admin",
			component: () => import("@/views/AdminView.vue"),
			beforeEnter: (to, from) => {
				if (useAuthStore().user.role != 1) {
					alert("접근 권한이 없습니다.");
					return { name: 'main' }
				}
			}
		},
	]
})

// router.beforeEach(async (to, from) => {
// 	if (to.name === "attractionMap") {
// 		loadAttractions();
// 	}
// 	next();
// })

export default router
