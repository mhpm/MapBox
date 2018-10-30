<template>
    <div>
        <div class="mapbox" id="map"></div>
    </div>
</template>

<script>
import { bus } from "@/main";
export default {
  name: "Map",
  data() {
    return {
      map: null,
      marker: new mapboxgl.Marker(),
      myLatLng: {
        lat: 17.998615,
        lng: -92.942261
      }
    };
  },
  created() {},
  methods: {
    renderMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibWhwbSIsImEiOiJjam5xN3N6eTYxbXF6M3BxdGF5NGRmbGh4In0.tF4waHdBIcwrVNMi21ARbg";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v10",
        center: this.myLatLng,
        zoom: 9
      });

      // Add geolocate control to the map.
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );

      this.map.addControl(new mapboxgl.FullscreenControl());
      this.map.addControl(new mapboxgl.NavigationControl());
    },
    SetMarker(data) {
      this.marker.setLngLat(data).addTo(this.map);
      this.map.flyTo({ center: data, speed: 0.3, curve: 1 });
    },
    AddMarker() {}
  },
  mounted() {
    this.renderMap();
    bus.$on("Marker", data => {
      this.SetMarker(data);
    });

    // let vm = this;
    // this.map.on("click", function(e) {
    //   new mapboxgl.Marker().setLngLat(e.lngLat).addTo(vm.map);
    //   //vm.map.flyTo({ center: e.lngLat });
    // });
  }
};
</script>

<style scoped>
.mapbox {
  width: 100%;
  height: 100vh;
}
</style>