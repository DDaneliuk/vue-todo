<template>
  <div class="task-heading">
    <h1>{{ header }}</h1>
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
