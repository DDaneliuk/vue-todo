<template>
  <div class="task-list">
    <div v-if="modelValue">
      <div
          class="tasks"
          v-for="task in allTasks.filter((item) => item.isDone === true)"
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
          v-for="task in allTasks.filter((item) => item.isDone === true).slice(0, 5)"
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
import gql from 'graphql-tag'
import Task from "./Task";
import {GC_USER_ID} from "@/constants/settings";

export default {
  name: "DoneTaskList",
  components: {
    Task,
  },
  data() {
    return{
      allTasks: [],
      userId: +localStorage.getItem(GC_USER_ID),
    }
  },
  apollo: {
    allTasks: {
      query: gql`
        query tasks($input: ShowTasks!){
          tasks (showTasks: $input){
            id
            taskTitle
            isDone
          }
        }
      `,
      variables(){
        return{
          input: {
            userId: this.userId
          }
        }
      },
      update(data) {
        return data.tasks;
      },
    },
  },
  props: {
    modelValue: {
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
      this.$emit("update:modelValue", true);
    },
    hideAllEmit() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

