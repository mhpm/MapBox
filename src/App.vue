<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
</style>
