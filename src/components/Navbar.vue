<template>
  <div>
    <div>
      <v-app-bar color="deep-purple accent-4" dense dark>
        <router-link to="/">
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>

        <v-toolbar-title class="title">Tempgram</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->

        <router-link to="/mygallery" v-show="user.loggedIn">
          <div v-if="userName" class="nav-item">
            <Avator :name="userName.charAt(0)" color="#e6bf64" />
          </div>
        </router-link>

        <span v-if="!user.loggedIn">
          <Button text="Register" @btn-click="register" color="#4f6b9a" />
        </span>

        <div class="ml-10">
          <span v-if="user.loggedIn">
            <Button
              text="Log out"
              @btn-click="logOut"
              color="transparent"
              :isLoggedIn="!user.loggedIn"
            />
          </span>
          <span v-else>
            <Button
              text="Log in"
              @btn-click="logIn"
              color="#698452f0"
              :isLoggedIn="user.loggedIn"
            />
          </span>
        </div>
      </v-app-bar>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { projectAuth } from "../firebase/config";
import Button from "../components/Button";
import Avator from "../components/Avator";

export default {
  name: "Navbar",
  components: {
    Button,
    Avator,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userName() {
      return (
        this.$store.getters.user.loggedIn &&
        this.$store.getters.user.data.displayName
      );
    },
  },
  methods: {
    logOut() {
      projectAuth.signOut();
      this.$router.push({ name: "login" });
    },
    logIn() {
      this.$route.name !== "login" ? this.$router.push({ name: "login" }) : "";
    },
    register() {
      this.$route.name !== "register"
        ? this.$router.push({ name: "register" })
        : "";
    },
  },
};
</script>

<style lang="scss" >
@import "../assets/app.scss";
.v-toolbar__content {
  background: #506550;
}
.title {
  display: none;
  @include media-s {
    display: block;
  }
}
</style>