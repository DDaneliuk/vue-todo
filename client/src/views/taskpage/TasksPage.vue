<template>
  <NavBar/>
  <div class="max-w-screen-md mx-auto my-9 px-8 py-12 shadow-2xl shadow-black border-2 border-cyan-500 rounded-lg">
    <ModalDelete
        v-model="modalDeleteVisible"
        :task="pickedItem"
    />
    <div class="task-block">
      <Header :header="header"/>
      <TaskList
          @showModalDelete="showModalDelete"
      />
      <TaskForm/>
<!--      <Counter/>-->
      <DoneTaskList
          :taskDone="taskDone"
          v-model="showTasks"
          @showModalDelete="showModalDelete"
      />
    </div>
  </div>
  <router-view/>
</template>

<script>
// import gql from "graphql-tag"
import NavBar from "../../components/NavBar";
import TaskList from "../../components/TaskList";
import DoneTaskList from "../../components/DoneTaskList";
import TaskForm from "../../components/TaskForm";
import Header from "../../components/Header";
import ModalDelete from "../../components/ModalDelete";
// import Counter from "../../components/Counter";          // TODO Counter

export default {
  // apollo: {
  //   allTasks: {
  //     query: gql`
  //       {
  //         tasks {
  //           id
  //           taskTitle
  //           isDone
  //         }
  //       }
  //     `,
  //     update(data) {
  //       return data.tasks;
  //     },
  //   },
  // },
  components: {
    NavBar,
    TaskForm,
    TaskList,
    DoneTaskList,
    ModalDelete,
    Header,
    // Counter,
  },
  data() {
    return {
      // allTasks: [],
      modalDeleteVisible: false,
      pickedItem: {},
      header: "Task list",
      taskAmount: 0,
      taskDone: 0,
      percentOfDone: 0,
      showTasks: false,
      contentEditable: false,
    };
  },
  methods: {
    updateCounter() {
      this.$apollo.queries.allTasks.refetch();
      this.taskAmount = this.allTasks.length;
      this.taskDone = this.allTasks.filter((item) => item.isDone === true).length;
      this.percentOfDone = Math.round((this.taskDone / this.taskAmount) * 100);
    },
    showModalDelete(task) {
      this.modalDeleteVisible = true;
      this.pickedItem = task;
    },
  },
};
</script>




