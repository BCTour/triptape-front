<script setup>
import { ref } from 'vue';
import {useAuthStore} from "@/stores/auth.js";
const auth = useAuthStore();

const selectedMenu = ref("asdf");
const test = ref(false)
</script>

<template>
	<nav>
		<div>
			<router-link @click="selectedMenu='main'" :to="{name: 'main'}" ><img src="../assets/img/logo1.png" class="logo-img"></router-link>
			<router-link @click="selectedMenu='tapeList'" :to="{name: 'tapeList'}" class="nav-item" :class="{selected: selectedMenu==='tapeList'? true : false}">테이프</router-link>
			<router-link @click="selectedMenu='attractionMap'" :to="{name: 'attractionMap'}" class="nav-item" :class="{selected: selectedMenu==='attractionMap'? true : false}">관광지</router-link>
		</div>
		<template v-if="!auth.isLogined" >
			<router-link :to="{name: 'login'}" class="">로그인</router-link>
		</template>
		<template v-else>
			<div>
				<router-link :to="{name: 'userInfo'}" class="">{{auth.user.name}}</router-link>
				<div class="" @click="auth.logout()">
					로그아웃
				</div>
			</div>
		</template>
</nav>
</template>

<style scoped>
.logo-img {
	width: 180px;
	margin-right: 32px;
}
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

.selected {
	background-color: black;
	color: white;
}

</style>