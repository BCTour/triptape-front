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
    <div class="card container reactive">
        <p class="caption">#{{ idx + 1 }}</p>
        
        <h3>{{ title }}</h3>
        <p class="description">{{ description }}</p>
        
        <div class="card">
            <p class="caption">연결된 테이프</p>
            <h4>{{ tape.title }}</h4>
            <p class="caption">{{ tape.description }}</p>
        </div>
    </div>
</template>

<style scoped>
.container{
    background-color: #F2F2F2;
}
.card {
    padding: 8px;
}
.row {
    display: flex;
    flex-direction: row;
}
.description {
    margin-bottom: 8px;
}
</style>