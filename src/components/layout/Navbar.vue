<template>
<div>
  <nav>
    <div class="nav-wrapper lime darken-1">
      <a href="#" class="brand-logo left" style="padding-top:10px; padding-left: 20px;"><img src="@/assets/logo.svg" width="40" alt=""> </a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-for="(location, index) in locations" :key="index">
            <a href="#" @click="SetMarker(location.position)">{{location.name}}</a>
          </li>
      </ul>
    </div>
  </nav>
  <ul class="sidenav" id="mobile-demo">
    <li v-for="(location, index) in locations" :key="index">
      <a href="#" @click="SetMarker(location.position)">{{location.name}}</a>
    </li>
    <div class="side-footer grey lighten-5">
      <i class="tiny material-icons">code</i> with
         <i class="tiny material-icons">favorite</i> by <a href="https://www.linkedin.com/in/michellepm/" target="blank">Michelle Pérez Morales</a>
    </div>
  </ul>
</div>
</template>

<script>
import { bus } from "@/main";
export default {
  name: "Navbar",
  data() {
    return {
      locations: [
        {
          name: "Villahermosa",
          position: { lat: 17.998615, lng: -92.942261 }
        },
        {
          name: "Comalcalco",
          position: { lat: 18.264028, lng: -93.219647 }
        },
        {
          name: "Tecolutilla",
          position: { lat: 18.282472, lng: -93.334154 }
        },
        {
          name: "Paraiso",
          position: { lat: 18.39869, lng: -93.213613 }
        },
        {
          name: "Cunduacan",
          position: { lat: 18.068465, lng: -93.163605 }
        }
      ]
    };
  },
  created() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });
  },
  methods: {
    SetMarker(position) {
      bus.$emit("Marker", position);
    }
  }
};
</script>

<style scoped>
.side-footer {
  color: #aaa;
  position: absolute;
  bottom: 60px;
  width: -webkit-fill-available;
  text-align: center;
  height: 55px;
  padding: 16px;
}
</style>