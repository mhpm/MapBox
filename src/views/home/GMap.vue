<template>
  <div>
    <div class="mapbox" id="map"></div>
  </div>
</template>

<script>
import { bus } from "@/main";
import io from "socket.io-client";

export default {
  data() {
    return {
      map: null,
      marker: new mapboxgl.Marker(),
      myLatLng: {
        lat: 20.701461,
        lng: -103.37472
      },
      socket: io("http://localhost:3030"),
      msg: "Vue Image Upload and Resize Demo",
      hasImage: false,
      image: null
    };
  },
  beforeCreate() {},
  created() {
    this.SendMessage();
  },
  methods: {
    setImage: function(output) {
      this.hasImage = true;
      this.image = output;
      console.log(this.image);
    },
    SendMessage() {
      this.socket.emit("SEND_LOCATION", this.myLatLng);
    },
    RenderMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibWhwbSIsImEiOiJjam5xN3N6eTYxbXF6M3BxdGF5NGRmbGh4In0.tF4waHdBIcwrVNMi21ARbg";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        center: [-103.37627858124662, 20.704203721581877],
        zoom: 15
      });

      this.LoadUsers();

      // this.map.addControl(
      //   new MapboxDirections({
      //     accessToken: mapboxgl.accessToken
      //   }),
      //   "top-left"
      // );

      //Add geolocate control to the map.
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
    FocusUser(position) {
      this.map.flyTo({ center: position, speed: 0.3, curve: 1 });
    },
    SetMarker(data) {
      //this.map.flyTo({ center: data, speed: 0.3, curve: 1 });
      // create the popup
      let popup = new mapboxgl.Popup({ offset: 25 }).setText("You are Here!");

      new mapboxgl.Marker()
        .setLngLat(data)
        .setPopup(popup)
        .addTo(this.map);
    },
    LoadUsers() {
      let self = this;
      console.log(this.$store.state);

      this.$store.state.Users.forEach(function(user) {
        // create a DOM element for the marker
        var el = document.createElement("div");
        el.className = "marker";
        let random = Math.floor(Math.random() * 100);
        el.style.backgroundImage = `url(https://randomuser.me/api/portraits/thumb/men/${random}.jpg)`;
        el.style.width = "40px";
        el.style.height = "40px";

        // el.addEventListener("click", function() {
        //   window.alert(user.properties.name);
        // });

        // add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(user.geometry.coordinates)
          .addTo(self.map);
      });
    },
    notify() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#Parameters
      const notification = {
        title: "Welcome",
        options: {
          body: "This a test Notification!"
        },
        events: {
          onerror: function() {
            console.log("Custom error event was called");
          },
          onclick: function() {
            console.log("Custom click event was called");
          },
          onclose: function() {
            console.log("Custom close event was called");
          },
          onshow: function() {
            console.log("Custom show event was called");
          }
        }
      };
      this.$notification.show(
        notification.title,
        notification.options,
        notification.events
      );
    }
  },
  mounted() {
    let self = this;

    this.RenderMap();

    // bus.$on("Marker", data => {
    //   this.SetMarker(data);
    // });

    bus.$on("Focus", position => {
      //this.SetMarker(data);
      this.FocusUser(position);
    });

    this.socket.on("LOCATION", function(data) {
      self.SetMarker(data);
    });

    setTimeout(() => {
      self.map.setLayoutProperty("country-label-lg", "text-field", [
        "get",
        "name_es"
      ]);
    }, 500);

    //this.notify()

    // setInterval(() => {
    //   this.notify()
    // }, 10000);

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.ready.then(function(reg) {

    //     reg.pushManager.subscribe({
    //       userVisibleOnly: true
    //     }).then(function(sub) {
    //       console.log('Endpoint URL: ', sub.endpoint);
    //     }).catch(function(e) {
    //       if (Notification.permission === 'denied') {
    //         console.warn('Permission for notifications was denied');
    //       } else {
    //         console.error('Unable to subscribe to push', e);
    //       }
    //     });
    //   })
    // }

    this.map.on("click", function(e) {
      //new mapboxgl.Marker().setLngLat(e.lngLat).addTo(self.map);
      //vm.map.flyTo({ center: e.lngLat });
      self.FocusUser(e.lngLat);
    });
  }
};
</script>

<style>
.mapbox {
  width: 100%;
  height: 100vh;
}

.marker {
  display: block;
  border: none;
  border-radius: 50% !important;
  cursor: pointer;
  padding: 0;
}
</style>