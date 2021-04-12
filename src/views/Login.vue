<template>
  <div class="form container">
      <h2>Log in</h2>
    <span v-if="errorMsg" class="errorMsg">{{ errorMsg }}</span>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="email"
        append-icon="mdi-email"
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        append-icon="mdi-key"
        name="password"
        label="Password"
      ></v-text-field>
      <v-btn class="mr-4" type="submit" :disabled="validateForm">
        Log in
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { projectAuth } from "../firebase/config";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      errorMsg: "",
    };
  },
  computed: {
    validateForm() {
      return !this.password || !this.email;
    },
  },
  methods: {
    onSubmit() {
      console.log("Innn");
      projectAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("loged in");
          this.$router.replace({ name: "userImages" });
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            this.errorMsg = "メールアドレスの形式が正しくありません";
          } else if (
            error.code === ("auth/wrong-password" || "auth/user-mismatch")
          ) {
            this.errorMsg = "メールアドレスまたはパスワードが違います";
          }
        });
    },
  },
};
</script>

<style lang="scss">
</style>