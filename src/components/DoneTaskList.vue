<template>
  <div class="task-list">
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
    <ModalDelete />
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
  },
};
</script>
