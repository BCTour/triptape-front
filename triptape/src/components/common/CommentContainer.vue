<script setup>
import {ref, onMounted} from 'vue';
import CommentList from '@/components/common/CommentList.vue';
import CreateComment from '@/components/common/CreateComment.vue';
import { connect } from '@/util/access.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPage = ref(1);
const comments = ref([]);

onMounted(async () => {
	await onLoadMore();
})

const reloadComment = async () => {
	comments.value = [];
	currentPage.value = 1;
	await onLoadMore();
}

const onLoadMore = async () => {
	console.log("나 더 로딩한다!!" + currentPage.value);
	try {
		const result = await connect({
			url: `/attraction/comment/search/${route.params.id}?currentPage=${currentPage.value++}`,
		method: "GET",
		})
    console.log(result);
    comments.value.push(...result.data.comment);
		console.log(comments.value);
  } catch (error) {
		console.log(error);
  }
}

</script>

<template>
	<div class="card comment-container">
		<CommentList v-if="comments.length > 0" :comments="comments" @on-reload="reloadComment" @on-load-more="onLoadMore"/>
		<div v-else class="no-comment caption">등록된 댓글이 없습니다.</div>
		<CreateComment :id="$route.params.id" @on-write-comment="reloadComment" />
	</div>
</template>

<style scoped>
.no-comment {
	display: flex;
	width: 100%;
	height: 100%;
	/* text-align: center; */
	align-items: center;
	justify-content: center;
}
</style>