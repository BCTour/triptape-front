<script setup>

</script>

<template>
  <div class="modal" @click.self="$emit('closeModal')">
    <div class="modal-content card">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  /* display: none; */
  position: fixed;
  display: flex;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  background-color: #FFFFFF;
  margin: auto auto;
  padding: 16px;
  border: 1px solid #888;
  width: 80%;
  /* height: 80%; */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>