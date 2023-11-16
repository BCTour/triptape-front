<script setup>
import SubHeading from "@/components/common/SubHeading.vue";

</script>

<template>
	<main>
		<div style="width: 100%; height: 400px; border-radius: 12px; background-color: aqua; margin-bottom: 32px;">
			<h1>제목</h1>
			<p>내용</p>
		</div>
		<div style="margin-bottom: 32px;">
			<div class="sub-heading-container">
				<SubHeading v-bind="{title: '제목', description: '내용'}"/>
			</div>
		</div>
	</main>
</template>
	