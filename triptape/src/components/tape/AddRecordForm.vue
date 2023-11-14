<script setup>
import { ref } from 'vue';
import Modal from "@/components/common/Modal.vue";
import SelectAttraction from "@/components/attraction/SelectAttraction.vue";

const tapeKey = ref(0);
const content = ref("");
const img = ref("");
const attractionKey = ref(0);
const userKey = ref(0);
const parentRecordKey = ref(123);

/* 모달 관련 */
const isModalOpen = ref(false);

const toggleModal = () => {
  isModalOpen.value = isModalOpen.value ? false : true;
}
</script>

<template>
	<Modal v-if="isModalOpen" @close-modal="toggleModal">
    <SelectAttraction @close-modal="toggleModal"/>
  </Modal>
	<div class="card">
		<h4>테이프에 레코드 남기기</h4>
		<span v-if="parentRecordKey != -1"><span class="parent-num">#{{ parentRecordKey }}</span>에 대한 답</span>
		<div class="input-box">
			<input type="text" placeholder="내용을 입력해주세요" v-model="content"/>
			<button class="primary-outline-btn add-file-btn" @click="toggleModal">장소 추가</button>
		</div>
		<button class="primary-btn">작성하기</button>
	</div>
</template>

<style scoped>
.card {
	padding: 16px;
}
.parent-num {
	color: rgb(36, 140, 226);
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