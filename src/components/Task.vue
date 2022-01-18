<template>
  <div>
    <div class="task cheked" v-if="task.isDone">
      <a @click="isDone"></a>
      <p>{{ task.taskTitle }}</p>
      <button @click="showModalDelete">🗑</button>
    </div>
    <div class="task" v-else>
      <a @click="isDone"></a>
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
