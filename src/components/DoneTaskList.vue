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
      <button class="mx-auto my-8 block bg-indigo-500 text-white border-2 border-cyan-500 rounded-lg px-4 py-2"
              @click="hideAllEmit">Show
        only 5
      </button>
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
        <button class="mx-auto my-8 block bg-indigo-500 text-white border-2 border-cyan-500 rounded-lg px-4 py-2"
                @click="showAllEmit">Show
          more
        </button>
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

