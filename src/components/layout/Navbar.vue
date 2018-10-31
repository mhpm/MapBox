<template>
<div>
  <nav>
    <div class="nav-wrapper lime darken-1">
      <a href="#" class="brand-logo left" style="padding-top:10px; padding-left: 20px;"><img src="@/assets/logo.svg" width="40" alt=""> </a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Villahermosa<i class="material-icons right">arrow_drop_down</i></a></li>
           <li><a class="dropdown-trigger" href="#!" data-target="dropdown2">Comalcalco<i class="material-icons right">arrow_drop_down</i></a></li>
          <li v-for="(location, index) in locations" :key="index">
            <a href="#" @click="SetMarker(location.position)">{{location.name}}</a>
          </li>
      </ul>
    </div>
  </nav>

  <ul id="dropdown1" class="dropdown-content" style="top: 55px !important; width: 185px !important; height: 255px !important;">
    <li><a href="#" @click="SetMarker({lat: 18.002057, lng: -92.933349})">Museo de Historia</a></li>
    <li><a href="#" @click="SetMarker({lat: 18.002047, lng: -92.934014})">Museo la Venta</a></li>
    <li><a href="#" @click="SetMarker({lat: 18.006011, lng: -92.966004})">Museo Papagayo</a></li>
    <li><a href="#" @click="SetMarker({lat: 18.004258, lng: -92.952388})">Parque la Choca</a></li>
    <li><a href="#" @click="SetMarker({lat: 17.999868, lng: -92.913913})">Mercado Pinosuares</a></li>
  </ul>

  <ul id="dropdown2" class="dropdown-content" style="top: 55px !important; width: 185px !important; height: 255px !important;">
    <li><a href="#" @click="SetMarker({lat: 18.279163, lng: -93.200509})">Zona Arqueológica</a></li>
  </ul>

  <ul class="sidenav" id="mobile-demo">
    <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Villahermosa<i class="material-icons right">arrow_drop_down</i></a></li>
    <li><a class="dropdown-trigger" href="#!" data-target="dropdown2">Comalcalco<i class="material-icons right">arrow_drop_down</i></a></li>
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
        // {
        //   name: "Villahermosa",
        //   position: { lat: 17.998615, lng: -92.942261 }
        // },
        // {
        //   name: "Comalcalco",
        //   position: { lat: 18.264028, lng: -93.219647 }
        // },
        {
          name: "Tecolutilla",
          position: { lat: 18.282472, lng: -93.334154 }
        },
        {
          name: "Paraíso",
          position: { lat: 18.39869, lng: -93.213613 }
        },
        {
          name: "Cunduacán",
          position: { lat: 18.068465, lng: -93.163605 }
        },
        {
          name: "Nacajuca",
          position: { lat: 18.167522, lng: -93.017492 }
        },
        {
          name: "Jalpa",
          position: { lat: 18.176166, lng: -93.062295 }
        },
        {
          name: "Teapa",
          position: { lat: 17.55406, lng: -92.948253 }
        },
        {
          name: "Tapijulapa",
          position: { lat: 17.459829, lng: -92.779406 }
        },
        {
          name: "Cárdenas",
          position: { lat: 17.992025, lng: -93.378397 }
        }
      ]
    };
  },
  created() {
    // document.addEventListener("DOMContentLoaded", function() {
    //   var elems = document.querySelectorAll(".sidenav");
    //   var instances = M.Sidenav.init(elems);
    // });
    $(document).ready(function() {
      $(".dropdown-trigger").dropdown();
      $(".sidenav").sidenav();
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