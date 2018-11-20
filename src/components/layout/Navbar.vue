<template>
<div>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="@/assets/logo.svg" width="40" alt="">
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
</nav>

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