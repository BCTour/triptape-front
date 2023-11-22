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

const emit = defineEmits(["onWriteRecord", "onUnselectRecord"])

const content = ref("");


/* 모달 관련 */
const isModalOpen = ref(false);
const selectedAttraction = ref(null);

const toggleModal = () => {
	isModalOpen.value = isModalOpen.value ? false : true;
}

let imgFile = null;
const onFileChange = (event) => {
	imgFile = event.target.files[0];
}

const resetInput = () => {
	imgFile = null;
	emit("onUnselectRecord");
	content.value = "";
	selectedAttraction.value = null;
}
const isValidContent = ref(true);

const checkValidation = () => {
	let isValid = false;
	if (content.value) {
		isValid = true;
	}
	if (selectedAttraction.value) {
		isValid = true;
	}
	if (imgFile) {
		isValid = true;
	}

	return isValid;
}

const onClickCreateRecord = async () => {
	if (!checkValidation()) {
		isValidContent.value = false;
		return;
	} else {
		isValidContent.value = true;
	}

	try {
		const recordData = {
			tapeKey: route.params.id,
			content: content.value,
			user: {
				userId: localStorage.getItem("userId"),
			},
		}
		if (selectedAttraction.value) {
			recordData["attraction"] = { "attractionKey": selectedAttraction.value.attractionKey, };
		}
		if (props.selectedRecord) {
			recordData["parentRecordKey"] = props.selectedRecord;
		}
		console.log(recordData);
		const formData = new FormData();
		const blob = new Blob([JSON.stringify(recordData)], { type: "application/json" });
		formData.append("record", blob);
		if (imgFile) formData.append("file", imgFile);

		const result = await connect({
			method: "POST",
			url: `/record/regist`,
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data",
			}
		});
		emit("onWriteRecord");
		console.log(result);
		resetInput();
	} catch (error) {
		console.log(error);
	}
}

const onAddAttraction = async (attraction) => {
	// console.log(attraction);
	selectedAttraction.value = attraction;
}

const fileInput = ref(null);
const onClickCancelFile = () => {
	imgFile = null;
	fileInput.value.value = null;
}



</script>

<template>
	<Modal v-if="isModalOpen" @close-modal="toggleModal">
		<SelectAttraction @close-modal="toggleModal" @on-add-attraction="onAddAttraction" />
	</Modal>
	<div class="card">
		<h4>테이프에 레코드 남기기</h4>
		<div v-if="selectedRecord" class="parent-record"><span><span class="parent-num">#{{ selectedRecord }}</span>에 대한
				답</span>
			<CloseIcon @click="$emit('onUnselectRecord')" class="close-btn" />
		</div>
		<div v-else class="parent-record">레코드를 클릭해 레코드에 답을 달 수 있습니다.</div>
		<div class="input-box">
			<input type="text" placeholder="내용을 입력해주세요" v-model="content" />
			<button class="primary-outline-btn add-file-btn" @click="toggleModal">장소 추가</button>
		</div>
		<div class="card selected-attraction">
			<div class="row">
				<h4>선택된 장소</h4>
				<CloseIcon class="close-btn" @click="selectedAttraction = null" />
			</div>
			<p v-if="selectedAttraction">{{ selectedAttraction.name }}</p>
			<p v-else>선택된 장소가 없습니다.</p>
		</div>
		<div class="input-box">
			<span>이미지</span>
			<input type="file" accept=".jpg, .png" ref="fileInput" @change="onFileChange"/>

			<button class="primary-outline-btn" @click="onClickCancelFile">취소</button>
		</div>
		<label v-show="!isValidContent" class="danger">내용을 입력해주세요.</label>
		<button class="primary-btn" @click="onClickCreateRecord">작성하기</button>
	</div>
</template>

<style scoped>
.row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

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
	fill: var(--caption-color)
}

.close-btn:hover {
	fill: red;
}

input {
	flex: 1;
	/* width: calc(100% - 108px); */
	margin-right: 8px;
}

.add-file-btn {
	width: 100px;
}

.input-box {
	display: flex;
	flex-direction: row;
	width: 100%;
	margin: 8px 0px;
	align-items: center;
}

.input-box>span {
	margin-right: 8px;
}
</style>