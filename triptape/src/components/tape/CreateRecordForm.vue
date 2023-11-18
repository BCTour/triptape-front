<script setup>
import { ref } from 'vue';
import Modal from "@/components/common/Modal.vue";
import SelectAttraction from "@/components/attraction/SelectAttraction.vue";
import CloseIcon from '@/assets/icons/CloseIcon.vue';
import { connect } from '@/util/access.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
	selectedRecord: Number,
})

const tapeKey = ref(0);
const content = ref("");
const img = ref("");
const attractionKey = ref(0);
const userKey = ref(0);

/* 모달 관련 */
const isModalOpen = ref(false);
const selectedAttraction = ref(null);

const toggleModal = () => {
  isModalOpen.value = isModalOpen.value ? false : true;
}

const onClickCreateRecord = async () => {
	try {
		const recordData = {
			tapeKey: route.params.id,
			content: content.value,
			user: {
				userId: localStorage.getItem("userId"),
			},
		}
		if (selectedAttraction.value) {
			recordData["attraction"] = {"attractionKey": selectedAttraction.value.attractionKey,};
		}
		if (props.selectedRecord) {
			recordData["parentRecordKey"] = props.selectedRecord;
		}
		console.log(recordData);
		const formData = new FormData();
		const blob = new Blob([JSON.stringify(recordData)], { type: "application/json" });
		formData.append("record", blob);

		const result = await connect({
			method: "POST",
			url: `/record/regist`,
			data: formData,
		});
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}

const onAddAttraction = async (attraction) => {
	// console.log(attraction);
	selectedAttraction.value = attraction;
}
</script>

<template>
	<Modal v-if="isModalOpen" @close-modal="toggleModal">
		<SelectAttraction @close-modal="toggleModal" @on-add-attraction="onAddAttraction"/>
	</Modal>
	<div class="card">
		<h4>테이프에 레코드 남기기</h4>
		<div v-if="selectedRecord" class="parent-record"><span><span class="parent-num">#{{ selectedRecord }}</span>에 대한 답</span><CloseIcon @click="$emit('onUnselectRecord')" class="close-btn"/></div>
		<div v-else class="parent-record">레코드를 클릭해 레코드에 답을 달 수 있습니다.</div>
		<div class="input-box">
			<input type="text" placeholder="내용을 입력해주세요" v-model="content"/>
			<button class="primary-outline-btn add-file-btn" @click="toggleModal">장소 추가</button>
		</div>
		<div class="card selected-attraction">
			<h4>선택된 장소</h4>
			<p v-if="selectedAttraction">{{selectedAttraction.name}}</p>
			<p v-else>선택된 장소가 없습니다.</p>
		</div>
		<button class="primary-btn" @click="onClickCreateRecord">작성하기</button>
	</div>
</template>

<style scoped>
.card {
	padding: 16px;
}

.selected-attraction {
	margin-bottom: 8px;
}
.parent-record {
	display: flex;
	flex-direction: row;
	align-items: center;
	color: var(--caption-color);
	/* justify-content: space-between; */
}
.parent-num {
	color: rgb(36, 140, 226);
}

.close-btn {
	width: 18px;
	/* padding: 2px; */
	fill: var(--caption-color)
}
.close-btn:hover {
	fill: red;
}
input{
	width: calc(100% - 108px);
	margin-right: 8px;
}
.add-file-btn {
	width: 100px;
}

.input-box {
	width: 100%;
	margin: 8px 0px;
}
</style>