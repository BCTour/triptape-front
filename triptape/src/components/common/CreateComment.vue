<script setup>
import { ref} from 'vue';
import {connect} from '@/util/access.js';

const props = defineProps({
  id: Number,
})

const emit = defineEmits(["onWriteComment"]);

const content = ref("");
const onClickWriteComment = async () => {
  try {
    const result = await connect({
      url: `/attraction/comment/regist`,
      method: "POST",
      data: {
        user: {
          userId: localStorage.getItem("userId"),
        },
        attractionKey: props.id,
        content: content.value,
      }
    })
    console.log(result);
    content.value = "";
    emit("onWriteComment");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="create-comment-container">
    <input type="text" v-model="content"/>
    <button class="primary-btn" @click="onClickWriteComment">댓글 작성</button>
  </div>
</template>

<style scoped>
.create-comment-container {
  padding: 16px;
  display: flex;
  flex-direction: row;
}

input {
  flex: 1;
  margin-right: 4px;
}
</style>