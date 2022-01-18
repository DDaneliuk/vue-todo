<template>
  <div class="counter" v-if="taskAmount">
    <p>{{ taskDone }}/ {{ taskAmount }} ( {{ percent }}% done)</p>
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

<style scoped>
.counter {
  text-align: center;
  padding: 20px 0;
}
</style>
