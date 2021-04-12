<template>
  <div class="form container">
    <h2>Register</h2>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="name"
        append-icon="mdi-account"
        :rules="[rules.required]"
        label="User name"
      ></v-text-field>
      <v-text-field
        v-model="email"
        append-icon="mdi-email"
        :rules="[rules.required, rules.email]"
        label="Email"
      ></v-text-field>
      <span v-if="emailError">{{ emailError }}</span>
      <v-text-field
        v-model="password"
        type="password"
        :rules="[rules.required, rules.password]"
        append-icon="mdi-key"
        name="password"
        label="Password"
      ></v-text-field>
      <span v-if="pswdError">{{ pswdError }}</span>
      <v-btn class="mr-4" type="submit" :disabled="validateForm">
        submit
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { projectAuth } from "../firebase/config";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
      emailError: null,
      pswdError: null,
      rules: {
        required: (value) => !!value || "必須項目です",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "メールアドレスを確認してください";
        },
        password: (value) => {
          return value.length >= 6 || "パスワードは6文字以上にしてください";
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    validateForm() {
      return !this.email || !this.password || !this.name;
    },
  },
  methods: {
    onSubmit() {
      projectAuth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
            data.user.updateProfile({
                displayName: this.name,
          });
          this.$store.dispatch('fetchUser', data.user)
        }).then(() => {
            projectAuth.signOut();
            this.$router.push({ name: "login" });
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            this.emailError = "メールアドレスの形式が正しくありません";
            this.pswdError = null;
          } else if (error.code === "auth/weak-password") {
            this.password = "パスワードは6文字以上にしてください";
            this.emailError = null;
          } else if (error.code === "auth/email-already-in-use") {
            this.emailError = "このメールアドレスは使用されています";
            this.pswdError = null;
          }
        });
    },
  },
};
</script>

<style>
.theme--light.v-btn.v-btn--has-bg {
  background-color: #d69f3f !important;
  color: white;
}
</style>