<script setup>
import { ref, onMounted } from 'vue';
import { connect } from '@/util/access.js';
import { useRouter } from "vue-router";

</script>

<template>
	<div class="admin">
		<div class="row card">
			<h2>관리자 관리 화면</h2>
			<router-link :to="{name: 'adminBanner'}" class="nav-link">배너 관리</router-link>
			<router-link :to="{name: 'adminReport'}" class="nav-link">신고 장소 관리</router-link>
		</div>
		<RouterView />
	</div>
</template>

<style scoped>
h2 {
	margin-bottom: 0px;
}

.row {
	padding: 0px 16px 0px 16px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 16px;
}
.nav-link {
	display: block;
	padding: 16px 32px 16px 32px;
	color: black;
	text-decoration: none;
	margin-left: 16px
}
.nav-link:hover {
	background-color: black;
	color: white;
}

.admin {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>