<template>
  <form @submit.prevent>
    <div class="flex">
      <input
          v-model="taskTitle"
          type="text"
          placeholder="New task..."
          class="flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"
      />
      <button class="bg-indigo-500 text-white border-2 border-cyan-500 rounded-lg px-4 py-2" @click="createTask">Add
      </button>
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag'
import {GC_USER_ID} from "@/constants/settings";

export default {
  data() {
    return {
      taskTitle: "",
    };
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
      variables:{
        input: {
          userId: +localStorage.getItem(GC_USER_ID)
        }
      },
      update(data) {
        return data.tasks;
      },
    },
  },
  methods: {
    async createTask() {
      const userId = +localStorage.getItem(GC_USER_ID) // convert to number
      try {
        await this.$apollo.mutate({
          mutation: gql`
          mutation ($taskTitle: String!, $isDone: Boolean!, $userId: Float!){
            createTask(createTaskInput: {taskTitle: $taskTitle, isDone: $isDone, userId: $userId}){
                id
                taskTitle
                isDone
            }
          }`,
          variables: {
            taskTitle: this.taskTitle,
            isDone: false,
            userId: userId,
          },
        })
        await this.$apollo.queries.allTasks.refetch();
        this.taskTitle = ''
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>

