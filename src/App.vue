<template>
  <div id="app">
    <SideMenu />
    <router-view />
  </div>
</template>

<script>
import SideMenu from "@/components/layout/SideMenu";
export default {
  name: "App",
  components: {
    SideMenu
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
html, body
{
  margin: 0 !important;
  padding: 0 !important;

  /* make it look decent enough */
  background: #232323;
  color: #cdcdcd;
  font-family: "Avenir Next", "Avenir", sans-serif;
}
</style>
