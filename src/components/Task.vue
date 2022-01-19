<template>
  <div>
    <div
        class="w-full grid grid-cols-task items-center py-4 px-2 rounded-lg bg-white transition-all ease-in-out duration-400 hover:bg-indigo-50"
        v-if="task.isDone">
      <a @click="isDone" class="w-4 h-4 block border-2 border-black bg-black align-middle"></a>
      <p><s>{{ task.taskTitle }}</s></p>
      <button @click="showModalDelete">🗑</button>
    </div>
    <div
        class="w-full grid grid-cols-task items-center py-4 px-2 rounded-lg bg-white transition-all ease-in-out duration-400 hover:bg-indigo-50"
        v-else>
      <a @click="isDone" class="w-4 h-4 block border-2 border-black align-middle justify-center"></a>
      <p>{{ task.taskTitle }}</p>
      <button @click="showModalDelete">🗑</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteTask() {
      this.$emit("delete", this.task);
    },
    showModalDelete() {
      this.$emit("showModalDelete", this.task);
    },
    isDone() {
      this.$emit("isDone", this.task);
    },
  },
};
</script>
