<template>
  <div class="task-heading">
    <h1 class="text-3xl font-bold text-center">{{ header }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: true,
    },
  },
};
</script>
>
