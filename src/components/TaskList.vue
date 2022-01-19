<template>
  <div class="my-4" v-if="tasks.length > 0">
    <div
      v-for="task in tasks.filter((item) => item.isDone === false)"
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
  <div v-else class="text-center px-0 py-8">
    <p>You don't have tasks to do.</p>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "TaskList",
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

