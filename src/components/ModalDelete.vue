<template>
  <div class="modal-delete" v-if="show" @click="hideModal">
    <div class="modal-content" @click.stop>
      <p>Are you sure you want to delete task {{ task.taskTitle }}?</p>
      <div class="btn-group">
        <button @click="deleteTask">Yes</button>
        <button @click="hideModal">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDelete",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    hideModal() {
      this.$emit("update:show", false);
    },
    deleteTask() {
      this.$emit("delete", this.task);
    },
  },
};
</script>

<style scoped>
.modal-delete {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #00000050;
  position: fixed;
  display: flex;
}
.modal-content {
  margin: auto;
  padding: 30px;
  background-color: #ffffff;
  z-index: 101;
}
.btn-group {
  display: flex;
  margin: 30px 0 0;
  justify-content: center;
  align-content: center;
}
.btn-group button {
  margin: 0 10px;
  padding: 10px;
}
</style>
