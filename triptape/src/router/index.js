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
			component: TapeMainView
		},
		{
			path: '/user',
			name: "user",
			component: UserMainView,
			children : [
				{
					path: '/login',
					name: "login",
					component: () => import("@/views/user/LoginView.vue")
				},
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
