<template>
  <div class="max-w-screen-sm mx-auto my-9 px-8 py-12 shadow-2xl shadow-black border-2 border-cyan-500 rounded-lg">
    <Header :header="header"/>
    <form class="my-8">
      <input type="text" placeholder="Email" v-model="email"
             class="w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <input type="text" placeholder="Password" v-model="password"
             class=" w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <div v-if="errorForm.length">
        <b>Fill all inputs for log in, and try again</b>
        <ul v-for="error in errorForm" :key="error">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div class="flex justify-center mt-8 mb-0">
        <button class="bg-indigo-500  text-white border-2 border-cyan-500 rounded-lg px-4 py-2" type="submit"
                @click="(e) => login(e)">Login
        </button>
        <router-link to="/signup" class="mx-4 text-black  border-2 border-cyan-500 rounded-lg px-4 py-2">Sign up
        </router-link>
      </div>
    </form>
  </div>
  <router-view/>
</template>
<script>
import {mapMutations} from "vuex";
import Header from '../../components/Header.vue'

export default {
  name: 'LoginPage',
  components: {
    Header,
  },
  data() {
    return {
      header: "Login",
      email: "",
      password: "",
      errorForm: [],
    }
  },
  methods: {
    ...mapMutations(["setToken"]),
    async login(e) {
      e.preventDefault()
      this.errorForm = []
      if (this.email && this.password) {
        try {
          const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            })
          })
          if (response.status === 401){
            this.errorForm.push('Wrong email or password')
          }
          const {access_token} = await response.json();
          this.setToken(access_token);
          await this.$router.push("/tasks");
        } catch (e) {
          console.log(e)
        }
      } else {
        if (!this.email) {
          this.errorForm.push('Fill your email')
        }
        if (!this.password) {
          this.errorForm.push('Fill your strong pass')
        }
      }
    }
  }
}
</script>