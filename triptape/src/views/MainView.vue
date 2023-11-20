<script setup>
import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import TapeHorizontalList from "@/components/tape/TapeHorizontalList.vue";
import { connect } from "@/util/access.js";
import { useAuthStore } from "@/stores/auth.js";
import { useLikeStore } from "@/stores/like.js";

const auth = useAuthStore();
const like = useLikeStore();

const poplularTapes = ref([]);
const recentTapes = ref([]);

const loadPopularTapes = async () => {
	try {
		const result = await connect({
			method: "GET",
			url: `/tape/search/popular/4`,
		});
		console.log(result);
		poplularTapes.value = result.data.tape;
	} catch (error) {
		console.log(error);
	}
}

const loadRecentTapes = async () => {
	try {
		const result = await connect({
			method: "GET",
			url: `/tape/search/recent/4`,
		});
		console.log(result);
		recentTapes.value = result.data.tape;
	} catch (error) {
		console.log(error);
	}
}

onMounted(async () => {
	await [loadPopularTapes(), loadRecentTapes()];

	if (localStorage.getItem("userId")) {
		await like.loadAll();
	}
});

</script>



<template>
	<main>
		<div class="section">
			<div class="card reactive">
				<h1>관리자가 지정할 수 있는 테이프 추천</h1>
				<p>테이프 추천이 들어가는 공간입니다.</p>
			</div>
		</div>
		<div class="section">
			<div class="sub-heading-container">
				<SubHeading v-bind="{title: '인기 테이프', description: '지금 가장 많은 사람이 관심을 갖고 있는 테이프예요.'}"/>
			</div>
			<TapeHorizontalList :tapes="poplularTapes"/>
		</div>
		<div style="margin-bottom: 32px;">
			<div class="sub-heading-container">
				<SubHeading v-bind="{title: '최신 테이프', description: '방금 시작된 따끈따끈한 테이프들이에요.'}"/>
			</div>
			<TapeHorizontalList :tapes="recentTapes"/>
		</div>
		<div style="margin-bottom: 32px;">
			<div class="sub-heading-container">
				<SubHeading v-bind="{title: '핫 플레이스', description: '많은 사람이 좋아하는 장소예요.'}"/>
			</div>
			<TapeHorizontalList :tapes="recentTapes"/>
		</div>
	</main>
</template>

<style scoped>
.section {
	margin-bottom: 64px;
}
.card {
	justify-content: end;
	height: 300px;
	padding: 36px;
}
</style>