<script setup>
import {useAuthStore} from "@/stores/auth.js";
const auth = useAuthStore();

</script>

<template>
	<nav>
		<div>
			<!-- <router-link :to="{name: 'main'}" ><img src="@/assets/img/logo.png"></router-link> -->
			<router-link :to="{name: 'main'}" ><h1>TRIP-TAPE</h1></router-link>
			<router-link :to="{name: 'tapeList'}" class="nav-item">테이프</router-link>
			<router-link :to="{name: 'attractionMain'}" class="nav-item">관광지</router-link>
		</div>
		<template v-if="!auth.isLogined" >
			<router-link :to="{name: 'login'}" class="nav-item">로그인</router-link>
		</template>
		<template v-else>
			<div>
				<router-link :to="{name: 'login'}" class="nav-item">{{auth.user.name}}</router-link>
				<div class="nav-item" @click="auth.logout()">
					로그아웃
				</div>
			</div>
		</template>
</nav>
</template>

<style scoped>
nav {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 0 0 32px 0;
}

nav > div {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.nav-item {
	display: block;
	padding: 16px 32px 16px 32px;
	color: black;
	text-decoration: none;
}

.nav-item:hover{
	background-color: black;
	color: white;
}

</style>