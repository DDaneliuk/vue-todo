<template>
  <div class="max-w-screen-md mx-auto my-9 px-8 py-12 shadow-2xl shadow-black border-2 border-cyan-500 rounded-lg">
    <ModalDelete
        v-model="modalDeleteVisible"
        :task="pickedItem"
        @delete="deleteTask"
    />
    <div class="task-block">
      <Header :header="header"/>
      <TaskList
          :tasks="tasks"
          @isDone="isDone"
          @newTitle="changeTask"
          @showModalDelete="showModalDelete"
      />
      <TaskForm @create="createTask"/>
      <Counter
          :taskAmount="taskAmount"
          :taskDone="taskDone"
          :percent="percentOfDone"
      />
      <DoneTaskList
          :tasks="tasks"
          :taskDone="taskDone"
          v-model="showTasks"
          @isDone="isDone"
          @showModalDelete="showModalDelete"
      />
    </div>
  </div>
</template>

<script>
import TaskList from "./components/TaskList";
import DoneTaskList from "./components/DoneTaskList";
import TaskForm from "./components/TaskForm";
import Header from "./components/Header";
import ModalDelete from "./components/ModalDelete";
import Counter from "./components/Counter";

export default {
  components: {
    TaskForm,
    TaskList,
    DoneTaskList,
    ModalDelete,
    Header,
    Counter,
  },
  data() {
    return {
      tasks: [],
      modalDeleteVisible: false,
      pickedItem: {},
      header: "Task list",
      taskAmount: 0,
      taskDone: 0,
      percentOfDone: 0,
      encodeData: "",
      showTasks: false,
      contentEditable: false,
    };
  },
  created() {
    this.decode();
    this.encode();
    this.updateCounter();
  },
  methods: {
    updateCounter() {
      this.taskAmount = this.tasks.length;
      this.taskDone = this.tasks.filter((item) => item.isDone === true).length;
      this.percentOfDone = Math.round((this.taskDone / this.taskAmount) * 100);
    },
    createTask(task) {
      this.tasks.push(task);
      this.encode();
      this.decode();
      this.updateCounter();
    },
    changeTask(task, title) {
      for (const obj of this.tasks) {
        if (obj.id === task.id) {
          obj.taskTitle = title
          break
        }
      }
    },
    deleteTask(task) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.modalDeleteVisible = false;
      this.encode();
      this.decode();
      this.updateCounter();
    },
    showModalDelete(task) {
      this.modalDeleteVisible = true;
      this.pickedItem = task;
    },
    isDone(task) {
      task.isDone = !task.isDone;
      this.encode();
      this.decode();
      this.updateCounter();
    },
    encode() {
      const taskJSON = JSON.stringify(this.tasks);
      this.encodeData = window.btoa(unescape(encodeURIComponent(taskJSON)));
      location.hash = "#" + this.encodeData;
    },
    decode() {
      let getUrl = location.hash;
      if (getUrl === "") {
        this.tasks = []
      } else {
        let subGetUrl = getUrl.substring(1);
        const tasksJSON = new Array(
            decodeURIComponent(escape(window.atob(subGetUrl)))
        );
        this.tasks = JSON.parse(tasksJSON);
      }
    },
    showAllTasks() {
      this.showTasks = !this.showTasks;
    },
  },
};
</script>




