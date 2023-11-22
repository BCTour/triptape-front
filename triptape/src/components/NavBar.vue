<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
const { isLogined, user } = storeToRefs(auth);

const selectedMenu = ref("asdf");

const logout = () => {
	selectedMenu.value = null;
	auth.logout();
}

</script>

<template>
	<nav>
		<div>
			<router-link @click="selectedMenu = 'main'" :to="{ name: 'main' }"><img src="../assets/img/logo1.png"
					class="logo-img"></router-link>
			<router-link @click="selectedMenu = 'tapeList'" :to="{ name: 'tapeList' }" class="nav-link"
				:class="{ selected: selectedMenu === 'tapeList' ? true : false }">테이프</router-link>
			<router-link @click="selectedMenu = 'attractionMap'" :to="{ name: 'attractionMap' }" class="nav-link"
				:class="{ selected: selectedMenu === 'attractionMap' ? true : false }">관광지</router-link>
			<router-link v-if="auth.user.role==1" :to="{name: 'admin'}" class="nav-link">관리자 메뉴</router-link>
		</div>
		<template v-if="!isLogined">
			<router-link :to="{ name: 'login' }" class="">로그인</router-link>
		</template>
		<template v-else>
			<div>
				<router-link :to="{ name: 'userInfo' }" class="">{{ user.name }}</router-link>
				<div class="nav-item" @click="logout">
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

nav>div {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.nav-link {
	display: block;
	padding: 16px 32px 16px 32px;
	color: black;
	text-decoration: none;
}

.nav-link:hover {
	background-color: black;
	color: white;
}

.nav-item {
	display: block;
	padding: 16px 32px 16px 32px;
	color: #666666;
	text-decoration: none;
}

.nav-item:hover {
	color: black;
	cursor: pointer;
}

.selected {
	background-color: black;
	color: white;
}
</style>