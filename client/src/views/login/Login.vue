<template>
  <div class="max-w-screen-sm mx-auto my-9 px-8 py-12 shadow-2xl shadow-black border-2 border-cyan-500 rounded-lg">
    <Header :header="header"/>
    <form class="my-8">
      <input type="text" placeholder="Email" v-model="email"
             class="w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <input type="text" placeholder="Password" v-model="password"
             class=" w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <div class="flex justify-center mt-8 mb-0">
        <button class="bg-indigo-500  text-white border-2 border-cyan-500 rounded-lg px-4 py-2" type="submit" @click="(e) => login(e)">Login
        </button>
        <router-link to="/signup" class="mx-4 text-black  border-2 border-cyan-500 rounded-lg px-4 py-2">Sign up
          </router-link>
      </div>
    </form>
  </div>
  <router-view/>
</template>
<script>
import { mapMutations } from "vuex";
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
    }
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login(e){
      e.preventDefault()
      const response = await fetch("http://localhost:5000/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        })
      })
      const { user, token } = await response.json();
      this.setUser(user);
      this.setToken(token);
      await this.$router.push("/");
    }
  }
}
</script>
