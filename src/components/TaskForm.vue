<template>
  <form @submit.prevent>
    <input
      v-model="task.taskTitle"
      type="text"
      placeholder="New task..."
      class="form-input"
    />
    <button @click="createTask">Add task</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      task: {
        taskTitle: "",
      },
    };
  },
  methods: {
    createTask() {
      this.task.id = Date.now();
      this.task.isDone = false;
      this.$emit("create", this.task);
      this.task = {
        taskTitle: "",
      };
    },
  },
};
</script>

<style>
.task-heading {
  text-align: center;
}
.form-input {
  width: calc(100% - 120px);
  font-size: 18px;
  margin-left: 55px;
  padding: 1px 5px;
  border: none;
  border-bottom: 1px dashed #d3d3d3;
  color: grey;
}
.form-input:focus {
  outline: none;
}
</style>
