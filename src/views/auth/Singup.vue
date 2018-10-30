<template>
    <div class="singup container">
        <form @submit.prevent="Singup" class="card-panel">
            <h2 class="center">Singup</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="data.email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="data.password">
            </div>
            <div class="field">
                <label for="alias">Alias:</label>
                <input type="text" name="alias" v-model="data.alias">
            </div>
            <p class="center red-text" v-if="feedback && loader != true">{{feedback}}</p>
            <p class="center" v-show="loader"><loader/></p>
            <br>
            <div class="field center"><button class="btn">Singup</button></div>
        </form>
    </div>
</template>

<script>
import slufify from "slugify";
import db from "@/firebase/init";
import Loader from "@/components/Loader";
import firebase from "firebase";

export default {
  name: "Singup",
  components: {
    Loader
  },
  data() {
    return {
      data: {
        email: null,
        password: null,
        alias: null,
        slug: null
      },
      feedback: null,
      loader: false
    };
  },
  methods: {
    Singup() {
      if (this.data.alias && this.data.email && this.data.password) {
        this.loader = true;
        this.data.slug = slufify(this.data.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.data.slug);
        ref.get().then(doc => {
          if (doc.exists) this.feedback = "This alias already exists";
          else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(
                this.data.email,
                this.data.password
              )
              .then(user => {
                ref.set({
                  alias: this.data.alias,
                  geolocation: null,
                  user_id: user.uid
                });
              })
              .then(() => {
                this.$router.push({ name: "GMap " });
              })
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
          }
          this.loader = false;
        });
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
};
</script>

<style scoped>
.singup {
  max-width: 400px;
  margin-top: 60px;
}

.singup h2 {
  font-size: 2.4em;
}

.singup .field {
  margin-bottom: 15px;
}

.singup .btn {
  border-radius: 20px;
}
</style>