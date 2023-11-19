<script setup>
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import {connect} from '@/util/access.js';

const props = defineProps({
  commentKey: Number,
  user: Object,
  attractionKey: Number,
  content: String,
  createtime: String
})

const emit = defineEmits(["onClickDelete"]);

const loginUserId = localStorage.getItem("userId");
// const loginUserId = "asdf";

const onClickDelete = async () => {
  try {
    const result = await connect({
      method: "DELETE",
      url: `/attraction/comment/delete/${props.commentKey}/${loginUserId}`,
    })
    console.log(result);
    emit("onClickDelete");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="comment-container reactive">
    <div class="meta-container">
      <div class="caption">@{{ user.userId }} / {{ createtime }}</div>
      <CloseIcon v-if="loginUserId==user.userId" @click="onClickDelete" class="delete-icon"/>
    </div>
    <div>{{ content }}</div>
  </div>
</template>

<style scoped>
.comment-container {
  border-bottom: 1px solid #DDDDDD;
  padding: 16px;
}

.meta-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.delete-icon {
  width: 16px;
  height: 16px;
  /* fill: var(--caption-color); */
}
.delete-icon:hover {
  fill: red;
}
</style>