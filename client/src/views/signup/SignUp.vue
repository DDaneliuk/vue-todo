<template>
  <div class="max-w-screen-sm mx-auto my-9 px-8 py-12 shadow-2xl shadow-black border-2 border-cyan-500 rounded-lg">
    <Header :header="header"/>
    <form class="my-8">
      <input v-model="email" type="email" placeholder="Email"
             class="w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none"/>
      <input v-model="password" type="password" placeholder="Password"
             class=" w-full block my-8 flex-1 border-b-2 border-cyan-500 text-black focus:outline-none" required/>
      <div v-if="errorForm.length">
      <ul v-for="error in errorForm" :key="error">
        <li  >{{ error }}</li>
      </ul>
      </div>
      <div class="flex justify-center mt-8 mb-0">
        <button @click="(e) => signUp(e)" class="bg-indigo-500  text-white border-2 border-cyan-500 rounded-lg px-4 py-2"
                type="button">Sign Up
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
import gql from 'graphql-tag'
import Header from '../../components/Header.vue'
import router from "@/router";

export default {
  name: 'SignUpPage',
  components: {
    Header,
  },
  data() {
    return {
      header: "Sign Up",
      email: '',
      password: '',
      errorForm: [],
    }
  },
  methods: {
    async signUp(e) {
      e.preventDefault()
      this.errorForm = []
      if (this.email && this.password) {
        try {
          await this.$apollo.mutate({
            mutation: gql`
            mutation($email: String!, $password: String!){
                createUser(createUserInput: {email: $email, password: $password}){
                  id,
                  email,
                  password
                }
            }`,
            variables: {
              email: this.email,
              password: this.password
            },
          })
          this.email = '';
          this.password = '';
          await router.push("/login")
        } catch (e) {
          this.errorForm.push(e.message)
          console.log(e)
        }
      } else {
        if (!this.email){
          this.errorForm.push('Write your email')
        }
        if (!this.password){
          this.errorForm.push('Create your strong pass')
        }

      }

    }
  },
}
</script>