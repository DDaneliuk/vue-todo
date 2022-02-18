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
import {defineComponent} from "vue";
import gql from 'graphql-tag';
import Task from './Task';
import {GC_USER_ID} from "@/constants/settings";
export default defineComponent({
  name: "TaskList",
  components: {
    Task,
  },
  data() {
    return {
      allTasks: [],
      userId: +localStorage.getItem(GC_USER_ID)
    }
  },
  created() {
    this.$apollo.queries.allTasks.refetch();
    this.userId = +localStorage.getItem(GC_USER_ID)
    console.log(this.userId)
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
      variables() {
        return {
          input: {userId: this.userId}
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
    }
  },
  methods: {},
});
</script>