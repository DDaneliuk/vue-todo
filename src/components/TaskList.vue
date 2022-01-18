<template>
  <div class="task-list" v-if="tasks.length > 0">
    <div
      class="tasks"
      v-for="task in tasks.filter((item) => item.isDone === false)"
      :key="task.id"
    >
      <Task
        :task="task"
        @delete="$emit('delete', task)"
        @isDone="$emit('isDone', task)"
        @showModalDelete="$emit('showModalDelete', task)"
        :key="task.id"
      />
    </div>
    <ModalDelete />
  </div>
  <div v-else class="message">
    <p>You don't have tasks to do.</p>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "TaskList",
  components: {
    Task,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.message {
  padding: 40px 20px;
  display: grid;
  justify-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 30px;
  color: #000;
}
.task-list {
  padding: 40px 0 20px;
}
.task {
  display: grid;
  grid-template-columns: 40px auto 40px;
  grid-gap: 15px;
  justify-items: baseline;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;
}
.task button {
  width: 100%;
}
.task a {
  display: block;
  width: 25px;
  height: 25px;
  border: 1px solid #7fffd4;
  border-radius: 25px;
  cursor: pointer;
}
.cheked a {
  background: #7fffd4;
  border: 1px solid #6cdcb6;
}
</style>
