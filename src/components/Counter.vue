<template>
  <div class="flex my-4 justify-between" v-if="taskAmount">
    <h3>{{ taskDone }}/ {{ taskAmount }}</h3>
    <p> {{ percent }}% Done</p>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    taskAmount: {
      type: Number,
      required: "true",
    },
    taskDone: {
      type: Number,
      required: "true",
    },
    percent: {
      type: Number,
      required: "true",
    },
  },
};
</script>

