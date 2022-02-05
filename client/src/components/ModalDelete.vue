<template>
  <div class="fixed inset-0 flex bg-white " v-if="modelValue" @click="hideModal">
    <div class="w-fit m-auto p-4 p-8 shadow-2xl shadow-black border-2 border-cyan-500 rounded-lg" @click.stop>
      <h2 class="text-3xl pb-4 text-center">Delete Task</h2>
      <p class="pb-4 text-center">Are you sure you want to delete task {{ task.taskTitle }}?</p>
      <div class="flex justify-center">
        <button @click="deleteTask" class="mx-4 text-black border-2 border-cyan-500 rounded-lg px-4 py-2">Yes
        </button>
        <button @click="hideModal" class="mx-4 bg-indigo-500 text-white border-2 border-cyan-500 rounded-lg px-4 py-2">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "ModalDelete",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  apollo: {
    allTasks: {
      query: gql`
        {
          tasks {
            id
            taskTitle
            isDone
          }
        }
      `,
      update(data) {
        return data.tasks;
      },
    },
  },
  methods: {
    hideModal() {
      this.$emit("update:modelValue", false);
    },
    async deleteTask() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
          mutation ($id: Float!){
            deleteTask(id: $id)
            }
          `,
          variables: {
            id: this.task.id
          }
        })
        await this.$apollo.queries.allTasks.refetch();
        this.$emit("update:modelValue", false);
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>
