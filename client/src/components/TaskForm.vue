<template>
  <form @submit.prevent>
    <div class="flex">
      <input
        v-model="task.taskTitle"
        type="text"
        placeholder="New task..."
        class="flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"
      />
      <button class="bg-indigo-500 text-white border-2 border-cyan-500 rounded-lg px-4 py-2" @click="createTask">Add</button>
    </div>
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

