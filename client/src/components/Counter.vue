<template>
  <div class="flex my-4 justify-between" v-if="taskAmount">
    <h3>{{ taskDone }}/ {{ taskAmount }}</h3>
    <p> {{ percentOfDone }}% Done</p>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Counter",
  data() {
    return{
      taskAmount: 0,
      taskDone: 0,
      percentOfDone: 0,
      allTasks: [],
    }
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
        const tasks = data.tasks
        this.taskAmount = tasks.length;
        this.taskDone = tasks.filter((item) => item.isDone === true).length;
        this.percentOfDone = Math.round((this.taskDone / this.taskAmount) * 100);
        return data.tasks;
      },
    },
  },
  // props: {
  //   taskAmount: {
  //     type: Number,
  //     required: "true",
  //   },
  //   taskDone: {
  //     type: Number,
  //     required: "true",
  //   },
  //   percent: {
  //     type: Number,
  //     required: "true",
  //   },
  // },
};
</script>

