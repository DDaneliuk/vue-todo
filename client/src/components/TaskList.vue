<template>
  <div class="my-4" v-if="allTasks.length > 0">
    <div
        v-for="task in allTasks.filter((item) => item.isDone === false)"
        :key="task.id"
    >
      <Task
          :task="task"
          @showModalDelete="$emit('showModalDelete', task)"
          :key="task.id"
      />
    </div>
  </div>
  <div v-else class="text-center px-0 py-8">
    <p>You don't have tasks to do.</p>
  </div>
</template>

<script>
import {GC_USER_ID} from '../constants/settings'
import gql from 'graphql-tag';
import Task from './Task';

export default {
  name: "TaskList",
  components: {
    Task,
  },
  data() {
    return {
      allTasks: [],
    }
  },
  apollo: {
    allTasks: {
      query: gql`
        query tasks($userId: Float!){
          tasks (showTasks: {userId: $userId}){
            id
            taskTitle
            isDone
          }
        }
      `,
      variables: {
        userId: +localStorage.getItem(GC_USER_ID)
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
    }
  },
  methods: {},
};
</script>