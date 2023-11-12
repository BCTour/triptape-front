<script setup>
import {useAuthStore} from "@/stores/auth.js";
const auth = useAuthStore();

</script>

<template>
	<nav>
		<div class="nav-item">
			<router-link :to="{name: 'main'}">TRIP-TAPE</router-link>
		</div>
		<div class="nav-item">
			<router-link :to="{name: 'tapeMain'}">테이프</router-link>
		</div>
		<div class="nav-item">
			<router-link :to="{name: 'attractionMain'}">관광지</router-link>
		</div>
		<div v-if="!auth.isLogined" class="nav-item">
			<router-link :to="{name: 'login'}">로그인</router-link>
		</div>
		<template v-else>
			<div class="nav-item">
				<router-link :to="{name: 'login'}">{{auth.user.name}}</router-link>
			</div>
			<div class="nav-item" @click="auth.logout()">
				로그아웃
			</div>
		</template>
</nav>
</template>

<style scoped>
nav {
	display: flex;
	flex-direction: row;
}
.nav-item {
	padding: 8px;
}
</style>