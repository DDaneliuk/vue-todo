<template>
  <div class="mt-8">
    <a class="bg-indigo-500 w-fit cursor-pointer  text-white border-2 border-cyan-500 rounded-lg px-4 py-2" @click="logout">Log
      Out
    </a>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "NavBar",
  methods: {
    ...mapMutations(["setToken"]),
    async logout() {
      this.setToken(null);
      await this.$router.push("/login");
    }
  }
}
</script>