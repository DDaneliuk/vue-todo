<template>
  <div class="mt-8">
    <a class="bg-indigo-500 w-fit cursor-pointer  text-white border-2 border-cyan-500 rounded-lg px-4 py-2" @click="logout">Log
      Out
    </a>
  </div>
</template>

<script>
import { GC_USER_ID, GC_AUTH_TOKEN } from '@/constants/settings'
import {mapMutations} from "vuex";
import {apolloClient} from '@/apollo'



export default {
  name: "NavBar",
  methods: {
    ...mapMutations(["setUser"]),
    async logout() {
      await this.setUser(null);
      await localStorage.setItem(GC_USER_ID, null)
      await localStorage.setItem(GC_AUTH_TOKEN, null)
      await apolloClient.cache.reset()
      await this.$router.push("/login");
    }
  }
}
</script>