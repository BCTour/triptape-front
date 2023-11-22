<script setup>
import { ref, onMounted } from 'vue';
import EditIcon from "@/assets/icons/EditIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import {connect} from '@/util/access.js';

const props = defineProps({
  commentKey: Number,
  user: Object,
  attractionKey: Number,
  content: String,
  createtime: String
})

onMounted(() => {
  newContent.value = props.content;
  viewedContent.value = props.content;
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

const onClickUpdate = async () => {
  isModifying.value = true;
}

const onUpdate = async () => {
  try {
    const result = await connect({
      method: 'PUT',
      url: `/attraction/comment/modify`,
      data: {
        commentKey: props.commentKey,
        content: newContent.value,
        user: {
          userId: loginUserId,
        }
      }
    });
    viewedContent.value = newContent.value;
    alert("댓글 수정 완료!");
    isModifying.value = false;
  } catch (error) {
    console.log(error);
  }
}

const isModifying = ref(false);
const newContent = ref("");
const viewedContent = ref("");

</script>

<template>
  <div class="comment-container reactive">
    <div class="meta-container">
      <div class="caption">@{{ user.userId }} / {{ createtime }}</div>
      <div class="row" v-if="!isModifying">
        <EditIcon v-if="loginUserId==user.userId" @click="onClickUpdate" class="delete-icon" />
        <CloseIcon v-if="loginUserId==user.userId" @click="onClickDelete" class="delete-icon"/>
      </div>
    </div>
    <div v-if="!isModifying">{{ viewedContent }}</div>
    <div v-else class="row">
      <input type="text" v-model="newContent" />
      <button class="primary-btn" @click="onUpdate">수정</button>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.row > input {
  flex: 1;
}
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

.caption {
  margin-bottom: 8px;
}
</style>