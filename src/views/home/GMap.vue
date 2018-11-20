<template>
    <div>
        <div class="mapbox" id="map"></div>
    </div>
</template>

<script>
import { bus } from "@/main";
import io from 'socket.io-client';

export default {
  name: "Map",
  data() {
    return {
      map: null,
      marker: new mapboxgl.Marker(),
      myLatLng: {
        lat: 20.701461, lng:-103.374720
      },
      socket : io('http://localhost:3030'),
    };
  },
  created() {
    this.SendMessage()
  },
  methods: {
    SendMessage() {
      this.socket.emit('SEND_LOCATION', this.myLatLng);
    },
    RenderMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibWhwbSIsImEiOiJjam5xN3N6eTYxbXF6M3BxdGF5NGRmbGh4In0.tF4waHdBIcwrVNMi21ARbg";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v10",
        center: this.myLatLng,
        zoom: 14
      });

      this.map.addControl(new MapboxDirections({
          accessToken: mapboxgl.accessToken
      }), 'top-left');

      

      // Add geolocate control to the map.
      // this.map.addControl(
      //   new mapboxgl.GeolocateControl({
      //     positionOptions: {
      //       enableHighAccuracy: true
      //     },
      //     trackUserLocation: true
      //   })
      // );

      this.map.addControl(new mapboxgl.FullscreenControl());
      this.map.addControl(new mapboxgl.NavigationControl());
    },
    SetMarker(data) {
      this.map.flyTo({ center: data, speed: 0.3, curve: 1 });
      // create the popup
      let popup = new mapboxgl.Popup({ offset: 25 }).setText('You are Here!');

      let el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker().setLngLat(data).setPopup(popup).addTo(this.map);
    },
    notify () {
      // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#Parameters
      const notification = {
        title: 'Welcome',
        options: {
          body: 'This a test Notification!'
        },
        events: {
          onerror: function () {
              console.log('Custom error event was called');
          },
          onclick: function () {
              console.log('Custom click event was called');
          },
          onclose: function () {
              console.log('Custom close event was called');
          },
          onshow: function () {
              console.log('Custom show event was called');
          }
        }
      }
      this.$notification.show(notification.title, notification.options, notification.events)
    }
  },
  mounted() {
    let self = this
    
    this.RenderMap();
    
    bus.$on("Marker", data => {
      this.SetMarker(data);
    });

    this.socket.on('LOCATION', function(data){
      self.SetMarker(data)
    });

    setTimeout(() => {
      self.map.setLayoutProperty('country-label-lg', 'text-field', ['get', 'name_es']);
    }, 500)

    this.notify()

    setInterval(() => {
      this.notify()
    }, 10000);

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

.marker {
  z-index: 9 !important;
  width: 20px !important;
  height: 20px !important;
  background-color: red !important;
}
</style>