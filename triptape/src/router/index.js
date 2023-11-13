import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AttractionMainView from "@/views/AttractionMainView.vue";
import TapeMainView from "@/views/TapeMainView.vue";
import UserMainView from "@/views/UserMainView.vue";

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
			component: AttractionMainView
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
			]
		},
		{
			path: '/user',
			name: "user",
			component: UserMainView,
			children : [
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
				}
			]

		}
		// {
		//   path: '/about',
		//   name: 'about',
		//   // route level code-splitting
		//   // this generates a separate chunk (About.[hash].js) for this route
		//   // which is lazy-loaded when the route is visited.
		//   component: () => import('../views/AboutView.vue')
		// }
	]
})

export default router
