<script setup>
import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import TapeHorizontalList from "@/components/tape/TapeHorizontalList.vue";
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
	console.log(current);
	current += 1;
	setTransition('transform 0.3s linear');
	setTranslate({ index: current });
	if (current > lastIndex) {
		current = 0;
		setTimeout(() => {
			setTransition('');
			setTranslate({ index: current });
		}, 300);
	}
	if (current <= lastIndex) activePagination(current);
};
</script>



<template>
	<main>
		<div class="section slide">
			<div class="card slide-item">
				<div class="slide" :class="{ 'slide- active': transitionOn }"
					:style="{ transform: 'translate3d(' + slideCoord + 'px, 0, 0)', }">
					<div v-for="bannerTape in bannerTapes" :key="bannerTape.bannerKey">
						<img class="slide-img" v-if="bannerTape.tape.img" :src="bannerTape.tape.img.saveFile">
						<img class="slide-img" v-else src="@/assets/img/no_image.png">
					</div>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="sub-heading-container">
				<SubHeading v-bind="{ title: '인기 테이프', description: '지금 가장 많은 사람이 관심을 갖고 있는 테이프예요.' }" />
			</div>
			<TapeHorizontalList :tapes="poplularTapes" />
		</div>
		<div style="margin-bottom: 32px;">
			<div class="sub-heading-container">
				<SubHeading v-bind="{ title: '최신 테이프', description: '방금 시작된 따끈따끈한 테이프들이에요.' }" />
			</div>
			<TapeHorizontalList :tapes="recentTapes" />
		</div>
		<div style="margin-bottom: 32px;">
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

.slide {
	display: flex;
	flex-wrap: nowrap;
	overflow: hidden;
	position: relative;
}

.slide-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 10px;
}

.slide-item {
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;
	left: 0px;

	width: 100%;
	flex-shrink: 0;

	transition: left 0.15s;
}

.slide_button {
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: calc(50% - 16px);

	width: 32px;
	height: 32px;

	border-radius: 100%;
	background-color: #cccc;
	cursor: pointer;
}

.slide_pagination {
	/* layout */
	display: flex;
	gap: 5px;

	/* position */
	position: absolute;
	bottom: 0;
	/* left:50%, translateX(-50%)를 하면 가로 가운데로 위치시킬 수 있다. */
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
}

.slide_prev_button {
	left: 10px;
}

.slide_next_button {
	right: 10px;
}
</style>