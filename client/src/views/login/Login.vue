<template>
  <div class="max-w-screen-sm mx-auto my-9 px-8 py-12 shadow-2xl shadow-black border-2 border-cyan-500 rounded-lg">
    <Header :header="header"/>
    <form class="my-8">
      <input type="text" placeholder="Email" v-model="email"
             class="w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <input type="password" placeholder="Password" v-model="password"
             class=" w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <div v-if="errorForm.length">
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
import router from "@/router";
import { GC_USER_ID, GC_AUTH_TOKEN } from '@/constants/settings'
import {mapMutations} from "vuex";
import Header from '../../components/Header.vue'
import gql from "graphql-tag";

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
    ...mapMutations(["setUser"]),
    async login(e) {
      e.preventDefault()
      this.errorForm = []
      if (this.email && this.password) {
        try {
          const { data } = await this.$apollo.mutate({
            mutation: gql`
            mutation($input: LoginUserInput!){
                login(loginUserInput: $input){
                  user{
                    id
                    email
                  }
                  access_token
                }
            }`,
            variables: {
              input:{
                email:this.email,
                password:this.password,
              }
            },
          })
          await this.setUser(data.login.user.id);
          await localStorage.setItem(GC_USER_ID, data.login.user.id)
          await localStorage.setItem(GC_AUTH_TOKEN, data.login.access_token)
          await router.push("/")
        } catch (e) {
          console.log(e)
          this.errorForm.push(e.message)
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