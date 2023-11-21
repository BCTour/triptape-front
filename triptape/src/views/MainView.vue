<script setup>
import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import TapeHorizontalList from "@/components/tape/TapeHorizontalList.vue";
import BannerSlider from "@/components/banner/BannerSlider.vue";
import { connect } from "@/util/access.js";


const poplularTapes = ref([]);
const recentTapes = ref([]);
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

const loadBanner = async () => {
	try {
		const result = await connect({
			method: "GET",
			url: `/banner/search/`,
		});
		console.log(result);
		bannerTapes.value = result.data.banner;
		console.log(bannerTapes.value);
	} catch (error) {
		console.log(error);
	}
}


onMounted(async () => {
	await [loadPopularTapes(), loadRecentTapes(), loadBanner()];
});

const current = ref(0);
const transitionOn = ref(true);
const slideCoord = ref(-300);


const onClickRight = () => {
	slideCoord = this.slideCoord - 300

	// transitionOn은 true로 
	this.transitionOn = true

	// 0.5초 뒤에 배열의 순서를 바꾸고 slideCoord값을 다시 초기 값으로 설정
	// 이때만 transition을 off하여 움직이지 않는 것 처럼 눈속임한다.
	// 여기 setTimeout의 delay 시간은 css의 transition의 duration과 같게 설정해야한다.
	setTimeout(this.resetCardArrayToRight, 500)
};
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
			<TapeHorizontalList :tapes="recentTapes" />
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