<template>
  <div class="max-w-screen-sm mx-auto my-9 px-8 py-12 shadow-2xl shadow-black border-2 border-cyan-500 rounded-lg">
    <Header :header="header"/>
    <form class="my-8">
      <input type="text" placeholder="Email"
             class="w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <input type="text" placeholder="Password"
             class=" w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <div class="flex justify-center mt-8 mb-0">
        <button class="bg-indigo-500  text-white border-2 border-cyan-500 rounded-lg px-4 py-2" type="button">Sign Up
        </button>

        <router-link to="/login" class="mx-4 text-black border-2 border-cyan-500 rounded-lg px-4 py-2">
          Login
        </router-link>
      </div>
    </form>
  </div>
  <router-view/>
</template>
<script>
import Header from '../../components/Header.vue'

export default {
  name: 'SignUpPage',
  components: {
    Header,
  },
  data() {
    return {
      header: "Sign Up"
    }
  }

}
</script>
