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

export default {
  data() {
    return {
      taskTitle: "",
    };
  },
  methods: {
    async createTask() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
          mutation ($taskTitle: String!, $isDone: Boolean!){
            createTask(createTaskInput: {taskTitle: $taskTitle, isDone: $isDone}){
                id
                taskTitle
                isDone
            }
          }`,
          variables: {
            taskTitle: this.taskTitle,
            isDone: false
          }

        })
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>

