<script setup>
import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import TapeHorizontalList from "@/components/tape/TapeHorizontalList.vue";
import AttractionHorizontalList from "@/components/attraction/AttractionHorizontalList.vue";
import BannerSlider from "@/components/banner/BannerSlider.vue";
import { connect } from "@/util/access.js";


const poplularTapes = ref([]);
const recentTapes = ref([]);
const popularAttractions = ref([]);
const bannerTapes = ref([
	{
		bannerKey: Number,
		title: String,
		description: String,
		tape: {
			tapeKey: Number,
			img: {
				saveFile: String
			}
		}
	}
]);

const loadPopularTapes = async () => {
	try {
		const result = await connect({
			method: "GET",
			url: `/tape/search/popular/4`,
		});
		// console.log(result);
		if (result.data.tape)	poplularTapes.value = result.data.tape;
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
		// console.log(result);
		if (result.data.tape) recentTapes.value = result.data.tape;
	} catch (error) {
		console.log(error);
	}
}

const loadPopularAttractions = async () => {
	try {
		const result = await connect({
			method: 'GET',
			url: `/attraction/popular/4`,
		});
		// console.log(result);
		if (result.data.attraction) popularAttractions.value = result.data.attraction;
	} catch (error) {
		console.log(error);
	}
}

const loadBanner = async () => {
	try {
		const result = await connect({
			method: "GET",
			url: `/banner/search/`,
		});
		// console.log(result);
		bannerTapes.value = result.data.banner;
		// console.log(bannerTapes.value);
	} catch (error) {
		console.log(error);
	}
}


onMounted(async () => {
	await [loadPopularTapes(), loadRecentTapes(), loadBanner(), loadPopularAttractions()];
});

</script>


<template>
	<main>
		<div class="section">
			<BannerSlider/>
		</div>
		<div class="section">
			<div class="sub-heading-container">
				<SubHeading v-bind="{ title: '인기 테이프', description: '지금 가장 많은 사람이 관심을 갖고 있는 테이프예요.' }" />
			</div>
			<TapeHorizontalList :tapes="poplularTapes" />
		</div>
		<div class="section">
			<div class="sub-heading-container">
				<SubHeading v-bind="{ title: '최신 테이프', description: '방금 시작된 따끈따끈한 테이프들이에요.' }" />
			</div>
			<TapeHorizontalList :tapes="recentTapes" />
		</div>
		<div class="section">
			<div class="sub-heading-container">
				<SubHeading v-bind="{ title: '핫 플레이스', description: '많은 사람이 좋아하는 장소예요.' }" />
			</div>
			<AttractionHorizontalList :attractions="popularAttractions" />
		</div>
	</main>
</template>

<style scoped>
.section {
	margin-bottom: 64px;
}

.card {
	justify-content: end;
	height: 350px;
	border-radius: 10px;
}
</style>