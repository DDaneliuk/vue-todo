<template>
  <div>
    <div
        class="w-full grid grid-cols-task items-center py-4 px-2 rounded-lg bg-white transition-all ease-in-out duration-400 hover:bg-indigo-50"
        v-if="task.isDone">
      <a @click="isDone" class="w-4 h-4 block border-2 border-black bg-black align-middle"></a>
      <p><s>{{ task.taskTitle }}</s></p>
      <button @click="showModalDelete">🗑</button>
    </div>
    <div
        class="w-full grid grid-cols-task items-center py-4 px-2 rounded-lg bg-white transition-all ease-in-out duration-400 hover:bg-indigo-50"
        v-else>
      <a @click="isDone" class="w-4 h-4 block border-2 border-black align-middle justify-center"></a>
      <div v-if="contentEdit">
        <p @dblclick="change" contenteditable="true" @keypress.enter.prevent="saveChanges">{{ task.taskTitle }}</p>
      </div>
      <div v-else>
        <p @click="change" @keyup.enter="saveChanges">{{ task.taskTitle }}</p>
      </div>
      <button @click="showModalDelete">🗑</button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: {
    emit: ['newTitle', 'showModalDelete', 'isDone']
  },
  setup(props, {emit}) {
    const contentEdit = ref(false)
    function change() {
      contentEdit.value = true
    }
    function saveChanges(evt) {
      contentEdit.value = false
      let newTitle = evt.target.innerText
      emit('newTitle', props.task, newTitle)
    }
    function showModalDelete(){
      emit('showModalDelete', props.task)
    }
    function isDone(){
      emit('isDone', props.task)
    }
    return {
      contentEdit,
      change,
      saveChanges,
      showModalDelete,
      isDone,
    }
  }
});
</script>
