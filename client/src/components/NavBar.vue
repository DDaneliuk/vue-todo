<template>
  <div class="mt-8">
    <a class="bg-indigo-500 w-fit cursor-pointer  text-white border-2 border-cyan-500 rounded-lg px-4 py-2" @click="logout">Log
      Out
    </a>
  </div>
</template>

<script>
import { GC_USER_ID, GC_AUTH_TOKEN } from '@/constants/settings'
export default {
  name: "NavBar",
  methods: {
    async logout() {
      localStorage.setItem(GC_USER_ID, null)
      localStorage.setItem(GC_AUTH_TOKEN, null)
      await this.$router.push("/login");
    }
  }
}
</script>