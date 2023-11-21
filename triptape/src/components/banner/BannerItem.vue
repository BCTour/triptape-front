<script setup>
defineProps({
    idx: Number,
    bannerKey: Number,
    title: String,
    description: String,
    tape: {
        title: String,
        description: String
    }
})

</script>

<template>
    <div>
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
        
    </div>
</template>

<style scoped></style>