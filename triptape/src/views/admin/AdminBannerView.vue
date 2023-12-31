<script setup>
import { ref, onMounted } from 'vue';
import { connect } from '@/util/access.js';
import { useRouter } from "vue-router";
import TapeTable from "@/components/tape/TapeTable.vue"
import AttractionItemList from "@/components/attraction/attractionItemList.vue"
import BannerItemList from "@/components/banner/BannerItemList.vue";

const router = useRouter();
const userId = ref(localStorage.getItem("userId"));
const countReport = ref(5);
const attractions = ref([]);
const banners = ref([]);
const tapes = ref([]);
const banner = ref({
	bannerKey: "",
	title: "",
	description: "",
	tape: {
		tapeKey: ""
	}
})
const selectedTape = ref({
    title: "",
});
const isModify = ref();

onMounted(async () => {
	await getReport();
	await getBanner();
	await getPopularTape();
});

const getBanner = async () => {
	let url = `/banner/search`;
	try {
		const result = await connect({
			method: "GET",
			url: url,
		});
		banners.value = result.data.banner;
	} catch (error) {
		console.log(error);
	}
}

const getPopularTape = async () => {
	let url = `/tape/search/recent/15`;
	try {
		const result = await connect({
				method: "GET",
				url: url,
		});
		tapes.value = result.data.tape;
	} catch (error) {
		console.log(error);
	}
}


const getReport = async () => {
	let url = `/user/search/report?userId=${userId.value}&countReport=${countReport.value}`;
	try {
		const result = await connect({
			method: "GET",
			url: url,
		});
		attractions.value = result.data.attraction;
	} catch (error) {
		console.log(error);
	}
}

const deleteBanner = async () => {
	await getBanner();
}

const onClickAttraction = async (attraction) => {
	router.push({ name: 'attractionDetail', params: { id: attraction.attractionKey } })
}

const registBanner = async () => {
	let url = `/banner/regist/${userId.value}`;
	if (selectedTape.title == "") {
		alert("테이프를 선택해주세요");
		return;
	}
	try {
		const result = await connect({
			method: "POST",
			url: url,
			data: {
				title: banner.value.title,
				description: banner.value.description,
				tape: {
					tapeKey: selectedTape.value.tapeKey
				}
			}
		});
		await getBanner();
	} catch (error) {
			if (error.request !== undefined && error.request.status === 409) {
				alert("이미 배너로 등록된 테이프입니다.")
			}
			console.log(error);
	}
}

const modifyBanner = async () => {
	let url = `/banner/modify/${userId.value}`;
	if (selectedTape.value == null) {
		alert("테이프를 선택해주세요");
		return;
	}
	try {
		const result = await connect({
			method: "PUT",
			url: url,
			data: {
				bannerKey: banner.value.bannerKey,
				title: banner.value.title,
				description: banner.value.description,
				tape: {
					tapeKey: selectedTape.value.tapeKey
				}
			}
		});
		await getBanner();

		banner.value.title = "";
		banner.value.description = "";
		banner.value.bannerKey = "";
		banner.value.tape = "";

		selectedTape.value.title = "";
		isModify.value = 0;
	} catch (error) {
		if (error.request !== undefined && error.request.status === 409) {
			alert("이미 배너로 등록된 테이프입니다.")
		}
		console.log(error);
	}
}

const onClickBanner = (data, idx) => {
	isModify.value = idx;
	if (isModify.value != 0) {
		banner.value = data;
		selectedTape.value = data.tape;
	}
}

const onClickTape = (tapeKey) => {
	for (let i in tapes.value) {
		if (tapes.value[i].tapeKey == tapeKey) {
			selectedTape.value = tapes.value[i];
		}
	}
}

</script>

<template>
	<div class="banner">
		<div class="bannerInput">
			<div class="card">
				<h3 v-show="!isModify">배너 등록</h3>
				<h3 v-show="isModify">배너 수정</h3>
				<h4 v-show="isModify">#{{ isModify }} 수정</h4>
				<div class="input-box">
					<label>제목</label>
					<input v-model="banner.title" type="text" placeholder="배너에 들어갈 제목을 입력해주세요." />
				</div>
				<div class="input-box">
					<label>설명</label>
					<input v-model="banner.description" placeholder="배너에 들어갈 소개를 입력해주세요." />
				</div>
				<div class="input-box">
					<label>등록할 테이프명</label>
					<input v-if="selectedTape" v-model="selectedTape.title" placeholder="오른쪽에서 테이프를 선택해주세요." disabled/>
					<input v-else disabled placeholder="오른쪽에서 테이프를 선택해주세요." />
				</div>
				<div class="btn-box">
					<button class="primary-btn" v-if="!isModify" @click="registBanner">배너 등록</button>
					<button class="primary-btn" v-if="isModify" @click="modifyBanner">배너 수정</button>
					<button class="primary-btn" style="margin-left: 5px;" v-if="isModify" @click="onClickBanner">등록으로 전환</button>
				</div>
			</div>
			<div class="card">
				<h3>배너 목록</h3>
				<BannerItemList :banners="banners" @onClickItem="onClickBanner" @deleteBanner="deleteBanner"/>
			</div>
		</div>
		<div class="bannerTape card">
			<h3>테이프 리스트</h3>
			<TapeTable :tapes="tapes" @on-click-item="onClickTape"></TapeTable>
		</div>
	</div>
</template>

<style scoped>
.card {
    padding: 15px;
    margin-bottom: 12px;
}

.input-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;
}

.admin {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.banner {
	display: flex;
    flex-direction: row;
}

.bannerInput {
	flex: 1.2;
	margin-right: 16px;
}

.bannerTape {	
	flex: 1;
}

button {
	flex: 1;
}

.btn-box {
	display: flex;
	flex-direction: row;
}
</style>