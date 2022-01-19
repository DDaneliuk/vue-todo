<template>
  <div class="task-list">
    <div v-if="showAll">
      <div
        class="tasks"
        v-for="task in tasks.filter((item) => item.isDone === true)"
        :key="task.id"
      >
        <Task
          :task="task"
          @delete="$emit('delete', task)"
          @isDone="$emit('isDone', task)"
          @showModalDelete="$emit('showModalDelete', task)"
          :key="task.id"
        />
      </div>
      <button class="show-all" @click="hideAllEmit">Show only 5</button>
    </div>
    <div v-else>
      <div
        v-for="task in tasks.filter((item) => item.isDone === true).slice(0, 5)"
        :key="task.id"
      >
        <Task
          :task="task"
          @delete="$emit('delete', task)"
          @isDone="$emit('isDone', task)"
          @showModalDelete="$emit('showModalDelete', task)"
          :key="task.id"
        />
      </div>
      <div v-if="taskDone > 5">
        <button class="show-all" @click="showAllEmit">Show more</button>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "DoneTaskList",
  components: {
    Task,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    showAll: {
      type: Boolean,
      default: false,
      required: true,
    },
    taskDone: {
      type: Number,
      required: true,
    },
  },
  methods: {
    showAllEmit() {
      this.$emit("update:showAll", true);
    },
    hideAllEmit() {
      this.$emit("update:showAll", false);
    },
  },
};
</script>

<style scoped>
button.show-all {
  display: block;
  margin: 0 auto;
  padding: 8px 16px;
}
</style>
