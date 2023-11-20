<script setup>
import { ref } from 'vue';
import { connect } from '@/util/access.js';
const props = defineProps({
    idx: Number,
    bannerKey: Number,
    title: String,
    description: String,
    tape: {
        title: String,
        description: String
    }
})

const deleteBanner = async (bannerKey) => {
    let url = `/banner/delete/${userId.value}?bannerKey=${bannerKey}`;
    try {
        const result = await connect({
            method: "DELETE",
            url: url,
        });
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <h4>#[{{ idx + 1 }}]</h4>
    <div>
        <h3>{{ title }}</h3>
        <p class="description">{{ description }}</p>
    </div>
    <h3>테이프 정보--- </h3>
    <div>
        <h3>{{ tape.title }}</h3>
        <p>{{ tape.description }}</p>
    </div>
    <button @click="$emit('onDeleteBanner', bannerKey)">배너 삭제</button>
</template>

<style scoped></style>